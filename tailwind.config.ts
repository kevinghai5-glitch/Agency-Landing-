import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/**
 * Hard restraint budget. The palette below is the ENTIRE allowed color set.
 * No blues, no gradients, no extra accents. `accent` (#9A7B3F) is the only
 * accent and belongs to every CTA and every big scorecard number.
 *
 * The aurora keyframes + color-variables plugin exist for
 * components/ui/aurora-background.tsx — the plugin exposes every Tailwind
 * color as a CSS variable (e.g. var(--accent)) so the aurora gradients can
 * be written in palette tokens instead of hardcoded hex.
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
      animation: {
        // Transform-based, NOT background-position. Animating a gradient's
        // position re-rasterizes the whole blurred/blended layer every
        // frame; translating a pre-rendered layer is compositor-only work.
        aurora: "aurora 60s linear infinite alternate",
      },
      keyframes: {
        aurora: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// Adds each Tailwind color as a global CSS variable, e.g. var(--accent).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
