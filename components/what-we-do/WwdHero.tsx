import Link from "next/link";
import { SCAN_URL } from "@/config/brand";
import BookingButton from "@/components/landing/BookingButton";

/** /what-we-do hero — text only: headline, one line, two pills. */
export default function WwdHero() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-8 pt-6 sm:px-8 xl:px-12 sm:pb-10 sm:pt-10">
      <div>
        <h1 className="max-w-[20ch] text-ink text-[40px] sm:text-[52px] lg:text-[66px]">
          A full-time AI system that answers{" "}
          <em className="not-italic text-accent">every enquiry</em> you already
          get — around the clock.
        </h1>
        <p className="mt-6 max-w-[40ch] text-[19px] leading-[1.45] text-muted">
          Installed into your business. Built for home exterior and emergency
          service businesses — if a missed call costs you a job, this applies.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <BookingButton />
          <Link href={SCAN_URL} className="pill pill--white">
            Or run the free scan
          </Link>
        </div>
      </div>
    </section>
  );
}
