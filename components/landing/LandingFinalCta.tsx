import BookingButton from "./BookingButton";

/**
 * Closing block — the second and last "Book a Strategy Call". Someone who
 * has watched the video and read this far has heard the case; the copy just
 * restates the stake and opens the door.
 */
export default function LandingFinalCta() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-balance">
          See what your existing leads are actually worth.
        </h2>
        <p className="text-muted text-lg leading-relaxed mt-4 max-w-xl mx-auto text-balance">
          A short call, your numbers, and a straight answer on whether
          there&apos;s revenue being left on the table — and what it would
          take to get it.
        </p>

        <div className="mt-8 flex flex-col items-center">
          <BookingButton />
          <p className="text-muted text-sm leading-relaxed mt-4 max-w-xl">
            Free · no obligation · nothing to prepare.
          </p>
        </div>
      </div>
    </section>
  );
}
