import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bleu ardoise — teinte structurelle intermédiaire (texte, bordures, fonds doux)
        ardoise: {
          50: "#f4f6f8",
          100: "#e3e9ed",
          200: "#c7d2da",
          300: "#a0b2c0",
          400: "#7391a5",
          500: "#54748c",
          600: "#425c72",
          700: "#374b5d",
          800: "#2f3f4d",
          900: "#293643",
          950: "#19232c",
        },
        // Bleu marine profond — remplace l'ancien anthracite neutre par une teinte bretonne
        marine: {
          DEFAULT: "#0f1e30",
          light: "#16283d",
          950: "#0a1622",
        },
        // Bleu breton — accent vif mais sobre, en remplacement du doré
        breton: {
          50: "#eef5fb",
          100: "#d7e7f4",
          200: "#b0cfe9",
          300: "#7fb0d8",
          400: "#4c8cc0",
          500: "#2f6fa3",
          600: "#245a86",
          700: "#1f4a6d",
          800: "#1c3d59",
          900: "#18324a",
        },
        // Beige pierre — désormais discret, quasi minéral, réservé aux fonds
        pierre: {
          50: "#faf9f6",
          100: "#f2efe8",
          200: "#e6e0d3",
          300: "#d3c9b4",
          400: "#bcae90",
          500: "#a4926f",
        },
        anthracite: {
          DEFAULT: "#0f1e30",
          light: "#16283d",
        },
        creme: "#f8f7f4",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        container: "1440px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
