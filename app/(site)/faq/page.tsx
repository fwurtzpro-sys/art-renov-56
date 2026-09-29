import type { Metadata } from "next";
import { HeroItem } from "@/components/motion/Hero";
import { heroDelay } from "@/lib/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Accent } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { href } from "@/config/routes";
import { faqCategories, getFaqByCategory, getValidatedFaq } from "@/data/faq";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ – Vos questions sur la rénovation intérieure",
  description:
    "Projet, devis, travaux, délais, intervention : retrouvez les réponses aux questions fréquentes sur les prestations d’ART RÉNOV 56 dans le Morbihan.",
  path: href("faq"),
});

/**
 * Pas de bannière photographique : la page démarre directement sous le header (fond ivoire).
 */
export default function FaqPage() {
  const validated = getValidatedFaq();
  const categories = faqCategories.filter((category) => getFaqByCategory(category.id).length > 0);

  return (
    <>
      {validated.length > 0 ? <JsonLd data={faqSchema(validated)} /> : null}

      <div className="tone-light bg-ivoire text-encre">
        <Container className="pb-section pt-10">
          <Breadcrumb route="faq" />

          <header className="mt-14 max-w-3xl lg:mt-20">
            <HeroItem as="p" delay={heroDelay.eyebrow} className="eyebrow">
              FAQ
            </HeroItem>
            <HeroItem as="h1" id="page-titre" delay={heroDelay.title[0]} className="mt-6 font-serif text-display-xl font-medium lg:text-display-page">
              Vos questions, <Accent>nos réponses.</Accent>
            </HeroItem>
            <HeroItem as="p" delay={heroDelay.text} className="mt-7 max-w-2xl text-lead text-muted">
              Projet, devis, travaux, délais, intervention : voici les questions que l’on nous pose le plus souvent. Une autre
              question ? Écrivez-nous, nous vous répondrons.
            </HeroItem>
          </header>

          {categories.length > 1 ? (
            <nav aria-label="Catégories de questions" className="mt-12 flex flex-wrap gap-3">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="inline-flex min-h-[44px] items-center border border-line px-5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:border-or hover:text-or-fonce"
                >
                  {category.label}
                </a>
              ))}
            </nav>
          ) : null}

          <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-20">
            {categories.map((category) => (
              <section key={category.id} id={category.id} aria-labelledby={`${category.id}-titre`} className="grid gap-8 lg:grid-cols-12">
                <h2 id={`${category.id}-titre`} className="font-serif text-display-md font-medium lg:col-span-3">
                  {category.label}
                </h2>
                <div className="lg:col-span-9">
                  <FaqAccordion items={getFaqByCategory(category.id)} />
                </div>
              </section>
            ))}
          </div>
        </Container>
      </div>

      <CtaBand
        tone="dark"
        title={
          <>
            Vous ne trouvez pas <Accent>votre réponse</Accent> ?
          </>
        }
        text="Posez-nous votre question ou décrivez votre projet : nous vous répondons."
        cta={{ label: "Nous contacter", href: href("contact") }}
      />
    </>
  );
}
