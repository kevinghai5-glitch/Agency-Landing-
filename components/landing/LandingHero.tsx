import KineticGrid from "@/components/ui/kinetic-grid";
import { Eyebrow } from "@/components/ui/eyebrow";
import BookingButton from "./BookingButton";
import Vsl from "./Vsl";

/**
 * Landing page hero — headline, one-line how, the VSL, and the door.
 *
 * This page sells the SYSTEM directly (the scan page sells the gap and
 * reaches the same call through the walkthrough framing). The video does
 * the arguing; the copy around it stays short so nothing competes with the
 * play button. The qualifier line under the button is the only hint of
 * what the call is about — the full qualification lives on the scan page.
 *
 * Same KineticGrid "paper" background as the scan hero so the two pages
 * read as one site; the text, video and button are quiet zones.
 */
export default function LandingHero() {
  return (
    <KineticGrid globalColor="paper" quietSelector="[data-quiet]">
      <section className="px-5 pt-12 pb-10 sm:pt-16 sm:pb-12">
        <div className="max-w-2xl mx-auto text-center" data-quiet="">
          <Eyebrow>Lead conversion system</Eyebrow>
          <h1 className="font-serif font-light text-3xl sm:text-5xl leading-[1.1] tracking-tight text-ink text-balance">
            Turn More of Your Existing Leads Into Paying Customers —
            Automatically.
          </h1>
          <p className="text-muted text-lg sm:text-xl leading-relaxed mt-5 max-w-xl mx-auto text-balance">
            We install a full-time AI system into home emergency &amp;
            exterior businesses that responds to, follows up with, and
            converts leads around the clock.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-8 sm:mt-10">
          <Vsl />
        </div>

        <div
          className="max-w-2xl mx-auto mt-8 flex flex-col items-center"
          data-quiet=""
        >
          <BookingButton />
          <p className="text-muted text-sm leading-relaxed text-center mt-4 max-w-xl">
            See how much revenue your business may already be leaving on the
            table.
          </p>
        </div>
      </section>
    </KineticGrid>
  );
}
