import {
  QUIZ_QUESTIONS,
  CAP_LO_SHARE,
  CAP_HI_SHARE,
  type QuizQuestion,
} from "@/config/quiz";
import type { Vertical } from "@/config/verticals";

/**
 * Quiz math — pure and transparent, no magic number:
 *
 *   jobs lost to a leak  = monthly inquiries × leak rate      (per severity)
 *   (database leak       = recoverable jobs directly — a stock, not a flow)
 *   dollars              = jobs lost × trade-typical job value
 *   total                = sum of the leak ranges
 *
 * Every figure is a RANGE built from the conservative constants in
 * config/quiz.ts and config/verticals.ts, then capped for believability:
 * if the total's low end exceeds CAP_LO_SHARE of typical monthly revenue
 * for the trade (or the high end exceeds CAP_HI_SHARE), every range
 * compresses proportionally and the render adds "conservatively" framing.
 * A single precise figure is never produced anywhere in this file.
 */

export interface QuizLeak {
  q: QuizQuestion;
  /** Index of the option they chose. */
  optionIndex: number;
  /** Effective severity used for math (untracked counts as 2). */
  severity: 1 | 2 | 3;
  untracked: boolean;
  /** Hedged monthly dollar range, already rounded to clean numbers. */
  lo: number;
  hi: number;
  restated: string;
  beforeLine: string;
}

export interface QuizClean {
  q: QuizQuestion;
  text: string;
}

export interface QuizOutcome {
  /** Dollar-bearing leaks, worst first (by high end, then low end). */
  leaks: QuizLeak[];
  cleans: QuizClean[];
  totalLo: number;
  totalHi: number;
  /** True when the believability cap compressed the ranges. */
  capped: boolean;
  allClean: boolean;
}

/** Round to clean, obviously-approximate numbers. */
function roundClean(n: number): number {
  if (n >= 10_000) return Math.round(n / 500) * 500;
  if (n >= 2_000) return Math.round(n / 100) * 100;
  if (n >= 200) return Math.round(n / 50) * 50;
  return Math.round(n / 10) * 10;
}

export function buildQuizOutcome(
  answers: number[],
  vertical: Vertical,
): QuizOutcome {
  const rawLeaks: Array<Omit<QuizLeak, "lo" | "hi"> & {
    rawLo: number;
    rawHi: number;
  }> = [];
  const cleans: QuizClean[] = [];

  QUIZ_QUESTIONS.forEach((q, i) => {
    const optionIndex = answers[i];
    const opt = q.options[optionIndex];
    if (!opt) return; // unanswered — defensive; UI enforces completion

    if (opt.severity === 0) {
      cleans.push({ q, text: q.clean });
      return;
    }

    const severity = opt.severity as 1 | 2 | 3;
    const [rateLo, rateHi] = q.rates[severity];

    // jobsDirect: the rate IS jobs/month. Otherwise: inquiries × rate.
    const jobsLo = q.jobsDirect ? rateLo : vertical.leadsLo * rateLo;
    const jobsHi = q.jobsDirect ? rateHi : vertical.leadsHi * rateHi;

    const restated = opt.untracked
      ? (q.restateUntracked ?? q.restate[severity] ?? "")
      : (q.restate[severity] ?? "");

    const beforeLine = opt.untracked
      ? (q.beforeUntracked ?? q.beforeBad)
      : severity === 1
        ? q.beforeMild
        : q.beforeBad;

    rawLeaks.push({
      q,
      optionIndex,
      severity,
      untracked: Boolean(opt.untracked),
      restated,
      beforeLine,
      rawLo: jobsLo * vertical.jobLo,
      rawHi: jobsHi * vertical.jobHi,
    });
  });

  let totalLo = rawLeaks.reduce((n, l) => n + l.rawLo, 0);
  let totalHi = rawLeaks.reduce((n, l) => n + l.rawHi, 0);

  // Believability cap: compress everything proportionally, never per-leak,
  // so the per-leak ranges still visibly sum to the total.
  const capLo = vertical.revLo * CAP_LO_SHARE;
  const capHi = vertical.revHi * CAP_HI_SHARE;
  let factor = 1;
  if (totalLo > capLo) factor = Math.min(factor, capLo / totalLo);
  if (totalHi > capHi) factor = Math.min(factor, capHi / totalHi);
  const capped = factor < 1;

  const leaks: QuizLeak[] = rawLeaks
    .map((l) => ({
      q: l.q,
      optionIndex: l.optionIndex,
      severity: l.severity,
      untracked: l.untracked,
      restated: l.restated,
      beforeLine: l.beforeLine,
      lo: roundClean(l.rawLo * factor),
      hi: roundClean(l.rawHi * factor),
    }))
    .sort((a, b) => b.hi - a.hi || b.lo - a.lo);

  totalLo = roundClean(totalLo * factor);
  totalHi = roundClean(totalHi * factor);

  return {
    leaks,
    cleans,
    totalLo,
    totalHi,
    capped,
    allClean: rawLeaks.length === 0,
  };
}

export function usd(n: number): string {
  return "$" + n.toLocaleString("en-US");
}
