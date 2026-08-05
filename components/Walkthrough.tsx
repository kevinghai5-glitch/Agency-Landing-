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
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center">
          What the walkthrough covers
        </h2>
        <p className="text-muted text-lg leading-relaxed mt-5 text-center max-w-xl mx-auto">
          The scan showed the outside. The walkthrough is mostly about the
          part it couldn&apos;t see — what happens to a lead after it reaches
          you — and it ends with a real monthly number built from your
          figures, not estimates.
        </p>

        {/* The rich focal block of the pitch page — same language as the
            post-scan quiz panel: inverted ink, the hero's dot grid in
            negative, a warm gold corner light, gold hairline. All static
            CSS, no filters, so it costs nothing per frame. */}
        <div className="mt-9 relative overflow-hidden rounded-xl bg-ink text-bg shadow-card border border-accent/25 p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(251,250,247,0.09) 1px, transparent 1.4px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(55% 45% at 88% -8%, rgba(154,123,63,0.38), transparent 70%), radial-gradient(45% 40% at -5% 108%, rgba(154,123,63,0.16), transparent 70%)",
            }}
          />

          <ol className="relative flex flex-col">
            {COVERS.map((item, i) => (
              <li
                key={item.title}
                className="flex gap-5 sm:gap-6 py-4 first:pt-0 last:pb-0 border-b border-bg/10 last:border-b-0"
              >
                <span className="font-serif text-2xl sm:text-3xl text-accent leading-none flex-none w-9 pt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-lg sm:text-xl leading-snug">
                    {item.title}
                  </p>
                  <p className="text-base leading-relaxed mt-1 opacity-70">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

