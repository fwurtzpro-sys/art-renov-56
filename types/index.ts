export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string[];
  icon: string;
  image: string;
  features: string[];
  metaDescription: string;
}

export interface Realisation {
  slug: string;
  title: string;
  serviceSlug: string;
  location: string;
  year: string;
  cover: string;
  images: string[];
  summary: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "general" | "devis" | "chantier" | "prestations";
}

export interface ZoneVille {
  name: string;
  slug: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  siret: string;
  rcs: string;
  insurance: string;
  hours: { day: string; hours: string }[];
}
