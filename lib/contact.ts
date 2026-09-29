/**
 * Règles du formulaire de contact / devis — partagées entre le client
 * (retour immédiat) et le serveur (seule validation qui fait foi).
 */
import { services } from "@/data/services";

export const CONTACT_FIELDS = ["lastName", "firstName", "email", "phone", "city", "projectType", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string> & { consent: boolean };
export type ContactErrors = Partial<Record<ContactField | "consent" | "files", string>>;

export const projectTypeOptions: ReadonlyArray<{ value: string; label: string }> = [
  ...services.map((service) => ({ value: service.slug, label: service.name })),
  { value: "autre", label: "Autre projet d’aménagement intérieur" },
];

export const FILE_RULES = {
  maxFiles: 5,
  maxFileSize: 5 * 1024 * 1024,
  maxTotalSize: 15 * 1024 * 1024,
  accept: ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf",
  mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"],
} as const;

const LIMITS: Record<ContactField, number> = {
  lastName: 80,
  firstName: 80,
  email: 160,
  phone: 30,
  city: 100,
  projectType: 40,
  message: 4000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{6,30}$/;

/** Supprime les caractères de contrôle et normalise les espaces. */
export function cleanText(value: unknown, multiline = false): string {
  if (typeof value !== "string") return "";
  const withoutControls = value.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "");
  return multiline ? withoutControls.replace(/\r\n?/g, "\n").trim() : withoutControls.replace(/\s+/g, " ").trim();
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const required: Array<[ContactField, string]> = [
    ["lastName", "Veuillez indiquer votre nom."],
    ["firstName", "Veuillez indiquer votre prénom."],
    ["email", "Veuillez indiquer votre adresse email."],
    ["phone", "Veuillez indiquer votre numéro de téléphone."],
    ["city", "Veuillez indiquer la commune du projet."],
    ["projectType", "Veuillez choisir un type de projet."],
    ["message", "Veuillez décrire votre projet en quelques mots."],
  ];
  for (const [field, message] of required) {
    if (!values[field]) errors[field] = message;
    else if (values[field].length > LIMITS[field]) errors[field] = `Ce champ est limité à ${LIMITS[field]} caractères.`;
  }
  if (values.email && !errors.email && !EMAIL_RE.test(values.email)) {
    errors.email = "L’adresse email ne semble pas valide (exemple : nom@domaine.fr).";
  }
  if (values.phone && !errors.phone && !PHONE_RE.test(values.phone)) {
    errors.phone = "Le numéro de téléphone ne semble pas valide.";
  }
  if (values.projectType && !projectTypeOptions.some((option) => option.value === values.projectType)) {
    errors.projectType = "Veuillez choisir un type de projet dans la liste.";
  }
  if (values.message && !errors.message && values.message.length < 10) {
    errors.message = "Merci de préciser votre projet (10 caractères minimum).";
  }
  if (!values.consent) {
    errors.consent = "Votre accord est nécessaire pour que nous puissions traiter votre demande.";
  }
  return errors;
}

/** Contrôle nombre / poids / type déclaré des fichiers (le serveur vérifie aussi le contenu réel). */
export function validateFiles(files: ReadonlyArray<{ name: string; size: number; type: string }>): string | undefined {
  if (files.length > FILE_RULES.maxFiles) return `${FILE_RULES.maxFiles} fichiers maximum.`;
  const total = files.reduce((sum, file) => sum + file.size, 0);
  for (const file of files) {
    if (file.size > FILE_RULES.maxFileSize) return `« ${file.name} » dépasse 5 Mo.`;
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    const allowedExtension = FILE_RULES.accept.split(",").includes(`.${extension}`);
    if (!allowedExtension) return `« ${file.name} » : format non accepté (JPG, PNG, WebP, HEIC ou PDF).`;
  }
  if (total > FILE_RULES.maxTotalSize) return "Le poids total des fichiers ne doit pas dépasser 15 Mo.";
  return undefined;
}

/** Vérifie la signature binaire (« magic bytes ») d'un fichier accepté. */
export function detectFileType(bytes: Uint8Array): string | null {
  const startsWith = (signature: number[], offset = 0) => signature.every((byte, index) => bytes[offset + index] === byte);
  if (startsWith([0xff, 0xd8, 0xff])) return "image/jpeg";
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  if (startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8)) return "image/webp";
  if (startsWith([0x25, 0x50, 0x44, 0x46])) return "application/pdf";
  if (startsWith([0x66, 0x74, 0x79, 0x70], 4)) {
    const brand = String.fromCharCode(...bytes.slice(8, 12));
    if (["heic", "heix", "hevc", "hevx", "mif1", "msf1", "heif"].includes(brand)) return "image/heic";
  }
  return null;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
