import Image from "next/image";
import {
  FOUNDER_LINKEDIN,
  FOUNDER_NAME,
  FOUNDER_PHOTO,
} from "@/config/brand";

/**
 * Section 8 — anti-agency honesty. The differentiator stated plainly, then the
 * founder block (real name + real photo slot). No bio essay.
 *
 * Testimonials are intentionally a commented-out placeholder below. Nothing
 * fake ships — no fabricated quotes, logos, star ratings, or "trusted by" bars.
 * The live scorecard is the proof until real results exist.
 */
export default function WhyTrust() {
  return (
    <section className="relative overflow-hidden px-5 py-8 sm:py-10">
      {/* Ambient warm pool — separates this section from its neighbours
          without boxing it in. Static CSS gradient, no per-frame cost. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(58% 60% at 50% 46%, rgba(154,123,63,0.11), transparent 72%)",
        }}
      />
      <div className="relative max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center">
          Why trust this
        </h2>
        <p className="text-ink text-lg leading-relaxed mt-6 text-center max-w-xl mx-auto">
          I don&apos;t sell traffic. I won&apos;t sell you ads or SEO. I show you
          where you&apos;re losing the leads you already have — and if
          there&apos;s nothing worth fixing, I&apos;ll tell you that too.
        </p>

        <div className="mt-8 flex flex-col items-center text-center">
          {/* 112px, not 80: the photo is dark and low-contrast, so at small
              sizes it reads as a smudge rather than a face. The ring gives
              the dark image an edge against the paper background. */}
          {FOUNDER_PHOTO && (
            <div className="relative flex items-center justify-center">
              {/* Concentric halo — a signal radiating out, which is literally
                  what the line below says he follows. */}
              <span
                aria-hidden="true"
                className="absolute w-44 h-44 rounded-full border border-accent/20"
              />
              <span
                aria-hidden="true"
                className="absolute w-60 h-60 rounded-full border border-accent/10"
              />
              <div className="relative w-28 h-28 rounded-full overflow-hidden bg-surface ring-1 ring-border shadow-card">
                <Image
                  src={FOUNDER_PHOTO}
                  alt={FOUNDER_NAME}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
          <p className="font-serif text-xl text-ink mt-4">{FOUNDER_NAME}</p>
          <p className="text-muted text-base leading-relaxed mt-2 max-w-md">
            I follow the whole path a lead takes to reach you — from the
            search to the phone call nobody answered — and I tell you where
            it breaks. Straight.
          </p>
          {/* A checkable identity behind the anti-agency claim — the point of
              this section is that a real person is saying it. */}
          <a
            href={FOUNDER_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline text-sm mt-3 inline-flex items-center gap-1"
          >
            Connect on LinkedIn
            <span aria-hidden>↗</span>
          </a>
        </div>

        {/*
          TESTIMONIALS — placeholder. Do NOT fabricate quotes, logos, star
          ratings, or "trusted by" bars. Wire real testimonials in here only
          once genuine client results exist. Until then, the live scorecard is
          the proof.

          <div className="mt-16">
            <ul className="grid gap-6 sm:grid-cols-2">
              {REAL_TESTIMONIALS.map((t) => (
                <li key={t.name} className="bg-surface border border-border rounded-xl p-6 shadow-card">
                  <p className="text-ink leading-relaxed">{t.quote}</p>
                  <p className="text-muted text-sm mt-3">{t.name}, {t.business}</p>
                </li>
              ))}
            </ul>
          </div>
        */}
      </div>
    </section>
  );
}
