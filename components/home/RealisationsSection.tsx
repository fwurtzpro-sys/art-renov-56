import Link from "next/link";
import Image from "next/image";
import { realisations } from "@/data/realisations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function RealisationsSection() {
  const featured = realisations.slice(0, 3);

  return (
    <section className="bg-pierre-50 py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Réalisations"
            title="Des projets qui parlent pour nous"
            className="mb-0"
          />
          <Reveal delay={0.15}>
            <Button href="/realisations" variant="secondary">
              Toutes nos réalisations
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {featured.map((realisation, index) => (
            <Reveal key={realisation.slug} delay={index * 0.1}>
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
                    sizes="(min-width: 768px) 30vw, 90vw"
                  />
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-pierre-600">
                  {realisation.location} · {realisation.year}
                </p>
                <h3 className="mt-2 font-display text-xl text-anthracite">
                  {realisation.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
