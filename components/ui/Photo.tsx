import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { getMedia, type MediaKey } from "@/data/media";

interface PhotoProps {
  media: MediaKey;
  /** Attribut `sizes` de next/image — indispensable pour un chargement adapté. */
  sizes: string;
  /** Classe de ratio (ex. "aspect-[4/3]") ou de hauteur ; la photo remplit ce cadre. */
  frameClassName?: string;
  className?: string;
  /** Image LCP (héros) : chargement prioritaire. */
  priority?: boolean;
  /** Assombrit l'image (héros avec texte en surimpression). */
  overlay?: "none" | "soft" | "strong" | "left";
  /** Léger zoom au survol d'un parent `.group`. */
  hoverZoom?: boolean;
}

const overlays = {
  none: "",
  soft: "bg-marine/30",
  strong: "bg-marine/60",
  left: "bg-gradient-to-r from-marine/85 via-marine/55 to-marine/10",
} as const;

/**
 * Photo responsive dans un cadre au ratio fixe (aucun CLS).
 * Si l'emplacement n'a pas encore de fichier (`src` vide), affiche un
 * placeholder sobre et explicite, facile à repérer puis à remplacer.
 */
export function Photo({
  media,
  sizes,
  frameClassName = "aspect-[4/3]",
  className,
  priority = false,
  overlay = "none",
  hoverZoom = false,
}: PhotoProps) {
  const asset = getMedia(media);

  const content = asset.src ? (
    <Image
      src={asset.src}
      alt={asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn(
        "object-cover",
        hoverZoom && "transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.03]",
      )}
    />
  ) : (
    <PhotoPlaceholder alt={asset.alt} />
  );

  return (
    <div className={cn("relative overflow-hidden bg-marine-panel", frameClassName, className)}>
      {/* Photos de héros (priority) : visibles d'emblée ; les autres se révèlent au scroll. */}
      {priority ? content : <ImageReveal>{content}</ImageReveal>}
      {overlay !== "none" ? <div aria-hidden className={cn("absolute inset-0", overlays[overlay])} /> : null}
    </div>
  );
}

function PhotoPlaceholder({ alt }: { alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex items-end bg-marine-panel text-ivoire/50"
      style={{
        /* Trame architecturale légère */
        backgroundImage:
          "repeating-linear-gradient(0deg, rgb(184 149 90 / 0.1) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, rgb(184 149 90 / 0.1) 0 1px, transparent 1px 48px)",
      }}
    >
      <span className="relative m-4 border border-or/30 bg-marine/60 px-3 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.2em]">
        Photo à venir
      </span>
    </div>
  );
}
