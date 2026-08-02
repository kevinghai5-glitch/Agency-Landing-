"use client";

import KineticGrid from "@/components/ui/kinetic-grid";
import ScanFlow from "./ScanFlow";
import { useScan } from "./ScanContext";

/**
 * Section 1 — the tool IS the hero. No stock photo, no hero image competing
 * with the input. Pre-scan the headline sets the stakes above the form.
 *
 * POST-SCAN the headline is replaced by an identity header — "What we found
 * for [Business]" plus the domain — so a skeptic gets immediate confirmation
 * we looked at THEM. The old headline sells a scan they already ran.
 *
 * The KineticGrid canvas sits behind in the "paper" theme — same palette the
 * page already uses. Everything marked data-quiet is a quiet zone (the form,
 * and every results section) so warp/glow/ripples never compete with
 * content. The flanks beside those boxes stay live on purpose.
 */
export default function Hero() {
  const { phase, known } = useScan();
  const isReport = phase === "results";
  const business = known?.businessName?.trim();
  const website = known?.website?.trim();

  return (
    <KineticGrid globalColor="paper" quietSelector="[data-quiet]">
      <section className="px-5 pt-12 pb-10 sm:pt-16 sm:pb-12">
        <div className="max-w-2xl mx-auto text-center" data-quiet="">
          {isReport ? (
            <>
              <h1 className="font-serif text-3xl sm:text-5xl leading-[1.1] tracking-tight text-ink text-balance">
                What we found for {business || "your business"}
              </h1>
              {website && (
                <p className="text-muted text-base sm:text-lg leading-relaxed mt-4">
                  {website} · public data only, nothing private
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className="font-serif text-3xl sm:text-5xl leading-[1.1] tracking-tight text-ink text-balance">
                See where your business is losing the leads you already pay
                for — in 30 seconds.
              </h1>
              <p className="text-muted text-lg sm:text-xl leading-relaxed mt-5 max-w-xl mx-auto text-balance">
                Instant. Free. Built from your real site data. No signup to
                see your results.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 sm:mt-10">
          <ScanFlow />
        </div>
      </section>
    </KineticGrid>
  );
}
