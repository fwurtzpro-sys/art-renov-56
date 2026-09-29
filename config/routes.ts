import type { RouteKey, SiteRoute } from "@/types";

/**
 * Registre unique des routes publiques.
 * `ready: true` dès que la page est développée : elle entre alors dans le sitemap.
 */
export const routes = {
  home: { path: "/", label: "Accueil", ready: false, sitemap: { priority: 1, changeFrequency: "monthly" } },
  services: { path: "/prestations", label: "Prestations", parent: "home", ready: false, sitemap: { priority: 0.9, changeFrequency: "monthly" } },
  renovation: { path: "/renovation-interieure", label: "Rénovation intérieure", parent: "services", ready: false, sitemap: { priority: 0.9, changeFrequency: "monthly" } },
  bathroom: { path: "/salle-de-bain-pmr", label: "Salle de bain & PMR", parent: "services", ready: false, sitemap: { priority: 0.9, changeFrequency: "monthly" } },
  vmi: { path: "/vmi-ventilation", label: "VMI / Ventilation", parent: "services", ready: false, sitemap: { priority: 0.9, changeFrequency: "monthly" } },
  kitchen: { path: "/cuisine", label: "Cuisine", parent: "services", ready: false, sitemap: { priority: 0.9, changeFrequency: "monthly" } },
  finishes: { path: "/revetements-finitions", label: "Revêtements & finitions", parent: "services", ready: false, sitemap: { priority: 0.9, changeFrequency: "monthly" } },
  projects: { path: "/realisations", label: "Réalisations", parent: "home", ready: false, sitemap: { priority: 0.8, changeFrequency: "weekly" } },
  about: { path: "/a-propos", label: "À propos", parent: "home", ready: false, sitemap: { priority: 0.7, changeFrequency: "yearly" } },
  areas: { path: "/zones-intervention", label: "Zones d'intervention", parent: "home", ready: false, sitemap: { priority: 0.8, changeFrequency: "yearly" } },
  faq: { path: "/faq", label: "FAQ", parent: "home", ready: false, sitemap: { priority: 0.6, changeFrequency: "monthly" } },
  contact: { path: "/contact", label: "Contact", parent: "home", ready: false, sitemap: { priority: 0.8, changeFrequency: "yearly" } },
  legal: { path: "/mentions-legales", label: "Mentions légales", parent: "home", ready: false, sitemap: { priority: 0.2, changeFrequency: "yearly" } },
  privacy: { path: "/politique-confidentialite", label: "Politique de confidentialité", parent: "home", ready: false, sitemap: { priority: 0.2, changeFrequency: "yearly" } },
  cookies: { path: "/cookies", label: "Cookies", parent: "home", ready: false, sitemap: { priority: 0.2, changeFrequency: "yearly" } },
} as const satisfies Record<RouteKey, SiteRoute>;

export function href(key: RouteKey): string {
  return routes[key].path;
}

/** Chaîne de fil d'Ariane (Accueil → … → page). */
export function getBreadcrumbTrail(key: RouteKey): Array<{ name: string; path: string }> {
  const trail: Array<{ name: string; path: string }> = [];
  let current: RouteKey | undefined = key;
  while (current) {
    const route: SiteRoute = routes[current];
    trail.unshift({ name: route.label, path: route.path });
    current = route.parent;
  }
  return trail;
}

/** Préfixes réservés au futur espace client / administration (non indexés). */
export const privatePrefixes = ["/api/", "/espace-client", "/admin"] as const;

/**
 * Redirections 301 depuis les URL de l'ancienne version du site.
 * Consommées par next.config.ts.
 */
export const legacyRedirects: ReadonlyArray<{ source: string; destination: string }> = [
  { source: "/prestations/renovation-interieure", destination: routes.renovation.path },
  { source: "/prestations/amenagement-interieur", destination: routes.renovation.path },
  { source: "/prestations/pose-de-vmi", destination: routes.vmi.path },
  { source: "/prestations/peinture", destination: routes.finishes.path },
  { source: "/prestations/revetements-de-sols", destination: routes.finishes.path },
  { source: "/prestations/revetements-muraux", destination: routes.finishes.path },
  // Prestation supprimée (non proposée) : renvoi vers le hub des prestations.
  { source: "/prestations/renovation-exterieure", destination: routes.services.path },
  // Anciens projets fictifs supprimés.
  { source: "/realisations/renovation-maison-vannes", destination: routes.projects.path },
  { source: "/realisations/facade-maison-lorient", destination: routes.projects.path },
  { source: "/realisations/appartement-auray", destination: routes.projects.path },
  { source: "/realisations/salle-de-bain-pontivy", destination: routes.projects.path },
  { source: "/zone-intervention", destination: routes.areas.path },
  { source: "/politique-de-confidentialite", destination: routes.privacy.path },
  { source: "/devis", destination: routes.contact.path },
];
