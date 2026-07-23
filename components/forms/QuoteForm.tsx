"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { services } from "@/data/services";
import { validateQuoteForm, type QuoteFormValues } from "@/lib/validation";

const initialValues: QuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  city: "",
  service: "",
  message: "",
  honeypot: "",
};

export function QuoteForm() {
  const [values, setValues] = useState<QuoteFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (values.honeypot) {
      setStatus("success");
      return;
    }

    const validationErrors = validateQuoteForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    // TODO: brancher sur une route API (ex. /api/devis) lors de l'intégration backend.
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
          <p className="font-medium text-anthracite">Demande envoyée</p>
          <p className="mt-1 text-sm text-ardoise-600">
            Merci pour votre demande de devis, nous vous recontactons sous
            peu pour convenir d&apos;un rendez-vous.
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
          label="Ville du projet"
          name="city"
          required
          value={values.city}
          onChange={handleChange}
          error={errors.city}
          autoComplete="address-level2"
        />
      </div>

      <FormField
        label="Prestation concernée"
        name="service"
        as="select"
        required
        value={values.service}
        onChange={handleChange}
        error={errors.service}
      >
        <option value="">Sélectionnez une prestation</option>
        {services.map((service) => (
          <option key={service.slug} value={service.slug}>
            {service.title}
          </option>
        ))}
        <option value="autre">Autre / je ne sais pas encore</option>
      </FormField>

      <FormField
        label="Décrivez votre projet"
        name="message"
        as="textarea"
        required
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Surface concernée, état actuel, délais souhaités..."
      />

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website_quote">Ne pas remplir ce champ</label>
        <input
          id="company_website_quote"
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
        Envoyer ma demande de devis
      </button>
    </form>
  );
}
