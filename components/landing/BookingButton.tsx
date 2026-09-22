import { BOOKING_URL } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * "Book a Strategy Call →" — the site's ONE conversion action, a gold pill.
 * Same GoHighLevel calendar everywhere. Server component: nothing to
 * pre-fill, plain link. `variant="white"` is the quiet secondary pill.
 */
export default function BookingButton({
  label = "Book a Strategy Call →",
  className = "",
  variant = "gold",
}: {
  label?: string;
  className?: string;
  variant?: "gold" | "white" | "ink";
}) {
  if (!BOOKING_URL) {
    // Env not set yet (local dev). Honest and obvious rather than a dead
    // button — the same placeholder pattern used sitewide.
    return (
      <div className={cn("rounded-[20px] bg-surface px-6 py-4 text-center", className)}>
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
      className={cn("pill", `pill--${variant}`, className)}
    >
      {label}
    </a>
  );
}
