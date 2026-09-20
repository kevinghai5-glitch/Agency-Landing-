import { InkSequence } from "@/components/ui/ink-panel";
import { SectionHead } from "@/components/ui/section-head";

/**
 * Section 6 — what the 15-minute walkthrough covers.
 *
 * MIRRORS THE ZOOM SOP's agenda script (Section 4.2) beat for beat, because
 * a promise made here that the call doesn't keep is a broken promise:
 *   audit beat (2 min) → how leads get handled once they arrive → a real
 *   monthly number from their volume + job value → what fixing it looks like
 *   and what it costs → "and if it's not worth fixing, I'll tell you that".
 *
 * DELIBERATELY NOT a website review. The SOP is explicit: "if a prospect
 * finishes this call still thinking your product is website work, the call
 * failed regardless of outcome." Roughly 95% of what's sold is internal, so
 * the visible-site beat is named as the two-minute opener it actually is,
 * never as the substance. No service pricing, no specific dollars here — the
 * price is said out loud ON the call.
 */
/**
 * Rendered as a numbered agenda, not a checklist — the call IS a sequence,
 * and the gold serif numerals are the brand's own premium element (same
 * treatment as the scorecard stats and the How-it-works steps).
 */
const COVERS = [
  {
    title: "A quick pass on the outside",
    detail: "Two minutes on what the scan already showed. Not the main event.",
  },
  {
    title: "Where your leads actually go",
    detail:
      "After hours, missed calls, follow-up, no-shows, the list nobody re-contacts.",
  },
  {
    title: "A real monthly number",
    detail:
      "Built live from your lead volume and what a job is actually worth to you.",
  },
  {
    title: "What fixing it costs",
    detail: "Exactly what the build looks like, and the price — said out loud.",
  },
  {
    title: "Or: nothing's worth fixing",
    detail: "Then I tell you that, and you've lost fifteen minutes.",
  },
] as const;

export default function Walkthrough() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <SectionHead
          eyebrow="The call"
          title="What the walkthrough covers"
          lede={
            <>
              The scan showed the outside. The walkthrough is mostly about
              the part it couldn&apos;t see — what happens to a lead after
              it reaches you — and it ends with a real monthly number built
              from your figures, not estimates.
            </>
          }
        />

        <InkSequence items={COVERS} className="mt-9" />
      </div>
    </section>
  );
}

