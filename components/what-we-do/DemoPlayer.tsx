"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WORKFLOW_BY_ID, type Who, type Workflow } from "@/config/workflows";

/**
 * THE DEMO PLAYER — one component, driven by config/workflows.ts. Renders
 * every one of the fifteen demos; nothing is hand-built per workflow.
 *
 *   TRIGGER        <what starts it>
 *   ────────────────────────────────
 *   0:00  ● step   steps land one at a time, ~900ms apart, fading in
 *   0:04  ● step
 *   ────────────────────────────────
 *   OUTCOME        <one line>              accent-tint band
 *   HANDS OFF TO   [chip] [chip]           clickable → loads that demo
 *
 * Auto-plays once on open; REPLAY restarts it. prefers-reduced-motion
 * renders every step immediately with no animation. It is an animated
 * illustration: no live connection, no "connecting…", no fake account.
 */
const STEP_MS = 900;

export const WHO_DOT: Record<Who, string> = {
  customer: "bg-ink",
  system: "bg-accent",
  owner: "bg-critical",
};

export default function DemoPlayer({
  workflow,
  onNavigate,
  onClose,
}: {
  workflow: Workflow;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const total = workflow.steps.length;
  // `shown` counts revealed steps; the outcome band appears one beat after
  // the last step. `run` bumps to restart the sequence (REPLAY).
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(reduced ? total + 1 : 0);

  useEffect(() => {
    if (reduced) {
      setShown(total + 1);
      return;
    }
    setShown(0);
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= total + 1) window.clearInterval(timer);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [run, reduced, total, workflow.id]);

  const done = shown > total;
  const handoffs = workflow.connects
    .map((id) => WORKFLOW_BY_ID[id])
    .filter(Boolean);

  return (
    <div className="border-t border-border">
      {/* TRIGGER */}
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 px-5 py-4 border-b border-border">
        <span className="mono-label text-accent-text sm:w-[110px] sm:flex-none sm:pt-[0.35rem]">
          Trigger
        </span>
        <p className="text-ink text-base leading-relaxed">{workflow.trigger}</p>
      </div>

      {/* STEPS */}
      <ol className="px-5 py-4 flex flex-col gap-3" aria-live="polite">
        {workflow.steps.slice(0, Math.min(shown, total)).map((step, i) => (
          <li
            key={`${run}-${i}`}
            className={cn(
              "flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4",
              !reduced && "animate-tick-in",
            )}
          >
            <span className="mono-label text-accent-text sm:w-[72px] sm:flex-none sm:text-right sm:pt-[0.45rem]">
              {step.at}
            </span>
            <span className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-[0.55rem] h-2 w-2 flex-none rounded-full",
                  WHO_DOT[step.who],
                )}
              />
              <span className="sr-only">{step.who}: </span>
              <span className="text-ink text-base leading-relaxed">{step.text}</span>
            </span>
          </li>
        ))}
      </ol>

      {/* OUTCOME + HANDS OFF TO */}
      {done && (
        <div
          className={cn(
            "bg-accent-tint px-5 py-4 flex flex-col gap-3",
            !reduced && "animate-tick-in",
          )}
        >
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-6">
            <span className="mono-label text-accent-text sm:w-[110px] sm:flex-none sm:pt-[0.35rem]">
              Outcome
            </span>
            <p className="text-ink text-base leading-relaxed">{workflow.outcome}</p>
          </div>

          {(handoffs.length > 0 || workflow.exitsTo) && (
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-6">
              <span className="mono-label text-accent-text sm:w-[110px] sm:flex-none sm:pt-[0.5rem]">
                Hands off to
              </span>
              <ul className="flex flex-wrap gap-2">
                {handoffs.map((h) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(h.id)}
                      className="mono-label text-accent-text inline-flex items-center min-h-[32px] px-3 rounded-full border border-accent bg-surface hover:bg-accent hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-accent-tint transition-colors"
                    >
                      {h.name} →
                    </button>
                  </li>
                ))}
                {workflow.exitsTo && (
                  <li className="mono-label text-accent-text inline-flex items-center min-h-[32px] px-3 rounded-full border border-dashed border-accent">
                    Exits to {workflow.exitsTo}
                  </li>
                )}
              </ul>
            </div>
          )}

          {workflow.note && (
            <p className="font-mono text-[11px] leading-relaxed text-muted tracking-[0.02em] sm:pl-[calc(110px+1.5rem)]">
              {workflow.note}
            </p>
          )}
        </div>
      )}

      {/* CONTROLS */}
      <div className="flex items-center justify-between gap-4 px-5 py-3 border-t border-border">
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="mono-label text-accent-text min-h-[44px] px-2 -ml-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
        >
          ↻ Replay
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mono-label text-accent-text min-h-[44px] px-2 -mr-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
        >
          Close ↑
        </button>
      </div>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
