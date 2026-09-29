import type { FaqCategory, FaqItem } from "@/types";

export const faqCategories: ReadonlyArray<{ id: FaqCategory; label: string }> = [
  { id: "projet", label: "Projet" },
  { id: "devis", label: "Devis" },
  { id: "travaux", label: "Travaux" },
  { id: "delais", label: "Délais" },
  { id: "intervention", label: "Intervention" },
];

/**
 * Questions / réponses.
 * Les réponses sont rédigées avec la page FAQ ; toute réponse contenant une
 * information commerciale (délais, gratuité, garanties…) doit être validée
 * par ART RÉNOV 56 (`needsValidation: true` tant que ce n'est pas le cas).
 */
export const faqItems: ReadonlyArray<FaqItem> = [];

export function getFaqByCategory(category: FaqCategory): ReadonlyArray<FaqItem> {
  return faqItems.filter((item) => item.category === category);
}
