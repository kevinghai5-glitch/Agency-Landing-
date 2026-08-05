import { BOOKING_URL } from "@/config/brand";

/**
 * Final section of the PITCH page — a straight booking CTA, not a second
 * scan form. Someone who has read the whole page and scrolled this far is
 * further along than the hero form assumes; the scan is still one click away
 * at the top for anyone who wants it first.
 *
 * Post-scan this section doesn't render at all — the report page closes with
 * components/BookCall.tsx instead.
 */
export default function FinalCta() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink">
          Rather just talk it through?
        </h2>
        <p className="text-muted text-lg leading-relaxed mt-4 max-w-xl mx-auto">
          Book the 15-minute walkthrough and we&apos;ll put a real monthly
          number on what&apos;s slipping — with or without running the scan
          first.
        </p>

        <div className="mt-8 flex flex-col items-center">
          {BOOKING_URL ? (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full max-w-xl h-14 rounded-lg bg-accent text-surface font-medium text-base tracking-tight hover:opacity-90 active:opacity-100 transition-opacity"
            >
              Book the 15-minute walkthrough →
            </a>
          ) : (
            // Env not set yet (local dev). Honest and obvious rather than a
            // dead button — mirrors the placeholder pattern used sitewide.
            <div className="w-full max-w-xl rounded-xl border border-dashed border-border bg-surface p-8 text-center">
              <p className="text-muted text-sm">
                Booking button renders here. Set{" "}
                <code className="text-ink">NEXT_PUBLIC_BOOKING_URL</code> to
                the GoHighLevel calendar link to enable it.
              </p>
            </div>
          )}

          <p className="text-muted text-sm leading-relaxed mt-4 max-w-xl">
            Free · 15 minutes · no obligation. If nothing&apos;s worth fixing,
            I&apos;ll tell you that on the call.
          </p>
        </div>
      </div>
    </section>
  );
}
