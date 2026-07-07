"use client";

import { useEffect, useState } from "react";

/**
 * The live scan state. NOT a spinner — an animated checklist that ticks through
 * real steps while the API works. Designed to run ~3–8s and gracefully hold up
 * to ~12s (PageSpeed can be slow). If the API outruns the animation, the last
 * step holds with a subtle pulse until the parent swaps in the scorecard.
 */

const STEPS = [
  "Loading your site…",
  "Testing mobile speed…",
  "Pulling your Google reviews…",
  "Checking your booking flow…",
] as const;

// Time before each step "completes". Spaced so the sequence lands around ~7s,
// with the final step left pulsing until real data arrives.
const STEP_DELAYS_MS = [1200, 2800, 4600, 6600];

export default function ScanChecklist() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const timers = STEP_DELAYS_MS.map((delay, i) =>
      setTimeout(() => setCompleted((c) => Math.max(c, i + 1)), delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto" role="status" aria-live="polite">
      <ul className="flex flex-col gap-4">
        {STEPS.map((label, i) => {
          const done = i < completed;
          // The active step is the first not-yet-done step; it pulses while
          // waiting so a slow API never looks frozen.
          const active = i === completed;
          return (
            <li
              key={label}
              className={`flex items-center gap-3 text-base ${
                done ? "text-ink" : active ? "text-ink" : "text-muted"
              }`}
            >
              <span
                aria-hidden
                className={`flex-none grid place-items-center w-6 h-6 rounded-full border transition-colors ${
                  done
                    ? "bg-accent border-accent text-surface"
                    : "border-border text-transparent"
                } ${active && !done ? "animate-soft-pulse border-accent" : ""}`}
              >
                {done ? <CheckIcon /> : null}
              </span>
              <span className={active && !done ? "animate-soft-pulse" : ""}>
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 3.5L5.5 10L2.5 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
