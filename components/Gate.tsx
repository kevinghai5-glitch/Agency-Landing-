import type { ScanFormValues } from "./ScanForm";

/**
 * The gate — LeadGate qualification form, embedded immediately below the
 * scorecard. Hidden until a scan completes (the parent only mounts this after
 * results exist); the scorecard is the reason the form gets filled.
 *
 * Routing after the form is LeadGate's job, NOT this page's:
 *   qualified     → LeadGate routes to the calendar
 *   not qualified → LeadGate routes to the lead-magnet path
 * We do not rebuild qualification logic here.
 *
 * The embed URL comes from NEXT_PUBLIC_LEADGATE_EMBED_URL so it's swappable
 * without a deploy. We append business name + website as query params so the
 * form can pre-fill IF LeadGate reads them — verify against the real embed;
 * unknown params are simply ignored by a form that doesn't use them.
 */
export default function Gate({ known }: { known: ScanFormValues | null }) {
  const base = process.env.NEXT_PUBLIC_LEADGATE_EMBED_URL;

  return (
    <section className="w-full max-w-2xl mx-auto mt-16">
      <p className="font-serif text-2xl sm:text-3xl text-ink leading-snug text-center">
        This is just the surface.
      </p>
      <p className="text-muted text-base sm:text-lg leading-relaxed text-center mt-3 max-w-xl mx-auto">
        The full report breaks down every leak and what each one&apos;s costing
        you per month — built specifically for your business.
      </p>

      <div className="mt-8">
        {base ? (
          <iframe
            src={buildEmbedUrl(base, known)}
            title="Get your full report"
            className="w-full min-h-[560px] rounded-xl border border-border bg-surface shadow-card"
            loading="lazy"
          />
        ) : (
          // Env not set yet (e.g. local dev without the embed URL). Keep it
          // honest and obvious rather than shipping a broken iframe.
          <div className="w-full rounded-xl border border-dashed border-border bg-surface p-8 text-center">
            <p className="text-muted text-sm">
              LeadGate form loads here. Set{" "}
              <code className="text-ink">NEXT_PUBLIC_LEADGATE_EMBED_URL</code>{" "}
              to enable it.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function buildEmbedUrl(base: string, known: ScanFormValues | null): string {
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
