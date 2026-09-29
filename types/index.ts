import type { IconName } from "@/components/ui/Icon";
import type { MediaKey } from "@/data/media";

export type { IconName, MediaKey };

/* ----------------------------- Routes ----------------------------- */

export type RouteKey =
  | "home"
  | "services"
  | "renovation"
  | "bathroom"
  | "vmi"
  | "kitchen"
  | "finishes"
  | "projects"
  | "about"
  | "areas"
  | "faq"
  | "contact"
  | "legal"
  | "privacy"
  | "cookies";

export interface SiteRoute {
  path: `/${string}`;
  /** Libellé court (navigation, fil d'Ariane). */
  label: string;
  /** Route parente pour le fil d'Ariane. */
  parent?: RouteKey;
  /** Page réellement développée : seules ces routes vont dans le sitemap. */
  ready: boolean;
  sitemap?: {
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: ReadonlyArray<NavItem>;
}

/* ----------------------------- Médias ----------------------------- */

export interface MediaAsset {
  /** Chemin local dans /public (vide = emplacement réservé, placeholder affiché). */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Photo temporaire libre de droits, à remplacer par une photo réelle. */
  temporary?: boolean;
  /** Crédit / source pour les photos libres de droits. */
  credit?: { author: string; source: string; url?: string };
}

/* --------------------------- Prestations -------------------------- */

export type ServiceSlug =
  | "renovation-interieure"
  | "salle-de-bain-pmr"
  | "vmi-ventilation"
  | "cuisine"
  | "revetements-finitions";

export interface Service {
  slug: ServiceSlug;
  routeKey: RouteKey;
  /** Nom affiché (navigation, cartes). */
  name: string;
  /** Description courte pour les cartes (1 à 2 phrases). */
  excerpt: string;
  icon: IconName;
  image: MediaKey;
  /** Catégorie de réalisations associée (filtre, maillage). */
  projectCategory: ProjectCategory;
  seo: { title: string; description: string };
}

/* --------------------------- Réalisations ------------------------- */

export type ProjectCategory =
  | "renovation-interieure"
  | "salle-de-bain"
  | "cuisine"
  | "revetements-finitions"
  | "vmi";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Commune — uniquement si donnée réelle et accord du client. */
  city?: string;
  description: string;
  cover: MediaKey;
  gallery?: ReadonlyArray<MediaKey>;
  beforeAfter?: { before: MediaKey; after: MediaKey };
  /**
   * Projet d'illustration (photo libre de droits) : affiché comme
   * « Projet exemple », sans commune ni fiche détaillée, exclu du sitemap.
   */
  isPlaceholder: boolean;
}

/* ------------------------------ FAQ ------------------------------- */

export type FaqCategory = "projet" | "devis" | "travaux" | "delais" | "intervention";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  /** Réponse en texte simple (réutilisée telle quelle dans le JSON-LD). */
  answer: string;
  /** Réponse à valider par ART RÉNOV 56 avant publication. */
  needsValidation?: boolean;
}

/* ----------------------------- Leads ------------------------------ */

/**
 * Demande de devis / contact. Aujourd'hui transmise par email ;
 * structure prévue pour être enregistrée dans le futur CRM.
 */
export interface Lead {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  city: string;
  projectType: ServiceSlug | "autre";
  message: string;
  consent: true;
  createdAt: string;
  source: "site-contact";
}

