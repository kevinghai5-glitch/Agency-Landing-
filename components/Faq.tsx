"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ui/section-head";

/**
 * Section 9 — FAQ accordion, 6 items. Opens and closes with no animation
 * (the plus icon rotates, nothing else). No dollar figures, no
 * hype vocabulary, never the word "guaranteed" — the paid done-for-you
 * service is stated plainly as the business model, nothing more.
 */
const ITEMS = [
  {
    q: "Is it really free?",
    a: "Yes. The scan and the 15-minute walkthrough are both free, no strings.",
  },
  {
    q: "What's the catch?",
    a: "I make money when owners want their leaks fixed for them — that's the done-for-you build and monthly management I sell. The scan and the call cost nothing either way, and if there's nothing worth fixing, I'll tell you.",
  },
  {
    q: "What happens on the call?",
    a: "Two minutes on what I could see from outside, then questions about how leads get handled once they reach you — and we put a real monthly number on what's slipping. If it's worth fixing, I show you what the build looks like and what it costs. If it isn't, I'll say so.",
  },
  {
    q: "What data are you pulling?",
    a: "Public Google data — your site's mobile speed and your Google Business listing. Nothing private, and nothing you didn't just point me at by typing in your site.",
  },
  {
    q: "What if my site's already fine?",
    a: "Then your results will say so — I don't invent problems. But a fine site isn't the same as nothing leaking: most of it happens after someone reaches out, where no scan can look. If the six questions came back clean too, don't book — I'd rather you know you're fine than pay for something you don't need.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. It's plain English, no jargon — in your results and on the call.",
  },
] as const;

/**
 * Post-scan, most of these are answered: they've seen the scan is free, seen
 * the data, seen whether their site is fine. Only the objections that still
 * stand between them and booking survive — in the order a hesitating owner
 * actually thinks them.
 */
const REPORT_QUESTIONS = [
  "What happens on the call?",
  "What's the catch?",
  "What if my site's already fine?",
] as const;

export default function Faq({
  mode = "full",
}: {
  /** "report" trims to the call-relevant objections (post-scan). */
  mode?: "full" | "report";
}) {
  // All collapsed on load — a pre-opened first item reads as a page that was
  // left mid-interaction. Same component serves the pitch page and the
  // post-scan report, so this covers both.
  const [open, setOpen] = useState<number | null>(null);
  const items =
    mode === "report"
      ? REPORT_QUESTIONS.map(
          (q) => ITEMS.find((i) => i.q === q)!,
        )
      : ITEMS;

  return (
    <section className="mx-auto max-w-[1600px] px-5 pt-9 sm:px-8 xl:px-12">
      <div className="panel">
        <SectionHead title="FAQ" className="mb-5" />
        <ul className="flex flex-col gap-2">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="on-panel flex w-full items-center justify-between gap-4 rounded-2xl bg-surface px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold text-ink">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`flex-none text-accent transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <PlusIcon />
                  </span>
                </button>
                {/* Closed answers are display:none — not opacity 0 — so
                    they are hidden from screen readers and find-in-page too,
                    and the panel holds no invisible text at rest. */}
                <div id={`faq-${i}`} hidden={!isOpen} className="pb-5">
                  <p className="max-w-[68ch] px-5 pb-2 pt-3 text-base leading-relaxed text-muted">
                    {item.a}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 3.75V14.25M3.75 9H14.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
