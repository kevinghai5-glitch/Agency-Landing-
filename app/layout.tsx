import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { BRAND_NAME } from "@/config/brand";
import "./globals.css";

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
