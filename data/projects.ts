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

/* ------------------------------------------------------------------ */
/* Projets d'exemple (placeholders)                                     */
/* ------------------------------------------------------------------ */

/**
 * Tant qu'aucune réalisation réelle n'est publiée, les sections « Réalisations »
 * affichent des emplacements d'exemple. Ils sont :
 * - clairement libellés « Projet exemple » à l'écran ;
 * - sans commune, sans description, sans fiche détaillée ;
 * - exclus du sitemap et de toute donnée structurée.
 */
function demoProject(category: ProjectCategory, index: number): Project {
  return {
    slug: `exemple-${category}-${index + 1}`,
    title: "Réalisation à venir",
    category,
    description: "",
    cover: "projectPlaceholder",
    isPlaceholder: true,
  };
}

/**
 * Projets à afficher dans une section « Réalisations ».
 * Réalisations réelles en priorité ; à défaut, emplacements d'exemple.
 */
export function getShowcaseProjects(options: { category?: ProjectCategory; limit: number }): ReadonlyArray<Project> {
  const { category, limit } = options;
  const real = getPublishedProjects().filter((project) => !category || project.category === category);
  if (real.length > 0) return real.slice(0, limit);

  const categories = category ? [category] : projectCategories.map((item) => item.id);
  return Array.from({ length: limit }, (_, index) =>
    demoProject(categories[index % categories.length] as ProjectCategory, Math.floor(index / categories.length)),
  );
}

/** Tous les projets de la galerie : réels, ou 2 exemples par catégorie. */
export function getGalleryProjects(): ReadonlyArray<Project> {
  const real = getPublishedProjects();
  if (real.length > 0) return real;
  return projectCategories.flatMap((item) => [demoProject(item.id, 0), demoProject(item.id, 1)]);
}

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
