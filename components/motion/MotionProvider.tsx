"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * Navigateur sans IntersectionObserver (très ancien) : Motion planterait au premier
 * `whileInView`. On installe un substitut qui signale immédiatement « visible »,
 * de sorte que tout le contenu s'affiche sans attendre le défilement.
 */
const missingObserver = typeof window !== "undefined" && !("IntersectionObserver" in window);
if (missingObserver) {
  class VisibleImmediately {
    private callback: (entries: unknown[], observer: unknown) => void;
    constructor(callback: (entries: unknown[], observer: unknown) => void) {
      this.callback = callback;
    }
    observe(target: Element) {
      const rect = target.getBoundingClientRect();
      this.callback([{ target, isIntersecting: true, intersectionRatio: 1, boundingClientRect: rect, time: 0 }], this);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = VisibleImmediately;
}

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
    root.dataset.motion = missingObserver ? "off" : "ready";
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
