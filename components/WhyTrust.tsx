import Image from "next/image";
import { FOUNDER_NAME, FOUNDER_PHOTO } from "@/config/brand";

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
    <section className="px-5 py-20 sm:py-28">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center">
          Why trust this
        </h2>
        <p className="text-ink text-lg leading-relaxed mt-6 text-center max-w-xl mx-auto">
          I don&apos;t do lead gen. I won&apos;t sell you ads or SEO. I show you
          where you&apos;re losing the leads you already have — and if
          there&apos;s nothing worth fixing, I&apos;ll tell you that too.
        </p>

        <div className="mt-12 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-border bg-surface">
            <Image
              src={FOUNDER_PHOTO}
              alt={FOUNDER_NAME}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="font-serif text-xl text-ink mt-4">{FOUNDER_NAME}</p>
          <p className="text-muted text-base leading-relaxed mt-2 max-w-md">
            I look at your site the way your next customer does, and I tell you
            what I see. Straight.
          </p>
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
