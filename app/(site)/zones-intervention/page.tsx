import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { AreaMap } from "@/components/sections/AreaMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { href, routes } from "@/config/routes";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Zones d’intervention : Elven, Vannes, Morbihan",
  description:
    "ART RÉNOV 56 est basée à Elven et intervient pour vos travaux de rénovation intérieure à Vannes, Saint-Avé, Theix-Noyalo et dans le Morbihan. Devis gratuit.",
  path: href("areas"),
});

/* Communes citées à titre d'exemples de secteur ; liste exhaustive à confirmer par ART RÉNOV 56. */
const sectors = [
  { name: "Elven", text: "Siège de l’entreprise : nous étudions votre projet directement sur place." },
  { name: "Vannes", text: "Appartements de centre-ville, maisons des quartiers résidentiels : des rénovations très variées." },
  { name: "Saint-Avé", text: "Maisons individuelles à moderniser, à adapter ou à réaménager." },
  { name: "Theix-Noyalo", text: "Logements récents ou plus anciens, pour lesquels finitions et aménagements font la différence." },
];

const advice = [
  {
    title: "Des maisons de tous âges",
    text: "Longères, maisons des années 70 ou pavillons plus récents : chaque bâti a ses particularités. Une visite sur place permet d’adapter la solution à votre logement.",
  },
  {
    title: "Le climat breton",
    text: "Dans l’Ouest, l’humidité est une préoccupation courante. Bien choisir ses revêtements et penser au renouvellement de l’air fait partie de tout projet de rénovation intérieure.",
  },
  {
    title: "Rester chez vous pendant les travaux",
    text: "Nous organisons le chantier pour limiter la gêne au quotidien : protection des zones, propreté et planning discuté avec vous.",
  },
];

export default function AreasPage() {
  return (
    <>
      <PageHero
        route="areas"
        eyebrow="Zones d’intervention"
        title={
          <>
            Rénovation intérieure <Accent>dans le Morbihan</Accent>
          </>
        }
        intro="ART RÉNOV 56 est basée à Elven. Nous intervenons dans le Morbihan pour rénover et aménager les intérieurs de particuliers."
      />

      <Section tone="light" labelledBy="secteur-titre">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Stagger className="lg:col-span-6">
            <SectionHeading
              id="secteur-titre"
              eyebrow="Notre secteur"
              title={
                <>
                  Depuis Elven, <Accent>autour de chez vous</Accent>
                </>
              }
            />
            <StaggerItem className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-muted">
              <p>
                Installés à Elven, nous connaissons bien le secteur de Vannes et sa périphérie. Nous nous déplaçons pour
                découvrir votre logement, comprendre votre projet et vous proposer des solutions réalistes.
              </p>
              <p>
                Vous n’êtes pas certain que votre commune soit dans notre secteur ? Décrivez-nous votre projet : nous vous
                confirmons rapidement si nous pouvons intervenir.
              </p>
            </StaggerItem>
          </Stagger>
          <Reveal className="border border-line lg:col-span-6" delay={0.1}>
            <AreaMap />
          </Reveal>
        </div>
      </Section>

      <Section tone="dark" labelledBy="communes-titre">
        <SectionHeading
          id="communes-titre"
          eyebrow="Communes"
          title={
            <>
              Elven, Vannes, Saint-Avé, Theix-Noyalo <Accent>et alentours</Accent>
            </>
          }
          intro="Quelques communes du secteur, ainsi que les communes environnantes."
        />
        <Stagger as="ul" className="mt-14 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {sectors.map((sector) => (
            <li key={sector.name} className="bg-marine">
              <StaggerItem className="px-6 py-10 sm:px-8">
                <Icon name="mapPin" className="h-6 w-6 text-or" />
                <h3 className="mt-6 font-serif text-display-sm font-medium">{sector.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{sector.text}</p>
              </StaggerItem>
            </li>
          ))}
        </Stagger>
      </Section>

      <Section tone="light" labelledBy="conseils-titre">
        <SectionHeading
          id="conseils-titre"
          eyebrow="Bon à savoir"
          title={
            <>
              Rénover un intérieur <Accent>en Bretagne</Accent>
            </>
          }
        />
        <Stagger as="ul" className="mt-14 grid gap-10 md:grid-cols-3 lg:mt-20">
          {advice.map((item) => (
            <StaggerItem as="li" key={item.title} className="border-t border-or pt-6">
              <h3 className="font-serif text-display-sm font-medium">{item.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-20 border border-line bg-ivoire-50 p-8 sm:p-10">
          <h3 className="font-serif text-display-sm font-medium">Ce que nous réalisons dans votre commune</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={routes[service.routeKey].path}
                  className="group flex min-h-[44px] items-center justify-between gap-4 border-b border-line py-2 text-[0.9375rem] transition-colors hover:text-or-fonce"
                >
                  {service.name}
                  <Icon name="arrowRight" className="h-4 w-4 text-or transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CtaBand
        tone="dark"
        title={
          <>
            Un projet <Accent>près de chez vous</Accent> ?
          </>
        }
        text="Indiquez-nous votre commune et décrivez votre projet : nous revenons vers vous."
      />
    </>
  );
}
