"use client";

import Link from "next/link";
import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { useQueryParam } from "@/lib/useQueryParam";
import {
  CONTACT_FIELDS,
  FILE_RULES,
  cleanText,
  projectTypeOptions,
  validateContact,
  validateFiles,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";

type Status = { state: "idle" | "submitting" | "success" } | { state: "error"; message: string };

const FIELD_LABELS: Record<keyof ContactErrors, string> = {
  lastName: "Nom",
  firstName: "Prénom",
  email: "Email",
  phone: "Téléphone",
  city: "Commune",
  projectType: "Type de projet",
  message: "Votre projet",
  consent: "Consentement",
  files: "Photos / documents",
};

function readValues(form: HTMLFormElement): ContactValues {
  const data = new FormData(form);
  const values = Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, cleanText(data.get(field), field === "message")]),
  ) as Record<(typeof CONTACT_FIELDS)[number], string>;
  return { ...values, consent: data.get("consent") === "on" };
}

export function ContactForm({ privacyHref }: { privacyHref: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [projectParam] = useQueryParam("projet");
  const defaultProject = projectTypeOptions.some((option) => option.value === projectParam) ? projectParam ?? "" : "";

  const markStarted = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  const onBlur = (event: FocusEvent<HTMLFormElement>) => {
    const name = (event.target as unknown as HTMLInputElement).name as keyof ContactErrors;
    if (!formRef.current || !(name in FIELD_LABELS) || name === "files") return;
    const fieldError = validateContact(readValues(formRef.current))[name];
    // On ne signale une erreur au blur que si le champ a été renseigné ou était déjà en erreur.
    const value = (event.target as unknown as HTMLInputElement).value;
    if (!value && !errors[name]) return;
    setErrors((current) => ({ ...current, [name]: fieldError }));
  };

  const onFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    const merged = [...files, ...selected].slice(0, FILE_RULES.maxFiles + 1);
    setFiles(merged);
    setErrors((current) => ({ ...current, files: validateFiles(merged) }));
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(next);
    setErrors((current) => ({ ...current, files: validateFiles(next) }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = readValues(form);
    const nextErrors: ContactErrors = { ...validateContact(values) };
    const fileError = validateFiles(files);
    if (fileError) nextErrors.files = fileError;
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus({ state: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const data = new FormData(form);
    data.delete("files");
    files.forEach((file) => data.append("files", file));
    data.set("startedAt", String(startedAt.current || Date.now()));

    setStatus({ state: "submitting" });
    try {
      const response = await fetch("/api/contact", { method: "POST", body: data });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; errors?: ContactErrors; message?: string };
      if (response.ok && result.ok) {
        form.reset();
        setFiles([]);
        setStatus({ state: "success" });
        return;
      }
      if (result.errors) setErrors(result.errors);
      setStatus({
        state: "error",
        message: result.message ?? "Votre demande n’a pas pu être envoyée. Merci de vérifier le formulaire puis de réessayer.",
      });
    } catch {
      setStatus({ state: "error", message: "La connexion a échoué. Merci de réessayer dans quelques instants." });
    }
  };

  const errorEntries = (Object.entries(errors) as Array<[keyof ContactErrors, string | undefined]>).filter(([, message]) => message);

  if (status.state === "success") {
    return (
      <div role="status" className="flex flex-col items-start py-10">
        <span className="flex h-14 w-14 items-center justify-center border border-or">
          <Icon name="check" className="h-7 w-7 text-or" />
        </span>
        <h2 className="mt-8 font-serif text-display-sm font-medium">Merci, votre demande a bien été envoyée.</h2>
        <p className="mt-4 text-muted">Nous revenons vers vous pour échanger sur votre projet.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className={cn(buttonClasses({ variant: "outline", size: "md" }), "mt-8")}>
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onBlur={onBlur} onFocus={markStarted} aria-describedby="form-aide">
      <p id="form-aide" className="text-[0.8125rem] text-muted">
        Les champs marqués d’un <span className="text-or">*</span> sont obligatoires.
      </p>

      {errorEntries.length > 0 ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 border border-[#e8a39a]/60 bg-[#e8a39a]/10 p-5 text-[0.9375rem]">
          <p className="flex items-center gap-2 font-semibold text-[#f0b7ae]">
            <Icon name="alert" className="h-5 w-5" />
            Merci de corriger {errorEntries.length > 1 ? `les ${errorEntries.length} points suivants` : "le point suivant"} :
          </p>
          <ul className="mt-3 space-y-1 pl-7">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#champ-${field}`} className="underline decoration-[#f0b7ae]/60 underline-offset-4">
                  {FIELD_LABELS[field]} : {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <TextField name="lastName" label="Nom" autoComplete="family-name" error={errors.lastName} />
        <TextField name="firstName" label="Prénom" autoComplete="given-name" error={errors.firstName} />
        <TextField name="email" label="Email" type="email" autoComplete="email" inputMode="email" error={errors.email} />
        <TextField name="phone" label="Téléphone" type="tel" autoComplete="tel" inputMode="tel" error={errors.phone} />
        <TextField name="city" label="Commune du projet" autoComplete="address-level2" error={errors.city} />

        <FieldShell name="projectType" label="Type de projet" error={errors.projectType}>
          <div className="relative">
            <select
              key={defaultProject}
              id="champ-projectType"
              name="projectType"
              defaultValue={defaultProject}
              required
              aria-invalid={errors.projectType ? true : undefined}
              aria-describedby={errors.projectType ? "erreur-projectType" : undefined}
              className={cn(inputClass(Boolean(errors.projectType)), "appearance-none pr-12")}
            >
              <option value="" disabled>
                Choisir…
              </option>
              {projectTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-or" />
          </div>
        </FieldShell>

        <FieldShell name="message" label="Décrivez votre projet" error={errors.message} className="sm:col-span-2">
          <textarea
            id="champ-message"
            name="message"
            rows={6}
            required
            maxLength={4000}
            placeholder="Pièces concernées, surface approximative, état actuel, vos envies…"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "erreur-message" : undefined}
            className={cn(inputClass(Boolean(errors.message)), "min-h-[160px] resize-y py-4")}
          />
        </FieldShell>

        {/* Pièces jointes */}
        <div className="sm:col-span-2">
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ivoire/80">
            Photos ou documents <span className="normal-case tracking-normal text-muted">(facultatif)</span>
          </span>
          <label
            htmlFor="champ-files"
            className="mt-3 flex min-h-[64px] cursor-pointer items-center gap-4 border border-dashed border-line px-5 py-4 text-[0.9375rem] text-ivoire/80 transition-colors hover:border-or focus-within:border-or"
          >
            <Icon name="paperclip" className="h-5 w-5 shrink-0 text-or" />
            <span>
              Ajouter des fichiers
              <span className="block text-[0.8125rem] text-muted">JPG, PNG, WebP, HEIC ou PDF — 5 fichiers, 5 Mo chacun maximum</span>
            </span>
            <input
              id="champ-files"
              type="file"
              name="files"
              multiple
              accept={FILE_RULES.accept}
              onChange={onFilesChange}
              aria-describedby={errors.files ? "erreur-files" : undefined}
              className="sr-only"
            />
          </label>
          {files.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-4 bg-marine/40 px-4 py-2 text-[0.875rem]">
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-ivoire/70 hover:text-or"
                    aria-label={`Retirer ${file.name}`}
                  >
                    <Icon name="close" className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <FieldError name="files" message={errors.files} />
        </div>
      </div>

      {/* Champ piège anti-robots : invisible et ignoré par les humains */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="champ-website">Ne pas remplir ce champ</label>
        <input id="champ-website" type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-8">
        <label htmlFor="champ-consent" className="flex cursor-pointer items-start gap-4 text-[0.875rem] leading-relaxed text-ivoire/80">
          <input
            id="champ-consent"
            type="checkbox"
            name="consent"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "erreur-consent" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-or"
          />
          <span>
            J’accepte que les informations saisies soient utilisées pour traiter ma demande et être recontacté(e).{" "}
            <Link href={privacyHref} className="text-or underline underline-offset-4">
              Politique de confidentialité
            </Link>{" "}
            <span className="text-or">*</span>
          </span>
        </label>
        <FieldError name="consent" message={errors.consent} />
      </div>

      {status.state === "error" ? (
        <p role="alert" className="mt-6 flex items-start gap-3 border-l-2 border-[#e8a39a] pl-4 text-[0.9375rem] text-[#f0b7ae]">
          <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status.state === "submitting"}
        className={cn(buttonClasses({ variant: "gold", size: "lg" }), "mt-8 w-full sm:w-auto")}
      >
        <span>{status.state === "submitting" ? "Envoi en cours…" : "Envoyer ma demande"}</span>
        <Icon name="arrowRight" className="h-4 w-4" />
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function inputClass(invalid: boolean) {
  return cn(
    "block min-h-[52px] w-full border bg-marine/40 px-4 text-[1rem] text-ivoire placeholder:text-ivoire/35 transition-colors focus:border-or focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
    invalid ? "border-[#e8a39a]" : "border-line hover:border-ivoire/30",
  );
}

function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`erreur-${name}`} className="mt-2 flex items-start gap-2 text-[0.8125rem] text-[#f0b7ae]">
      <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

function FieldShell({
  name,
  label,
  error,
  className,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`champ-${name}`} className="block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ivoire/80">
        {label} <span className="text-or">*</span>
      </label>
      <div className="mt-3">{children}</div>
      <FieldError name={name} message={error} />
    </div>
  );
}

function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  inputMode,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
  error?: string;
}) {
  return (
    <FieldShell name={name} label={label} error={error}>
      <input
        id={`champ-${name}`}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `erreur-${name}` : undefined}
        className={inputClass(Boolean(error))}
      />
    </FieldShell>
  );
}
