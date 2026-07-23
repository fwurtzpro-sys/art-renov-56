import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { slideFromRight } from "@/animations/variants";

const stats = [
  { value: "10+", label: "années d'expérience artisanale" },
  { value: "150+", label: "chantiers livrés dans le Morbihan" },
  { value: "1", label: "interlocuteur unique par projet" },
];

export function Presentation() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-sm transition-shadow duration-500 ease-premium hover:shadow-lg">
              <Image
                src="/images/about/atelier.svg"
                alt="Atelier Art Renov 56"
                fill
                className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Notre maison"
              title="Le savoir-faire artisanal, la rigueur d'un bureau d'études"
              description="Depuis nos ateliers du Morbihan, nous accompagnons particuliers et professionnels dans leurs projets de rénovation. Chaque chantier est conduit avec la même exigence : un travail soigné, des délais tenus, un interlocuteur qui connaît votre projet du premier au dernier jour."
            />

            <Reveal variants={slideFromRight} delay={0.15}>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ardoise-100 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-3xl text-ardoise-900 md:text-4xl">
                      {stat.value}
                    </dd>
                    <p className="mt-2 text-xs leading-snug text-ardoise-600">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
