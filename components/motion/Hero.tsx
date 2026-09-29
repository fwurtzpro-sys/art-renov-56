"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { heroVariants } from "@/lib/motion";

type Tag = "div" | "p" | "h1";
const tags = { div: m.div, p: m.p, h1: m.h1 } as const;

interface HeroItemProps {
  children: ReactNode;
  /** Délai absolu (s) dans la séquence d'entrée — voir `heroDelay`. */
  delay: number;
  as?: Tag;
  className?: string;
  id?: string;
}

/** Élément de la séquence d'entrée d'un héros (jouée au chargement, sans attendre le scroll). */
export function HeroItem({ children, delay, as = "div", className, id }: HeroItemProps) {
  const Component = tags[as];
  return (
    <Component data-reveal id={id} className={className} variants={heroVariants} custom={delay} initial="hidden" animate="visible">
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
          <m.span
            data-reveal
            className="inline-block"
            variants={heroVariants}
            custom={delay + index * step}
            initial="hidden"
            animate="visible"
          >
            {word}
          </m.span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
