import type { Metadata } from "next";
import { BRAND_NAME } from "@/config/brand";
import { AuroraBackground } from "@/components/ui/aurora-background";
import WwdHero from "@/components/what-we-do/WwdHero";
import NotThis from "@/components/what-we-do/NotThis";
import MissedCall from "@/components/what-we-do/MissedCall";
import Installed from "@/components/what-we-do/Installed";
import Messages from "@/components/what-we-do/Messages";
import HowItGoes from "@/components/what-we-do/HowItGoes";
import WwdClosing from "@/components/what-we-do/WwdClosing";

export const metadata: Metadata = {
  title: `What we do — ${BRAND_NAME}`,
  description:
    "The AI system we install into home exterior and emergency service businesses to respond to, follow up with, and convert leads around the clock.",
};

/**
 * /what-we-do — what gets installed. One of the three funnel pages
 * (config/brand.ts NAV_LINKS). Section order is FIXED:
 *
 *   Hero        h1 + intro (wording fixed) + one breadth line
 *   A NotThis   not a website · not more leads · not another app
 *   B MissedCall the Tuesday-evening timeline — the page's key block
 *   C Installed the ten pieces, as cards
 *   D Messages  "you don't write any of it" + the phone
 *   E HowItGoes call → build → go-live
 *   F Closing   wash band, Book a Strategy Call, scan as the soft door
 *
 * RULES: no vertical list or "who it's for" section (narrowing costs
 * inbound); no pricing or dollar figures; no testimonials, logos, case
 * studies, counters, stock photos or AI imagery; no forms of any kind —
 * the A2P attestation depends on zero phone/consent fields site-wide.
 */
export default function WhatWeDoPage() {
  return (
    <main>
      <WwdHero />
      <AuroraBackground>
        <NotThis />
        <MissedCall />
        <Installed />
        <Messages />
        <HowItGoes />
        <WwdClosing />
      </AuroraBackground>
    </main>
  );
}
