"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Charge Motion à la demande (bundle réduit) pour les menus et le parallax.
 * `reducedMotion="user"` supprime les translations si l'utilisateur le demande.
 * Aucun contenu ne dépend de ce composant pour être visible.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
