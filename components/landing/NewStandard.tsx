import { InkPanel } from "@/components/ui/ink-panel";

/**
 * Future / urgency — the early-mover argument, in the ink treatment so it
 * lands as the page's one heavy beat before the closing CTA. No dates, no
 * scarcity theatre; the urgency is the trend itself.
 */
export default function NewStandard() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <InkPanel className="text-center">
          <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-bg text-balance">
            AI-Powered Lead Conversion Is Becoming the New Standard.
          </h2>
          <p className="text-bg/75 text-lg leading-relaxed mt-5 max-w-xl mx-auto text-balance">
            The businesses that implement AI into their sales and follow-up
            processes early will have an advantage over businesses still
            relying entirely on manual response and follow-up.
          </p>
        </InkPanel>
      </div>
    </section>
  );
}
