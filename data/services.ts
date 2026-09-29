import type { Service, ServiceSlug } from "@/types";

/**
 * Les 5 prestations d'ART RÉNOV 56.
 * Ne pas ajouter de prestation sans validation (pas d'extension, pas de terrasse extérieure).
 * Le contenu détaillé de chaque page métier est défini avec la page correspondante.
 */
export const services: ReadonlyArray<Service> = [
  {
    slug: "renovation-interieure",
    routeKey: "renovation",
    name: "Rénovation intérieure",
    excerpt:
      "Remise à neuf et modernisation de vos pièces de vie, de la préparation des supports jusqu'aux finitions.",
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
      "Rénovation complète de salle de bain et aménagements pour faciliter l'accessibilité au quotidien.",
    icon: "bath",
    image: "serviceBathroom",
    projectCategory: "salle-de-bain",
    seo: {
      title: "Rénovation de salle de bain & PMR dans le Morbihan",
      description:
        "Salle de bain rénovée, douche à l'italienne, aménagements PMR : ART RÉNOV 56 conçoit des salles de bain belles, pratiques et accessibles. Devis gratuit.",
    },
  },
  {
    slug: "vmi-ventilation",
    routeKey: "vmi",
    name: "VMI / Ventilation",
    excerpt:
      "Installation de ventilation mécanique par insufflation pour renouveler l'air intérieur de votre logement.",
    icon: "wind",
    image: "serviceVmi",
    projectCategory: "vmi",
    seo: {
      title: "VMI – Ventilation par insufflation dans le Morbihan",
      description:
        "Comprendre et installer une VMI (ventilation mécanique par insufflation) : renouvellement de l'air, gestion de l'humidité. Étude et devis gratuits par ART RÉNOV 56.",
    },
  },
  {
    slug: "cuisine",
    routeKey: "kitchen",
    name: "Cuisine",
    excerpt: "Rénovation et aménagement de cuisine sur mesure, pensés pour votre façon de vivre.",
    icon: "kitchen",
    image: "serviceKitchen",
    projectCategory: "cuisine",
    seo: {
      title: "Rénovation & aménagement de cuisine sur mesure",
      description:
        "Rénovation et aménagement de cuisine à Elven, Vannes et dans le Morbihan : une cuisine fonctionnelle, chaleureuse et conçue sur mesure. Devis gratuit.",
    },
  },
  {
    slug: "revetements-finitions",
    routeKey: "finishes",
    name: "Revêtements & finitions",
    excerpt: "Sols, murs et peintures : des finitions soignées qui subliment chaque pièce.",
    icon: "layers",
    image: "serviceFinishes",
    projectCategory: "revetements-finitions",
    seo: {
      title: "Revêtements de sols, murs & finitions intérieures",
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
