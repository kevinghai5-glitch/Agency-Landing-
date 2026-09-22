import type { ScanResult } from "@/lib/types";
import type { Findings } from "@/lib/findings";
import { Eyebrow } from "@/components/ui/eyebrow";

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
    <div className="panel mx-auto w-full max-w-3xl">
      <Eyebrow className="mb-5">What 30 seconds found</Eyebrow>

      {allClean && !speedPending ? (
        <p className="mb-6 text-ink text-2xl sm:text-3xl">
          From the outside, {business} looks solid.
        </p>
      ) : null}

      {allClean && speedPending ? (
        <div className="on-panel mb-4 rounded-[22px] bg-surface p-7">
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
            className="on-panel rounded-[22px] bg-surface p-6"
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
