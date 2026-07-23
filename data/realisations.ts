import type { Realisation } from "@/types";

export const realisations: Realisation[] = [
  {
    slug: "renovation-maison-vannes",
    title: "Rénovation complète d'une longère à Vannes",
    serviceSlug: "renovation-interieure",
    location: "Vannes",
    year: "2025",
    cover: "/images/realisations/maison-vannes.svg",
    images: [
      "/images/realisations/maison-vannes.svg",
      "/images/realisations/maison-vannes-2.svg",
    ],
    summary:
      "Réhabilitation intégrale d'une longère traditionnelle, entre respect du bâti ancien et confort moderne.",
    challenge:
      "Les propriétaires souhaitaient conserver le cachet de la longère tout en modernisant l'isolation, l'agencement des pièces et les circulations.",
    solution:
      "Nous avons repensé les volumes intérieurs, refait l'isolation thermique et posé de nouveaux revêtements de sols en cohérence avec le caractère du bâtiment.",
    result:
      "Une maison lumineuse et confortable, qui conserve son authenticité tout en répondant aux standards actuels de confort thermique.",
  },
  {
    slug: "facade-maison-lorient",
    title: "Ravalement de façade à Lorient",
    serviceSlug: "renovation-exterieure",
    location: "Lorient",
    year: "2024",
    cover: "/images/realisations/facade-lorient.svg",
    images: ["/images/realisations/facade-lorient.svg"],
    summary:
      "Traitement complet d'une façade abîmée par les embruns, avec isolation thermique par l'extérieur.",
    challenge:
      "La façade présentait des fissures et une isolation insuffisante face au climat maritime.",
    solution:
      "Diagnostic complet, traitement des fissures, pose d'une isolation thermique par l'extérieur et finition en enduit taloché.",
    result:
      "Une façade protégée durablement, avec un gain significatif en confort thermique et une esthétique renouvelée.",
  },
  {
    slug: "appartement-auray",
    title: "Rénovation d'un appartement à Auray",
    serviceSlug: "amenagement-interieur",
    location: "Auray",
    year: "2024",
    cover: "/images/realisations/appartement-auray.svg",
    images: ["/images/realisations/appartement-auray.svg"],
    summary:
      "Réagencement complet d'un appartement de centre-ville avec cuisine et rangements sur mesure.",
    challenge:
      "Un appartement cloisonné et peu fonctionnel, avec un manque de rangement chronique.",
    solution:
      "Suppression de cloisons non porteuses, conception d'une cuisine ouverte et création de rangements sur mesure intégrés.",
    result:
      "Un espace de vie ouvert et fonctionnel, pensé pour le quotidien de ses occupants.",
  },
  {
    slug: "salle-de-bain-pontivy",
    title: "Rénovation d'une salle de bain à Pontivy",
    serviceSlug: "revetements-muraux",
    location: "Pontivy",
    year: "2023",
    cover: "/images/realisations/salle-de-bain-pontivy.svg",
    images: ["/images/realisations/salle-de-bain-pontivy.svg"],
    summary:
      "Transformation d'une salle de bain vieillissante en un espace contemporain et fonctionnel.",
    challenge:
      "Une salle de bain datée, avec des problèmes d'étanchéité et un agencement peu pratique.",
    solution:
      "Reprise complète de l'étanchéité, pose de carrelage mural grand format et installation d'une douche à l'italienne.",
    result:
      "Une salle de bain moderne, saine et durable, valorisant l'ensemble du logement.",
  },
];

export function getRealisationBySlug(slug: string): Realisation | undefined {
  return realisations.find((r) => r.slug === slug);
}

export function getRealisationsByService(serviceSlug: string): Realisation[] {
  return realisations.filter((r) => r.serviceSlug === serviceSlug);
}
