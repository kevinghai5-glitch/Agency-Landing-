"use client";

import { useState } from "react";

/**
 * Section 9 — FAQ accordion, 5 items. The accordion open/close is the only
 * animation permitted here besides the scan checklist.
 */
const ITEMS = [
  {
    q: "Is it really free?",
    a: "Yes. The scan and the full report are both free, no strings.",
  },
  {
    q: "What's the catch?",
    a: "I make money when businesses want their leaks fixed — that's a paid service I offer. The report is yours either way, and if there's nothing worth fixing, I'll tell you.",
  },
  {
    q: "What data are you pulling?",
    a: "Public Google data — your site's mobile speed and your Google Business listing. Nothing private, and nothing you didn't just point me at by typing in your site.",
  },
  {
    q: "What if my site's already fine?",
    a: "Then the report will say so, and I'll tell you straight. I'd rather you know it's fine than pay for something you don't need.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. It's plain English, no jargon. If a report ever needs a translator, it's a bad report.",
  },
] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-20 sm:py-28 bg-surface border-y border-border">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center mb-12">
          Questions
        </h2>
        <ul className="flex flex-col divide-y divide-border border-y border-border">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-ink text-lg font-medium">
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
                <div
                  className={`grid transition-all duration-200 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-muted text-base leading-relaxed">
                      {item.a}
                    </p>
                  </div>
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
