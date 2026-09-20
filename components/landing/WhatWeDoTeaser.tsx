import Link from "next/link";
import { SectionHead } from "@/components/ui/section-head";
import { WHAT_WE_DO_URL } from "@/config/brand";

/**
 * "What we do" — a short pointer to the dedicated page, not the page
 * itself. The landing page's job is the video and the call; the detail of
 * what gets installed lives at WHAT_WE_DO_URL so the funnel can link people
 * straight to it. Copy here stays general on purpose (the full page is
 * still being written) — it must never contradict what that page ends up
 * saying.
 */
export default function WhatWeDoTeaser() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHead
          eyebrow="What gets installed"
          title="What we do"
          lede={
            <>
              One system, built for your business and managed for you, that
              picks up every enquiry the moment it arrives and keeps
              following up until it&apos;s booked or dead.
            </>
          }
        />
        <Link
          href={WHAT_WE_DO_URL}
          className="mono-label text-accent-text inline-block mt-6 hover:text-ink transition-colors"
        >
          See what we install →
        </Link>
      </div>
    </section>
  );
}
