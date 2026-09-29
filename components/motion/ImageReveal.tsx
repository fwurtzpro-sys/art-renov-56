"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { imageVariants, viewport } from "@/lib/motion";

/**
 * Révélation d'une photographie : fondu et léger zoom arrière (1,06 → 1) dans un cadre
 * `overflow-hidden`. Le cadre garde son ratio : aucun décalage de mise en page.
 */
export function ImageReveal({ children }: { children: ReactNode }) {
  return (
    <m.div
      data-reveal
      className="absolute inset-0"
      variants={imageVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </m.div>
  );
}
