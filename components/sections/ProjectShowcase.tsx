import type { ReactNode } from "react";
import { Section, type SectionTone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectGrid } from "@/components/sections/ProjectCard";
import { routes } from "@/config/routes";
import { getShowcaseProjects } from "@/data/projects";
import type { ProjectCategory } from "@/types";

interface ProjectShowcaseProps {
  tone?: SectionTone;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  category?: ProjectCategory;
  limit?: 3 | 4;
  ctaLabel?: string;
  id?: string;
  children?: ReactNode;
}

/**
 * Section « Réalisations » (accueil, pages métier).
 * Affiche les vraies réalisations de la catégorie, sinon des emplacements d'exemple
 * explicitement signalés comme tels.
 */
export function ProjectShowcase({
  tone = "light",
  eyebrow = "Nos réalisations",
  title,
  intro,
  category,
  limit = 4,
  ctaLabel = "Voir toutes nos réalisations",
  id = "realisations-titre",
  children,
}: ProjectShowcaseProps) {
  const projects = getShowcaseProjects({ category, limit });
  const onlyPlaceholders = projects.every((project) => project.isPlaceholder);
  const ctaHref = category ? `${routes.projects.path}?categorie=${category}` : routes.projects.path;

  return (
    <Section tone={tone} labelledBy={id}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} />
        <ButtonLink href={ctaHref} variant="outline" className="shrink-0 self-start lg:self-auto">
          {ctaLabel}
        </ButtonLink>
      </div>
      {onlyPlaceholders ? (
        <p data-nosnippet className="mt-10 flex items-center gap-3 text-[0.8125rem] text-muted">
          <span aria-hidden className="h-px w-6 bg-or" />
          Nos premières réalisations seront publiées ici prochainement.
        </p>
      ) : null}
      <ProjectGrid projects={projects} columns={limit} className="mt-12" />
      {children}
    </Section>
  );
}
