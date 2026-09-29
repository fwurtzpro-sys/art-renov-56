import type { Config } from "tailwindcss";

/**
 * Design tokens ART RÉNOV 56 — noir / ivoire dominants, doré en accent.
 *
 * Couleurs « tonales » (accent, muted, line, fg) : elles s'adaptent au fond
 * grâce aux classes `.tone-dark` / `.tone-light` (voir app/globals.css).
 * Contrastes vérifiés (WCAG AA) :
 *  - or #B8955A sur noir #0B0B0A ≈ 7:1
 *  - or foncé #7F6130 sur ivoire #F5F0E6 ≈ 5:1 (petits textes dorés sur fond clair)
 *  - muted #57534B sur ivoire ≈ 6.8:1 ; muted #A8A29A sur noir ≈ 7.8:1
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
        noir: {
          DEFAULT: "#0B0B0A",
          soft: "#131312",
        },
        anthracite: {
          DEFAULT: "#1C1B19",
          light: "#262522",
        },
        ivoire: {
          DEFAULT: "#F5F0E6",
          50: "#FBF8F2",
          200: "#ECE4D5",
          300: "#DDD2BE",
        },
        or: {
          DEFAULT: "#B8955A",
          clair: "#CFB07A",
          fonce: "#7F6130",
        },
        encre: "#11100F",
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
  plugins: [],
};

export default config;
