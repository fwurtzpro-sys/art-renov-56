import type { ZoneVille } from "@/types";

export const zones: ZoneVille[] = [
  { name: "Vannes", slug: "vannes", lat: 47.6582, lng: -2.7603 },
  { name: "Lorient", slug: "lorient", lat: 47.7482, lng: -3.3702 },
  { name: "Auray", slug: "auray", lat: 47.6698, lng: -2.9814 },
  { name: "Pontivy", slug: "pontivy", lat: 48.0667, lng: -2.9667 },
  { name: "Ploërmel", slug: "ploermel", lat: 47.9333, lng: -2.4 },
  { name: "Questembert", slug: "questembert", lat: 47.6667, lng: -2.45 },
  { name: "Grand-Champ", slug: "grand-champ", lat: 47.75, lng: -2.8333 },
  { name: "Sarzeau", slug: "sarzeau", lat: 47.5333, lng: -2.7667 },
  { name: "Baud", slug: "baud", lat: 47.8667, lng: -3.0167 },
  { name: "Locminé", slug: "locmine", lat: 47.8667, lng: -2.8333 },
  { name: "Muzillac", slug: "muzillac", lat: 47.5667, lng: -2.4833 },
  { name: "Malestroit", slug: "malestroit", lat: 47.8167, lng: -2.3833 },
];

export const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Prestations", href: "/prestations" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Zone d'intervention", href: "/zone-intervention" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];
