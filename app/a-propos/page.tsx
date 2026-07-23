import type { Metadata } from "next";
import Image from "next/image";
import { HardHat, Leaf, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "À propos d'Art Renov 56",
  description:
    "Découvrez Art Renov 56, entreprise artisanale de rénovation intérieure et extérieure implantée dans le Morbihan.",
  path: "/a-propos",
});

const values = [
  {
    icon: HardHat,
    title: "Exigence artisanale",
    description:
      "Chaque geste compte. Nous appliquons les mêmes standards de qualité sur chaque chantier, quelle que soit son ampleur.",
  },
  {
    icon: HeartHandshake,
    title: "Transparence",
    description:
      "Devis détaillés, communication claire et suivi régulier : vous savez toujours où en est votre chantier.",
  },
  {
    icon: Leaf,
    title: "Responsabilité",
    description:
      "Nous privilégions des matériaux durables et des solutions respectueuses de l'environnement bâti.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "À propos", url: "/a-propos" },
            ])
          ),
        }}
      />
      <PageHero
        eyebrow="À propos"
        title="Une entreprise artisanale au service de vos projets"
        description="Art Renov 56 accompagne particuliers et professionnels du Morbihan dans leurs travaux de rénovation, avec l'ambition de conjuguer savoir-faire artisanal et exigence architecturale."
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "À propos", href: "/a-propos" },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-lg shadow-sm">
                <Image
                  src="/images/about/atelier.svg"
                  alt="Équipe Art Renov 56 sur un chantier"
                  fill
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <h2 className="font-display text-2xl text-anthracite md:text-3xl">
                  Notre histoire
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-5 text-base leading-relaxed text-ardoise-700 md:text-lg">
                  Art Renov 56 est née de la volonté de proposer, dans le
                  Morbihan, une rénovation pensée dans sa globalité : non pas
                  une succession d&apos;interventions isolées, mais un projet
                  cohérent, piloté par une équipe qui connaît chaque étape du
                  chantier.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-base leading-relaxed text-ardoise-700 md:text-lg">
                  Aujourd&apos;hui, nous intervenons aussi bien auprès de
                  particuliers pour la rénovation de leur logement que de
                  professionnels pour l&apos;aménagement de leurs locaux,
                  toujours avec la même rigueur et le même souci du détail.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-pierre-50 py-20 md:py-28">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl text-anthracite md:text-3xl">
              Nos valeurs
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <div className="group">
                  <div className="flex size-14 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-500 ease-premium group-hover:-translate-y-1 group-hover:shadow-md">
                    <value.icon
                      className="size-6 text-ardoise-800"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-lg text-anthracite">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ardoise-600">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
