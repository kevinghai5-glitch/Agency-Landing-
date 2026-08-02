import type { ScanResult } from "@/lib/types";
import type { Findings } from "@/lib/findings";

/**
 * SECTION A — "What 30 seconds found". The visible leaks.
 *
 * Renders EVERY leak the findings engine detected (lib/findings.ts), ranked
 * worst-first, each as NUMBER → MECHANISM → MONTHLY FRAME. Dimensions that
 * came back clean get one honest line — "your speed is fine" is what makes
 * the found leaks believable. Ambiguous data never becomes a card.
 *
 * All copy lives in the engine; this component only lays it out. The pivot
 * (Section B), recurrence math (C), and the booking door (D) render below
 * this in ScanFlow.
 */
export default function Scorecard({
  findings,
  result,
  businessName,
  speedPending = false,
}: {
  findings: Findings;
  result: ScanResult;
  businessName?: string;
  /** The background speed audit is still running; its finding may slot in. */
  speedPending?: boolean;
}) {
  const { leaks, cleanLines, allClean } = findings;
  const business = businessName?.trim() || "this business";

  // The speed dimension when the engine had nothing to say about it: either
  // the background audit is still running, or it failed — and we say which.
  // Guessing would be manufacturing; silence would read as a gap.
  const speedNote = !result.speed ? (
    speedPending ? (
      <p className="text-muted text-base leading-relaxed flex items-center gap-2">
        <Spinner />
        Still measuring your site speed — if it&apos;s leaking, it&apos;ll
        show up here.
      </p>
    ) : (
      <p className="text-muted text-base leading-relaxed">
        The speed check didn&apos;t finish this run — no verdict there, and
        we don&apos;t guess.
      </p>
    )
  ) : null;

  return (
    // data-quiet: the hero's KineticGrid suppresses its interactive effects
    // over this box so the findings read without background motion.
    <div className="w-full max-w-2xl mx-auto" data-quiet="">
      <p className="text-sm uppercase tracking-widest text-muted text-center mb-6">
        What 30 seconds found
      </p>

      {allClean && !speedPending ? (
        <p className="font-serif text-2xl sm:text-3xl text-ink leading-snug text-center mb-6">
          From the outside, {business} looks solid.
        </p>
      ) : null}

      {allClean && speedPending ? (
        <div className="bg-surface border border-border rounded-xl p-8 shadow-card mb-6">
          <p className="text-ink text-base leading-relaxed flex items-center gap-2">
            <Spinner />
            Nothing leaking on the outside so far. Measuring how fast{" "}
            {business} loads on a phone…
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {leaks.map((leak) => (
          <div
            key={leak.key}
            className="bg-surface border border-border rounded-xl p-6 shadow-card"
          >
            <div className="flex items-baseline gap-1">
              <span className="stat-number text-5xl sm:text-6xl">
                {leak.stat}
              </span>
              {leak.statSuffix && (
                <span className="stat-number text-2xl sm:text-3xl">
                  {leak.statSuffix}
                </span>
              )}
            </div>
            <p className="text-ink text-base leading-relaxed mt-3">
              {leak.body}
            </p>
          </div>
        ))}

        {(cleanLines.length > 0 || speedNote) && (
          <div className="flex flex-col gap-2 px-1 pt-2">
            {cleanLines.map((line) => (
              <p
                key={line.key}
                className="text-muted text-base leading-relaxed"
              >
                {line.soft ? line.text : <>✓ {line.text}</>}
              </p>
            ))}
            {speedNote}
          </div>
        )}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block w-3 h-3 rounded-full border-2 border-muted border-t-transparent animate-spin shrink-0"
      aria-hidden="true"
    />
  );
}
