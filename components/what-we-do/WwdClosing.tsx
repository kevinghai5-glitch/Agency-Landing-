import Link from "next/link";
import { SCAN_URL } from "@/config/brand";
import BookingButton from "@/components/landing/BookingButton";

/** Closing — on the bottom aurora: the stake, one line, two pills. */
export default function WwdClosing() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-10 pt-24 text-center sm:px-8 xl:px-12">
      <h2 className="mx-auto max-w-[26ch] text-ink text-[36px] sm:text-[52px] lg:text-[68px]">
        The leads are already coming in.
      </h2>
      <p className="mx-auto mt-4 max-w-[64ch] text-lg text-muted">
        The question is how many of them you&apos;re answering fast enough to keep.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <BookingButton />
        <Link href={SCAN_URL} className="pill pill--white">
          Not ready? Run the free scan
        </Link>
      </div>
    </section>
  );
}
