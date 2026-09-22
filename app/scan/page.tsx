import type { Metadata } from "next";
import { BRAND_NAME } from "@/config/brand";
import { ScanProvider } from "@/components/ScanContext";
import PageBody from "@/components/PageBody";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import BookCall from "@/components/BookCall";

export const metadata: Metadata = {
  title: `Free scan + quiz — ${BRAND_NAME}`,
  description:
    "A free 30-second scan of your real site data, then six questions on what happens after a lead reaches you. See where enquiries leak away — no signup to see your results.",
};

/**
 * /scan — the free scan + internal-leaks quiz. This WAS the home page; it
 * moved here when the VSL landing page took the root (see app/page.tsx).
 * Nothing about the flow changed — outreach that should start with the
 * scan now links to SCAN_URL instead of the root.
 *
 * It has TWO MODES (see components/PageBody):
 *
 * PITCH (nobody has scanned yet) — deliberately just the hero: the
 * question, one line, the two-field form, centred, then the footer.
 * Nothing else. (How-it-works, the quiz teaser, the FAQ and the closing
 * CTA used to sit under it; they were cut so the page is one thing.)
 *
 * REPORT (a scan completed) — the page becomes a document about THEIR
 * business, on plain paper: the results, then what still stands between
 * them and booking — the remaining objections → one door.
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
          pitch={null}
          report={
            <>
              {/* Only the objections that still block a booking. */}
              <Faq mode="report" />
              {/* The ONE action on the post-scan page. */}
              <BookCall />
            </>
          }
        />
      </main>
    </ScanProvider>
  );
}
