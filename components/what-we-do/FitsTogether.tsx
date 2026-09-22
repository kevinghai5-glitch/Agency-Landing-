"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 03 · THE MAP — five doors into one pipeline, drawn as flowing HTML.
 *
 *   FIVE WAYS IN            five boxes in a row
 *        │                  a 2px brass connector
 *   THE SAME CHAIN          an ink band: contact · text+email · card
 *        │
 *   YOUR PIPELINE           a brass spine; each stage in the SAME grid
 *                           row as what it sets off
 *   OFF THE BOARD           the two that never touch the spine
 *
 * NO position:absolute, no SVG, no hand-placed coordinates — three earlier
 * versions broke that way. The stage dot sits on the spine by a -7px
 * margin, so the spine stays straight at any width. Every workflow name
 * is a text button that opens that demo in the grid above.
 */
type Rich = (string | { id: string; label: string })[];

const WAYS: { id: string; label: string; fits?: boolean }[] = [
  { id: "instant-lead-response", label: "A form fill" },
  { id: "missed-call-text-back", label: "A missed call" },
  { id: "after-hours-auto-reply", label: "After hours" },
  { id: "webchat-capture", label: "Webchat", fits: true },
  { id: "social-dm-capture", label: "A social DM", fits: true },
];

const CHAIN = ["Contact created", "Text and email sent", "Card opens on the board"];

const STAGES: { name: string; muted?: boolean; text: Rich }[] = [
  {
    name: "New Lead",
    muted: true,
    text: ["Every enquiry lands here, whichever door it came through."],
  },
  {
    name: "Qualified",
    text: [
      { id: "owner-hot-lead-alert", label: "Owner Hot‑Lead Alert" },
      " — your phone buzzes with her number and what she said.",
    ],
  },
  {
    name: "Quote Sent",
    text: [
      { id: "estimate-follow-up", label: "Estimate Follow‑Up" },
      " — four touches over sixteen days, then it hands her to the nurture rather than stopping dead.",
    ],
  },
  {
    name: "Booked",
    text: [
      { id: "arrival-confirmation", label: "Arrival Confirmation + Reminders" },
      ", with ",
      { id: "cancellation-guard", label: "Cancellation Guard" },
      " and ",
      { id: "missed-visit-recovery", label: "Missed Visit Recovery" },
      " behind it.",
    ],
  },
  { name: "Showed", muted: true, text: ["Nothing fires. You’re standing on the roof."] },
  {
    name: "Won",
    text: [
      { id: "review-request", label: "Review Request" },
      " and ",
      { id: "deposit-by-text", label: "Deposit by Text" },
      ".",
    ],
  },
  {
    name: "Lost",
    text: [{ id: "sixty-day-nurture", label: "60‑Day Nurture" }, " runs until here, then stops."],
  },
];

const OFF_THE_BOARD: Rich = [
  { id: "database-reactivation", label: "Database Reactivation" },
  " works a list you already have and drops people back in at New Lead. ",
  { id: "review-response", label: "Review Response" },
  " runs on your Google listing and never touches the pipeline.",
];

export default function FitsTogether({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div>
      {/* part 1 · five ways in */}
      <p className="mb-3 text-[13px] font-bold text-accent-text">Five ways in</p>
      <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-5">
        {WAYS.map((w) => (
          <li key={w.id}>
            <button
              type="button"
              onClick={() => onOpen(w.id)}
              className="flex min-h-[52px] w-full flex-col justify-center gap-0.5 rounded-2xl bg-surface px-4 py-3.5 text-left text-[15px] font-semibold leading-snug text-ink shadow-soft transition-shadow hover:shadow-panelcard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <span className={w.fits ? "text-muted" : ""}>{w.label}</span>
              {w.fits && (
                <span className="text-xs font-bold text-muted">
                  If it fits
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <Connector />

      {/* part 2 · the chain */}
      <div className="rounded-[20px] bg-ink px-5 py-5 md:px-[26px]">
        <p className="text-[13px] font-bold text-on-ink-accent">
          The same chain, built once
        </p>
        <ul className="mt-2.5 grid grid-cols-1 gap-1.5 text-[15px] font-semibold leading-snug text-bg md:grid-cols-3 md:gap-6">
          {CHAIN.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <Connector />

      {/* part 3 · the pipeline */}
      <p className="mb-3 text-[13px] font-bold text-accent-text">
        Your pipeline — and what each stage sets off
      </p>
      <ol className="border-l-2 border-accent">
        {STAGES.map((s) => (
          <li
            key={s.name}
            className="grid grid-cols-1 gap-y-1.5 border-b border-panel-2 py-[15px] last:border-b-0 md:grid-cols-[200px_minmax(0,1fr)] md:items-center md:gap-x-6"
          >
            <div className="flex items-center gap-3.5 -ml-[7px]">
              <span aria-hidden="true" className="h-3 w-3 flex-none rounded-full bg-accent" />
              <span className="text-[17px] font-bold leading-snug tracking-[-0.02em] text-ink">
                {s.name}
              </span>
            </div>
            <p className={cn("pl-[19px] text-[15px] leading-[1.5] md:pl-0", s.muted ? "text-muted" : "text-ink")}>
              <RichText parts={s.text} onOpen={onOpen} />
            </p>
          </li>
        ))}
      </ol>

      {/* final row, outside the spine */}
      <div className="mt-0.5 grid grid-cols-1 gap-y-1.5 border-t border-panel-2 pt-[15px] md:grid-cols-[200px_minmax(0,1fr)] md:gap-x-6">
        <p className="text-[13px] font-bold text-muted md:pt-1">Off the board</p>
        <p className="text-[15px] leading-[1.5] text-muted">
          <RichText parts={OFF_THE_BOARD} onOpen={onOpen} />
        </p>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex justify-center py-1.5">
      <span className="h-[30px] w-[2px] bg-accent" />
    </div>
  );
}

/** Plain text with workflow names as inline text buttons. The negative
 *  vertical margin gives each a 44px hit area without moving the line. */
function RichText({ parts, onOpen }: { parts: Rich; onOpen: (id: string) => void }): ReactNode {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <button
            key={i}
            type="button"
            onClick={() => onOpen(part.id)}
            className="-my-[11px] inline rounded-md py-[11px] font-bold text-ink decoration-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {part.label}
          </button>
        ),
      )}
    </>
  );
}
