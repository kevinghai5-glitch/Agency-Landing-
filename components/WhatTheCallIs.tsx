/**
 * Section 8 — "What the call is (and isn't)". THE qualification filter.
 *
 * There is no form-based qualification layer on this funnel anymore — the
 * scan results flow straight to the booking button. This block is what makes
 * unqualified/DIY tire-kickers self-select out BEFORE they book, so the
 * calendar only fills with owners who want the fix done for them.
 *
 * Register: straight talk, same voice as the rest of the page. No hype, no
 * pressure — the honesty IS the filter.
 */
export default function WhatTheCallIs() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center">
          What the call is (and isn&apos;t)
        </h2>

        {/* No white card here — a boxed block this close to the dark panels
            reads cheap. A short gold rule under the heading anchors the prose
            instead. Renders on BOTH the pitch page and the post-scan report,
            so it stays light on purpose. */}
        <div aria-hidden className="mx-auto mt-5 h-px w-16 bg-accent/50" />

        <div className="mt-7 flex flex-col gap-5 max-w-xl mx-auto">
          <p className="text-ink text-lg leading-relaxed">
            It&apos;s for owners who want this <em>handled</em>. I ask how
            leads actually get handled once they reach you, we put a real
            monthly number on what&apos;s slipping, and then — if it&apos;s
            worth fixing — I show you exactly what fixing it looks like and
            what it costs.
          </p>
          <p className="text-ink text-lg leading-relaxed">
            You could build all of it yourself. None of it&apos;s secret, and
            I&apos;ll walk you through what that would take. The gap is that
            it has to run every day, at 8pm, on weekends, without anyone
            remembering to do it — that&apos;s the part we sell.
          </p>
          <p className="text-ink text-lg leading-relaxed">
            So yes, there&apos;s a paid service at the end of it, and
            I&apos;ll say the price out loud on the call. It&apos;s not a
            software demo and nobody gets ambushed at minute twenty.
          </p>
          <p className="text-ink text-lg leading-relaxed">
            And if your scan came back clean, don&apos;t book. I&apos;ll have
            told you so in your results.
          </p>
        </div>
      </div>
    </section>
  );
}
