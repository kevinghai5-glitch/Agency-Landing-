"use client";

import { useMemo } from "react";
import ScanForm from "./ScanForm";
import ScanChecklist from "./ScanChecklist";
import Scorecard from "./Scorecard";
import Recurrence from "./Recurrence";
import InternalLeaksQuiz from "./InternalLeaksQuiz";
import BookCall from "./BookCall";
import { useScan } from "./ScanContext";
import { buildFindings } from "@/lib/findings";

/**
 * The hero's interactive region. Reads the shared scan state and renders the
 * right phase in place. The results phase is the highest-intent moment in
 * the funnel and renders four sections in a FIXED order:
 *
 *   A — Scorecard:   every visible leak, ranked, number + mechanism + hedged
 *                    dollar range; clean checks acknowledged.
 *   C — Recurrence:  the visible ranges summed into one monthly figure —
 *                    the OUTSIDE story closes here.
 *   B — Quiz:        the business — the internal-leaks quiz (entry pivot →
 *                    six questions → hedged internal total + transformation).
 *   D — BookCall:    one door. Book the 15-minute walkthrough. Nothing else.
 *
 * Order is outside-story → inside-story → door, and the quiz contains NO
 * booking button of its own, so the page always has exactly ONE CTA.
 *
 * One buildFindings() pass feeds A and C so the card ranges and the summed
 * range can never disagree. This is also the only results view that exists
 * (state + localStorage — no shareable per-scan URLs), so these sections
 * cover every way results can be seen. Quiz answers are client-state only —
 * a reload resets the quiz while the scan results persist.
 */
export default function ScanFlow() {
  const {
    phase,
    result,
    known,
    errorMsg,
    speedPending,
    runScan,
    reset,
    viewPrevious,
  } = useScan();

  const findings = useMemo(
    () => (result ? buildFindings(result) : null),
    [result],
  );

  function handleReset() {
    reset();
    // Return focus to the top of the scan region, where the fresh form mounts.
    document.getElementById("scan")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div id="scan" className="w-full scroll-mt-8">
      {phase === "idle" && (
        <div className="w-full">
          <ScanForm onSubmit={runScan} idPrefix="hero" />
          {result && (
            <div className="max-w-xl mx-auto mt-4 text-center">
              <button
                type="button"
                onClick={viewPrevious}
                className="text-sm text-muted hover:text-ink transition-colors"
              >
                View your previous scan →
              </button>
            </div>
          )}
        </div>
      )}

      {phase === "scanning" && <ScanChecklist />}

      {phase === "error" && (
        <div className="w-full max-w-xl mx-auto">
          <p className="text-ink text-base text-center mb-4">{errorMsg}</p>
          <ScanForm onSubmit={runScan} idPrefix="retry" />
          {result && (
            <div className="max-w-xl mx-auto mt-4 text-center">
              <button
                type="button"
                onClick={viewPrevious}
                className="text-sm text-muted hover:text-ink transition-colors"
              >
                View your previous scan →
              </button>
            </div>
          )}
        </div>
      )}

      {phase === "results" && result && findings && (
        <div className="w-full animate-tick-in">
          <div className="max-w-2xl mx-auto mb-4" data-quiet="">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              ← Scan another site
            </button>
          </div>
          {/* A */}
          <Scorecard
            findings={findings}
            result={result}
            businessName={known?.businessName}
            speedPending={speedPending}
          />
          {/* C — outside story closes */}
          <Recurrence sumLo={findings.sumLo} sumHi={findings.sumHi} />
          {/* B — inside story: the quiz. */}
          <InternalLeaksQuiz category={result.reviews?.category} />
          {/* D1 — the compact catch at peak intent, straight off the quiz.
              The full closing CTA (with the qualification line) still ends
              the page below the questions and the founder block. */}
          <BookCall variant="inline" />
        </div>
      )}
    </div>
  );
}
