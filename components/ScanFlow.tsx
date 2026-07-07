"use client";

import ScanForm from "./ScanForm";
import ScanChecklist from "./ScanChecklist";
import Scorecard from "./Scorecard";
import Gate from "./Gate";
import { useScan } from "./ScanContext";

/**
 * The hero's interactive region. Reads the shared scan state and renders the
 * right phase in place, keeping section order fixed (1 hero → 2 checklist →
 * 3 scorecard → 4 gate). The gate stays hidden until a scan completes.
 */
export default function ScanFlow() {
  const { phase, result, known, errorMsg, runScan } = useScan();

  return (
    <div id="scan" className="w-full scroll-mt-8">
      {phase === "idle" && (
        <ScanForm onSubmit={runScan} idPrefix="hero" />
      )}

      {phase === "scanning" && <ScanChecklist />}

      {phase === "error" && (
        <div className="w-full max-w-xl mx-auto">
          <p className="text-ink text-base text-center mb-4">{errorMsg}</p>
          <ScanForm onSubmit={runScan} idPrefix="retry" />
        </div>
      )}

      {phase === "results" && result && (
        <div className="w-full animate-tick-in">
          <Scorecard result={result} />
          <Gate known={known} />
        </div>
      )}
    </div>
  );
}
