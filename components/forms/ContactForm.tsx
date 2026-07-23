"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { validateContactForm, type ContactFormValues } from "@/lib/validation";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  honeypot: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: if filled, silently treat as spam without alerting the bot.
    if (values.honeypot) {
      setStatus("success");
      return;
    }

    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    // TODO: brancher sur une route API (ex. /api/contact) lors de l'intégration backend.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
    setValues(initialValues);
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-sm border border-ardoise-200 bg-ardoise-50 p-6"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ardoise-700" aria-hidden="true" />
        <div>
          <p className="font-medium text-anthracite">Message envoyé</p>
          <p className="mt-1 text-sm text-ardoise-600">
            Merci pour votre message, nous revenons vers vous rapidement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Nom complet"
          name="name"
          required
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
        />
        <FormField
          label="Téléphone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <FormField
        label="Email"
        name="email"
        type="email"
        required
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />

      <FormField
        label="Votre message"
        name="message"
        as="textarea"
        required
        value={values.message}
        onChange={handleChange}
        error={errors.message}
      />

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Ne pas remplir ce champ</label>
        <input
          id="company_website"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-ardoise-900 px-7 py-3.5 text-sm font-medium text-creme transition-colors duration-300 hover:bg-ardoise-800 disabled:opacity-60"
      >
        {status === "submitting" && (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        )}
        Envoyer le message
      </button>
    </form>
  );
}
