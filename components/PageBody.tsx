"use client";

import type { ReactNode } from "react";
import { useScan } from "./ScanContext";

/**
 * The page has TWO MODES, and everything below the hero swaps between them:
 *
 *   pitch  — nobody has scanned yet. The marketing case: reframe, how it
 *            works, what the walkthrough covers, proof, FAQ, repeat the tool.
 *   report — a scan has completed. The page becomes a DOCUMENT about their
 *            business. Sections that argue for running a scan are gone (they
 *            already ran it) and the only action left is booking the call.
 *
 * Why a swap and not conditional copy: post-scan, "How it works → step 1:
 * run the instant scan" and the bottom "Find your leaks in 30 seconds" form
 * are factually wrong — they address someone who hasn't scanned. Rewording
 * them everywhere is more code and still reads like leftovers.
 *
 * Both trees are built as server components in app/page.tsx and passed in as
 * props; this client component only picks which one renders.
 */
export default function PageBody({
  pitch,
  report,
}: {
  pitch: ReactNode;
  report: ReactNode;
}) {
  const { phase } = useScan();
  return <>{phase === "results" ? report : pitch}</>;
}
