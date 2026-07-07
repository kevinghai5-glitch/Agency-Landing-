"use client";

import ScanForm, { type ScanFormValues } from "./ScanForm";
import { useScan } from "./ScanContext";

/**
 * Section 10 — repeat the tool. Restates the promise + risk-reversal, then the
 * SAME form component as the hero. A convinced scroller acts here without
 * scrolling back up: submitting runs the same scan and reveals the scorecard at
 * the hero, then we scroll them there to see it.
 */
export default function FinalCta() {
  const { phase, runScan } = useScan();

  async function handleSubmit(values: ScanFormValues) {
    // Kick off the shared scan, then move the user to where results render.
    void runScan(values);
    document.getElementById("scan")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink">
          Find your leaks in 30 seconds — free, and yours to keep either way.
        </h2>
        <div className="mt-10">
          <ScanForm
            onSubmit={handleSubmit}
            idPrefix="final"
            pending={phase === "scanning"}
          />
        </div>
      </div>
    </section>
  );
}
