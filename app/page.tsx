import { ScanProvider } from "@/components/ScanContext";
import Hero from "@/components/Hero";
import Reframe from "@/components/Reframe";
import FullReport from "@/components/FullReport";
import HowItWorks from "@/components/HowItWorks";
import WhyTrust from "@/components/WhyTrust";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

/**
 * The single inbound funnel page. Section order is FIXED — do not reorder.
 * No nav, no secondary offers, no exit links. Everything serves one job: get a
 * qualified local-business owner through the instant scan into the gate.
 *
 * Sections 1–4 (hero → live scan → scorecard → gate) live inside <Hero /> via
 * ScanFlow; the gate reveals only after a scan completes. ScanProvider wraps the
 * whole page so the final CTA (section 10) drives the same scan state.
 */
export default function Page() {
  return (
    <ScanProvider>
      <main>
        {/* 1 hero · 2 live scan · 3 scorecard · 4 gate */}
        <Hero />
        {/* 5 */}
        <Reframe />
        {/* 6 */}
        <FullReport />
        {/* 7 */}
        <HowItWorks />
        {/* 8 */}
        <WhyTrust />
        {/* 9 */}
        <Faq />
        {/* 10 */}
        <FinalCta />
        {/* 11 */}
        <Footer />
      </main>
    </ScanProvider>
  );
}
