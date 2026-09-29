import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Accent } from "@/components/ui/SectionHeading";
import { href } from "@/config/routes";
import { getGalleryProjects, getPublishedProjects, projectCategories } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nos réalisations de rénovation intérieure",
  description:
    "Découvrez quelques projets réalisés par ART RÉNOV 56 : rénovation intérieure, salle de bain, cuisine, revêtements et finitions dans le Morbihan.",
  path: href("projects"),
  // Tant qu'aucune réalisation réelle n'est publiée, la page ne contient que des emplacements d'exemple.
  noindex: getPublishedProjects().length === 0,
});

export default function ProjectsPage() {
  const projects = getGalleryProjects();
  const onlyPlaceholders = projects.every((project) => project.isPlaceholder);

  return (
    <>
      <PageHero
        route="projects"
        eyebrow="Réalisations"
        title={
          <>
            Nos <Accent>réalisations</Accent>
          </>
        }
        intro="Découvrez quelques projets réalisés par ART RÉNOV 56."
        media="projectsHero"
      />

      <Section tone="light" labelledBy="galerie-titre">
        <h2 id="galerie-titre" className="sr-only">
          Galerie des réalisations
        </h2>
        {onlyPlaceholders ? (
          <p data-nosnippet className="mb-10 max-w-2xl border-l-2 border-or pl-5 text-[0.9375rem] leading-relaxed text-muted">
            Les emplacements ci-dessous sont des exemples de présentation. Les photographies de nos chantiers seront publiées
            ici au fur et à mesure.
          </p>
        ) : null}
        <ProjectGallery projects={projects} categories={projectCategories} />
      </Section>

      <CtaBand
        tone="dark"
        title={
          <>
            Votre projet, <Accent>notre prochaine réalisation</Accent>
          </>
        }
        text="Parlez-nous de votre projet : nous vous proposons un devis gratuit et sans engagement."
      />
    </>
  );
}
