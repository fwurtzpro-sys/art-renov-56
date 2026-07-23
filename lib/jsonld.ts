import { company, siteConfig } from "@/data/company";
import type { FaqItem, Realisation, Service } from "@/types";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: company.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: company.city,
      postalCode: company.postalCode,
      addressRegion: company.region,
      addressCountry: "FR",
    },
    areaServed: "Morbihan",
    openingHoursSpecification: company.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.hours,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: company.name,
      url: siteConfig.url,
    },
    areaServed: "Morbihan",
    description: service.metaDescription,
  };
}

export function realisationJsonLd(realisation: Realisation) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: realisation.title,
    about: realisation.summary,
    locationCreated: {
      "@type": "Place",
      name: realisation.location,
    },
  };
}
