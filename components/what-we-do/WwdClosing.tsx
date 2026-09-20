import Link from "next/link";
import BookingButton from "@/components/landing/BookingButton";
import { SCAN_URL } from "@/config/brand";

/**
 * F · Closing — a full-width wash band, the stake in two lines, the same
 * "Book a Strategy Call" the Home page uses, and the scan as the softer
 * door for anyone not ready. Sits directly on the footer.
 */
export default function WwdClosing() {
  return (
    <section className="bg-wash px-5 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-balance">
          The leads are already coming in.
        </h2>
        <p className="text-muted text-lg leading-relaxed mt-4 max-w-xl mx-auto text-balance">
          The question is how many of them you&apos;re answering fast enough
          to keep.
        </p>

        <div className="mt-8 flex flex-col items-center">
          <BookingButton />
          <Link
            href={SCAN_URL}
            className="text-muted text-sm leading-relaxed mt-4 hover:text-ink transition-colors"
          >
            Not ready? Run the free scan — 30 seconds, no signup. →
          </Link>
        </div>
      </div>
    </section>
  );
}
