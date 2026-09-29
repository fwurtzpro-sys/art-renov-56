/**
 * Données structurées Schema.org (JSON-LD).
 *
 * Règles :
 * - uniquement des informations réelles issues de config/site.ts ;
 * - un champ non renseigné n'est jamais émis ;
 * - jamais d'AggregateRating / Review sans vrais avis.
 */
import { absoluteUrl, getEmail, getPhone, getSocialLinks, isProvided, siteConfig } from "@/config/site";
import type { FaqItem, Service } from "@/types";

const BUSINESS_ID = `${siteConfig.url}/#entreprise`;
const WEBSITE_ID = `${siteConfig.url}/#site`;

type JsonLd = Record<string, unknown>;

export function businessSchema(): JsonLd {
  const { address, brand, openingHours } = siteConfig;
  const phone = getPhone();
  const email = getEmail();
  const sameAs = getSocialLinks().map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: brand.name,
    description: brand.shortDescription,
    url: siteConfig.url,
    ...(isProvided(brand.logo) ? { logo: absoluteUrl(brand.logo) } : {}),
    ...(phone ? { telephone: phone.e164 } : {}),
    ...(email ? { email: email.display } : {}),
    address: {
      "@type": "PostalAddress",
      ...(address.showStreet && isProvided(address.street) ? { streetAddress: address.street } : {}),
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    ...(address.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: address.geo.latitude, longitude: address.geo.longitude } }
      : {}),
    areaServed: { "@type": "AdministrativeArea", name: siteConfig.serviceArea.department },
    ...(openingHours.length > 0
      ? {
          openingHoursSpecification: openingHours.map((slot) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: slot.schemaDays,
            opens: slot.opens,
            closes: slot.closes,
          })),
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.brand.name,
    inLanguage: "fr-FR",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function breadcrumbSchema(trail: ReadonlyArray<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: Service, path: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.seo.description,
    url: absoluteUrl(path),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: siteConfig.serviceArea.department },
  };
}

export function faqSchema(items: ReadonlyArray<FaqItem>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
