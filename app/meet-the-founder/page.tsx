import type { Metadata } from "next";
import { BRAND_NAME, FOUNDER_NAME } from "@/config/brand";
import FounderHero from "@/components/founder/FounderHero";

export const metadata: Metadata = {
  title: `Meet the founder — ${BRAND_NAME}`,
  description: `${FOUNDER_NAME} follows the whole path a lead takes to reach a business — from the search to the phone call nobody answered — and says where it breaks.`,
};

/**
 * /meet-the-founder — the founder block, which used to sit on the home
 * page, given its own page and a nav entry. Deliberately just the hero:
 * the photo (the only real photograph on the site), the chip, "I'm
 * Kevin.", the two lines that were already on the site, LinkedIn, the two
 * pills — then the footer. (A principles panel and a closing CTA used to
 * follow; they were cut so the page is one thing.)
 *
 * RULES: no fabricated bio, credentials, quotes, logos or numbers — the
 * checkable identity (a real name, a real photo, a real LinkedIn) IS the
 * proof. No forms of any kind on this page (A2P: the chat widget from the
 * root layout is on every page, and its attestation depends on zero
 * phone/consent fields site-wide). Nav, footer and widget come from the
 * root layout, untouched.
 */
export default function MeetTheFounderPage() {
  return (
    <main>
      <FounderHero />
    </main>
  );
}
