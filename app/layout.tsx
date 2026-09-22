import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AuroraGround } from "@/components/ui/aurora-ground";
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

// ONE face: Plus Jakarta Sans — the geometric grotesk the approved mock
// uses (the closest Google Fonts gets to Clay's Roobert). Headings 600,
// body 500, labels 600/700. Self-hosted via next/font.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Site default = the landing page. /scan and the secondary pages set their
// own title/description.
export const metadata: Metadata = {
  title: `${BRAND_NAME} — Turn more of your existing leads into paying customers`,
  description:
    "We install a full-time AI system into home exterior and emergency service businesses that responds to, follows up with, and converts leads around the clock.",
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
    <html
      lang="en"
      className={jakarta.variable}
      // data-theme is set by the script below before React hydrates.
      suppressHydrationWarning
    >
      <body className="font-sans font-medium antialiased">
        {/* Re-applies a saved dark choice before first paint, so there is
            no white flash. Light is the default; see components/ThemeToggle. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("reclaimedhq:theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`}
        </Script>
        {/* The aurora is the GROUND of every page — a wash at the top behind
            the nav and hero, a fainter one at the bottom behind the closing
            block and footer — so nav and footer sit on it, transparent. */}
        <AuroraGround>
          {/* The three funnel pages — every page gets the same nav. */}
          <Nav />
          {children}
          {/* A2P compliance block — required on EVERY page, so it lives in
              the root layout rather than per-page. */}
          <Footer />
        </AuroraGround>

        {/* GoHighLevel chat widget — site-wide, INCLUDING the root URL.
            LeadConnector's compliance checker is automated: it fetches the
            root domain and greps for this loader. A widget on a sub-page
            only (e.g. /text-us) fails that check even though a human would
            find it.

            Box 6 of the attestation prohibits forms collecting PHONE NUMBERS
            or SMS OPT-IN CONSENT on any page carrying the widget. The only
            form on this site is the scan form on /scan (business name +
            website) — it collects neither, so the attestation holds
            site-wide. The landing page (/), /what-we-do and
            /meet-the-founder have no forms at all. Do not add a phone or
            consent field to any page without moving this.

            The attributes are GHL's embed snippet verbatim (src,
            data-resources-url, data-widget-id) — how the bubble behaves
            (greeting, auto-open, position) is configured in GHL, not here. */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id={GHL_CHAT_WIDGET_ID}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
