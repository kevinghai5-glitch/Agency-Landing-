import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import {
  BRAND_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  GHL_CHAT_WIDGET_ID,
  PRIVACY_URL,
} from "@/config/brand";

export const metadata: Metadata = {
  title: `Text us — ${BRAND_NAME}`,
  description: `Start a conversation with ${BRAND_NAME}.`,
};

/**
 * The ONLY page that embeds the GoHighLevel chat widget.
 *
 * ⚠️ COMPLIANCE — DO NOT ADD A FORM TO THIS PAGE. ⚠️
 * The A2P attestation states that no forms collecting phone numbers or SMS
 * opt-in consent exist on any page where the chat widget is embedded —
 * explicitly including contact, lead, landing-page and appointment forms.
 * This page therefore contains ZERO form elements and zero inputs, so the
 * attestation is unambiguously true. Everything here is plain links.
 *
 * The widget was deliberately moved OFF the landing page: that page carries
 * the scan form, and although it collects only a business name and a website
 * (never a phone number or SMS consent), a reviewer cannot tell that at a
 * glance. Submit THIS url for carrier registration.
 */
export default function TextUsPage() {
  return (
    <main className="px-5 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight text-ink">
          Text us
        </h1>
        <p className="text-ink text-lg leading-relaxed mt-5 max-w-xl">
          Use the chat bubble in the corner to start a conversation, and
          we&apos;ll pick it up from there.
        </p>
        <p className="text-muted text-base leading-relaxed mt-5 max-w-xl">
          If you send us your number we may reply by SMS about your enquiry or
          a booking. Message and data rates may apply, message frequency
          varies, and consent isn&apos;t a condition of any purchase. Reply
          STOP to unsubscribe or HELP for help. See our{" "}
          <Link href={PRIVACY_URL} className="text-accent hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-10 flex flex-col gap-2 text-base">
          <p className="text-muted">Prefer something else?</p>
          <a href={CONTACT_MAILTO} className="text-accent hover:underline">
            {CONTACT_EMAIL}
          </a>
          <a href={BUSINESS_PHONE_TEL} className="text-accent hover:underline">
            {BUSINESS_PHONE}
          </a>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-accent hover:underline text-base">
            ← Back
          </Link>
        </div>
      </div>

      {/* strategy="lazyOnload": never blocks the page. */}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id={GHL_CHAT_WIDGET_ID}
        data-source="WEB_USER"
        strategy="lazyOnload"
      />
    </main>
  );
}
