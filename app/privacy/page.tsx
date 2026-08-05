import Link from "next/link";
import type { Metadata } from "next";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  GOVERNING_LAW,
  LEGAL_ENTITY,
  LEGAL_LAST_UPDATED,
  TERMS_URL,
} from "@/config/brand";

export const metadata: Metadata = {
  title: `Privacy Policy — ${BRAND_NAME}`,
  description: `What ${BRAND_NAME} collects, how SMS is used, and how to request deletion.`,
};

/**
 * ⚠️ TEMPLATE, NOT LEGAL ADVICE.
 *
 * The "Text messages (SMS)" section below is the reason this page exists for
 * carrier A2P registration — a reviewer opens this page and looks for it
 * specifically. Do not trim it, and in particular do not remove:
 *   - message and data rates may apply
 *   - message frequency varies
 *   - consent is not a condition of purchase
 *   - STOP to unsubscribe / HELP for help
 *   - mobile numbers are never sold, rented or shared with third parties
 *     for marketing purposes  ← required near-verbatim by carriers
 */
export default function PrivacyPage() {
  return (
    <main className="px-5 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight text-ink">
          Privacy Policy
        </h1>
        <p className="text-muted text-sm mt-3">
          Last updated: {LEGAL_LAST_UPDATED}
        </p>
        <p className="text-muted text-base leading-relaxed mt-6">
          Straight version: we collect what you give us and what is already
          public about your business. We never sell your data, and we never
          share your mobile number for anyone else&rsquo;s marketing.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          <Section title="Who we are">
            <p>
              {BRAND_NAME} is a trade name of {LEGAL_ENTITY}, operating from{" "}
              {GOVERNING_LAW}. We are the party responsible for the
              information described here. Our contact details are in the
              footer of every page.
            </p>
          </Section>

          <Section title="What we collect">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Your name and business name.</li>
              <li>Your email address.</li>
              <li>Your phone number, where you provide it.</li>
              <li>Your website address.</li>
              <li>
                Publicly available business data about the website you enter —
                its public page content, its public mobile page speed, and its
                public business listing information such as review count and
                rating.
              </li>
            </ul>
          </Section>

          <Section title="How we collect it">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                The scan form on this site, which asks only for a business
                name and a website address.
              </li>
              <li>The chat widget on our landing page.</li>
              <li>
                Information you give us directly by phone, by email, or on a
                booking form or call.
              </li>
            </ul>
            <p>
              The instant scan itself only looks at public information about
              the website address you type in. It does not access private or
              account data, and nothing is scraped beyond a single read of
              that site&rsquo;s public homepage.
            </p>
          </Section>

          <Section title="Text messages (SMS)">
            <p>
              If you give us your phone number, we may use it to send you SMS
              text messages relating to your enquiry, your booking, and
              confirmations or reminders for appointments with us.
            </p>
            <p>
              Message and data rates may apply. Message frequency varies.
              Consent to receive text messages is not a condition of any
              purchase.
            </p>
            <p>
              You can opt out at any time by replying <strong>STOP</strong> to
              any message from us. For assistance, reply{" "}
              <strong>HELP</strong> or email{" "}
              <a href={CONTACT_MAILTO} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <p>
              <strong>
                Mobile numbers are never sold, rented or shared with third
                parties for marketing purposes.
              </strong>{" "}
              We share a mobile number with a service provider only where it is
              necessary to deliver the messages you have asked for, and those
              providers may not use it for their own marketing.
            </p>
          </Section>

          <Section title="How we use your information">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>To produce and show you your scan results.</li>
              <li>To answer your enquiry and arrange a call.</li>
              <li>
                To send confirmations, reminders and follow-up about that call.
              </li>
              <li>
                To build and manage the systems we are engaged to build, where
                you become a client.
              </li>
            </ul>
          </Section>

          <Section title="Service providers we use">
            <p>
              We use a small number of third-party providers to run the
              business, and they process your information only on our
              instructions:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>A website hosting and infrastructure provider.</li>
              <li>
                A customer relationship management (CRM) and messaging
                provider, which stores contact details and delivers our email
                and SMS.
              </li>
              <li>
                A payment processor, for clients — we do not store your full
                payment card details ourselves.
              </li>
              <li>
                Public data providers used by the scan, which receive the
                website address being scanned.
              </li>
            </ul>
            <p>
              We do not sell your personal information to anyone, for any
              purpose.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Scan inputs and results are kept only as long as needed to show
              you your results and to follow up on an enquiry. Contact details
              for enquiries that do not become clients are kept for up to
              24 months, then deleted. Client records are kept for the duration
              of the engagement and afterwards only as long as required for
              tax, accounting and legal obligations.
            </p>
          </Section>

          <Section title="Your choices and deletion requests">
            <p>
              You can ask us what we hold about you, ask us to correct it, or
              ask us to delete it. Email{" "}
              <a href={CONTACT_MAILTO} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              with the request and the email address or phone number you used,
              and we will action it within 30 days. To stop text messages
              specifically, reply STOP to any message — that takes effect
              immediately.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this policy. The &ldquo;last updated&rdquo; date
              at the top shows when it last changed.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Privacy questions, or want your details removed? Email{" "}
              <a href={CONTACT_MAILTO} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>
              . See also our{" "}
              <Link href={TERMS_URL} className="text-accent hover:underline">
                Terms of Service
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
