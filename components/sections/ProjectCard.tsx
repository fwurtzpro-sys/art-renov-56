import Link from "next/link";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/config/routes";
import { getCategoryLabel } from "@/data/projects";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  ratioClass?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
}

/**
 * Carte réalisation.
 * Projet d'exemple : libellé « Projet exemple », aucune commune, aucun lien,
 * exclu des extraits de recherche (data-nosnippet).
 */
export function ProjectCard({
  project,
  ratioClass = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const category = getCategoryLabel(project.category);

  if (project.isPlaceholder) {
    return (
      <article data-nosnippet className="flex h-full flex-col">
        <div className="relative">
          <Photo media={project.cover} sizes={sizes} frameClassName={ratioClass} />
          <span className="absolute left-4 top-4 bg-marine/80 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-or">
            Projet exemple
          </span>
        </div>
        <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">{category}</p>
        <Heading className="mt-2 font-serif text-[1.375rem] leading-snug text-fg/70">{project.title}</Heading>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col transition-transform duration-500 ease-premium hover:-translate-y-1 motion-reduce:transform-none">
      <Photo media={project.cover} sizes={sizes} frameClassName={ratioClass} hoverZoom />
      <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-accent">
        {category}
        {project.city ? <span className="text-muted"> — {project.city}</span> : null}
      </p>
      <Heading className="mt-2 font-serif text-[1.375rem] leading-snug text-fg">
        <Link
          href={`${routes.projects.path}/${project.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {project.title}
        </Link>
      </Heading>
      <Icon
        name="arrowUpRight"
        className="absolute right-4 top-4 h-9 w-9 bg-marine/70 p-2 text-or opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
      />
    </article>
  );
}

/** Grille de cartes réalisations. */
export function ProjectGrid({
  projects,
  columns = 4,
  className,
}: {
  projects: ReadonlyArray<Project>;
  columns?: 3 | 4;
  className?: string;
}) {
  return (
    <Stagger as="ul" className={cn("grid gap-x-6 gap-y-12 sm:grid-cols-2", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3", className)}>
      {projects.map((project) => (
        <StaggerItem as="li" key={project.slug}>
          <ProjectCard
            project={project}
            sizes={columns === 4 ? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
