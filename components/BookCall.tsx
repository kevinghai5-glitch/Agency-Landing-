"use client";

import { BOOKING_URL } from "@/config/brand";
import { useScan } from "./ScanContext";
import type { ScanFormValues } from "./ScanForm";

/**
 * The post-scan CTA — the ONE door out of report mode. Renders as the last
 * section of the page, after the findings, the qualification section, the
 * questions and the founder block, so the visitor meets it having read
 * everything that qualifies them.
 *
 * The scan results ARE the report, delivered on screen. There is no email
 * capture, no "report on its way", no secondary CTA — this is the only
 * action anywhere on the post-scan page.
 *
 * BOOKING_URL comes from NEXT_PUBLIC_BOOKING_URL (see config/brand.ts —
 * ⚠️ TODO: real GoHighLevel calendar link, so the pre-Zoom nurture sequences
 * fire on booking). Business name + website ride along as query params so the
 * booking form can pre-fill IF the calendar reads them; unknown params are
 * ignored by forms that don't.
 */
export default function BookCall({
  variant = "full",
}: {
  /** "inline" — the compact catch right after the quiz, at peak intent.
   *  "full"   — the closing block that ends the page. */
  variant?: "full" | "inline";
}) {
  const { known } = useScan();
  const isInline = variant === "inline";

  return (
    <section
      className={
        isInline
          ? "w-full max-w-2xl mx-auto mt-8"
          : "w-full max-w-2xl mx-auto px-5 py-8 sm:py-10"
      }
      data-quiet=""
    >
      {isInline ? (
        <p className="text-ink text-base sm:text-lg leading-relaxed text-center max-w-xl mx-auto">
          Want these walked on your real numbers?
        </p>
      ) : (
        <>
          <p className="font-serif text-2xl sm:text-3xl text-ink leading-snug text-center">
            One door out of this: the 15-minute walkthrough.
          </p>
          <p className="text-ink text-base sm:text-lg leading-relaxed text-center mt-3 max-w-xl mx-auto">
            I&apos;ll ask how leads get handled once they reach you, put a
            real monthly number on what&apos;s slipping, and show you what
            fixing it looks like — and what it costs. Built for you, not a
            to-do list.
          </p>
        </>
      )}

      <div className={isInline ? "mt-4 flex flex-col items-center" : "mt-8 flex flex-col items-center"}>
        {BOOKING_URL ? (
          <a
            href={buildBookingUrl(BOOKING_URL, known)}
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
              <code className="text-ink">NEXT_PUBLIC_BOOKING_URL</code> to the
              GoHighLevel calendar link to enable it.
            </p>
          </div>
        )}

        {/* The qualification line lives on the CLOSING block only — the
            inline catch stays light so it reads as a shortcut, not a second
            pitch. The full framing is a short scroll away either way. */}
        {!isInline && (
          <p className="text-muted text-sm leading-relaxed text-center mt-4 max-w-xl">
            For owners who want this handled. There&apos;s a paid service at
            the end of it and I&apos;ll say the price out loud on the call.
            If your results came back clean, don&apos;t book it.
          </p>
        )}
      </div>
    </section>
  );
}

function buildBookingUrl(base: string, known: ScanFormValues | null): string {
  try {
    const url = new URL(base);
    if (known?.businessName) {
      url.searchParams.set("business_name", known.businessName);
    }
    if (known?.website) {
      url.searchParams.set("website", known.website);
    }
    return url.toString();
  } catch {
    return base;
  }
}
