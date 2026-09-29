import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { PendingValue } from "@/components/ui/PendingValue";
import { href } from "@/config/routes";
import { isProvided, siteConfig } from "@/config/site";
import type { RouteKey } from "@/types";

export interface LegalSectionDef {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  route: RouteKey;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  sections: ReadonlyArray<LegalSectionDef>;
  children: ReactNode;
}

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Gabarit des pages légales : fond ivoire, sommaire latéral collant, lecture confortable. */
export function LegalLayout({ route, eyebrow = "Informations légales", title, intro, sections, children }: LegalLayoutProps) {
  const { lastUpdated } = siteConfig.legal;
  return (
    <div className="tone-light bg-ivoire text-encre">
      <Container className="pb-section pt-10">
        <Breadcrumb route={route} />
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav aria-labelledby="sommaire-titre" className="border border-line bg-ivoire-50 p-7">
              <p id="sommaire-titre" className="eyebrow">
                Sommaire
              </p>
              <ol className="mt-6 space-y-1">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-[40px] items-baseline gap-3 py-1.5 text-[0.9375rem] text-encre/80 transition-colors hover:text-or-fonce"
                    >
                      <span className="font-serif text-[1.05rem] text-or-fonce">{index + 1}.</span>
                      <span className="link-underline">{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="tone-dark mt-6 hidden bg-marine p-7 text-ivoire lg:block">
              <QuestionCard />
            </div>
          </aside>

          <article>
            <p className="eyebrow">{eyebrow}</p>
            <h1 id="page-titre" className="mt-5 font-serif text-display-lg font-medium">
              {title}
            </h1>
            <p className="mt-5 text-[0.875rem] text-muted">
              Dernière mise à jour :{" "}
              {isProvided(lastUpdated) ? <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time> : <PendingValue />}
            </p>
            {intro ? <div className="mt-8 max-w-prose text-lead text-muted">{intro}</div> : null}
            <div className="mt-12 max-w-3xl space-y-14">{children}</div>
            <div className="tone-dark mt-16 bg-marine p-7 text-ivoire lg:hidden">
              <QuestionCard />
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
}

function QuestionCard() {
  return (
    <>
      <p className="font-serif text-[1.6rem] leading-tight">Une question ?</p>
      <p className="mt-3 text-[0.9375rem] text-muted">Nous vous répondons au sujet de ces informations.</p>
      <ButtonLink href={href("contact")} variant="gold" size="sm" className="mt-6">
        Nous contacter
      </ButtonLink>
    </>
  );
}

/** Section numérotée d'une page légale. */
export function LegalSection({ id, index, title, children }: { id: string; index: number; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titre`} className="border-t border-line pt-10">
      <h2 id={`${id}-titre`} className="flex items-baseline gap-4 font-serif text-display-sm font-medium">
        <span className="text-or-fonce">{index}.</span>
        {title}
      </h2>
      <div className="legal-prose mt-6 space-y-4 text-[1rem] leading-[1.8] text-encre/85">{children}</div>
    </section>
  );
}

/** Ligne « libellé : valeur » (valeur manquante → « À renseigner »). */
export function LegalField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line/70 py-3 sm:flex-row sm:gap-6">
      <dt className="min-w-[13rem] text-[0.875rem] font-semibold text-encre">{label}</dt>
      <dd className="text-encre/85">{isProvided(value) ? value : <PendingValue />}</dd>
    </div>
  );
}
