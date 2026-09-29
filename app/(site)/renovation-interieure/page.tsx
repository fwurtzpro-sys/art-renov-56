import type { Metadata } from "next";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Link from "next/link";
import { SplitHero } from "@/components/sections/SplitHero";
import { SplitLayout } from "@/components/sections/SplitLayout";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { href } from "@/config/routes";
import { quoteCta } from "@/config/navigation";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const service = getService("renovation-interieure");
const path = href("renovation");

export const metadata: Metadata = pageMetadata({ ...service.seo, path });

const expertise = [
  {
    icon: "home" as const,
    title: "Rénover & moderniser",
    text: "Remise à neuf des pièces de vie, reprise des murs et des sols, modernisation d’un intérieur vieillissant.",
  },
  {
    icon: "ruler" as const,
    title: "Aménager & optimiser",
    text: "Réorganisation des espaces, meilleure circulation, rangements pensés pour votre quotidien.",
  },
  {
    icon: "sparkle" as const,
    title: "Embellir & personnaliser",
    text: "Revêtements, peintures et finitions choisis avec vous pour donner du caractère à chaque pièce.",
  },
];

const method = [
  { title: "Écoute & étude", text: "Nous découvrons votre logement, vos besoins et vos envies pour définir ensemble le projet." },
  { title: "Conception sur-mesure", text: "Solutions, matériaux et finitions sont sélectionnés, puis détaillés dans un devis clair." },
  { title: "Réalisation soignée", text: "Les travaux sont exécutés avec méthode, dans le respect de votre intérieur et du planning." },
  { title: "Réception & suivi", text: "Nous vérifions les finitions avec vous et vous conseillons pour leur entretien." },
];

const details = [
  "Préparation minutieuse des supports",
  "Chantier protégé et tenu propre",
  "Finitions contrôlées pièce par pièce",
  "Conseils sur les matériaux et l’entretien",
];

export default function RenovationPage() {
  return (
    <>
      <JsonLd data={serviceSchema(service, path)} />

      <SplitHero
        route="renovation"
        eyebrow="Rénovation intérieure"
        title={
          <>
            Rénovation intérieure —<br />
            <Accent>Transformez</Accent> votre intérieur.
          </>
        }
        text="Nous modernisons et réaménageons votre logement, à Elven, Vannes et dans le Morbihan."
        media={service.image}
        projectParam={service.slug}
      />

      <Section tone="light" labelledBy="savoir-faire-titre">
        <SectionHeading
          id="savoir-faire-titre"
          align="center"
          eyebrow="Notre savoir-faire"
          title={
            <>
              Des solutions sur mesure pour <Accent>sublimer</Accent> votre intérieur
            </>
          }
        />
        <FeatureGrid items={expertise} columns={3} className="mt-14 lg:mt-20" />
        <p className="mx-auto mt-12 max-w-2xl text-center text-[0.9375rem] leading-relaxed text-muted">
          Votre projet concerne une pièce d’eau ou vos revêtements ? Découvrez aussi nos pages{" "}
          <Link href={href("bathroom")} className="text-fg underline decoration-or underline-offset-4">
            salle de bain &amp; PMR
          </Link>{" "}
          et{" "}
          <Link href={href("finishes")} className="text-fg underline decoration-or underline-offset-4">
            revêtements &amp; finitions
          </Link>
          .
        </p>
      </Section>

      <Section tone="dark" labelledBy="methode-titre">
        <SectionHeading id="methode-titre" eyebrow="Notre méthode" title="Quatre étapes, un projet maîtrisé" />
        <ProcessSteps steps={method} className="mt-14 lg:mt-20" />
      </Section>

      <ProjectShowcase
        tone="light"
        category={service.projectCategory}
        title={
          <>
            Des intérieurs qui <Accent>nous ressemblent</Accent>
          </>
        }
        ctaLabel="Voir plus de réalisations"
      />

      <SplitLayout media="renovationDetail" tone="dark" labelledBy="exigence-titre">
        <Stagger className="flex flex-col">
          <StaggerItem as="p" className="eyebrow">
            Notre exigence
          </StaggerItem>
          <StaggerItem as="h2" id="exigence-titre" className="mt-6 font-serif text-display-md font-medium">
            L’exigence du détail,
            <br />
            <Accent>la passion du métier.</Accent>
          </StaggerItem>
          <Stagger as="ul" className="mt-10 space-y-5">
            {details.map((item) => (
              <StaggerItem as="li" key={item} className="flex items-start gap-4 border-b border-line pb-5 text-[1rem]">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-or" />
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </Stagger>
      </SplitLayout>

      <CtaBand
        tone="light"
        title={
          <>
            Un projet de <Accent>rénovation intérieure</Accent> ?
          </>
        }
        cta={{ label: quoteCta.long, href: `${quoteCta.href}?projet=${service.slug}` }}
      />
    </>
  );
}
