import Link from "next/link";
import type { Metadata } from "next";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  GOVERNING_LAW,
  LEGAL_ENTITY,
  LEGAL_LAST_UPDATED,
  PRIVACY_URL,
} from "@/config/brand";

export const metadata: Metadata = {
  title: `Terms of Service — ${BRAND_NAME}`,
  description: `The terms that apply to ${BRAND_NAME}'s free scan and done-for-you conversion recovery systems.`,
};

/**
 * ⚠️ TEMPLATE, NOT LEGAL ADVICE. Written plainly to satisfy carrier A2P
 * registration, which requires a reachable Terms page. Have a lawyer review
 * it once deals are closing consistently.
 *
 * Deliberately contains NO dollar amounts — pricing is disclosed on the call
 * (see the Zoom SOP), and putting numbers here would contradict that and
 * date badly.
 */
export default function TermsPage() {
  return (
    <main className="px-5 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight text-ink">
          Terms of Service
        </h1>
        <p className="text-muted text-sm mt-3">
          Last updated: {LEGAL_LAST_UPDATED}
        </p>

        <div className="mt-10 flex flex-col gap-8">
          <Section title="Who we are">
            <p>
              {BRAND_NAME} is a trade name of {LEGAL_ENTITY}, a federal
              corporation incorporated under the Canada Business Corporations
              Act and operating from {GOVERNING_LAW}. In these terms,
              &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;{BRAND_NAME}&rdquo;
              mean that company. &ldquo;You&rdquo; means the person or business
              using this site or our services.
            </p>
          </Section>

          <Section title="What we do">
            <p>
              We build and manage done-for-you conversion recovery systems for
              local service businesses — the systems that handle a lead after
              it arrives, such as after-hours response, missed-call follow-up,
              quote follow-up, appointment reminders and reactivation of past
              customers.
            </p>
            <p>
              These systems are built and operated inside third-party software
              platforms that we configure on your behalf. We do not own those
              platforms, and their availability, pricing and functionality are
              outside our control. Where a platform requires its own
              subscription or account, that relationship is between you and
              that provider unless we agree otherwise in writing.
            </p>
          </Section>

          <Section title="The free scan and any figures it produces">
            <p>
              The instant scan on this site uses publicly available
              information about the website address you enter — including
              public page data and public business listing data. It is
              provided free and as a convenience.
            </p>
            <p>
              Every figure produced by the scan, by the questions that follow
              it, or discussed on a call is an <strong>estimate</strong>. Those
              estimates are built from typical industry values and from
              answers you provide. They are not measurements of your business,
              not audited figures, and not a promise of any amount you will
              gain or recover. Do not rely on them as financial advice or as
              the sole basis for a business decision.
            </p>
          </Section>

          <Section title="No performance guarantee">
            <p>
              <strong>Results are not guaranteed.</strong> We do not guarantee
              any particular number of leads, calls, bookings, jobs, revenue,
              conversion rate or return on investment. Outcomes depend on
              factors we do not control, including your market, your pricing,
              your capacity, your team&rsquo;s follow-through and the demand
              already reaching your business.
            </p>
            <p>
              Any example, range or case discussed on this site or on a call is
              illustrative only and is not a representation of what you will
              achieve.
            </p>
          </Section>

          <Section title="Fees and cancellation">
            <p>
              Paid engagements consist of a one-time setup fee for the initial
              build and a recurring monthly fee for ongoing management. Fees
              are quoted to you directly before you commit, and are not
              published on this site.
            </p>
            <p>
              The monthly management engagement is cancellable on a monthly
              basis. Cancellation stops future monthly fees; it does not
              refund the setup fee or fees already paid for a period already
              served, unless we agree otherwise in writing. Third-party
              software subscriptions in your own name continue until you
              cancel them with that provider.
            </p>
          </Section>

          <Section title="What you own">
            <p>
              You own the systems, workflows, automations, message templates
              and configurations we build specifically for your business, along
              with your own customer data, contact lists and account content.
              On cancellation you keep them, and we will not delete or disable
              your accounts out of spite.
            </p>
            <p>
              We keep ownership of our own general methods, templates, internal
              tooling and know-how, including anything we developed before or
              independently of working with you. Nothing here transfers rights
              in third-party software to either of us.
            </p>
          </Section>

          <Section title="Your responsibilities">
            <p>
              You are responsible for the accuracy of information you give us,
              for holding any consent required to contact your own customers,
              and for using the systems we build in compliance with applicable
              law — including anti-spam and telemarketing rules such as
              Canada&rsquo;s Anti-Spam Legislation and equivalent rules where
              your customers are located.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the fullest extent permitted by law, we are not liable for
              indirect, incidental, special, consequential or punitive damages,
              or for lost profits, lost revenue, lost business opportunity or
              lost or corrupted data, arising out of or relating to this site
              or our services — even if we were advised such damages were
              possible.
            </p>
            <p>
              Our total aggregate liability arising out of or relating to this
              site or our services is limited to the amount you actually paid
              us in the three months immediately before the event giving rise
              to the claim. This site and the free scan are provided
              &ldquo;as is&rdquo;, without warranties of any kind.
            </p>
            <p>
              Nothing in these terms limits liability that cannot be limited
              under applicable law.
            </p>
          </Section>

          <Section title="Governing law">
            <p>
              These terms are governed by the laws of {GOVERNING_LAW} and the
              federal laws of Canada that apply there. The courts of{" "}
              {GOVERNING_LAW} have exclusive jurisdiction over any dispute,
              and you and we both consent to that jurisdiction.
            </p>
          </Section>

          <Section title="Changes to these terms">
            <p>
              We may update these terms. The &ldquo;last updated&rdquo; date
              at the top shows when they last changed. Continuing to use the
              site or our services after a change means you accept the updated
              terms.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms? Email{" "}
              <a href={CONTACT_MAILTO} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>
              . See also our{" "}
              <Link href={PRIVACY_URL} className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </Section>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-accent hover:underline text-base">
            ← Back
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-xl text-ink">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-ink text-base leading-relaxed">
        {children}
      </div>
    </section>
  );
}
