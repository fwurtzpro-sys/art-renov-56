export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
}

export interface QuoteFormValues extends ContactFormValues {
  service: string;
  city: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  values: ContactFormValues
): Partial<Record<keyof ContactFormValues, string>> {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  if (!values.name.trim()) {
    errors.name = "Merci d'indiquer votre nom.";
  }

  if (!values.email.trim()) {
    errors.email = "Merci d'indiquer votre email.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Cet email ne semble pas valide.";
  }

  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Merci de décrire votre demande (10 caractères minimum).";
  }

  return errors;
}

export function validateQuoteForm(
  values: QuoteFormValues
): Partial<Record<keyof QuoteFormValues, string>> {
  const errors = validateContactForm(values) as Partial<
    Record<keyof QuoteFormValues, string>
  >;

  if (!values.service) {
    errors.service = "Merci de sélectionner une prestation.";
  }

  if (!values.city.trim()) {
    errors.city = "Merci d'indiquer la ville concernée par le projet.";
  }

  return errors;
}
