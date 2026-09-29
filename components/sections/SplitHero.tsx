import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { SplitLayout } from "@/components/sections/SplitLayout";
import { HeroItem } from "@/components/motion/Hero";
import { heroDelay } from "@/lib/motion";
import { quoteCta } from "@/config/navigation";
import type { MediaKey, RouteKey } from "@/types";

interface SplitHeroProps {
  route: RouteKey;
  eyebrow: string;
  title: ReactNode;
  /** Une seule phrase courte : la bannière doit rester aérée. */
  text: ReactNode;
  media: MediaKey;
  /** Paramètre `projet` pré-rempli dans le formulaire de contact. */
  projectParam?: string;
}

/** Héros des pages métier : moitié noire (texte), moitié photographie. */
export function SplitHero({ route, eyebrow, title, text, media, projectParam }: SplitHeroProps) {
  const ctaHref = projectParam ? `${quoteCta.href}?projet=${projectParam}` : quoteCta.href;
  return (
    <SplitLayout media={media} tone="dark" priority labelledBy="page-titre" minHeightClass="lg:min-h-[calc(100svh-6rem)] lg:max-h-[860px]">
      <Breadcrumb route={route} />
      <div className="mt-12 lg:mt-16">
        <HeroItem as="p" delay={heroDelay.eyebrow} className="eyebrow">
          {eyebrow}
        </HeroItem>
        <HeroItem as="h1" id="page-titre" delay={heroDelay.title[0]} className="mt-6 font-serif text-display-lg font-medium">
          {title}
        </HeroItem>
        <HeroItem as="p" delay={heroDelay.text} className="mt-7 max-w-md text-lead text-ivoire/80">
          {text}
        </HeroItem>
        <HeroItem delay={heroDelay.actions} className="mt-10">
          <ButtonLink href={ctaHref} variant="gold" size="lg">
            {quoteCta.long}
          </ButtonLink>
        </HeroItem>
      </div>
    </SplitLayout>
  );
}
