import { ScanProvider } from "@/components/ScanContext";
import { AuroraBackground } from "@/components/ui/aurora-background";
import PageBody from "@/components/PageBody";
import ChatWidget from "@/components/ChatWidget";
import Hero from "@/components/Hero";
import Reframe from "@/components/Reframe";
import Walkthrough from "@/components/Walkthrough";
import HowItWorks from "@/components/HowItWorks";
import WhatTheCallIs from "@/components/WhatTheCallIs";
import WhyTrust from "@/components/WhyTrust";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";

/**
 * The single inbound funnel page. It has TWO MODES (see components/PageBody):
 *
 * PITCH (nobody has scanned yet) — the marketing case, on the aurora
 * surface. Section order is FIXED — do not reorder.
 *
 * REPORT (a scan completed) — the page becomes a document about THEIR
 * business, on plain paper. Sections that argue for running a scan are gone:
 * the reframe (already proven with their data), "how it works" (steps 1–2
 * are done), "what the walkthrough covers" (the quiz's transformation block
 * does that job better), and the repeat scan form (they're holding results).
 * What survives is what still stands between them and booking:
 * qualification → the remaining objections → the founder → one door.
 *
 * The hero is in both modes: pre-scan it's the headline + form, post-scan it
 * becomes the identity header + the full results (scorecard → recurrence →
 * internal-leaks quiz).
 *
 * COPY RULES — banned on this page:
 *   • Lead-gen language: "get more leads", "generate leads", "grow your
 *     traffic", "get found online".
 *   • Precise invented dollar figures. The RESULTS sections may show dollar
 *     RANGES only — always hedged ("roughly", "at X-typical job values"),
 *     always derived from config/verticals.ts, never a specific number
 *     presented as THEIR number. Static pitch sections stay dollar-free.
 *   • Service pricing / offer copy, hype vocabulary ("skyrocket", "secret"),
 *     and the word "guaranteed" (pricing lives on the call, never here).
 *   • "audit report" as the product noun, and "website optimization" — the
 *     paid product is a done-for-you SYSTEM build + monthly management,
 *     reached through "the 15-minute walkthrough".
 *   • Any promise of an emailed/delivered report — results render on screen,
 *     immediately, and that IS the free artifact.
 */
export default function Page() {
  return (
    <ScanProvider>
      <main>
        {/* Both modes: headline+form, or identity header + results. */}
        <Hero />

        <PageBody
          pitch={
            <AuroraBackground>
              <Reframe />
              <Walkthrough />
              <HowItWorks />
              <WhatTheCallIs />
              <WhyTrust />
              <Faq />
              <FinalCta />
              <Footer />
            </AuroraBackground>
          }
          report={
            <>
              {/* The qualification filter — matters more now, not less. */}
              <WhatTheCallIs />
              {/* Only the objections that still block a booking. */}
              <Faq mode="report" />
              {/* The face, last thing before the door. */}
              <WhyTrust />
              {/* The ONE action on the post-scan page. */}
              <BookCall />
              <Footer />
            </>
          }
        />
      </main>

      {/* Chat widget: pitch mode only. It hides itself once results render,
          so it never shares a page with the booking CTA / calendar embed. */}
      <ChatWidget />
    </ScanProvider>
  );
}
