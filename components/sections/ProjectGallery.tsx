"use client";

import { cn } from "@/lib/utils";
import { useQueryParam } from "@/lib/useQueryParam";
import { ProjectCard } from "@/components/sections/ProjectCard";
import type { Project, ProjectCategory } from "@/types";

interface ProjectGalleryProps {
  projects: ReadonlyArray<Project>;
  categories: ReadonlyArray<{ id: ProjectCategory; label: string }>;
}

/**
 * Galerie filtrable des réalisations.
 * Tous les projets sont présents dans le HTML initial ; le filtre ne fait que masquer.
 * Le filtre actif est reflété dans l'URL (?categorie=…) pour le partage et le maillage interne.
 */
export function ProjectGallery({ projects, categories }: ProjectGalleryProps) {
  const [param, setParam] = useQueryParam("categorie");
  const active = categories.some((category) => category.id === param) ? (param as ProjectCategory) : null;
  const visible = active ? projects.filter((project) => project.category === active) : projects;
  const filters: Array<{ id: ProjectCategory | null; label: string }> = [{ id: null, label: "Tous" }, ...categories];

  return (
    <div>
      <div role="group" aria-label="Filtrer les réalisations par catégorie" className="flex flex-wrap gap-2 sm:gap-3">
        {filters.map((filter) => {
          const selected = filter.id === active;
          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setParam(filter.id)}
              className={cn(
                "min-h-[44px] border px-4 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] transition-colors sm:px-5",
                selected ? "border-marine bg-marine text-ivoire" : "border-line text-encre/80 hover:border-or hover:text-encre",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-[0.8125rem] text-muted">
        {visible.length} {visible.length > 1 ? "projets affichés" : "projet affiché"}
      </p>

      <ul className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug} hidden={active !== null && project.category !== active}>
            <ProjectCard project={project} headingLevel="h2" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          </li>
        ))}
      </ul>
    </div>
  );
}
