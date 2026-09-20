import { BOOKING_URL } from "@/config/brand";

/**
 * "Book a Strategy Call" — the landing page's ONLY action, used twice (under
 * the VSL and as the closing block). Same GoHighLevel calendar the scan
 * page books into; the label differs because the landing page sells the
 * system directly, while the scan page reaches the same call through the
 * "walkthrough" framing its copy is built around.
 *
 * Server component on purpose: the landing page has no scan state, so
 * nothing to pre-fill — plain link, no context.
 */
export default function BookingButton({
  label = "Book a Strategy Call →",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  if (!BOOKING_URL) {
    // Env not set yet (local dev). Honest and obvious rather than a dead
    // button — the same placeholder pattern used sitewide.
    return (
      <div
        className={`w-full max-w-xl rounded-xl border border-dashed border-border bg-surface p-8 text-center ${className}`}
      >
        <p className="text-muted text-sm">
          Booking button renders here. Set{" "}
          <code className="text-ink">NEXT_PUBLIC_BOOKING_URL</code> to the
          GoHighLevel calendar link to enable it.
        </p>
      </div>
    );
  }

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center w-full max-w-xl h-14 rounded-lg bg-accent text-surface font-medium text-base tracking-tight hover:opacity-90 active:opacity-100 transition-opacity ${className}`}
    >
      {label}
    </a>
  );
}
