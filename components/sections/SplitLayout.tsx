import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { toneClass, type SectionTone } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import type { MediaKey } from "@/types";

interface SplitLayoutProps {
  children: ReactNode;
  media: MediaKey;
  tone?: SectionTone;
  mediaSide?: "left" | "right";
  /** Hauteur minimale sur desktop (la photo remplit toute la hauteur). */
  minHeightClass?: string;
  /** Ratio de la photo sur mobile / tablette (empilée). */
  mobileRatioClass?: string;
  priority?: boolean;
  labelledBy?: string;
  className?: string;
}

/**
 * Bloc pleine largeur « moitié aplat / moitié photographie ».
 * Le texte reste aligné sur la grille du site ; la photo va jusqu'au bord de l'écran.
 */
export function SplitLayout({
  children,
  media,
  tone = "dark",
  mediaSide = "right",
  minHeightClass = "lg:min-h-[640px]",
  mobileRatioClass = "aspect-[4/3] sm:aspect-[16/10]",
  priority = false,
  labelledBy,
  className,
}: SplitLayoutProps) {
  const mediaRight = mediaSide === "right";
  return (
    <section aria-labelledby={labelledBy} className={cn("relative lg:grid lg:grid-cols-2", toneClass(tone), minHeightClass, className)}>
      <div
        className={cn(
          "flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:py-24",
          mediaRight
            ? "lg:pl-[max(3rem,calc((100vw-82.5rem)/2+3rem))] lg:pr-16 xl:pr-24"
            : "lg:order-2 lg:pl-16 lg:pr-[max(3rem,calc((100vw-82.5rem)/2+3rem))] xl:pl-24",
        )}
      >
        {children}
      </div>
      <Photo
        media={media}
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        frameClassName={cn(mobileRatioClass, "lg:aspect-auto lg:h-full")}
        className={cn(mediaRight ? "" : "lg:order-1")}
      />
    </section>
  );
}
