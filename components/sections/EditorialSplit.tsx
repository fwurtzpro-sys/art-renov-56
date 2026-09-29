import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";
import type { MediaKey } from "@/types";

interface EditorialSplitProps {
  children: ReactNode;
  media: MediaKey;
  mediaSide?: "left" | "right";
  /** Ratio définitif du cadre photo. */
  ratioClass?: string;
  priority?: boolean;
  /** Filet doré décalé derrière la photo. */
  frame?: boolean;
  className?: string;
}

/** Composition éditoriale deux colonnes (texte + photographie) dans la grille du site. */
export function EditorialSplit({
  children,
  media,
  mediaSide = "right",
  ratioClass = "aspect-[4/5]",
  priority = false,
  frame = true,
  className,
}: EditorialSplitProps) {
  return (
    <div className={cn("grid items-center gap-14 lg:grid-cols-12 lg:gap-12", className)}>
      <div className={cn("lg:col-span-6", mediaSide === "right" ? "lg:pr-8" : "lg:order-2 lg:col-start-7 lg:pl-8")}>
        {children}
      </div>
      <div className={cn("relative lg:col-span-5", mediaSide === "right" ? "lg:col-start-8" : "lg:order-1 lg:col-start-1")}>
        {frame ? (
          <span
            aria-hidden
            className={cn(
              "absolute -bottom-4 hidden h-full w-full border border-or/50 sm:block",
              mediaSide === "right" ? "-right-4" : "-left-4",
            )}
          />
        ) : null}
        <Photo media={media} priority={priority} sizes="(min-width: 1024px) 40vw, 100vw" frameClassName={ratioClass} />
      </div>
    </div>
  );
}
