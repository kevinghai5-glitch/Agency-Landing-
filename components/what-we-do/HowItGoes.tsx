import { InkSequence } from "@/components/ui/ink-panel";
import { SectionHead } from "@/components/ui/section-head";

/**
 * E · How it goes — three numbered steps from call to live, as an ink
 * sequence (the same component as the 01–05 walkthrough panel on /scan).
 * "Two weeks" is the one time commitment on the page; no pricing, no
 * dollar figures.
 */
const STEPS = [
  {
    title: "Strategy call",
    detail:
      "Thirty minutes. We find where your leads are dying. You'll know whether this applies to you before the call ends.",
  },
  {
    title: "Build",
    detail:
      "Two weeks. Set up in your business's name, with every piece tested before it touches a customer.",
  },
  {
    title: "Go-live",
    detail:
      "A walkthrough on Zoom. You get a login, an app on your phone, and a report every month showing what it caught.",
  },
] as const;

export default function HowItGoes() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <SectionHead eyebrow="How it goes" title="Live in two weeks." />
        <InkSequence items={STEPS} className="mt-9" />
      </div>
    </section>
  );
}
