"use client";

import { useRef, type ReactNode } from "react";
import { imagePreset, useRevealOnScroll } from "@/components/motion/Reveal";

/**
 * Révélation d'une photographie : fondu et léger zoom arrière (1,06 → 1) dans un cadre
 * `overflow-hidden`. Le cadre garde son ratio : aucun décalage de mise en page.
 * La photo est visible par défaut ; l'effet n'est appliqué que sous la ligne de flottaison.
 */
export function ImageReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref, imagePreset, null);
  return (
    <div ref={ref} className="absolute inset-0">
      {children}
    </div>
  );
}
