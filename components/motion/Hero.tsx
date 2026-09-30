import type { CSSProperties, ReactNode } from "react";

type Tag = "div" | "p" | "h1";

interface HeroItemProps {
  children: ReactNode;
  /** Délai (s) dans la séquence d'entrée — voir `heroDelay`. */
  delay: number;
  as?: Tag;
  className?: string;
  id?: string;
}

/**
 * Élément de la séquence d'entrée d'un héros : animation CSS (`.hero-in`, globals.css).
 * Les classes sont concaténées sans tailwind-merge : il prendrait `text-lead` (taille) et `text-ivoire/80` (couleur) pour deux couleurs et supprimerait la taille.
 * Elle démarre dès le premier affichage, sans attendre JavaScript, et se termine
 * d'elle-même : le contenu ne peut pas rester masqué.
 */
export function HeroItem({ children, delay, as: Component = "div", className, id }: HeroItemProps) {
  return (
    <Component id={id} className={className ? `hero-in ${className}` : "hero-in"} style={{ "--hero-delay": `${delay}s` } as CSSProperties}>
      {children}
    </Component>
  );
}

/**
 * Groupe de mots d'un grand titre. Chaque mot est un `inline-block` séparé par
 * de vrais espaces : les retours à la ligne restent exactement ceux du texte brut.
 */
export function HeroWords({ text, delay, step = 0.045 }: { text: string; delay: number; step?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            className="hero-in inline-block"
            style={{ "--hero-delay": `${(delay + index * step).toFixed(3)}s` } as CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
