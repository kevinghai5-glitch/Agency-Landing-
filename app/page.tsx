import { AuroraBackground } from "@/components/ui/aurora-background";
import LandingHero from "@/components/landing/LandingHero";
import Proof from "@/components/landing/Proof";
import WhatWeDoTeaser from "@/components/landing/WhatWeDoTeaser";
import NewStandard from "@/components/landing/NewStandard";
import LandingFinalCta from "@/components/landing/LandingFinalCta";

/**
 * / — the VSL landing page. One of the three funnel pages in the nav
 * (config/brand.ts NAV_LINKS); the other two are /what-we-do and /scan.
 *
 * Section order is FIXED:
 *   1. Hero — headline, one-line how, the VSL, "Book a Strategy Call" +
 *      the revenue-on-the-table qualifier.
 *   2. Proof — case studies / testimonials. Renders nothing until
 *      config/proof.ts has real entries.
 *   3. What we do — a pointer to /what-we-do, not the content.
 *   4. New standard — the early-mover urgency beat.
 *   5. Final CTA — "Book a Strategy Call" again.
 *
 * No scan state on this page — no ScanProvider, no forms of any kind. The
 * scan + quiz live at /scan and keep their own two-mode pitch/report page.
 *
 * COPY RULES carry over from the scan page: no precise invented dollar
 * figures, no service pricing, no "guaranteed", no hype vocabulary, no
 * promise of an emailed report. This page sells the system through the
 * video; the copy around it stays short.
 */
export default function Page() {
  return (
    <main>
      <LandingHero />
      <AuroraBackground>
        <Proof />
        <WhatWeDoTeaser />
        <NewStandard />
        <LandingFinalCta />
      </AuroraBackground>
    </main>
  );
}
