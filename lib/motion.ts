import type { Transition, Variants } from "motion/react";

/**
 * Grammaire d'animation ART RÉNOV 56 — source unique.
 * Mouvements doux : opacité + translation verticale de quelques pixels,
 * courbe « premium » identique à `ease-premium` (tailwind.config.ts).
 * Aucun rebond, aucune rotation, aucun zoom marqué.
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
  /** Éléments de héros. */
  hero: 12,
  /** Éléments de section. */
  base: 16,
} as const;

/** Décalage entre éléments frères. */
export const stagger = {
  base: 0.09,
  /** Mots d'un grand titre. */
  words: 0.045,
} as const;

/** Déclenchement au scroll : une seule fois, dès qu'un peu de l'élément est visible. */
export const viewport = { once: true, amount: "some", margin: "0px 0px -60px 0px" } as const;

export const baseTransition: Transition = { duration: duration.base, ease };

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: distance.base },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.base, delayChildren: 0.04 } },
};

/** Séquence d'entrée du héros : délais absolus (s), le contenu apparaît en moins de 1,5 s. */
export const heroDelay = {
  eyebrow: 0.05,
  /** Les trois groupes du titre : « Rénovation intérieure » · « & aménagement » · « dans le Morbihan ». */
  title: [0.18, 0.34, 0.5],
  text: 0.66,
  actions: 0.8,
} as const;

export const heroVariants: Variants = {
  hidden: { opacity: 0, y: distance.hero },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease, delay },
  }),
};

export const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.slow, ease } },
};

export const panelTransition: Transition = { duration: duration.fast, ease };
