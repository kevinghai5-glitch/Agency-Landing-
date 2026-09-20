import Link from "next/link";
import BookingButton from "@/components/landing/BookingButton";
import { SCAN_URL } from "@/config/brand";
import { SectionHead } from "@/components/ui/section-head";

/**
 * F · Closing — a full-width wash band, the stake in two lines, the same
 * "Book a Strategy Call" the Home page uses, and the scan as the softer
 * door for anyone not ready. Sits directly on the footer.
 */
export default function WwdClosing() {
  return (
    <section className="bg-surface-2 border-t border-border px-5 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHead
          eyebrow="Next step"
          title="The leads are already coming in."
          lede={
            <>
              The question is how many of them you&apos;re answering fast
              enough to keep.
            </>
          }
        />

        <div className="mt-8 flex flex-col items-center">
          <BookingButton />
          <Link
            href={SCAN_URL}
            className="mono-label text-accent-text mt-4 hover:text-ink transition-colors"
          >
            Not ready? Run the free scan — 30 seconds, no signup. →
          </Link>
        </div>
      </div>
    </section>
  );
}
