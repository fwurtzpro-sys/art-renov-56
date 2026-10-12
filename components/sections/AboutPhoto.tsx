import Image from "next/image";
import { HeroItem } from "@/components/motion/Hero";
import { Parallax } from "@/components/motion/Parallax";
import { getMedia } from "@/data/media";

/**
 * Photographie réelle de la page « À propos », affichée EN ENTIER à son format d'origine :
 * le cadre épouse les proportions de l'image (width/height réels), sans recadrage ni retouche.
 * Filet doré décalé en arrière-plan (parallax très léger) ; apparition douce au chargement.
 */
export function AboutPhoto() {
  const photo = getMedia("aboutTeam");

  return (
    <div className="relative">
      <Parallax ariaHidden range={[-8, 8]} className="absolute -bottom-4 -right-4 hidden h-full w-full sm:block">
        <span className="block h-full w-full border border-or/50" />
      </Parallax>
      <HeroItem delay={0.45} className="relative">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          priority
          quality={85}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="block h-auto w-full object-contain"
        />
      </HeroItem>
    </div>
  );
}
