import Link from "next/link";
import { SCAN_URL } from "@/config/brand";
import BookingButton from "./BookingButton";
import HeroScene from "./HeroScene";

/**
 * Home hero — the approved mock. Headline left with one gold word, one
 * sentence, gold + white pills and the fine print; the drawn scene
 * (HeroScene) on the right. The "Built for" niche chips run as a ticker
 * directly under the hero (TradesTicker).
 */
export default function LandingHero() {
  return (
    <section className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-8 px-5 pb-6 pt-6 sm:gap-10 sm:pb-8 sm:pt-10 sm:px-8 xl:px-12 lg:grid-cols-[1.15fr_.85fr]">
      <div>
        <h1 className="text-ink text-[40px] sm:text-[52px] lg:text-[66px]">
          Turn more of your existing leads into paying customers —{" "}
          <em className="not-italic text-accent">automatically.</em>
        </h1>
        <p className="mt-6 max-w-[44ch] text-[19px] leading-[1.45] text-muted">
          A full-time AI system for home exterior and emergency service businesses.
          It responds, follows up, and books — around the clock.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <BookingButton />
          <Link href={SCAN_URL} className="pill pill--white">
            Run the free scan
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted">
          See how much revenue you may already be leaving on the table.
        </p>
      </div>

      <HeroScene />
    </section>
  );
}
