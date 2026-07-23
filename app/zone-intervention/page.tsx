import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { zones } from "@/data/zones";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MapSection } from "@/components/sections/MapSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Zone d'intervention",
  description:
    "Art Renov 56 intervient dans tout le Morbihan : Vannes, Lorient, Auray, Pontivy et de nombreuses autres communes.",
  path: "/zone-intervention",
});

export default function ZoneInterventionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Zone d'intervention", url: "/zone-intervention" },
            ])
          ),
        }}
      />
      <PageHero
        eyebrow="Zone d'intervention"
        title="Nous intervenons partout dans le Morbihan"
        description={`Basés à ${company.city}, nous nous déplaçons dans l'ensemble du département pour étudier et réaliser vos projets de rénovation.`}
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Zone d'intervention", href: "/zone-intervention" },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <MapSection />

            <div>
              <Reveal>
                <h2 className="font-display text-2xl text-anthracite md:text-3xl">
                  Villes et secteurs desservis
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                  {zones.map((zone) => (
                    <li
                      key={zone.slug}
                      className="flex items-center gap-2 text-sm text-ardoise-700"
                    >
                      <MapPin
                        className="size-4 shrink-0 text-breton-600"
                        aria-hidden="true"
                      />
                      {zone.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-8 text-sm leading-relaxed text-ardoise-600">
                  Votre commune n&apos;apparaît pas dans cette liste ?
                  Contactez-nous : nous étudions chaque demande selon la
                  localisation de votre projet.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
