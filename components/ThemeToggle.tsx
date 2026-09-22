"use client";

import { useEffect, useState } from "react";

/**
 * The footer's light/dark switch. Sets data-theme on <html> (the palette in
 * globals.css keys off it) and remembers the choice in localStorage; the
 * inline script in app/layout.tsx re-applies it before first paint so a
 * dark visitor never sees a white flash. Light is the default — the site's
 * own look — and the toggle is the only way in or out of dark.
 */
export const THEME_KEY = "reclaimedhq:theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // The <html> attribute is set before hydration; read it once mounted.
  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* private mode: the choice just doesn't persist */
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="group relative inline-flex h-[30px] w-[56px] flex-none items-center rounded-full bg-surface-2 shadow-[inset_0_1px_3px_rgba(26,24,20,.12)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:shadow-[inset_0_1px_3px_rgba(0,0,0,.5)]"
    >
      {/* the two icons sit in the track; the knob covers the active one */}
      <SunIcon className="absolute left-[8px] h-[14px] w-[14px] text-accent-text" />
      <MoonIcon className="absolute right-[8px] h-[14px] w-[14px] text-muted" />
      <span
        aria-hidden="true"
        className={`absolute top-[3px] left-[3px] grid h-6 w-6 place-items-center rounded-full bg-surface shadow-[0_1px_3px_rgba(26,24,20,.25)] transition-transform duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none ${
          dark ? "translate-x-[26px]" : ""
        }`}
      >
        {dark ? (
          <MoonIcon className="h-[13px] w-[13px] text-accent-text" />
        ) : (
          <SunIcon className="h-[13px] w-[13px] text-accent-text" />
        )}
      </span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5a.6.6 0 0 0-.7-.8A9.5 9.5 0 1 0 21.3 15.9a.6.6 0 0 0-.8-.7z" />
    </svg>
  );
}
