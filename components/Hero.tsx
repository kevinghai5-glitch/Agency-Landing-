"use client";

import ScanFlow from "./ScanFlow";
import { useScan } from "./ScanContext";

/**
 * /scan hero — leads with the QUESTION, not the offer.
 *
 * Pre-scan the page IS this: the headline, one sentence and the form,
 * centred, with nothing below but the footer. Post-scan the hero becomes
 * the identity header ("What we found for [Business]") and the real
 * results render full-width in the same place.
 */
export default function Hero() {
  const { phase, known } = useScan();
  const isReport = phase === "results";
  const business = known?.businessName?.trim();
  const website = known?.website?.trim();

  if (isReport) {
    return (
      <section className="mx-auto max-w-[1600px] px-5 pb-10 pt-6 sm:px-8 xl:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Scan results</span>
          <h1 className="mt-4 text-ink text-[34px] sm:text-[48px]">
            What we found for {business || "your business"}
          </h1>
          {website && (
            <p className="mt-3 text-sm text-muted">{website} · public data only, nothing private</p>
          )}
        </div>
        <div className="mt-8">
          <ScanFlow />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto my-auto flex w-full max-w-[760px] items-center px-5 py-10 sm:px-8 xl:px-12 sm:py-14">
      <div className="w-full text-center">
        <h1 className="text-ink text-[40px] sm:text-[52px] lg:text-[64px]">
          Do you know how many of last month&apos;s enquiries{" "}
          <em className="not-italic text-accent">actually</em> became customers?
        </h1>
        <p className="mx-auto mt-6 max-w-[46ch] text-[19px] leading-[1.45] text-muted">
          Most owners don&apos;t. That gap is where the money is — and it
          isn&apos;t on your website. Start with a free 30-second scan of
          what&apos;s visible from outside.
        </p>
        <div className="mx-auto mt-8 max-w-[560px] text-left">
          <ScanFlow />
        </div>
      </div>
    </section>
  );
}
