import Image from "next/image";
import Link from "next/link";
import { FOUNDER_LINKEDIN, FOUNDER_NAME, FOUNDER_PHOTO, SCAN_URL } from "@/config/brand";
import { Eyebrow } from "@/components/ui/eyebrow";
import BookingButton from "@/components/landing/BookingButton";

/**
 * The founder — the only real photo on the site, so it gets the room: a
 * big rounded frame on the left, the chip, "I'm Kevin.", the two lines,
 * LinkedIn and the two pills on the right. Nothing fake ships here: no
 * fabricated quotes, logos, or star ratings.
 */
export default function FounderHero() {
  return (
    <section className="mx-auto my-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-5 py-8 sm:px-8 xl:px-12 sm:py-12 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-14">
      <div>
        <Image
          src={FOUNDER_PHOTO}
          alt={FOUNDER_NAME}
          width={512}
          height={512}
          priority
          sizes="(max-width: 1024px) 100vw, 460px"
          className="aspect-[5/4] w-full rounded-[32px] object-cover shadow-panelcard sm:aspect-square sm:rounded-[40px]"
        />
      </div>

      <div>
        <Eyebrow>Who you&apos;re talking to</Eyebrow>
        <h1 className="mt-4 text-ink text-[44px] sm:text-[56px] lg:text-[72px]">
          I&apos;m {FOUNDER_NAME}.
        </h1>
        <p className="mt-6 max-w-[42ch] text-[19px] leading-[1.45] text-muted">
          I follow the whole path a lead takes to reach you — from the search
          to the phone call nobody answered — and I tell you where it breaks.
          Straight.
        </p>
        <p className="mt-4 max-w-[42ch] text-[19px] leading-[1.45] text-muted">
          I don&apos;t sell traffic. I won&apos;t sell you ads or SEO. I show
          you where you&apos;re losing the leads you already have — and if
          there&apos;s nothing worth fixing, I&apos;ll tell you that too.
        </p>
        {/* A checkable identity behind the anti-agency claim — the point of
            this page is that a real person is saying it. */}
        <a
          href={FOUNDER_LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 font-semibold text-accent-text transition-colors hover:text-ink"
        >
          Connect on LinkedIn ↗
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <BookingButton />
          <Link href={SCAN_URL} className="pill pill--white">
            Run the free scan
          </Link>
        </div>
      </div>
    </section>
  );
}
