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
        ardoise: {
          50: "#f4f6f8",
          100: "#e4e9ed",
          200: "#c9d3db",
          300: "#a3b3c1",
          400: "#7690a3",
          500: "#57748a",
          600: "#455e72",
          700: "#394d5d",
          800: "#31414d",
          900: "#2b3843",
          950: "#1c242b",
        },
        pierre: {
          50: "#faf8f4",
          100: "#f3ede1",
          200: "#e8ddc7",
          300: "#d8c6a3",
          400: "#c6ab7d",
          500: "#b89661",
          600: "#a37f4f",
          700: "#876743",
          800: "#6f543a",
          900: "#5c4632",
        },
        anthracite: {
          DEFAULT: "#22262a",
          light: "#33383d",
        },
        creme: "#f8f6f1",
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
