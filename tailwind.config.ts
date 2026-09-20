import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/**
 * THE DOCUMENT SYSTEM. The site, the proposal and the go-live manual are
 * one company, so the site uses the documents' tokens — this list is the
 * ENTIRE allowed colour set. If a colour isn't here it shouldn't be on
 * the site. `accent` is the only accent.
 *
 * Geometry: 4px on cards/panels/inputs, 3px on buttons, pills only get
 * `rounded-full`. `rounded-lg`/`xl` are deliberately NOT defined — 8px is
 * the single thing that made the site read softer than the documents.
 *
 * The aurora keyframes + colour-variables plugin exist for
 * components/ui/aurora-background.tsx — the plugin exposes every colour as
 * a CSS variable (e.g. var(--accent)) so gradients can be written in
 * tokens instead of hex.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    borderRadius: {
      none: "0",
      sm: "3px", // buttons
      DEFAULT: "4px", // cards, panels, inputs, the video frame
      full: "9999px", // pills only
    },
    extend: {
      colors: {
        bg: "#FBFAF7", // page ground
        surface: "#FFFFFF", // cards, panels
        "surface-2": "#F4F2EC", // bands, muted fills
        ink: "#1A1814", // text, dark panels
        muted: "#6B6659", // ink-muted: secondary text
        accent: "#9A7B3F", // buttons, rules, dots
        "accent-text": "#7E6229", // mono labels, links on light
        "accent-tint": "#F2ECDD", // pill fills
        border: "#E7E3D8", // every hairline
        critical: "#A8443B", // loss / negative states only
        // On ink grounds:
        "on-ink-accent": "#C9A961",
        "on-ink-muted": "#A5A092",
        "on-ink-rule": "#3A362E",
      },
      fontFamily: {
        // Wired to next/font CSS variables in app/layout.tsx
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        // The single allowed shadow token.
        card: "0 1px 3px rgba(26, 24, 20, 0.06), 0 8px 24px rgba(26, 24, 20, 0.04)",
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

// Adds each Tailwind colour as a global CSS variable, e.g. var(--accent).
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
