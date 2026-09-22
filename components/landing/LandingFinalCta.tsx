import BookingButton from "./BookingButton";

/** The closing block — sits on the bottom aurora, above the footer. */
export default function LandingFinalCta() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-10 pt-24 text-center sm:px-8 xl:px-12">
      <h2 className="mx-auto max-w-[26ch] text-ink text-[36px] sm:text-[52px] lg:text-[68px]">
        See what your existing leads are actually worth.
      </h2>
      <div className="mt-8 flex justify-center">
        <BookingButton />
      </div>
    </section>
  );
}
