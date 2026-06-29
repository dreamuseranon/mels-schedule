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
        cream:   "var(--cream)",
        pink:    "var(--pink)",
        sage:    "var(--sage)",
        blue:    "var(--blue)",
        mustard: "var(--mustard)",
        muted:   "var(--muted)",
        border:  "var(--border)",
      },
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
