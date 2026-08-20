import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import Footer from "@/components/Footer";
import { BRAND_NAME, BOOKING_URL_IS_PLACEHOLDER } from "@/config/brand";
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

export const metadata: Metadata = {
  title: `${BRAND_NAME} — See where you're losing the leads you already pay for`,
  description:
    "A free 30-second scan of your real site data. See where visitors and leads leak away before they ever reach you. No signup to see your results.",
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
      {/* The GoHighLevel chat widget is deliberately NOT here. It must only
          appear pre-scan, and pitch/report are the same route (they swap on
          scan phase), so it can't be gated by route — see
          components/ChatWidget.tsx, mounted inside the scan provider in
          app/page.tsx. Keeping it out of the root layout also keeps it off
          /privacy. */}
      <body className="font-sans antialiased">
        {children}
        {/* A2P compliance block — required on EVERY page, so it lives in the
            root layout rather than per-page. */}
        <Footer />
      </body>
    </html>
  );
}
