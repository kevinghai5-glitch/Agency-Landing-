import { InkPanel } from "@/components/ui/ink-panel";
import { SectionHead } from "@/components/ui/section-head";
import { PROOF } from "@/config/proof";

/**
 * Proof — case studies / testimonials / results, between the hero and
 * "what we do". Data-driven from config/proof.ts and renders NOTHING while
 * that list is empty (it is — no proof exists yet). The section is built so
 * the first real result drops in without touching the page.
 */
export default function Proof() {
  if (PROOF.length === 0) return null;

  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <SectionHead
          eyebrow="Proof"
          title={<>What it looks like when it&apos;s running</>}
        />

        <div className="mt-9 flex flex-col gap-5">
          {PROOF.map((item) => (
            <InkPanel key={`${item.name}-${item.business}`}>
              {item.result && (
                <p className="font-serif font-semibold text-2xl sm:text-3xl text-on-ink-accent leading-snug">
                  {item.result}
                </p>
              )}
              <p className="text-bg text-lg leading-relaxed mt-3">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mono-label text-on-ink-accent mt-4">
                {item.name} · {item.business}
              </p>
            </InkPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
