import Link from "next/link";
import type { Metadata } from "next";
import { BRAND_NAME, CONTACT_EMAIL, CONTACT_MAILTO } from "@/config/brand";
import { AuroraBackground } from "@/components/ui/aurora-background";

export const metadata: Metadata = {
  title: `Privacy — ${BRAND_NAME}`,
  description: `What data ${BRAND_NAME} touches when you run the instant scan.`,
};

/**
 * Minimal, honest privacy page. The scan only ever touches public data plus the
 * URL you type in — this page says exactly that, in plain English. No tracking
 * boilerplate, no data sales, no dark patterns.
 */
export default function PrivacyPage() {
  return (
    <main>
      <AuroraBackground className="px-5 py-8 sm:py-10 min-h-[100dvh]">
        <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight text-ink">
          Privacy
        </h1>
        <p className="text-muted text-base leading-relaxed mt-6">
          Straight version: the instant scan only looks at public information
          about the website you type in. Here&apos;s exactly what that means.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          <section>
            <h2 className="font-serif text-xl text-ink">What the scan touches</h2>
            <ul className="mt-3 flex flex-col gap-2 text-ink text-base leading-relaxed list-disc pl-5">
              <li>
                The website URL you enter, and your business name if you provide
                it.
              </li>
              <li>
                Public Google data about that site — its mobile page speed and
                its public Google Business listing (review count, rating,
                nearby same-category businesses).
              </li>
              <li>
                Your site&apos;s public homepage, read once to check for basic
                things like a secure connection and a booking link.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">
              What the scan does NOT do
            </h2>
            <ul className="mt-3 flex flex-col gap-2 text-ink text-base leading-relaxed list-disc pl-5">
              <li>No private or account data — only what&apos;s public.</li>
              <li>Your data is never sold or shared with advertisers.</li>
              <li>
                Nothing is scraped beyond the single homepage read described
                above.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">
              If you book the walkthrough
            </h2>
            <p className="mt-3 text-ink text-base leading-relaxed">
              Your scan results appear on screen — no email needed to see them.
              If you choose to book the 15-minute walkthrough, you share your
              contact details on the booking calendar. Those are used to run
              the call and follow up about it — nothing else.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">Contact</h2>
            <p className="mt-3 text-ink text-base leading-relaxed">
              Questions, or want your details removed? Email{" "}
              <a
                href={CONTACT_MAILTO}
                className="text-accent hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-accent hover:underline text-base">
            ← Back
          </Link>
        </div>
        </div>
      </AuroraBackground>
    </main>
  );
}
