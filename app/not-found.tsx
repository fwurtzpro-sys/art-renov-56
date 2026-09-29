import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

/**
 * 404 — version provisoire (fondations).
 * La composition complète (raccourcis, visuel) sera réalisée à l'étape 16.
 * Ce fichier recompose header + footer car il est rendu hors du groupe (site).
 */
export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteShell>
      <Section tone="light" labelledBy="erreur-titre" className="min-h-[60vh]">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-serif text-[clamp(5rem,4rem+6vw,9rem)] leading-none text-or-fonce">404</p>
          <h1 id="erreur-titre" className="mt-6 font-serif text-display-md">
            Oups ! Page introuvable
          </h1>
          <p className="mt-5 text-lead text-muted">La page que vous recherchez n&apos;existe plus ou a été déplacée.</p>
          <ButtonLink href="/" variant="dark" size="lg" className="mt-10">
            Retour à l&apos;accueil
          </ButtonLink>
        </div>
      </Section>
    </SiteShell>
  );
}
