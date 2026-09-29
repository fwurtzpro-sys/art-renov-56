import type { MediaAsset } from "@/types";

/**
 * Registre central des images.
 *
 * - Chaque emplacement a une clé stable utilisée par les pages et les données.
 * - `src` vide = emplacement réservé : un placeholder élégant est affiché
 *   (voir components/ui/Photo.tsx), sans décalage de mise en page.
 * - Pour remplacer une photo : déposer le fichier dans /public/images/…,
 *   renseigner `src`, `width`, `height`, `alt`, puis retirer `temporary`.
 */
const media = {
  /* Accueil */
  homeHero: { src: "", alt: "Séjour rénové aux tons chauds, parquet clair et grandes ouvertures", width: 2400, height: 1600 },
  homeIntro: { src: "", alt: "Détail de finitions intérieures soignées après rénovation", width: 1200, height: 1500 },

  /* Prestations (cartes + héros des pages métier) */
  serviceRenovation: { src: "", alt: "Pièce de vie entièrement rénovée, murs clairs et sol en bois", width: 1600, height: 1200 },
  serviceBathroom: { src: "", alt: "Salle de bain contemporaine avec douche à l'italienne", width: 1600, height: 1200 },
  serviceVmi: { src: "", alt: "Intérieur lumineux avec bouche d'insufflation au plafond", width: 1600, height: 1200 },
  serviceKitchen: { src: "", alt: "Cuisine contemporaine chaleureuse avec plan de travail et rangements sur mesure", width: 1600, height: 1200 },
  serviceFinishes: { src: "", alt: "Revêtement de sol et finitions murales dans un intérieur haut de gamme", width: 1600, height: 1200 },
  servicesHero: { src: "", alt: "Intérieur rénové aux lignes sobres", width: 2400, height: 1400 },

  /* À propos */
  aboutTeam: {
    src: "",
    alt: "Le professionnel d'ART RÉNOV 56 avec son fils devant le véhicule de l'entreprise",
    width: 1200,
    height: 1500,
  },
  aboutGoal: { src: "", alt: "Intérieur rénové et aménagé", width: 1200, height: 1500 },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

export function getMedia(key: MediaKey): MediaAsset {
  return media[key];
}
