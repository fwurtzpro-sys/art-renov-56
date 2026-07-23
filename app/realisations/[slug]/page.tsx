import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  realisations,
  getRealisationBySlug,
} from "@/data/realisations";
import { getServiceBySlug } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, realisationJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return realisations.map((realisation) => ({ slug: realisation.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const realisation = getRealisationBySlug(slug);
  if (!realisation) return {};

  return buildMetadata({
    title: realisation.title,
    description: realisation.summary,
    path: `/realisations/${realisation.slug}`,
  });
}

export default async function RealisationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const realisation = getRealisationBySlug(slug);
  if (!realisation) notFound();

  const service = getServiceBySlug(realisation.serviceSlug);

  const sections = [
    { title: "Le défi", content: realisation.challenge },
    { title: "Notre solution", content: realisation.solution },
    { title: "Le résultat", content: realisation.result },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realisationJsonLd(realisation)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Réalisations", url: "/realisations" },
              {
                name: realisation.title,
                url: `/realisations/${realisation.slug}`,
              },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow={`${realisation.location} · ${realisation.year}`}
        title={realisation.title}
        description={realisation.summary}
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Réalisations", href: "/realisations" },
          { label: realisation.title, href: `/realisations/${realisation.slug}` },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
              <Image
                src={realisation.cover}
                alt={realisation.title}
                fill
                priority
                className="object-cover"
                sizes="90vw"
              />
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.08}>
                <h2 className="font-display text-xl text-anthracite">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ardoise-700 md:text-base">
                  {section.content}
                </p>
              </Reveal>
            ))}
          </div>

          {service && (
            <Reveal delay={0.2}>
              <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-ardoise-100 pt-10">
                <p className="text-sm text-ardoise-600">
                  Prestation associée :{" "}
                  <span className="font-medium text-anthracite">
                    {service.title}
                  </span>
                </p>
                <Button href={`/prestations/${service.slug}`} variant="secondary">
                  Découvrir cette prestation
                </Button>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
