import type { Config } from "tailwindcss";

/**
 * Hard restraint budget. The palette below is the ENTIRE allowed color set.
 * No blues, no gradients, no extra accents. `accent` (#9A7B3F) is the only
 * accent and belongs to every CTA and every big scorecard number.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FBFAF7", // warm paper
        surface: "#FFFFFF",
        ink: "#1A1814",
        muted: "#6B6659",
        accent: "#9A7B3F", // the ONLY accent
        border: "#E7E3D8",
      },
      fontFamily: {
        // Wired to next/font CSS variables in app/layout.tsx
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // The single allowed shadow token.
        card: "0 1px 3px rgba(26, 24, 20, 0.06), 0 8px 24px rgba(26, 24, 20, 0.04)",
      },
      fontVariantNumeric: {
        tabular: "tabular-nums",
      },
    },
  },
  plugins: [],
};

export default config;
