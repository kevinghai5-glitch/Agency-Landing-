"use client";

import type { ReactNode } from "react";
import { WORKFLOW_BY_ID, type Workflow } from "@/config/workflows";

/**
 * THE DEMO PANEL — one component, driven by config/workflows.ts, rendered
 * inside the modal (DemoDialog) in the approved mock's layout:
 *
 *   HEADER   name · "Starts when …"                       [Close]
 *   SCENE    her side (a drawn browser)  |  11s →  |  her phone
 *   BEATS    three timed lines in paper tiles
 *   PAYOFF   the line, and the hand-off pills (click → that demo)
 *
 * It is a drawn moment, not live data. ⚠️ A2P — the browser "form" is a
 * PICTURE: static <div>s, never <input>/<form>. The only buttons here are
 * Close and the hand-off pills.
 */
export default function DemoPanel({
  workflow,
  onClose,
  onNavigate,
}: {
  workflow: Workflow;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const { scene, beats } = workflow;
  const handoffs = workflow.handsOffTo.map((id) => WORKFLOW_BY_ID[id]).filter(Boolean);

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 px-[26px] pb-4 pt-[22px]">
        <div>
          <h2 id={`demo-title-${workflow.id}`} className="text-[22px] font-bold leading-snug tracking-[-0.02em] text-ink">{workflow.name}</h2>
          <p className="mt-1 text-sm text-muted">Starts when {workflow.trigger}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex-none rounded-full bg-surface-2 px-4 py-[9px] text-[13px] font-bold text-ink hover:bg-panel-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Close
        </button>
      </div>

      {/* SCENE */}
      <div className="grid grid-cols-1 items-center gap-6 px-[26px] pb-6 pt-2 md:grid-cols-[300px_minmax(0,1fr)_240px] md:gap-0">
        {/* her side — a drawn browser (or card, or listing) */}
        <div>
          <Label>{scene.left.label}</Label>
          <div className="overflow-hidden rounded-[18px] bg-surface shadow-[0_20px_44px_rgba(26,24,20,.14)]">
            <div className="flex items-center gap-1.5 bg-surface-2 px-3 py-[9px] text-xs font-bold text-muted">
              <i className="inline-block h-[7px] w-[7px] rounded-full bg-panel-2" />
              <i className="inline-block h-[7px] w-[7px] rounded-full bg-panel-2" />
              <i className="inline-block h-[7px] w-[7px] rounded-full bg-panel-2" />
              <span className="ml-1.5 truncate">{scene.left.caption}</span>
            </div>
            <div className="p-4">
              <b className="mb-2.5 block text-[15px] tracking-[-0.01em]">{scene.left.title}</b>
              {scene.left.fields.map((f) => (
                // A drawn field — a div, deliberately. See the A2P note above.
                <div key={f} className="mb-[7px] rounded-[10px] bg-bg px-[11px] py-[9px] text-[12.5px] leading-snug text-ink">
                  {f}
                </div>
              ))}
              {scene.left.action && (
                <span aria-hidden="true" className="mt-1 inline-block rounded-full bg-accent px-3.5 py-2 text-[12.5px] font-bold text-surface">
                  {scene.left.action}
                </span>
              )}
            </div>
            <div className="px-4 pb-3.5 text-xs font-bold text-accent-text">{scene.left.stamp}</div>
          </div>
        </div>

        {/* the gap */}
        <div className="flex flex-col items-center md:px-[22px]">
          <b className="text-[40px] font-bold leading-none tracking-[-0.04em] text-ink">{scene.elapsed.value}</b>
          <small className="mt-1 text-xs font-bold uppercase text-muted">{scene.elapsed.label}</small>
          <div aria-hidden="true" className="mt-3.5 flex w-full flex-col items-center md:flex-row">
            <i className="h-[7px] w-[7px] flex-none rounded-full bg-accent" />
            <span className="h-[30px] w-[2px] bg-accent md:h-[2px] md:w-auto md:flex-1" />
            <span className="h-0 w-0 border-x-[6px] border-x-transparent border-t-[9px] border-t-accent md:hidden" />
            <span className="hidden h-0 w-0 border-y-[6px] border-y-transparent border-l-[9px] border-l-accent md:block" />
          </div>
        </div>

        {/* her phone */}
        <div>
          <Label>{scene.right.label}</Label>
          <div className="mx-auto w-[220px] rounded-[38px] bg-ink p-2 shadow-[0_24px_50px_rgba(26,24,20,.18)]">
            <div className="flex min-h-[290px] flex-col rounded-[31px] bg-surface px-3 pb-3 pt-3.5">
              <p className="border-b border-panel-2 pb-2.5 text-center text-xs font-bold text-muted">{scene.right.header}</p>
              <div className="mt-3 flex flex-col gap-2.5">
                {scene.right.bubbles.map((b, i) =>
                  b.from === "business" ? (
                    <p key={i} className="max-w-[92%] self-start rounded-[14px] rounded-bl-[4px] bg-accent px-[13px] py-[11px] text-[13px] leading-[1.45] text-surface">
                      {b.text}
                    </p>
                  ) : (
                    <p key={i} className="max-w-[92%] self-end rounded-[14px] rounded-br-[4px] bg-surface-2 px-[13px] py-[11px] text-[13px] leading-[1.45] text-ink">
                      {b.text}
                    </p>
                  ),
                )}
                {scene.right.empty && <p className="text-[13px] leading-relaxed text-muted">{scene.right.empty}</p>}
              </div>
              <p className="mt-2 text-xs font-semibold text-muted">{scene.right.stamp}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BEATS */}
      <ol className="grid grid-cols-1 gap-3 px-[26px] pb-[22px] md:grid-cols-3">
        {beats.map((beat, i) => (
          <li key={`${workflow.id}-${i}`} className="animate-tick-in rounded-[14px] bg-bg px-3.5 py-3 text-[13px]" style={{ animationDelay: `${i * 400}ms` }}>
            <b className="mb-1 block text-xs text-accent-text">{beat.at}</b>
            <Rich text={beat.text} />
          </li>
        ))}
      </ol>

      {/* PAYOFF */}
      <div className="flex flex-col gap-5 px-[26px] pb-[26px] md:flex-row md:items-end md:justify-between">
        <p className="m-0 max-w-[34ch] text-[20px] font-bold leading-snug tracking-[-0.02em] text-ink">{workflow.payoff}</p>
        {handoffs.length > 0 && (
          <div className="flex flex-wrap gap-2 md:justify-end">
            {handoffs.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => onNavigate(h.id)}
                className="rounded-full bg-accent-tint px-3.5 py-2 text-[12.5px] font-bold text-accent-text transition-colors hover:bg-accent hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {h.short} →
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-2.5 text-[13px] font-bold text-accent-text">{children}</p>;
}

/** `**bold**` → <strong>; everything else verbatim. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-bold text-ink">{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
