import type { CompanyInfo } from "@/types";

export const company: CompanyInfo = {
  name: "Art Renov 56",
  legalName: "Art Renov 56",
  tagline: "Rénovation intérieure et extérieure dans le Morbihan",
  phone: "06 03 87 78 67",
  email: "art-renov56@gmail.com",
  address: "51 avenue de l'Argoët",
  city: "Elven",
  postalCode: "56250",
  region: "Morbihan",
  lat: 47.7358,
  lng: -2.5772,
  siret: "[SIRET à compléter]",
  rcs: "[RCS à compléter]",
  insurance: "[Assurance décennale à compléter]",
  hours: [
    { day: "Lundi - Vendredi", hours: "09h00 - 18h00" },
    { day: "Samedi", hours: "09h00 - 17h00" },
    { day: "Dimanche", hours: "Fermé" },
  ],
};

export const siteConfig = {
  url: "https://www.artrenov56.fr",
  name: "Art Renov 56",
  description:
    "Art Renov 56 réalise vos projets de rénovation intérieure et extérieure, peinture, revêtements de sols et murs, et aménagement intérieur dans le Morbihan.",
};
