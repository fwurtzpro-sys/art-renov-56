import type { MediaAsset } from "@/types";

/**
 * Registre central des images.
 *
 * - Chaque emplacement a une clé stable utilisée par les pages et les données.
 * - `src` vide = emplacement réservé : un placeholder sobre est affiché
 *   (components/ui/Photo.tsx). Le cadre a un ratio fixe défini par la page :
 *   renseigner `src` ne modifie jamais la mise en page.
 * - Pour remplacer une photo : déposer le fichier dans /public/images/…,
 *   renseigner `src`, `width`, `height` (dimensions réelles du fichier) et vérifier `alt`.
 *   Format conseillé : JPEG ou WebP, côté long ≥ 2000 px pour les héros.
 */
const media = {
  /* Accueil */
  homeHero: { src: "", alt: "Séjour rénové aux tons chauds, sol en bois clair et grandes ouvertures", width: 2400, height: 1600 },
  homeIntro: { src: "", alt: "Détail de finitions intérieures soignées après rénovation", width: 1200, height: 1500 },

  /* Prestations (cartes, héros des pages métier) */
  serviceRenovation: { src: "", alt: "Pièce de vie entièrement rénovée, murs clairs et sol en bois", width: 1600, height: 1200 },
  serviceBathroom: { src: "", alt: "Salle de bain contemporaine avec douche à l’italienne", width: 1600, height: 1200 },
  serviceVmi: { src: "", alt: "Intérieur lumineux avec bouche d’insufflation d’air au plafond", width: 1600, height: 1200 },
  serviceKitchen: { src: "", alt: "Cuisine contemporaine chaleureuse avec plan de travail et rangements sur mesure", width: 1600, height: 1200 },
  serviceFinishes: { src: "", alt: "Revêtement de sol et finitions murales dans un intérieur haut de gamme", width: 1600, height: 1200 },

  /* Héros de pages */
  servicesHero: { src: "", alt: "Intérieur rénové aux lignes sobres", width: 2400, height: 1200 },
  projectsHero: { src: "", alt: "Intérieur rénové et aménagé avec soin", width: 2400, height: 1200 },

  /* Pages métier — visuels secondaires */
  renovationDetail: { src: "", alt: "Artisan réalisant une finition soignée lors d’une rénovation intérieure", width: 1600, height: 1600 },
  bathroomBefore: { src: "", alt: "Salle de bain avant rénovation", width: 1600, height: 1000 },
  bathroomAfter: { src: "", alt: "Salle de bain après rénovation", width: 1600, height: 1000 },

  /* À propos */
  aboutTeam: {
    src: "",
    alt: "Le professionnel d’ART RÉNOV 56 avec son fils devant le véhicule de l’entreprise",
    width: 1200,
    height: 1500,
  },
  aboutGoal: { src: "", alt: "Intérieur rénové et aménagé par ART RÉNOV 56", width: 1200, height: 1500 },

  /* 404 */
  notFoundInterior: { src: "", alt: "Intérieur rénové, lumineux et épuré", width: 1200, height: 1600 },

  /* Emplacement générique des projets d’exemple (jamais remplacé : les vraies réalisations ont leurs propres clés) */
  projectPlaceholder: { src: "", alt: "Emplacement réservé à une future réalisation", width: 1200, height: 1500 },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

export function getMedia(key: MediaKey): MediaAsset {
  return media[key];
}

/** Emplacements photo encore vides (utile pour suivre les remplacements). */
export function getPendingMedia(): MediaKey[] {
  return (Object.keys(media) as MediaKey[]).filter((key) => media[key].src === "" && key !== "projectPlaceholder");
}
