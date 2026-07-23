import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { services, getServiceBySlug } from "@/data/services";
import { getRealisationsByService } from "@/data/realisations";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/prestations/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedRealisations = getRealisationsByService(service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Prestations", url: "/prestations" },
              { name: service.title, url: `/prestations/${service.slug}` },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow="Prestation"
        title={service.title}
        description={service.shortDescription}
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Prestations", href: "/prestations" },
          { label: service.title, href: `/prestations/${service.slug}` },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                />
              </div>
            </Reveal>

            <div>
              {service.description.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <p className="mb-5 text-base leading-relaxed text-ardoise-700 md:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={0.15}>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 size-5 shrink-0 text-breton-600"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-ardoise-800 md:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10">
                  <Button href="/devis">Demander un devis</Button>
                </div>
              </Reveal>
            </div>
          </div>

          {relatedRealisations.length > 0 && (
            <div className="mt-24 border-t border-ardoise-100 pt-16">
              <Reveal>
                <h2 className="font-display text-2xl text-anthracite md:text-3xl">
                  Réalisations liées
                </h2>
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedRealisations.map((realisation, index) => (
                  <Reveal key={realisation.slug} delay={index * 0.08}>
                    <Link
                      href={`/realisations/${realisation.slug}`}
                      className="group block transition-transform duration-500 ease-premium hover:-translate-y-1.5"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-sm transition-shadow duration-500 ease-premium group-hover:shadow-xl">
                        <Image
                          src={realisation.cover}
                          alt={realisation.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                          sizes="(min-width: 1024px) 30vw, 90vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-marine/60 via-marine/0 to-marine/0 opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100" />
                      </div>
                      <h3 className="mt-4 font-display text-lg text-anthracite">
                        {realisation.title}
                      </h3>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
