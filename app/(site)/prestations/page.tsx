import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceRows } from "@/components/sections/ServiceRows";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { href } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nos prestations de rénovation intérieure",
  description:
    "Rénovation intérieure, salle de bain & PMR, VMI, cuisine, revêtements et finitions : découvrez les prestations d’ART RÉNOV 56 à Elven et dans le Morbihan.",
  path: href("services"),
});

const approach = [
  {
    title: "Étude",
    text: "Échange sur vos besoins, observation de l’existant et définition du périmètre des travaux.",
  },
  {
    title: "Conception",
    text: "Choix des solutions, des matériaux et des finitions, puis remise d’un devis détaillé.",
  },
  {
    title: "Réalisation",
    text: "Exécution des travaux avec soin, dans le respect de votre logement et du planning convenu.",
  },
  {
    title: "Suivi",
    text: "Vérification des finitions avec vous et échange sur l’entretien de votre nouvel intérieur.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        route="services"
        eyebrow="Nos prestations"
        title={
          <>
            Des solutions pour <Accent>transformer</Accent> votre intérieur.
          </>
        }
        intro="Rénovation, adaptation, aménagement, finitions : ART RÉNOV 56 intervient sur l’ensemble de votre intérieur, avec la même exigence d’un projet à l’autre."
        media="servicesHero"
      />

      <Section tone="light" labelledBy="liste-prestations">
        <h2 id="liste-prestations" className="sr-only">
          Les 5 prestations d’ART RÉNOV 56
        </h2>
        <ServiceRows />
      </Section>

      <Section tone="dark" labelledBy="accompagnement-titre">
        <div className="grid gap-14 lg:grid-cols-12">
          <SectionHeading
            id="accompagnement-titre"
            eyebrow="Accompagnement global"
            title={
              <>
                Un seul interlocuteur, <Accent>du projet au résultat</Accent>
              </>
            }
            intro="Quelle que soit la prestation, votre projet suit la même démarche structurée."
            className="lg:col-span-4"
          />
          <ProcessSteps steps={approach} className="lg:col-span-8 lg:grid-cols-2 xl:grid-cols-2" />
        </div>
      </Section>

      <CtaBand
        tone="light"
        eyebrow="Devis gratuit"
        title="Parlons de votre projet"
        text="Décrivez-nous vos besoins : nous revenons vers vous pour en discuter et établir un devis sans engagement."
        secondary={{ label: "Voir nos réalisations", href: href("projects") }}
      />
    </>
  );
}
