import { MapPin } from "lucide-react";
import { zones } from "@/data/zones";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ZoneSection() {
  return (
    <section className="bg-anthracite py-24 text-creme md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading
            eyebrow="Zone d'intervention"
            title="Nous intervenons dans tout le Morbihan"
            description="Basés au cœur du département, nous nous déplaçons chez vous pour étudier et réaliser votre projet, où que vous soyez dans le Morbihan."
            light
            className="mb-0"
          />

          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              {zones.map((zone) => (
                <li
                  key={zone.slug}
                  className="flex items-center gap-2 text-sm text-ardoise-200"
                >
                  <MapPin
                    className="size-4 shrink-0 text-pierre-400"
                    aria-hidden="true"
                  />
                  {zone.name}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/zone-intervention" variant="ghost">
                Voir la carte d&apos;intervention
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
