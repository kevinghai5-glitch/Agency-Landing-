import Link from "next/link";
import { WHAT_WE_DO_URL } from "@/config/brand";
import { Eyebrow } from "@/components/ui/eyebrow";
import TiltCard from "@/components/ui/tilt-card";
import SwipeRow from "@/components/ui/swipe-row";

/**
 * Two halves in the SAME dress, side by side from md and a swipeable row
 * on phones (SwipeRow): "The call" (thirty minutes, one number, the
 * compact timeline) and "The system" (fifteen workflows, five named, See
 * all fifteen →). Both are beige panels with a gold chip, a heading with
 * one gold phrase, and white pieces inside.
 *
 * The timeline follows the Zoom Call Playbook (SOPs/Zoom SOP.pdf, §3
 * "Anatomy of the 30 Minutes"): open 0–2, the measured four 2–4, the
 * calculator 4–12, the summary gate and pivot 12–15, then — only if they
 * say yes to seeing it — scope questions and the walkthrough with the
 * price, 15–30. The first fifteen are the promised walkthrough (lit); the
 * last fifteen happen by invitation (unlit). Keep this in step with the
 * SOP when the call changes.
 */
// Titles are set as two short lines so all five sit at the same height.
const STEPS = [
  { min: "0–2 min", t: ["The plan", "for the call"], on: true },
  { min: "2–4", t: ["Measured", "from outside"], on: true },
  { min: "4–12", t: ["Six questions,", "live math"], on: true },
  { min: "12–15", t: ["Your number.", "Worth fixing?"], on: true },
  { min: "15–30 min", t: ["If yes: the fix", "and its price"], on: false },
];
// Same five, in the same order the board on /what-we-do shows them.
const TAGS = [
  "Instant Lead Response",
  "Missed Call Text‑Back",
  "After‑Hours Auto‑Reply",
  "Owner Hot‑Lead Alert",
  "Estimate Follow‑Up",
];

export default function CallAndSystem() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pt-9 sm:px-8 xl:px-12">
      <SwipeRow label="The call and the system" gridClassName="sm:gap-4 md:grid-cols-2">
      <TiltCard className="panel flex-1 !p-6 sm:!p-8">
        <Eyebrow>The call</Eyebrow>
        <h2 className="mt-2.5 text-ink text-[32px]">
          Thirty minutes. <em className="not-italic text-accent">One number.</em>
        </h2>
        <p className="mt-2.5 text-base text-muted">
          A real monthly figure on what&apos;s slipping — from your volume, not estimates.
        </p>
        <div className="mt-7">
          <div>
            {/* From sm: a stepper — minutes above, five nodes on one line,
                titles below, everything centred in its column. The line is
                solid gold through node four (the promised fifteen) and
                fades to paper for the last step, which only happens if
                they ask to see the fix. Below sm: a plain vertical list. */}
            <ol className="relative hidden grid-cols-5 sm:grid">
              <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[36px] h-[3px] rounded-full bg-ink/10" />
              <span aria-hidden="true" className="absolute left-[10%] top-[36px] h-[3px] w-[60%] rounded-full bg-accent" />
              {STEPS.map((s, i) => (
                <li key={s.min} className="relative z-[1] flex flex-col items-center text-center">
                  <small className="mb-2 block h-4 text-xs font-medium leading-4 text-muted">{s.min}</small>
                  <i
                    className={`grid h-7 w-7 flex-none place-items-center rounded-full border-[3px] border-accent text-[11px] font-bold not-italic ${
                      s.on ? "bg-accent text-surface" : "bg-surface text-accent-text shadow-soft"
                    }`}
                  >
                    {i + 1}
                  </i>
                  <span className="mt-2.5 block text-[13px] font-medium leading-[1.25] tracking-[-0.01em] text-ink">
                    <span className="block whitespace-nowrap">{s.t[0]}</span>
                    <span className="block whitespace-nowrap">{s.t[1]}</span>
                  </span>
                </li>
              ))}
            </ol>
            <ol className="flex flex-col gap-3.5 sm:hidden">
              {STEPS.map((s, i) => (
                <li key={s.min} className="flex items-center gap-3">
                  <i
                    className={`grid h-7 w-7 flex-none place-items-center rounded-full border-[3px] border-accent text-[11px] font-bold not-italic ${
                      s.on ? "bg-accent text-surface" : "bg-surface text-accent-text"
                    }`}
                  >
                    {i + 1}
                  </i>
                  <span>
                    <small className="block text-xs font-medium text-muted">{s.min}</small>
                    <span className="block text-[14px] font-medium leading-tight tracking-[-0.01em] text-ink">{s.t.join(" ")}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-ink/10 pt-4 text-[13px] text-muted">
              <span>Ends with</span>
              <span className="text-[15px] text-ink">Your number, and a straight answer on fixing it.</span>
            </div>
          </div>
        </div>
      </TiltCard>

      <TiltCard className="panel flex flex-1 flex-col justify-between gap-4 !p-6 sm:!p-8">
        <div>
          <Eyebrow>The system</Eyebrow>
          <h2 className="mt-2.5 text-ink text-[32px]">
            Fifteen workflows. <em className="not-italic text-accent">One path.</em>
          </h2>
          <p className="mt-2.5 text-base text-muted">
            Every enquiry lands on one board; each stage sets off the next follow-up on its own.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <span key={t} className="on-panel rounded-full bg-surface px-3.5 py-2 text-[13px] font-semibold text-ink">
              {t}
            </span>
          ))}
          <span className="px-1 py-[7px] text-[13px] font-semibold text-muted">+10 more</span>
        </div>
        <Link href={WHAT_WE_DO_URL} className="pill pill--ink self-start">
          See all fifteen →
        </Link>
      </TiltCard>
      </SwipeRow>
    </section>
  );
}
