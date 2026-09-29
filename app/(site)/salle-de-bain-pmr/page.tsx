import type { Metadata } from "next";
import { SplitHero } from "@/components/sections/SplitHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { href } from "@/config/routes";
import { quoteCta } from "@/config/navigation";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const service = getService("salle-de-bain-pmr");
const path = href("bathroom");

export const metadata: Metadata = pageMetadata({ ...service.seo, path });

const benefits = [
  {
    icon: "accessibility" as const,
    title: "Accessible & sécurisée",
    text: "Des aménagements pensés pour se déplacer et se laver en toute sérénité, aujourd’hui comme demain.",
  },
  {
    icon: "droplet" as const,
    title: "Confort & bien-être",
    text: "Une pièce agréable à vivre au quotidien, lumineuse, fonctionnelle et facile à entretenir.",
  },
  {
    icon: "ruler" as const,
    title: "Design sur mesure",
    text: "Implantation, matériaux et équipements choisis selon la configuration de votre salle de bain et vos goûts.",
  },
  {
    icon: "conversation" as const,
    title: "Accompagnement complet",
    text: "De l’étude de votre salle de bain jusqu’aux finitions, vous avez un interlocuteur unique.",
  },
];

/* Équipements PMR : liste à confirmer par ART RÉNOV 56 avant publication définitive. */
const offers = [
  {
    title: "Rénovation complète",
    text: "Dépose de l’existant, nouvelle implantation, revêtements, équipements et finitions.",
  },
  {
    title: "Douche à l’italienne",
    text: "Une douche de plain-pied, élégante et pratique, en remplacement d’une baignoire ou d’un bac.",
  },
  {
    title: "Salle de bain PMR",
    text: "Adaptation de la pièce pour faciliter l’autonomie, selon les besoins de chacun :",
    list: ["Douche sans ressaut", "Barres d’appui", "Siège de douche", "WC rehaussé", "Circulation optimisée"],
  },
  {
    title: "Aménagement & équipements",
    text: "Meubles, rangements, vasques, robinetterie : l’ensemble est pensé pour votre usage.",
  },
];

const method = [
  { title: "Écoute & étude", text: "Analyse de votre salle de bain, de vos habitudes et, le cas échéant, des besoins d’accessibilité." },
  { title: "Conception", text: "Implantation, choix des matériaux et des équipements, devis détaillé." },
  { title: "Réalisation", text: "Travaux menés avec soin, en limitant la gêne dans votre logement." },
  { title: "Réception & suivi", text: "Vérification des finitions et conseils d’utilisation et d’entretien." },
];

export default function BathroomPage() {
  return (
    <>
      <JsonLd data={serviceSchema(service, path)} />

      <SplitHero
        route="bathroom"
        eyebrow="Salle de bain & PMR"
        title={
          <>
            Des salles de bain belles, <Accent>pratiques et accessibles</Accent> à tous.
          </>
        }
        text="Rénovation complète, douche à l’italienne ou adaptation pour une personne à mobilité réduite : nous concevons une salle de bain à votre image."
        media={service.image}
        projectParam={service.slug}
      />

      <Section tone="light" labelledBy="benefices-titre">
        <SectionHeading
          id="benefices-titre"
          align="center"
          eyebrow="Pourquoi rénover votre salle de bain"
          title={
            <>
              Une pièce <Accent>plus sûre</Accent>, plus agréable
            </>
          }
        />
        <FeatureGrid items={benefits} columns={4} className="mt-14 lg:mt-20" />
      </Section>

      <Section tone="dark" labelledBy="offre-titre">
        <SectionHeading
          id="offre-titre"
          eyebrow="Nos solutions"
          title={
            <>
              Nous créons la salle de bain <Accent>qui vous ressemble</Accent>.
            </>
          }
        />
        <FeatureGrid items={offers} columns={4} variant="numbered" className="mt-14 lg:mt-20" />
      </Section>

      <ProjectShowcase
        tone="light"
        category={service.projectCategory}
        title={
          <>
            Nos salles de bain <Accent>rénovées</Accent>
          </>
        }
        ctaLabel="Voir plus de réalisations"
      >
        <div className="mt-20 grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="font-serif text-display-sm font-medium">Avant / après</h3>
            <p className="mt-4 text-muted">Faites glisser le curseur pour comparer la salle de bain avant et après travaux.</p>
            <p data-nosnippet className="mt-4 text-[0.8125rem] text-muted">
              Emplacement d’exemple — les photos d’un chantier réel seront ajoutées prochainement.
            </p>
          </div>
          <BeforeAfter before="bathroomBefore" after="bathroomAfter" className="lg:col-span-8" />
        </div>
      </ProjectShowcase>

      <Section tone="dark" labelledBy="methode-titre">
        <SectionHeading id="methode-titre" eyebrow="Notre méthode" title="Votre salle de bain, étape par étape" />
        <ProcessSteps steps={method} className="mt-14 lg:mt-20" />
      </Section>

      <CtaBand
        tone="light"
        title={
          <>
            Un projet de <Accent>salle de bain</Accent> ?
          </>
        }
        text="Rénovation ou adaptation PMR : parlons-en, le devis est gratuit et sans engagement."
        cta={{ label: quoteCta.long, href: `${quoteCta.href}?projet=${service.slug}` }}
      />
    </>
  );
}
