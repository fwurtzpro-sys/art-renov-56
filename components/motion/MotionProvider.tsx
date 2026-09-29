"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * Charge Motion à la demande (bundle réduit) et signale au CSS que le système
 * d'animation est actif : tant que `data-motion="ready"` est absent, les
 * éléments `[data-reveal]` redeviennent visibles d'eux-mêmes après 3 s
 * (voir globals.css) — une panne de JavaScript ne peut pas laisser du contenu masqué.
 * `prefers-reduced-motion` est traité en CSS (contenu affiché immédiatement)
 * et par `reducedMotion="user"` (aucune translation).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    // Sans IntersectionObserver, les révélations au scroll ne pourraient pas se déclencher.
    root.dataset.motion = typeof IntersectionObserver === "undefined" ? "off" : "ready";
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
