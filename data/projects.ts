import type { Project, ProjectCategory } from "@/types";

/** Catégories et libellés des filtres de la page Réalisations. */
export const projectCategories: ReadonlyArray<{ id: ProjectCategory; label: string }> = [
  { id: "renovation-interieure", label: "Rénovation intérieure" },
  { id: "salle-de-bain", label: "Salle de bain" },
  { id: "cuisine", label: "Cuisine" },
  { id: "revetements-finitions", label: "Revêtements & finitions" },
  { id: "vmi", label: "VMI" },
];

/**
 * Réalisations.
 *
 * AUCUN chantier fictif ne doit être présenté comme réel.
 * - Projets réels : `isPlaceholder: false`, commune uniquement avec accord du client.
 * - Illustrations temporaires : `isPlaceholder: true` (affichées « Projet exemple »,
 *   sans commune, sans fiche détaillée, exclues du sitemap).
 *
 * Exemple d'entrée réelle :
 * {
 *   slug: "salle-de-bain-elven",
 *   title: "Rénovation d'une salle de bain",
 *   category: "salle-de-bain",
 *   city: "Elven",
 *   description: "…",
 *   cover: "projectSdbElvenCover",
 *   gallery: ["projectSdbElven1", "projectSdbElven2"],
 *   beforeAfter: { before: "projectSdbElvenAvant", after: "projectSdbElvenApres" },
 *   isPlaceholder: false,
 * }
 */
export const projects: ReadonlyArray<Project> = [];

export function getProjectsByCategory(category?: ProjectCategory): ReadonlyArray<Project> {
  return category ? projects.filter((project) => project.category === category) : projects;
}

/** Projets réels disposant d'une fiche détaillée indexable. */
export function getPublishedProjects(): ReadonlyArray<Project> {
  return projects.filter((project) => !project.isPlaceholder);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug && !project.isPlaceholder);
}

export function getCategoryLabel(category: ProjectCategory): string {
  return projectCategories.find((item) => item.id === category)?.label ?? category;
}
