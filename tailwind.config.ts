import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { palette, tones } from "./config/theme";

/**
 * Design tokens ART RÉNOV 56 — bleu marine / ivoire dominants, doré en accent.
 * Les valeurs viennent de config/theme.ts (source unique).
 *
 * Couleurs « tonales » (accent, muted, line, fg) : elles s'adaptent au fond
 * grâce aux classes `.tone-dark` / `.tone-light` (variables injectées par le plugin ci-dessous).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./config/**/*.ts", "./data/**/*.ts"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      wide: "1440px",
    },
    extend: {
      colors: {
        marine: {
          DEFAULT: palette.marine,
          panel: palette.marinePanel,
          raised: palette.marineRaised,
        },
        ivoire: {
          DEFAULT: palette.ivoire,
          50: palette.ivoire50,
          200: palette.ivoire200,
          300: palette.ivoire300,
        },
        or: {
          DEFAULT: palette.or,
          clair: palette.orClair,
          fonce: palette.orFonce,
        },
        encre: palette.encre,
        accent: "rgb(var(--tone-accent) / <alpha-value>)",
        muted: "rgb(var(--tone-muted) / <alpha-value>)",
        line: "rgb(var(--tone-line) / <alpha-value>)",
        fg: "rgb(var(--tone-fg) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 1.55rem + 4.4vw, 5.75rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(2.35rem, 1.6rem + 2.9vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.95rem, 1.5rem + 1.7vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.005em" }],
        "display-sm": ["clamp(1.5rem, 1.3rem + 0.8vw, 1.95rem)", { lineHeight: "1.2" }],
        eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.24em" }],
        nav: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em" }],
        lead: ["clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)", { lineHeight: "1.7" }],
      },
      spacing: {
        section: "clamp(4.5rem, 2.75rem + 6.5vw, 9.5rem)",
        "section-sm": "clamp(3.5rem, 2.5rem + 3.5vw, 6rem)",
        header: "5rem",
        "header-xl": "6rem",
      },
      maxWidth: {
        site: "82.5rem",
        wide: "90rem",
        prose: "40rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [
    // Variables de ton (clair par défaut, sombre sous .tone-dark), générées depuis config/theme.ts
    plugin(({ addBase }) => {
      addBase({
        ":root, .tone-light": tones.light,
        ".tone-dark": tones.dark,
      });
    }),
  ],
};

export default config;
