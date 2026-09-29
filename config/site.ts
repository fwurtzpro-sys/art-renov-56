/**
 * Configuration centrale d'ART RÉNOV 56.
 *
 * RÈGLE : aucune information sur l'entreprise ne doit être inventée.
 * Toute donnée non fournie vaut `A_RENSEIGNER` : elle est alors masquée
 * automatiquement sur le site public (voir `isProvided`) et jamais émise
 * dans les données structurées.
 *
 * Les coordonnées marquées « À CONFIRMER » proviennent de l'ancienne version
 * du site : elles sont affichées pour le développement mais doivent être
 * validées par ART RÉNOV 56 avant la mise en ligne.
 */

export const A_RENSEIGNER = "À RENSEIGNER" as const;

/** Vrai si la valeur a réellement été renseignée. */
export function isProvided(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim() !== "" && value !== A_RENSEIGNER;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.artrenov56.fr").replace(/\/$/, "");

export const siteConfig = {
  /** URL de production, sans slash final. Surchargée par NEXT_PUBLIC_SITE_URL. */
  url: siteUrl,
  locale: "fr_FR",
  language: "fr",

  /**
   * Bloque l'indexation (robots.txt + meta robots) — à activer sur une
   * préproduction : SITE_NOINDEX=true.
   */
  noindex: process.env.SITE_NOINDEX === "true",

  brand: {
    name: "ART RÉNOV 56",
    tagline: "Rénovation • Aménagement",
    /** Chemin du logo (ex. "/brand/logo-art-renov-56.svg"). Vide = logotype typographique. */
    logo: "",
    /** Version claire pour fond noir si différente. */
    logoOnDark: "",
    shortDescription:
      "Entreprise de rénovation intérieure et d'aménagement basée à Elven, intervenant dans le Morbihan.",
  },

  contact: {
    /** À CONFIRMER — repris de l'ancien site. */
    phone: "06 03 87 78 67",
    /** À CONFIRMER — repris de l'ancien site. */
    email: "art-renov56@gmail.com",
  },

  address: {
    /** À CONFIRMER — repris de l'ancien site. */
    street: "51 avenue de l'Argoët",
    postalCode: "56250",
    city: "Elven",
    department: "Morbihan",
    region: "Bretagne",
    country: "FR",
    /** Afficher le numéro et la rue publiquement (sinon : « Elven (56250) »). */
    showStreet: false,
    /** Coordonnées GPS — à renseigner si l'adresse publique est validée. */
    geo: null as { latitude: number; longitude: number } | null,
  },

  /** Zone d'intervention telle qu'annoncée publiquement. */
  serviceArea: {
    label: "Intervention dans le Morbihan",
    department: "Morbihan",
  },

  /**
   * Horaires d'ouverture. Laisser vide tant qu'ils ne sont pas communiqués :
   * rien ne sera affiché ni émis en données structurées.
   * Format : { days: "Lundi – Vendredi", hours: "8h00 – 18h00", schemaDays: ["Monday", …], opens: "08:00", closes: "18:00" }
   */
  openingHours: [] as ReadonlyArray<{
    days: string;
    hours: string;
    schemaDays: ReadonlyArray<string>;
    opens: string;
    closes: string;
  }>,

  /** Réseaux sociaux : n'apparaissent que si l'URL est renseignée. */
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    google: "",
  },

  legal: {
    companyName: A_RENSEIGNER,
    legalForm: A_RENSEIGNER,
    shareCapital: A_RENSEIGNER,
    siret: A_RENSEIGNER,
    registration: A_RENSEIGNER,
    vatNumber: A_RENSEIGNER,
    publicationDirector: A_RENSEIGNER,
    host: {
      name: A_RENSEIGNER,
      address: A_RENSEIGNER,
      website: A_RENSEIGNER,
    },
    /** Date de dernière mise à jour des pages légales (AAAA-MM-JJ). */
    lastUpdated: A_RENSEIGNER,
  },

  credits: {
    label: "Réalisation : ROSE",
    url: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/* ------------------------------------------------------------------ */
/* Helpers dérivés — à utiliser plutôt que de reformater dans les composants */
/* ------------------------------------------------------------------ */

/** "06 03 87 78 67" -> "+33603877867" */
export function phoneToE164(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+33${digits.slice(1)}`;
  return digits;
}

export function getPhone() {
  const { phone } = siteConfig.contact;
  if (!isProvided(phone)) return null;
  return { display: phone, href: `tel:${phoneToE164(phone)}`, e164: phoneToE164(phone) };
}

export function getEmail() {
  const { email } = siteConfig.contact;
  if (!isProvided(email)) return null;
  return { display: email, href: `mailto:${email}` };
}

/** Localisation affichée publiquement, ex. "Elven (56250)". */
export function getPublicLocality(): string {
  const { city, postalCode } = siteConfig.address;
  return `${city} (${postalCode})`;
}

export function getSocialLinks() {
  const labels: Record<keyof typeof siteConfig.social, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    google: "Google",
  };
  return (Object.keys(siteConfig.social) as Array<keyof typeof siteConfig.social>)
    .filter((key) => isProvided(siteConfig.social[key]))
    .map((key) => ({ key, label: labels[key], href: siteConfig.social[key] }));
}

export function absoluteUrl(path = "/"): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}
