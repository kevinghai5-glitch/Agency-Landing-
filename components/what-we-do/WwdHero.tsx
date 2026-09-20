import KineticGrid from "@/components/ui/kinetic-grid";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * /what-we-do hero — the h1 and intro paragraph, unchanged in wording,
 * on the same KineticGrid "paper" surface the Home and /scan heroes use so
 * the three pages read as one site. The one line under it states breadth
 * without narrowing to a list of verticals (a list costs inbound).
 */
export default function WwdHero() {
  return (
    <KineticGrid globalColor="paper" quietSelector="[data-quiet]">
      <section className="px-5 pt-12 pb-10 sm:pt-16 sm:pb-12">
        <div className="max-w-2xl mx-auto text-center" data-quiet="">
          <Eyebrow>The system</Eyebrow>
          <h1 className="font-serif font-light text-3xl sm:text-5xl leading-[1.1] tracking-tight text-ink text-balance">
            What we do
          </h1>
          <p className="text-ink text-lg sm:text-xl leading-relaxed mt-5 max-w-xl mx-auto text-balance">
            A full-time AI system, installed into your business, that
            responds to, follows up with, and converts the leads you already
            get — around the clock.
          </p>
          <p className="text-muted text-base sm:text-lg leading-relaxed mt-4 max-w-xl mx-auto text-balance">
            Home exterior and emergency service — if a missed call costs you
            a job, this applies.
          </p>
        </div>
      </section>
    </KineticGrid>
  );
}
