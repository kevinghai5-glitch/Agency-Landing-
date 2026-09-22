import type { Config } from "tailwindcss";

/**
 * THE DOCUMENT SYSTEM. The site, the proposal and the go-live manual are
 * one company, so the site uses the documents' tokens — this list is the
 * ENTIRE allowed colour set. If a colour isn't here it shouldn't be on
 * the site. `accent` is the only accent.
 *
 * THE VALUES LIVE IN app/globals.css, as RGB channels on :root (light,
 * the documents' palette) and :root[data-theme="dark"] (the dark theme
 * the footer toggle switches to). Every class here reads its variable, so
 * `bg-surface`, `text-ink`, `bg-ink/80` … all flip with the theme and
 * opacity modifiers keep working. `dark:` variants key off the same
 * attribute for the few places a plain token flip isn't enough.
 *
 * Geometry: 4px on cards/panels/inputs, 3px on buttons, pills only get
 * `rounded-full`. `rounded-lg`/`xl` are deliberately NOT defined — 8px is
 * the single thing that made the site read softer than the documents.
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: v("bg"), // page ground
        surface: v("surface"), // cards, panels
        "surface-2": v("surface-2"), // bands, muted fills
        ink: v("ink"), // text, dark panels
        muted: v("muted"), // ink-muted: secondary text
        accent: v("accent"), // buttons, rules, dots
        "accent-text": v("accent-text"), // labels, links on light
        "accent-tint": v("accent-tint"), // pill fills
        border: v("border"), // every hairline
        critical: v("critical"), // loss / negative states only
        // On ink grounds:
        "on-ink-accent": v("on-ink-accent"),
        "on-ink-muted": v("on-ink-muted"),
        "on-ink-rule": v("on-ink-rule"),
        // A second panel step (dividers, hairlines inside panels).
        "panel-2": v("panel-2"),
      },
      fontFamily: {
        // Wired to next/font CSS variables in app/layout.tsx. ONE family:
        // Plus Jakarta Sans — headings 600, body 500, labels 600/700.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Shadows are spent only on things that FLOAT (phone, scene cards,
        // drawn frames) — never on cards inside a panel.
        card: "0 1px 3px rgba(26, 24, 20, 0.06), 0 8px 24px rgba(26, 24, 20, 0.04)",
        soft: "0 1px 2px rgba(26, 24, 20, 0.06)",
        float: "0 24px 50px rgba(26, 24, 20, 0.16), 0 2px 6px rgba(26, 24, 20, 0.06)",
        phone: "0 40px 80px rgba(26, 24, 20, 0.22), 0 8px 20px rgba(26, 24, 20, 0.12)",
        panelcard: "0 20px 50px rgba(26, 24, 20, 0.08)",
      },
      animation: {
        // The demo's framer-motion entrance (0.3s delay, 0.8s ease-in-out,
        // 40px rise) as CSS — no runtime shipped for one effect. `both`
        // holds the start state through the delay.
        "fade-up": "fade-up 0.8s ease-in-out 0.3s both",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};

export default config;
