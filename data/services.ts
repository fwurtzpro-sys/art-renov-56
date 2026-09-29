import type { Service, ServiceSlug } from "@/types";

/**
 * Les 5 prestations d’ART RÉNOV 56.
 * Ne pas ajouter de prestation sans validation (pas d’extension, pas de terrasse extérieure).
 * Le contenu détaillé de chaque page métier est défini avec la page correspondante.
 */
export const services: ReadonlyArray<Service> = [
  {
    slug: "renovation-interieure",
    routeKey: "renovation",
    name: "Rénovation intérieure",
    excerpt:
      "Remise à neuf et modernisation de vos pièces de vie, de la préparation des supports jusqu’aux finitions.",
    description:
      "Moderniser une pièce, repenser la circulation d’un logement ou remettre à neuf un intérieur vieillissant : nous vous accompagnons de l’étude du projet jusqu’aux dernières finitions.",
    highlights: ["Remise à neuf de pièces de vie", "Réaménagement et optimisation des espaces", "Coordination des travaux intérieurs"],
    icon: "home",
    image: "serviceRenovation",
    projectCategory: "renovation-interieure",
    seo: {
      title: "Rénovation intérieure dans le Morbihan",
      description:
        "Rénovation intérieure à Elven, Vannes et alentours : ART RÉNOV 56 modernise et réaménage votre logement avec soin, du conseil aux finitions. Devis gratuit.",
    },
  },
  {
    slug: "salle-de-bain-pmr",
    routeKey: "bathroom",
    name: "Salle de bain & PMR",
    excerpt:
      "Rénovation complète de salle de bain et aménagements pour faciliter l’accessibilité au quotidien.",
    description:
      "Une salle de bain doit être belle, confortable et adaptée à ceux qui l’utilisent. Nous rénovons votre salle de bain et pouvons l’adapter pour faciliter l’autonomie au quotidien.",
    highlights: ["Rénovation complète de salle de bain", "Douche à l’italienne", "Adaptations pour personnes à mobilité réduite"],
    icon: "bath",
    image: "serviceBathroom",
    projectCategory: "salle-de-bain",
    seo: {
      title: "Rénovation de salle de bain & PMR – Morbihan",
      description:
        "Salle de bain rénovée, douche à l’italienne, aménagements PMR : ART RÉNOV 56 conçoit des salles de bain belles, pratiques et accessibles. Devis gratuit.",
    },
  },
  {
    slug: "vmi-ventilation",
    routeKey: "vmi",
    name: "VMI / Ventilation",
    excerpt:
      "Installation de ventilation mécanique par insufflation pour renouveler l’air intérieur de votre logement.",
    description:
      "La VMI insuffle dans le logement un air extérieur filtré, pour renouveler l’air intérieur et contribuer à limiter l’humidité. Nous étudions votre logement avant toute installation.",
    highlights: ["Étude de votre logement", "Installation du système", "Réglages et mise en service"],
    icon: "wind",
    image: "serviceVmi",
    projectCategory: "vmi",
    seo: {
      title: "VMI, ventilation par insufflation – Morbihan",
      description:
        "Comprendre et installer une VMI (ventilation mécanique par insufflation) : renouvellement de l’air, gestion de l’humidité. Étude et devis gratuits par ART RÉNOV 56.",
    },
  },
  {
    slug: "cuisine",
    routeKey: "kitchen",
    name: "Cuisine",
    excerpt: "Rénovation et aménagement de cuisine sur mesure, pensés pour votre façon de vivre.",
    description:
      "Circulation, rangements, plans de travail, ambiance : votre cuisine est conçue autour de vos habitudes, puis réalisée avec soin jusqu’aux finitions.",
    highlights: ["Conception adaptée à votre espace", "Aménagement sur mesure", "Revêtements et finitions"],
    icon: "kitchen",
    image: "serviceKitchen",
    projectCategory: "cuisine",
    seo: {
      title: "Cuisine sur mesure : rénovation & aménagement",
      description:
        "Rénovation et aménagement de cuisine à Elven, Vannes et dans le Morbihan : une cuisine fonctionnelle, chaleureuse et conçue sur mesure. Devis gratuit.",
    },
  },
  {
    slug: "revetements-finitions",
    routeKey: "finishes",
    name: "Revêtements & finitions",
    excerpt: "Sols, murs et peintures : des finitions soignées qui subliment chaque pièce.",
    description:
      "Revêtements de sols, revêtements muraux, peinture : les finitions donnent son caractère à une pièce. Nous vous conseillons dans vos choix et soignons chaque étape, de la préparation à la pose.",
    highlights: ["Revêtements de sols", "Revêtements muraux et peinture", "Préparation soignée des supports"],
    icon: "layers",
    image: "serviceFinishes",
    projectCategory: "revetements-finitions",
    seo: {
      title: "Revêtements de sols, murs & finitions",
      description:
        "Revêtements de sols et muraux, peinture et finitions intérieures dans le Morbihan : ART RÉNOV 56 vous conseille et réalise des finitions durables. Devis gratuit.",
    },
  },
];

export function getService(slug: ServiceSlug): Service {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Prestation inconnue : ${slug}`);
  return service;
}
