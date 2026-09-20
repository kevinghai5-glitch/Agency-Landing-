import BookingButton from "./BookingButton";
import { SectionHead } from "@/components/ui/section-head";

/**
 * Closing block — the second and last "Book a Strategy Call". Someone who
 * has watched the video and read this far has heard the case; the copy just
 * restates the stake and opens the door.
 */
export default function LandingFinalCta() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHead
          eyebrow="Next step"
          title="See what your existing leads are actually worth."
          lede={
            <>
              A short call, your numbers, and a straight answer on whether
              there&apos;s revenue being left on the table — and what it
              would take to get it.
            </>
          }
        />

        <div className="mt-8 flex flex-col items-center">
          <BookingButton />
          <p className="mono-label text-accent-text mt-4 max-w-xl">
            Free · no obligation · nothing to prepare.
          </p>
        </div>
      </div>
    </section>
  );
}
