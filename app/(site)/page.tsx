import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/HomeHero";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { href } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ART RÉNOV 56 – Rénovation et aménagement intérieur à Elven",
  absoluteTitle: true,
  description:
    "ART RÉNOV 56, entreprise de rénovation intérieure et d’aménagement à Elven : salle de bain & PMR, cuisine, VMI, revêtements et finitions dans le Morbihan.",
  path: "/",
});

const strengths = [
  { title: "Proximité", text: "Une entreprise locale, basée à Elven, qui intervient dans le Morbihan." },
  { title: "Accompagnement", text: "Un interlocuteur unique, de l’étude de votre projet à la fin du chantier." },
  { title: "Travail soigné", text: "Préparation, exécution et finitions réalisées avec exigence." },
  { title: "Sur mesure", text: "Chaque projet est pensé pour votre logement et votre façon de vivre." },
];

const commitments = [
  {
    icon: "conversation" as const,
    title: "Écoute & conseil",
    text: "Nous prenons le temps de comprendre vos besoins, vos contraintes et vos envies avant de proposer une solution.",
  },
  {
    icon: "ruler" as const,
    title: "Sur-mesure",
    text: "Chaque intérieur est différent : les solutions sont adaptées à votre logement, à vos usages et à votre budget.",
  },
  {
    icon: "diamond" as const,
    title: "Qualité & soin",
    text: "Préparation des supports, propreté du chantier, finitions : nous attachons de l’importance à chaque détail.",
  },
  {
    icon: "clock" as const,
    title: "Respect des délais",
    text: "Un planning clair, établi avec vous avant le démarrage, et un suivi régulier de l’avancement des travaux.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Introduction */}
      <Section tone="light" labelledBy="intro-titre">
        <EditorialSplit media="homeIntro">
          <SectionHeading
            id="intro-titre"
            eyebrow="L’entreprise"
            title={
              <>
                Un artisan de proximité pour <Accent>votre intérieur</Accent>
              </>
            }
          />
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-muted">
            <p>
              ART RÉNOV 56 est une entreprise de rénovation intérieure et d’aménagement installée à Elven. Nous accompagnons
              les particuliers qui souhaitent moderniser, adapter ou embellir leur logement dans le Morbihan.
            </p>
            <p>
              Salle de bain, cuisine, sols, murs, ventilation : chaque projet commence par une écoute attentive et se termine
              par des finitions soignées.
            </p>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {strengths.map((item) => (
              <li key={item.title} className="border-t border-line pt-5">
                <h3 className="flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.16em]">
                  <Icon name="check" className="h-4 w-4 text-or" />
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
          <ArrowLink href={href("about")} className="mt-10">
            En savoir plus sur ART RÉNOV 56
          </ArrowLink>
        </EditorialSplit>
      </Section>

      {/* Prestations */}
      <Section tone="dark" labelledBy="prestations-titre">
        <SectionHeading
          id="prestations-titre"
          align="center"
          eyebrow="Ce que nous réalisons"
          title="Nos prestations"
          intro="Cinq savoir-faire complémentaires pour rénover et aménager votre intérieur."
        />
        <div className="mt-14 lg:mt-20">
          <ServiceCards />
        </div>
        <div className="mt-12 flex justify-center">
          <ArrowLink href={href("services")}>Toutes nos prestations</ArrowLink>
        </div>
      </Section>

      {/* Pourquoi nous choisir */}
      <Section tone="light" labelledBy="engagements-titre">
        <SectionHeading
          id="engagements-titre"
          align="center"
          eyebrow="Pourquoi nous choisir"
          title={
            <>
              Nos <Accent>engagements</Accent>
            </>
          }
        />
        <FeatureGrid items={commitments} columns={4} className="mt-14 lg:mt-20" />
      </Section>

      {/* Réalisations */}
      <ProjectShowcase
        tone="light-alt"
        title={
          <>
            Des intérieurs <Accent>transformés</Accent>
          </>
        }
        intro="Un aperçu des projets de rénovation et d’aménagement réalisés par ART RÉNOV 56."
        limit={4}
      />

      <CtaBand
        tone="dark"
        title={
          <>
            Un projet de <Accent>rénovation</Accent> ?
          </>
        }
        text="Parlez-nous de votre projet : nous vous proposons un devis gratuit et sans engagement."
      />
    </>
  );
}
