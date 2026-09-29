"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children?: ReactNode;
  className?: string;
  /** Déplacement (px) au début et à la fin de la course, ex. [-16, 16] ou [0, 48]. */
  range?: [number, number];
  /** Course : par défaut, de l'entrée de l'élément en bas de l'écran à sa sortie par le haut. */
  offset?: ["start end" | "start start", "end start"];
  ariaHidden?: boolean;
}

/** Parallax très léger, réservé à quelques éléments (transform uniquement). */
export function Parallax({ children, className, range = [-16, 16], offset = ["start end", "end start"], ariaHidden }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <m.div ref={ref} aria-hidden={ariaHidden} className={className} style={reduced ? undefined : { y }}>
      {children}
    </m.div>
  );
}
