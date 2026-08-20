import Link from "next/link";
import type { Metadata } from "next";
import {
  BRAND_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  FULL_ADDRESS_LINES,
  LEGAL_ENTITY,
} from "@/config/brand";

export const metadata: Metadata = {
  title: `Contact — ${BRAND_NAME}`,
  description: `How to reach ${BRAND_NAME}: email, phone and business address.`,
};

/**
 * Contact page — the one place the FULL postal address appears.
 *
 * Carrier A2P review wants a reachable contact page with the business name,
 * a physical address, an email and the brand-verification phone number. The
 * footer carries city-level only and links here, so the complete address
 * lives on exactly one page.
 *
 * Phone note: BUSINESS_PHONE is the brand-verification number, NOT the
 * GoHighLevel sending number. See config/brand.ts before changing it.
 */
export default function ContactPage() {
  return (
    <main className="px-5 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight text-ink">
          Contact
        </h1>
        <p className="text-muted text-base leading-relaxed mt-5 max-w-xl">
          Email is fastest, and it reaches me directly — not a support queue.
        </p>

        <div className="mt-10 flex flex-col divide-y divide-border border-y border-border">
          <Row label="Business">
            <p className="text-ink">{BRAND_NAME}</p>
            <p className="text-muted text-sm mt-1">
              A trade name of {LEGAL_ENTITY}
            </p>
          </Row>

          <Row label="Email">
            <a
              href={CONTACT_MAILTO}
              className="text-accent hover:underline break-all"
            >
              {CONTACT_EMAIL}
            </a>
          </Row>

          <Row label="Phone">
            <a href={BUSINESS_PHONE_TEL} className="text-accent hover:underline">
              {BUSINESS_PHONE}
            </a>
          </Row>

          <Row label="Address">
            <address className="not-italic text-ink">
              {FULL_ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </Row>
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

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-5">
      <p className="text-muted text-sm uppercase tracking-widest sm:w-32 sm:flex-none sm:pt-1">
        {label}
      </p>
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
}
