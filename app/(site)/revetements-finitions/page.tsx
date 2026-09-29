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

const service = getService("revetements-finitions");
const path = href("finishes");

export const metadata: Metadata = pageMetadata({ ...service.seo, path });

const commitments = [
  {
    icon: "conversation" as const,
    title: "Choix & conseil",
    text: "Nous vous aidons à choisir les revêtements adaptés à chaque pièce, à son usage et à votre style.",
  },
  {
    icon: "diamond" as const,
    title: "Matériaux de qualité",
    text: "Des matériaux sélectionnés pour leur tenue dans le temps et leur rendu.",
  },
  {
    icon: "sparkle" as const,
    title: "Finitions soignées",
    text: "Coupes, jonctions, angles et raccords : les détails font la qualité d’une finition.",
  },
  {
    icon: "shield" as const,
    title: "Résultat durable",
    text: "Une préparation rigoureuse des supports pour un résultat qui dure.",
  },
];

/* Les matériaux précis seront listés une fois confirmés par ART RÉNOV 56. */
const finishes = [
  { icon: "layers" as const, title: "Revêtements de sols", text: "Pose de revêtements de sol adaptés à chaque pièce et à son usage." },
  { icon: "home" as const, title: "Revêtements muraux", text: "Habillage des murs pour apporter matière, protection et caractère." },
  { icon: "paintRoller" as const, title: "Peintures", text: "Préparation des supports et mise en peinture des murs, plafonds et boiseries." },
  { icon: "sparkle" as const, title: "Finitions", text: "Plinthes, raccords, joints et détails qui achèvent une rénovation." },
];

const method = [
  { title: "Écoute & conseil", text: "Échange sur vos envies, l’usage des pièces et les contraintes du logement." },
  { title: "Sélection des matériaux", text: "Choix des revêtements, teintes et finitions, détaillés dans le devis." },
  { title: "Préparation", text: "Protection du chantier, dépose si nécessaire et préparation des supports." },
  { title: "Réalisation", text: "Pose et mise en œuvre soignées, pièce par pièce." },
  { title: "Vérification & livraison", text: "Contrôle des finitions avec vous avant la fin du chantier." },
];

export default function FinishesPage() {
  return (
    <>
      <JsonLd data={serviceSchema(service, path)} />

      <SplitHero
        route="finishes"
        eyebrow="Revêtements & finitions"
        title={
          <>
            Des finitions qui font <Accent>toute la différence.</Accent>
          </>
        }
        text="Sols, murs, peintures : nous donnons à votre intérieur la finition soignée qu’il mérite."
        media={service.image}
        projectParam={service.slug}
      />

      <Section tone="light" labelledBy="engagements-titre">
        <SectionHeading
          id="engagements-titre"
          align="center"
          eyebrow="Nos engagements"
          title={
            <>
              Le soin du <Accent>moindre détail</Accent>
            </>
          }
        />
        <FeatureGrid items={commitments} columns={4} className="mt-14 lg:mt-20" />
      </Section>

      <Section tone="dark" labelledBy="revetements-titre">
        <SectionHeading
          id="revetements-titre"
          eyebrow="Ce que nous réalisons"
          title={
            <>
              Nos revêtements <Accent>&amp; finitions</Accent>
            </>
          }
        />
        <FeatureGrid items={finishes} columns={4} className="mt-14 lg:mt-20" />
      </Section>

      <Section tone="light" labelledBy="methode-titre">
        <SectionHeading id="methode-titre" eyebrow="Notre méthode" title="Cinq étapes pour une finition réussie" />
        <ProcessSteps steps={method} className="mt-14 lg:mt-20" />
      </Section>

      <ProjectShowcase
        tone="light-alt"
        category={service.projectCategory}
        title={
          <>
            Nos finitions <Accent>en images</Accent>
          </>
        }
        ctaLabel="Voir toutes nos réalisations"
      />

      <CtaBand
        tone="light"
        title={
          <>
            Un projet de <Accent>revêtements</Accent> ?
          </>
        }
        text="Sols, murs ou peinture : parlons de votre projet, le devis est gratuit."
        cta={{ label: quoteCta.long, href: `${quoteCta.href}?projet=${service.slug}` }}
      />
    </>
  );
}
