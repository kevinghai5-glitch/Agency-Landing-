import type { Metadata } from "next";
import { BRAND_NAME } from "@/config/brand";
import WwdHero from "@/components/what-we-do/WwdHero";
import Board from "@/components/what-we-do/Board";
import WwdClosing from "@/components/what-we-do/WwdClosing";

export const metadata: Metadata = {
  title: `What we do — ${BRAND_NAME}`,
  description:
    "The AI system we install into home exterior and emergency service businesses to answer every enquiry they already get — around the clock.",
};

/**
 * /what-we-do — the approved mock:
 *
 *   Hero       text only: h1 + one line + Book a Strategy Call / run the scan
 *   Installed  one panel: ten cards, then five conditional — each opens its
 *              demo INLINE (Board.tsx → WorkflowCard → DemoPanel)
 *   The map    five ways in → one chain → the pipeline (FitsTogether)
 *   Closing    the stake and the two doors, on the bottom aurora
 *
 * RULES: no pricing or dollar figures; no testimonials, logos, case
 * studies, counters, stock or AI imagery; no forms of any kind — the A2P
 * attestation depends on zero phone/consent fields site-wide (the demo's
 * "form" is drawn with static divs); no live GoHighLevel connection.
 * Nav, footer and chat widget come from the root layout, untouched.
 */
export default function WhatWeDoPage() {
  return (
    <main>
      <WwdHero />
      <Board />
      <WwdClosing />
    </main>
  );
}
