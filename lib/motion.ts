import type { Transition } from "motion/react";

/**
 * Grammaire d'animation ART RÉNOV 56 — source unique.
 * Mouvements doux : opacité + translation verticale de quelques pixels,
 * courbe « premium » identique à `ease-premium` (tailwind.config.ts).
 * Aucun rebond, aucune rotation, aucun zoom marqué.
 *
 * Principe : le contenu est TOUJOURS visible par défaut (HTML/CSS). Les animations
 * ne sont qu'un enrichissement : les états « masqués » sont posés par JavaScript,
 * uniquement sur ce qui est sous la ligne de flottaison, et retirés à la fin.
 * Les entrées de héros/header sont des animations CSS (voir globals.css).
 */
export const ease = [0.16, 1, 0.3, 1] as const;

export const duration = {
  /** Micro-interactions (menu, survol). */
  fast: 0.35,
  /** Apparition d'un élément. */
  base: 0.8,
  /** Révélation d'une image. */
  slow: 1.4,
} as const;

/** Amplitudes (px) : volontairement faibles. */
export const distance = {
  /** Éléments de section. */
  base: 16,
} as const;

/** Décalage entre éléments frères qui apparaissent ensemble. */
export const staggerStep = 0.09;

/** Zone de déclenchement au scroll : une seule fois, un peu avant le bas de l'écran. */
export const inViewMargin = "0px 0px -60px 0px";

/** Séquence d'entrée du héros : délais (s). Le contenu est complet en moins de 1,7 s. */
export const heroDelay = {
  eyebrow: 0.05,
  /** Les trois groupes du titre : « Rénovation intérieure » · « & aménagement » · « dans le Morbihan ». */
  title: [0.18, 0.34, 0.5],
  text: 0.66,
  actions: 0.8,
} as const;

export const panelTransition: Transition = { duration: duration.fast, ease };
