import "server-only";
import nodemailer from "nodemailer";
import { escapeHtml, projectTypeOptions } from "@/lib/contact";
import { siteConfig } from "@/config/site";
import type { Lead } from "@/types";

/**
 * Transmission d'une demande (lead).
 * Aujourd'hui : email via SMTP, rien n'est stocké sur le serveur.
 * Demain : enregistrement dans le CRM (même signature).
 *
 * Variables d'environnement (serveur uniquement) :
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 */
export interface LeadAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

export function isMailConfigured(): boolean {
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASSWORD && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL);
}

export async function deliverLead(lead: Lead, attachments: LeadAttachment[]): Promise<void> {
  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });

  const projectLabel = projectTypeOptions.find((option) => option.value === lead.projectType)?.label ?? lead.projectType;
  const rows: Array<[string, string]> = [
    ["Nom", lead.lastName],
    ["Prénom", lead.firstName],
    ["Email", lead.email],
    ["Téléphone", lead.phone],
    ["Commune", lead.city],
    ["Type de projet", projectLabel],
  ];

  const text = [...rows.map(([label, value]) => `${label} : ${value}`), "", "Message :", lead.message].join("\n");
  const html = `
    <h2 style="font-family:Georgia,serif">Nouvelle demande — ${escapeHtml(siteConfig.brand.name)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${rows.map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(lead.message)}</p>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#777">Reçue le ${escapeHtml(lead.createdAt)} via le formulaire du site.</p>`;

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: lead.email,
    subject: `Demande de devis — ${projectLabel} — ${lead.city}`,
    text,
    html,
    attachments,
  });
}
