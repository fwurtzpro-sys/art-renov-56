import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { realisations } from "@/data/realisations";
import { getServiceBySlug } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Nos réalisations",
  description:
    "Découvrez les chantiers de rénovation réalisés par Art Renov 56 dans le Morbihan : maisons, appartements, façades et salles de bain.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Réalisations", url: "/realisations" },
            ])
          ),
        }}
      />
      <PageHero
        eyebrow="Réalisations"
        title="Des chantiers menés avec exigence, partout dans le Morbihan"
        description="Chaque réalisation témoigne de notre attention au détail et de notre capacité à nous adapter à chaque bâti et à chaque projet de vie."
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Réalisations", href: "/realisations" },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {realisations.map((realisation, index) => {
              const service = getServiceBySlug(realisation.serviceSlug);
              return (
                <Reveal key={realisation.slug} delay={(index % 3) * 0.08}>
                  <Link
                    href={`/realisations/${realisation.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                      <Image
                        src={realisation.cover}
                        alt={realisation.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                        sizes="(min-width: 1024px) 30vw, 90vw"
                      />
                    </div>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-pierre-600">
                      {realisation.location} · {realisation.year}
                      {service ? ` · ${service.title}` : ""}
                    </p>
                    <h2 className="mt-2 font-display text-xl text-anthracite">
                      {realisation.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ardoise-600">
                      {realisation.summary}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
