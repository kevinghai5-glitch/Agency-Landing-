/**
 * B · The missed call — the most important block on the page. One
 * concrete evening, five timestamps, plain English. Mono times on the
 * left, a 1px rule with gold nodes, the event on the right. No product
 * names: the visitor should see the sequence, not the features.
 */
const TIMELINE = [
  {
    t: "6:47 PM",
    text: "A homeowner calls. Your crew is on a job. Nobody answers.",
  },
  {
    t: "6:47 PM",
    text: "She gets a text: “Sorry we missed you — this is [Business]. What’s going on?”",
  },
  { t: "6:51 PM", text: "She replies, and says what she needs." },
  { t: "6:52 PM", text: "Your phone buzzes. Her number, and what she said." },
  { t: "7:02 PM", text: "Booked for tomorrow at 9." },
] as const;

import { SectionHead } from "@/components/ui/section-head";

export default function MissedCall() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <SectionHead
          eyebrow="The missed call"
          title="What it actually looks like."
          lede="One missed call, on a Tuesday evening."
        />

        <ol className="mt-10 max-w-xl mx-auto">
          {TIMELINE.map((step, i) => {
            const last = i === TIMELINE.length - 1;
            return (
              <li
                key={`${step.t}-${i}`}
                className="grid grid-cols-[4.5rem_1rem_1fr] sm:grid-cols-[5.5rem_1rem_1fr] gap-x-3 sm:gap-x-4"
              >
                <span className="mono-label text-accent-text pt-[0.45rem] text-right">
                  {step.t}
                </span>

                {/* node + connecting rule */}
                <span className="relative flex justify-center" aria-hidden="true">
                  {!last && (
                    <span className="absolute top-[0.55rem] bottom-0 w-px bg-border" />
                  )}
                  <span className="absolute top-[0.55rem] h-2 w-2 rounded-full bg-accent" />
                </span>

                <p className={`text-ink text-base sm:text-lg leading-relaxed ${last ? "" : "pb-6"}`}>
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>

        <p className="text-muted text-base sm:text-lg leading-relaxed mt-8 max-w-xl mx-auto text-center text-balance">
          Without it, she called the next company on the list — and
          you&apos;d never have known she called at all.
        </p>
      </div>
    </section>
  );
}
