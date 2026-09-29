import type { Metadata } from "next";
import { SplitHero } from "@/components/sections/SplitHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { VmiDiagram, vmiSteps } from "@/components/sections/VmiDiagram";
import { Section } from "@/components/ui/Section";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/ui/JsonLd";
import { href } from "@/config/routes";
import { quoteCta } from "@/config/navigation";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const service = getService("vmi-ventilation");
const path = href("vmi");

export const metadata: Metadata = pageMetadata({ ...service.seo, path });

/* Contenu technique rédigé de façon prudente — à faire valider par ART RÉNOV 56. */
const advantages = [
  {
    icon: "wind" as const,
    title: "Air renouvelé",
    text: "Un apport continu d’air extérieur filtré, qui remplace progressivement l’air intérieur.",
  },
  {
    icon: "home" as const,
    title: "Confort",
    text: "L’air insufflé peut être tempéré selon l’équipement choisi, pour limiter la sensation d’air froid.",
  },
  {
    icon: "droplet" as const,
    title: "Gestion de l’humidité",
    text: "Le renouvellement de l’air contribue à limiter la condensation et l’excès d’humidité dans le logement.",
  },
  {
    icon: "feather" as const,
    title: "Fonctionnement discret",
    text: "Un caisson installé hors des pièces de vie, le plus souvent dans les combles, et une bouche d’insufflation discrète.",
  },
  {
    icon: "shield" as const,
    title: "Protection du logement",
    text: "Un air intérieur moins chargé en humidité aide à préserver les murs, les menuiseries et les finitions.",
  },
];

const offer = [
  {
    title: "Étude & conseil",
    text: "Visite de votre logement, analyse de sa configuration et de ses besoins, conseil sur le type d’équipement adapté.",
  },
  {
    title: "Installation",
    text: "Pose du caisson, du réseau et de la bouche d’insufflation, dans le respect de votre logement.",
  },
  {
    title: "Réglages & mise en service",
    text: "Paramétrage du système, vérification du fonctionnement et explications sur son utilisation au quotidien.",
  },
];

export default function VmiPage() {
  return (
    <>
      <JsonLd data={serviceSchema(service, path)} />

      <SplitHero
        route="vmi"
        eyebrow="VMI / Ventilation"
        title={
          <>
            Ventilation Mécanique par Insufflation : <Accent>un air intérieur renouvelé.</Accent>
          </>
        }
        text="La VMI insuffle un air extérieur filtré dans votre logement pour renouveler l’air intérieur. Nous étudions votre logement avant toute installation."
        media={service.image}
        projectParam={service.slug}
      />

      <Section tone="light" labelledBy="avantages-titre">
        <SectionHeading
          id="avantages-titre"
          align="center"
          eyebrow="Pourquoi une VMI"
          title={
            <>
              Les avantages de <Accent>la VMI</Accent>
            </>
          }
          intro="Les bénéfices constatés dépendent de chaque logement, de son isolation et de ses entrées et sorties d’air : c’est tout l’intérêt de l’étude préalable."
        />
        <FeatureGrid items={advantages} columns={5} className="mt-14 lg:mt-20" />
      </Section>

      <Section tone="dark" labelledBy="fonctionnement-titre">
        <SectionHeading
          id="fonctionnement-titre"
          eyebrow="Comprendre"
          title={
            <>
              Comment fonctionne <Accent>la VMI</Accent> ?
            </>
          }
          intro="Contrairement à une VMC, qui extrait l’air vicié, la VMI fonctionne par insufflation : elle fait entrer de l’air neuf filtré dans le logement."
        />
        <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-12">
          <div className="border border-line p-4 sm:p-8 lg:col-span-7">
            <VmiDiagram />
          </div>
          <ol className="space-y-8 lg:col-span-5">
            {vmiSteps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-or font-serif text-[1.25rem] text-or">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[0.875rem] font-semibold uppercase tracking-[0.16em]">{step.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-12 text-[0.8125rem] text-muted">Schéma de principe simplifié : chaque installation est adaptée au logement.</p>
      </Section>

      <Section tone="light" labelledBy="prestation-titre">
        <SectionHeading
          id="prestation-titre"
          eyebrow="Notre prestation"
          title={
            <>
              De l’étude à la <Accent>mise en service</Accent>
            </>
          }
        />
        <FeatureGrid items={offer} columns={3} variant="numbered" className="mt-14 lg:mt-20" />
      </Section>

      <ProjectShowcase
        tone="light-alt"
        category={service.projectCategory}
        title={
          <>
            Nos installations <Accent>de VMI</Accent>
          </>
        }
        ctaLabel="Voir toutes nos réalisations"
      />

      <CtaBand
        tone="light"
        title={
          <>
            Un projet de <Accent>ventilation</Accent> ?
          </>
        }
        text="Parlez-nous de votre logement : nous étudions la solution la plus adaptée."
        cta={{ label: quoteCta.long, href: `${quoteCta.href}?projet=${service.slug}` }}
      />
    </>
  );
}
