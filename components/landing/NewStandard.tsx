import Image from "next/image";
import { SectionHead } from "@/components/ui/section-head";
import TiltCard from "@/components/ui/tilt-card";
import SwipeRow from "@/components/ui/swipe-row";

/**
 * "Where this is going" — the AI-implementation card, as approved: the
 * headline and paragraph, then manual vs. system side by side, each with
 * a picture up top and the SAME moment in both captions — one lead, 2 PM.
 * Manual: the roofing crew photo ("2 PM. A lead calls. Nobody near a
 * phone."). System: the owner at his desk, phone lighting up with the
 * booking ("2 PM. Same lead. Answered in eleven seconds.") —
 * public/img/system.webp.
 */
const MANUAL = [
  "Form fills wait for the morning.",
  "Missed calls stay missed.",
  "One follow-up, if someone remembers.",
  "Weekends are a closed sign.",
  "Old quotes never get a second look.",
];
const SYSTEM = [
  "Answered in seconds, day or night.",
  "Missed call, text back in eight seconds.",
  "Four follow-ups over sixteen days, then sixty more.",
  "Evenings and weekends booked while you sleep.",
  "Your phone buzzes the moment a lead is hot.",
];

export default function NewStandard() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pt-2 sm:px-8 xl:px-12">
      <div className="panel">
        <SectionHead
          title={<>AI-powered lead conversion is becoming <em>the new standard.</em></>}
          lede="The businesses that implement AI into their sales and follow-up processes early will have an advantage over businesses still relying entirely on manual response and follow-up."
          className="mb-7 max-w-[62ch]"
        />
        <SwipeRow label="Manual versus the system" gridClassName="md:grid-cols-2 md:gap-3">
          <TiltCard className="on-panel flex-1 overflow-hidden rounded-3xl bg-surface">
            <div className="relative h-[200px] sm:h-[250px] xl:h-[300px]">
              <Image src="/img/crew.jpg" alt="A roofing crew at work on a house roof" fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover" />
              <span className="absolute bottom-3 left-3.5 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-bold text-surface">
                2 PM. A lead calls. Nobody near a phone.
              </span>
            </div>
            <div className="px-6 pb-6 pt-5">
              <p className="mb-3.5 text-[13px] font-bold text-muted">Relying on manual</p>
              <ul className="grid gap-2.5">
                {MANUAL.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm leading-[1.35]">
                    <i className="mt-px grid h-5 w-5 flex-none place-items-center rounded-full bg-surface-2 text-[11px] font-bold not-italic text-muted">–</i>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
          <TiltCard className="on-panel flex-1 overflow-hidden rounded-3xl bg-surface">
            <div className="relative h-[200px] sm:h-[250px] xl:h-[300px]">
              <Image src="/img/system.webp" alt="An owner at his desk, smiling at his phone as a booking comes in" fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover" />
              <span className="absolute bottom-3 left-3.5 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-bold text-surface">
                2 PM. Same lead. Answered in eleven seconds.
              </span>
            </div>
            <div className="px-6 pb-6 pt-5">
            <p className="mb-3.5 text-[13px] font-bold text-accent-text">With the system</p>
            <ul className="grid gap-2.5">
              {SYSTEM.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm leading-[1.35]">
                  <i className="mt-px grid h-5 w-5 flex-none place-items-center rounded-full bg-accent text-[11px] font-bold not-italic text-surface">✓</i>
                  {t}
                </li>
              ))}
            </ul>
            </div>
          </TiltCard>
        </SwipeRow>
      </div>
    </section>
  );
}
