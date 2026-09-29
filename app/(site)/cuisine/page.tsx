import type { Metadata } from "next";
import { SplitHero } from "@/components/sections/SplitHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { href } from "@/config/routes";
import { quoteCta } from "@/config/navigation";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const service = getService("cuisine");
const path = href("kitchen");

export const metadata: Metadata = pageMetadata({ ...service.seo, path });

const pillars = [
  {
    icon: "ruler" as const,
    title: "Conception sur mesure",
    text: "Une implantation pensée pour votre pièce, sa lumière, ses contraintes et votre façon de cuisiner.",
  },
  {
    icon: "kitchen" as const,
    title: "Fonctionnalité & confort",
    text: "Circulation fluide, rangements accessibles, plans de travail à la bonne hauteur.",
  },
  {
    icon: "diamond" as const,
    title: "Qualité & durabilité",
    text: "Des matériaux et des finitions choisis pour résister à l’usage quotidien d’une cuisine.",
  },
  {
    icon: "conversation" as const,
    title: "Maîtrise de votre projet",
    text: "Un interlocuteur unique, un devis détaillé et un suivi clair de l’avancement.",
  },
];

const method = [
  { title: "Écoute & étude", text: "Relevé de votre cuisine, échange sur vos habitudes, vos envies et votre budget." },
  { title: "Conception", text: "Implantation, choix des matériaux et des finitions, devis détaillé." },
  { title: "Réalisation", text: "Préparation, aménagement et finitions, avec un chantier protégé et tenu propre." },
  { title: "Réception & suivi", text: "Vérification de chaque détail avec vous à la fin des travaux." },
];

/* Uniquement les savoir-faire correspondant aux prestations déclarées d'ART RÉNOV 56.
   Plomberie / électricité : à ajouter seulement après confirmation. */
const trades = [
  { icon: "ruler" as const, title: "Aménagement", text: "Agencement de l’espace, rangements et implantation sur mesure." },
  { icon: "layers" as const, title: "Revêtements", text: "Sols, crédences et revêtements muraux adaptés à une pièce d’eau." },
  { icon: "paintRoller" as const, title: "Peinture & finitions", text: "Préparation des supports et finitions soignées." },
  { icon: "wind" as const, title: "Ventilation", text: "Conseil sur le renouvellement de l’air dans votre logement." },
];

export default function KitchenPage() {
  return (
    <>
      <JsonLd data={serviceSchema(service, path)} />

      <SplitHero
        route="kitchen"
        eyebrow="Cuisine"
        title={
          <>
            Rénovation &amp; aménagement <Accent>de cuisine sur mesure.</Accent>
          </>
        }
        text="Une cuisine chaleureuse et fonctionnelle, conçue autour de vos habitudes et réalisée avec soin."
        media={service.image}
        projectParam={service.slug}
      />

      <Section tone="light" labelledBy="pensee-titre">
        <SectionHeading
          id="pensee-titre"
          align="center"
          eyebrow="Votre cuisine"
          title={
            <>
              Une cuisine <Accent>pensée pour vous</Accent>
            </>
          }
        />
        <FeatureGrid items={pillars} columns={4} className="mt-14 lg:mt-20" />
      </Section>

      <Section tone="dark" labelledBy="methode-titre">
        <SectionHeading id="methode-titre" eyebrow="Notre méthode" title="De l’idée à la cuisine terminée" />
        <ProcessSteps steps={method} className="mt-14 lg:mt-20" />
      </Section>

      <Section tone="light" labelledBy="ensemble-titre">
        <SectionHeading
          id="ensemble-titre"
          eyebrow="Un projet coordonné"
          title={
            <>
              Nous prenons en charge <Accent>l’ensemble</Accent> de votre projet
            </>
          }
          intro="Aménagement, revêtements, finitions : les différentes étapes de votre cuisine sont réalisées de façon cohérente."
        />
        <FeatureGrid items={trades} columns={4} className="mt-14 lg:mt-20" />
      </Section>

      <ProjectShowcase
        tone="dark"
        category={service.projectCategory}
        title={
          <>
            Nos cuisines <Accent>réalisées</Accent>
          </>
        }
        ctaLabel="Voir toutes nos réalisations"
      />

      <CtaBand
        tone="light"
        title={
          <>
            Un projet de <Accent>cuisine</Accent> ?
          </>
        }
        text="Décrivez-nous votre cuisine actuelle et vos envies : nous vous proposons un devis gratuit."
        cta={{ label: quoteCta.long, href: `${quoteCta.href}?projet=${service.slug}` }}
      />
    </>
  );
}
