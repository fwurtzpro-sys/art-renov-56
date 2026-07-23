import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function ServicesSection() {
  return (
    <section className="bg-ardoise-950 py-24 text-creme md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Nos prestations"
          title="Une équipe, tous les savoir-faire de la rénovation"
          description="De la rénovation complète aux finitions les plus précises, nous couvrons l'ensemble des métiers nécessaires à votre projet."
          light
        />

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-ardoise-800 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={(index % 4) * 0.06}>
              <Link
                href={`/prestations/${service.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden bg-ardoise-950 p-8 transition-colors duration-500 ease-premium hover:bg-ardoise-900"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-20">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative">
                  <Icon
                    name={service.icon}
                    className="size-8 text-breton-400 transition-transform duration-500 ease-premium group-hover:scale-110 group-hover:text-breton-300"
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-display text-xl text-creme">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ardoise-300">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-2 text-sm font-medium text-breton-400">
                  Découvrir
                  <ArrowRight className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" delay={services.length * 0.06}>
            <Link
              href="/prestations"
              className="group flex h-full flex-col justify-between bg-breton-900 p-8 transition-colors duration-500 ease-premium hover:bg-breton-800"
            >
              <div>
                <ArrowUpRight
                  className="size-8 text-breton-300 transition-transform duration-500 ease-premium group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-display text-xl text-creme">
                  Toutes nos prestations
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-breton-100">
                  Découvrez le détail de chaque savoir-faire Art Renov 56.
                </p>
              </div>
            </Link>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
