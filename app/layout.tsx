import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  BRAND_NAME,
  BOOKING_URL_IS_PLACEHOLDER,
  GHL_CHAT_WIDGET_ID,
} from "@/config/brand";
import "./globals.css";

// Loud, unmissable flag: a placeholder booking link must never ship silently.
if (BOOKING_URL_IS_PLACEHOLDER) {
  console.warn(
    "\n⚠️  BOOKING URL IS A PLACEHOLDER — set NEXT_PUBLIC_BOOKING_URL to the real GoHighLevel calendar link. The post-scan “Book the 15-minute walkthrough” button is this funnel's ONLY conversion step; without it, results lead nowhere.\n",
  );
}

// Body: Inter. Headings + big scorecard numbers: Fraunces (refined serif).
// Both self-hosted via next/font — no render-blocking external font requests.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
});

// Site default = the landing page. /scan and the secondary pages set their
// own title/description.
export const metadata: Metadata = {
  title: `${BRAND_NAME} — Turn more of your existing leads into paying customers`,
  description:
    "We install a full-time AI system into home emergency and exterior businesses that responds to, follows up with, and converts leads around the clock.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBFAF7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        {/* The three funnel pages — every page gets the same nav. */}
        <Nav />
        {children}
        {/* A2P compliance block — required on EVERY page, so it lives in the
            root layout rather than per-page. */}
        <Footer />

        {/* GoHighLevel chat widget — site-wide, INCLUDING the root URL.
            LeadConnector's compliance checker is automated: it fetches the
            root domain and greps for this loader. A widget on a sub-page
            only (e.g. /text-us) fails that check even though a human would
            find it.

            Box 6 of the attestation prohibits forms collecting PHONE NUMBERS
            or SMS OPT-IN CONSENT on any page carrying the widget. The only
            form on this site is the scan form on /scan (business name +
            website) — it collects neither, so the attestation holds
            site-wide. The landing page (/) and /what-we-do have no forms at
            all. Do not add a phone or consent field to any page without
            moving this. */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id={GHL_CHAT_WIDGET_ID}
          data-source="WEB_USER"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
