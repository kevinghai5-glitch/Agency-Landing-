import ScanFlow from "./ScanFlow";

/**
 * Section 1 — the tool IS the hero. No stock photo, no hero image competing
 * with the input. The headline sets the stakes, then the scan form is the
 * dominant, centered focal point.
 */
export default function Hero() {
  return (
    <section className="px-5 pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-serif text-3xl sm:text-5xl leading-[1.1] tracking-tight text-ink text-balance">
          See where your business is losing the leads you already pay for — in
          30 seconds.
        </h1>
        <p className="text-muted text-lg sm:text-xl leading-relaxed mt-5 max-w-xl mx-auto text-balance">
          Instant. Free. Built from your real site data. No signup to see your
          results.
        </p>
      </div>

      <div className="mt-10 sm:mt-12">
        <ScanFlow />
      </div>
    </section>
  );
}
