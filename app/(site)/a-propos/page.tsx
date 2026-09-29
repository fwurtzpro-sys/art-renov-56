import type { Metadata } from "next";
import { HeroItem } from "@/components/motion/Hero";
import { heroDelay } from "@/lib/motion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { quoteCta } from "@/config/navigation";
import { href } from "@/config/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "À propos – Entreprise de rénovation à Elven",
  description:
    "ART RÉNOV 56, entreprise de rénovation intérieure et d’aménagement basée à Elven : un interlocuteur unique, le goût du travail bien fait, au service de votre intérieur.",
  path: href("about"),
});

const arguments_ = [
  { title: "Un interlocuteur unique", text: "Vous échangez avec la même personne, de l’étude à la fin du chantier." },
  { title: "Qualité & exigence", text: "Le soin apporté aux préparations et aux finitions fait la différence." },
  { title: "Respect des délais", text: "Un planning annoncé avant le démarrage, et tenu au mieux tout au long des travaux." },
];

const commitments = [
  { icon: "conversation" as const, title: "Écoute & conseil", text: "Comprendre vos besoins avant de proposer la meilleure solution." },
  { icon: "ruler" as const, title: "Sur-mesure", text: "Des aménagements adaptés à votre logement et à votre mode de vie." },
  { icon: "trowel" as const, title: "Savoir-faire", text: "Une exécution rigoureuse, des gestes maîtrisés, des finitions soignées." },
  { icon: "smile" as const, title: "Satisfaction", text: "Un chantier réussi est un chantier dont vous êtes pleinement satisfait." },
];

export default function AboutPage() {
  return (
    <>
      {/* Introduction : texte à gauche, photographie réelle à droite */}
      <section aria-labelledby="page-titre" className="tone-light bg-ivoire text-encre">
        <Container className="pb-section pt-10">
          <Breadcrumb route="about" />
          <div className="mt-14 grid items-center gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6 lg:pr-8">
              <HeroItem as="p" delay={heroDelay.eyebrow} className="eyebrow">
                À propos
              </HeroItem>
              <HeroItem as="h1" id="page-titre" delay={heroDelay.title[0]} className="mt-6 font-serif text-display-xl font-medium lg:text-display-page">
                Une passion,
                <br />
                <Accent>votre intérieur</Accent>
              </HeroItem>
              <div className="mt-8 max-w-xl space-y-5 text-[1.0625rem] leading-relaxed text-muted">
                <p>
                  ART RÉNOV 56 est une entreprise de rénovation intérieure et d’aménagement basée à Elven, dans le Morbihan.
                  Nous accompagnons les particuliers dans la transformation de leur logement, avec une même exigence : que le
                  résultat vous ressemble et dure.
                </p>
              </div>
              <ul className="mt-10 space-y-6">
                {arguments_.map((item) => (
                  <li key={item.title} className="flex gap-5 border-t border-line pt-5">
                    <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-or" />
                    <div>
                      <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em]">{item.title}</h2>
                      <p className="mt-1.5 text-[0.9375rem] text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative lg:col-span-5 lg:col-start-8">
              <span aria-hidden className="absolute -bottom-4 -right-4 hidden h-full w-full border border-or/50 sm:block" />
              {/* Emplacement réservé à la photo réelle : le professionnel, son fils et le véhicule.
                  Ne pas remplacer par une image générée ni des personnes de substitution. */}
              <Photo media="aboutTeam" priority sizes="(min-width: 1024px) 40vw, 100vw" frameClassName="aspect-[4/5]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Engagement */}
      <Section tone="dark" labelledBy="engagement-titre">
        <SectionHeading
          id="engagement-titre"
          align="center"
          eyebrow="Ce qui nous guide"
          title={
            <>
              Notre <Accent>engagement</Accent>
            </>
          }
        />
        <FeatureGrid items={commitments} columns={4} className="mt-14 lg:mt-20" />
      </Section>

      {/* Objectif */}
      <Section tone="light" labelledBy="objectif-titre">
        <EditorialSplit media="aboutGoal" mediaSide="right">
          <p className="eyebrow">Notre objectif</p>
          <h2 id="objectif-titre" className="mt-6 font-serif text-display-lg font-medium">
            Rénover,
            <br />
            embellir,
            <br />
            <Accent>valoriser.</Accent>
          </h2>
          <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
            Redonner vie à un intérieur, le rendre plus agréable à vivre et plus adapté à votre quotidien : c’est ce qui guide
            chacun de nos chantiers.
          </p>
          <ButtonLink href={quoteCta.href} variant="dark" size="lg" className="mt-10">
            {quoteCta.long}
          </ButtonLink>
        </EditorialSplit>
      </Section>
    </>
  );
}
