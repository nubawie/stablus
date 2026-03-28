import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        navy: "var(--navy)",
        "navy-light": "#152238",
        gold: "var(--gold)",
        "gold-light": "#C9A752",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "border-color": "var(--border)",
        "footer-bg": "var(--footer-bg)",
      },
      fontFamily: {
        serif: ["Libre Baskerville", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        display: [
          "56px",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "display-mobile": [
          "36px",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        h1: ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "h1-mobile": [
          "28px",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
        h2: ["32px", { lineHeight: "1.25" }],
        h3: ["22px", { lineHeight: "1.3" }],
        "h3-mobile": ["20px", { lineHeight: "1.3" }],
        body: ["16px", { lineHeight: "1.75" }],
        small: ["12px", { lineHeight: "1.5" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        price: ["28px", { lineHeight: "1.2" }],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "var(--card-shadow)",
      },
    },
  },
  plugins: [],
};
export default config;
