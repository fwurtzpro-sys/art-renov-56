/**
 * Palette ART RÉNOV 56 — SOURCE UNIQUE des couleurs.
 *
 * Bleu marine profond (Bretagne) + ivoire chaud + doré.
 * Tout le reste en découle : couleurs Tailwind et variables de ton
 * (tailwind.config.ts), SVG, image de partage, themeColor, manifeste.
 * Seul app/icon.svg (fichier statique) reprend la valeur `marine` à la main.
 *
 * Contrastes (WCAG) :
 *  - ivoire #F5F0E6 sur marine ≈ 14:1 · or #B8955A sur marine ≈ 5,8:1
 *  - or foncé #7F6130 sur ivoire ≈ 5:1 · texte #11100F sur ivoire ≈ 17:1
 */
export const palette = {
  /* Surfaces sombres */
  marine: "#0D2236", // fond sombre principal (header, footer, héros, sections, CTA)
  marinePanel: "#14304B", // cartes, panneaux, emplacements photo
  marineRaised: "#1B3B5C", // survols et éléments surélevés

  /* Surfaces claires */
  ivoire: "#F5F0E6",
  ivoire50: "#FBF8F2",
  ivoire200: "#ECE4D5",
  ivoire300: "#DDD2BE",

  /* Doré */
  or: "#B8955A",
  orClair: "#CFB07A",
  orFonce: "#7F6130", // petits textes dorés sur fond clair

  /* Texte sur fond clair (volontairement neutre : lisibilité maximale) */
  encre: "#11100F",
  mutedOnLight: "#57534B",
  lineOnLight: "#DDD2BE",

  /* Texte et filets sur fond marine */
  mutedOnDark: "#B4BCC6",
  lineOnDark: "#28425D",
} as const;

/** "#B8955A" -> "184 149 90" (format attendu par `rgb(var(--x) / <alpha-value>)`). */
export function rgbTriplet(hex: string): string {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16)).join(" ");
}

/** Variables de ton : les couleurs « accent / muted / line / fg » suivent le fond de la section. */
export const tones = {
  light: {
    "--tone-accent": rgbTriplet(palette.orFonce),
    "--tone-muted": rgbTriplet(palette.mutedOnLight),
    "--tone-line": rgbTriplet(palette.lineOnLight),
    "--tone-fg": rgbTriplet(palette.encre),
    "--tone-focus": palette.orFonce,
  },
  dark: {
    "--tone-accent": rgbTriplet(palette.or),
    "--tone-muted": rgbTriplet(palette.mutedOnDark),
    "--tone-line": rgbTriplet(palette.lineOnDark),
    "--tone-fg": rgbTriplet(palette.ivoire),
    "--tone-focus": palette.orClair,
  },
} as const;
