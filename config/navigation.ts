import { routes } from "@/config/routes";
import { services } from "@/data/services";
import type { NavItem } from "@/types";

const serviceItems: NavItem[] = services.map((service) => ({
  label: service.name,
  href: routes[service.routeKey].path,
}));

/** Navigation principale (header desktop + menu mobile). */
export const mainNav: ReadonlyArray<NavItem> = [
  { label: routes.home.label, href: routes.home.path },
  { label: routes.services.label, href: routes.services.path, children: serviceItems },
  { label: routes.projects.label, href: routes.projects.path },
  { label: routes.about.label, href: routes.about.path },
  { label: routes.areas.label, href: routes.areas.path },
  { label: routes.faq.label, href: routes.faq.path },
  { label: routes.contact.label, href: routes.contact.path },
];

/** Colonne « Liens rapides » du footer. */
export const footerQuickLinks: ReadonlyArray<NavItem> = mainNav.map(({ label, href }) => ({ label, href }));

/** Colonne « Prestations » du footer. */
export const footerServiceLinks: ReadonlyArray<NavItem> = serviceItems;

/** Liens légaux (dernière ligne du footer). */
export const legalNav: ReadonlyArray<NavItem> = [
  { label: routes.legal.label, href: routes.legal.path },
  { label: routes.privacy.label, href: routes.privacy.path },
  { label: routes.cookies.label, href: routes.cookies.path },
];

/** Libellés du CTA principal, réutilisés partout. */
export const quoteCta = {
  label: "Devis gratuit",
  sublabel: "Rapide & sans engagement",
  long: "Demander un devis gratuit",
  href: routes.contact.path,
} as const;
