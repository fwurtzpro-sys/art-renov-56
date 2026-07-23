import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Nos prestations de rénovation",
  description:
    "Découvrez l'ensemble des prestations d'Art Renov 56 : rénovation intérieure et extérieure, peinture, revêtements de sols et muraux, aménagement intérieur.",
  path: "/prestations",
});

export default function PrestationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", url: "/" },
              { name: "Prestations", url: "/prestations" },
            ])
          ),
        }}
      />
      <PageHero
        eyebrow="Nos prestations"
        title="Tous les savoir-faire de la rénovation, sous un même toit"
        description="Rénovation intérieure et extérieure, peinture, revêtements de sols et muraux, aménagement intérieur : nous couvrons l'ensemble des métiers nécessaires à la réussite de votre projet."
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Prestations", href: "/prestations" },
        ]}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 3) * 0.08}>
                <Link
                  href={`/prestations/${service.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-ardoise-100 bg-white shadow-sm transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-ardoise-200 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                      sizes="(min-width: 1024px) 30vw, 90vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex size-12 items-center justify-center rounded-full bg-ardoise-100 transition-colors duration-500 ease-premium group-hover:bg-breton-100">
                      <Icon
                        name={service.icon}
                        className="size-5 text-ardoise-800 transition-colors duration-500 ease-premium group-hover:text-breton-700"
                        aria-hidden="true"
                      />
                    </div>
                    <h2 className="mt-5 font-display text-xl text-anthracite">
                      {service.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ardoise-600">
                      {service.shortDescription}
                    </p>
                    <span className="mt-6 flex items-center gap-2 text-sm font-medium text-ardoise-900">
                      En savoir plus
                      <ArrowRight className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
