/**
 * PAGE PROVISOIRE — aperçu des fondations (tokens, typographies, composants).
 * Non indexée. Sera remplacée par la page Accueil après validation.
 */
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink, Button, ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { quoteCta } from "@/config/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Aperçu des fondations",
  description: "Page provisoire de validation du système de design ART RÉNOV 56.",
  path: "/",
  noindex: true,
});

const palette = [
  { name: "Noir", className: "bg-noir", hex: "#0B0B0A" },
  { name: "Anthracite", className: "bg-anthracite", hex: "#1C1B19" },
  { name: "Ivoire", className: "bg-ivoire border border-ivoire-300", hex: "#F5F0E6" },
  { name: "Ivoire 200", className: "bg-ivoire-200", hex: "#ECE4D5" },
  { name: "Or", className: "bg-or", hex: "#B8955A" },
  { name: "Or foncé (texte sur ivoire)", className: "bg-or-fonce", hex: "#7F6130" },
];

const iconNames: IconName[] = [
  "conversation",
  "ruler",
  "diamond",
  "clock",
  "home",
  "bath",
  "wind",
  "kitchen",
  "layers",
  "user",
  "trowel",
  "smile",
  "shield",
  "paintRoller",
  "droplet",
  "sparkle",
  "calendar",
  "phone",
  "mail",
  "mapPin",
];

export default function FoundationsPreviewPage() {
  return (
    <>
      <Section tone="dark" labelledBy="apercu-titre">
        <SectionHeading
          as="h1"
          id="apercu-titre"
          size="xl"
          eyebrow="Fondations • aperçu provisoire"
          title={
            <>
              Rénovation intérieure,
              <br />
              <Accent>l&apos;exigence</Accent> du détail.
            </>
          }
          intro="Page temporaire de validation de la direction artistique : typographies, palette, boutons, icônes et emplacements photo. Elle sera remplacée par la page Accueil."
        />
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href={quoteCta.href} variant="gold" size="lg">
            {quoteCta.long}
          </ButtonLink>
          <ButtonLink href="/realisations" variant="outline" size="lg">
            Découvrir nos réalisations
          </ButtonLink>
        </div>
      </Section>

      <Section tone="light" labelledBy="typo-titre">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="typo-titre"
              eyebrow="Typographies"
              title={
                <>
                  Une serif éditoriale, <Accent>une sans</Accent> moderne.
                </>
              }
              intro="Cormorant Garamond pour les grands titres, Figtree pour les textes, menus et petits éléments."
            />
            <div className="mt-10 space-y-4 border-t border-line pt-8">
              <p className="font-serif text-display-md">Titre de section — display-md</p>
              <p className="font-serif text-display-sm">Titre de carte — display-sm</p>
              <p className="max-w-prose text-[1rem] leading-relaxed">
                Texte courant : ART RÉNOV 56 accompagne votre projet de rénovation intérieure, de l&apos;écoute de vos
                besoins jusqu&apos;aux finitions.
              </p>
              <p className="text-[0.9375rem] text-muted">Texte secondaire (muted), contraste AA.</p>
              <ArrowLink href="/prestations">Découvrir</ArrowLink>
            </div>
          </div>
          <div>
            <p className="eyebrow">Boutons sur fond clair</p>
            <div className="mt-6 flex flex-col items-start gap-4">
              <Button variant="gold" icon="arrowRight">
                Demander un devis gratuit
              </Button>
              <Button variant="dark" icon="arrowRight">
                Retour à l&apos;accueil
              </Button>
              <Button variant="outline" icon="arrowRight">
                Voir toutes nos réalisations
              </Button>
            </div>
            <p className="eyebrow mt-12">Palette</p>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {palette.map((color) => (
                <li key={color.name}>
                  <span className={`block aspect-[4/3] ${color.className}`} />
                  <span className="mt-2 block text-[0.8125rem] font-semibold">{color.name}</span>
                  <span className="block text-[0.75rem] text-muted">{color.hex}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="icones-titre">
        <SectionHeading
          id="icones-titre"
          align="center"
          eyebrow="Icônes dorées"
          title="Jeu d'icônes maison"
          intro="Tracé fin, sans bibliothèque externe."
        />
        <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-px bg-line sm:grid-cols-5">
          {iconNames.map((name) => (
            <li key={name} className="flex flex-col items-center gap-3 bg-noir px-2 py-7">
              <Icon name={name} className="h-8 w-8 text-or" />
              <span className="text-[0.6875rem] tracking-[0.08em] text-muted">{name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light-alt" labelledBy="photos-titre">
        <SectionHeading
          id="photos-titre"
          eyebrow="Emplacements photo"
          title="Cadres au ratio fixe, sans décalage"
          intro="Chaque emplacement est déclaré dans data/media.ts. Tant qu'aucun fichier n'est renseigné, un placeholder sobre s'affiche."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Photo media="serviceKitchen" sizes="(min-width: 768px) 33vw, 100vw" frameClassName="aspect-[4/5]" />
          <Photo media="serviceBathroom" sizes="(min-width: 768px) 33vw, 100vw" frameClassName="aspect-[4/5]" />
          <Photo media="aboutTeam" sizes="(min-width: 768px) 33vw, 100vw" frameClassName="aspect-[4/5]" />
        </div>
      </Section>
    </>
  );
}
