import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Demande de devis gratuit",
  description:
    "Demandez votre devis gratuit et sans engagement pour vos travaux de rénovation avec Art Renov 56, dans le Morbihan.",
  path: "/devis",
});

const benefits = [
  "Devis gratuit et sans engagement",
  "Réponse sous 48h ouvrées",
  "Visite sur place pour les projets complexes",
  "Un interlocuteur unique pour tout votre chantier",
];

export default function DevisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Demande de devis", url: "/devis" },
            ])
          ),
        }}
      />
      <PageHero
        eyebrow="Devis gratuit"
        title="Demandez votre devis en quelques minutes"
        description="Décrivez-nous votre projet : nous revenons vers vous rapidement pour convenir des prochaines étapes."
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Demande de devis", href: "/devis" },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <Reveal>
                <h2 className="font-display text-2xl text-anthracite md:text-3xl">
                  Ce que vous obtenez
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <ul className="mt-8 space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-breton-600"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-ardoise-700 md:text-base">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <QuoteForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
