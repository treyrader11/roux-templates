import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./container/**/*.{js,ts,jsx,tsx,mdx}",
    "./animation/**/*.{js,ts,jsx,tsx,mdx}",
    "./motion/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette for Reverse Gen — warm, editorial salon tones.
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
          50: "#faf5f0",
          100: "#f3e7da",
          200: "#e6ccb3",
          300: "#d6ac85",
          400: "#c78d5c",
          500: "#b8733f",
          600: "#a15c34",
          700: "#84482d",
          800: "#6d3d2a",
          900: "#5b3425",
        },
        ink: "#1a1613",
        cream: "#f7f2ec",
      },
      screens: {
        xs: "400px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(0.075, 0.82, 0.165, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
      },
      animation: {
        "fade-in": "fade-in 400ms ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
