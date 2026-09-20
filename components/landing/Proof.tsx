import { InkPanel } from "@/components/ui/ink-panel";
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
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center">
          What it looks like when it&apos;s running
        </h2>

        <div className="mt-9 flex flex-col gap-5">
          {PROOF.map((item) => (
            <InkPanel key={`${item.name}-${item.business}`}>
              {item.result && (
                <p className="font-serif text-2xl sm:text-3xl text-accent leading-snug">
                  {item.result}
                </p>
              )}
              <p className="text-bg text-lg leading-relaxed mt-3">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="text-bg/60 text-sm mt-4">
                {item.name} · {item.business}
              </p>
            </InkPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
