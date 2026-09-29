import { NextResponse, type NextRequest } from "next/server";
import {
  CONTACT_FIELDS,
  FILE_RULES,
  cleanText,
  detectFileType,
  validateContact,
  validateFiles,
  type ContactValues,
} from "@/lib/contact";
import { isRateLimited } from "@/lib/rate-limit";
import { deliverLead, isMailConfigured, type LeadAttachment } from "@/lib/leads";
import type { Lead } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = FILE_RULES.maxTotalSize + 1024 * 1024;
const MIN_FILL_MS = 3000;

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Refuse les requêtes provenant d'un autre site (protection CSRF basique). */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "inconnue";
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return json({ ok: false, code: "forbidden" }, 403);

  if (isRateLimited(`contact:${clientIp(request)}`, 8, 10 * 60 * 1000)) {
    return json({ ok: false, code: "rate_limited", message: "Trop de demandes envoyées. Merci de réessayer plus tard." }, 429);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return json({ ok: false, code: "too_large", message: "Les fichiers joints sont trop volumineux." }, 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, code: "bad_request" }, 400);
  }

  // Anti-spam : champ piège rempli ou envoi trop rapide → réponse neutre, rien n'est transmis.
  const honeypot = form.get("website");
  const startedAt = Number(form.get("startedAt"));
  if ((typeof honeypot === "string" && honeypot !== "") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return json({ ok: true });
  }

  const values = Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, cleanText(form.get(field), field === "message")]),
  ) as Record<(typeof CONTACT_FIELDS)[number], string>;
  const contact: ContactValues = { ...values, consent: form.get("consent") === "on" };
  const errors = validateContact(contact);

  const files = form.getAll("files").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const fileError = validateFiles(files);
  if (fileError) errors.files = fileError;

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, code: "invalid", errors }, 400);
  }

  const attachments: LeadAttachment[] = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const detected = detectFileType(buffer.subarray(0, 16));
    if (!detected) {
      return json({ ok: false, code: "invalid", errors: { files: `« ${cleanText(file.name)} » n’est pas un fichier accepté.` } }, 400);
    }
    const safeName = cleanText(file.name).replace(/[^\w.\- ]+/g, "_").slice(0, 100) || "piece-jointe";
    attachments.push({ filename: safeName, content: buffer, contentType: detected });
  }

  if (!isMailConfigured()) {
    return json(
      {
        ok: false,
        code: "not_configured",
        message: "L’envoi du formulaire n’est pas encore activé sur ce site. Votre demande n’a pas été transmise.",
      },
      503,
    );
  }

  const lead: Lead = {
    ...values,
    projectType: values.projectType as Lead["projectType"],
    consent: true,
    createdAt: new Date().toISOString(),
    source: "site-contact",
  };

  try {
    await deliverLead(lead, attachments);
  } catch {
    // Aucune donnée personnelle n'est journalisée.
    console.error("[contact] Échec de l'envoi de la demande.");
    return json({ ok: false, code: "delivery_failed", message: "Votre demande n’a pas pu être envoyée. Merci de réessayer." }, 502);
  }

  return json({ ok: true });
}
