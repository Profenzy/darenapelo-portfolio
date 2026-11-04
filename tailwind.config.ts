import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0b",
        surface: "#121214",
        "surface-raised": "#1a1a1e",
        "surface-border": "#27272a",
        muted: "#8d8b86",
        gold: {
          DEFAULT: "#d4af37",
          light: "#e5c07b",
          dark: "#a58520",
          glow: "rgba(212, 175, 55, 0.15)",
        },
        ink: {
          light: "#f4f1ea",
          muted: "#c8c5bc",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-inter-tight)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.055em",
        tighter: "-0.04em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
