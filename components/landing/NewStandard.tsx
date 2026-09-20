import { InkPanel } from "@/components/ui/ink-panel";
import { SectionHead } from "@/components/ui/section-head";

/**
 * Future / urgency — the early-mover argument, in the ink treatment so it
 * lands as the page's one heavy beat before the closing CTA. No dates, no
 * scarcity theatre; the urgency is the trend itself.
 */
export default function NewStandard() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <InkPanel>
          <SectionHead
            tone="ink"
            eyebrow="Where this is going"
            title="AI-Powered Lead Conversion Is Becoming the New Standard."
            lede="The businesses that implement AI into their sales and follow-up processes early will have an advantage over businesses still relying entirely on manual response and follow-up."
          />
        </InkPanel>
      </div>
    </section>
  );
}
