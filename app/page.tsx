import LandingHero from "@/components/landing/LandingHero";
import TradesTicker from "@/components/landing/TradesTicker";
import NewStandard from "@/components/landing/NewStandard";
import WatchPanel from "@/components/landing/WatchPanel";
import CallAndSystem from "@/components/landing/CallAndSystem";
import LandingFinalCta from "@/components/landing/LandingFinalCta";

/**
 * / — the home page, built from the approved mock (V3 final):
 *
 *   1. Hero — headline, one sentence, gold + white pills, the drawn phone
 *      scene; then the "Built for" niche chips as a news-bar ticker.
 *   2. Where this is going — the new-standard card: manual vs. system,
 *      crew photo on the manual side.
 *   3. Watch it run — the VSL in a sky panel.
 *   4. The call · The system — two halves: the timeline and the compact
 *      workflows card with "See all fifteen →".
 *   5. Close — one line, one gold pill, on the bottom aurora.
 *
 * The founder block ("I'm Kevin") has its own page now — /meet-the-founder,
 * in the nav.
 *
 * No forms of any kind on this page (the scene's "form" is drawn).
 * Copy rules carry over: no invented dollar figures, no pricing, no
 * "guaranteed", no hype vocabulary.
 */
export default function Page() {
  return (
    <main>
      <LandingHero />
      <TradesTicker />
      <NewStandard />
      <WatchPanel />
      <CallAndSystem />
      <LandingFinalCta />
    </main>
  );
}
