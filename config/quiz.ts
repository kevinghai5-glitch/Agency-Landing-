/**
 * The INTERNAL LEAKS QUIZ — questions, severities, leak rates, and all
 * result copy. This file plus config/verticals.ts is the entire tuning
 * surface: no math constants live anywhere else.
 *
 * Each question maps 1:1 to a system we build — the walkthrough converts
 * answer → fix, so the `system` field is the bridge to the sales
 * conversation, and the transformation block's after-lines describe that
 * system live.
 *
 * ── BENCHMARKS the rates below are grounded in (source names, kept here so
 *    the numbers stay defensible when tuned) ──────────────────────────────
 *  - CallRail missed-call research: roughly 27–29% of inbound calls to
 *    local service businesses go unanswered; ~85% of callers who reach
 *    voicemail don't leave a message — they dial the next result.
 *  - MIT Lead Response study (popularized via Harvard Business Review):
 *    contacting a web lead within 5 minutes vs. 30+ makes qualifying
 *    contact dramatically more likely; response the next day is close to
 *    starting over.
 *  - Follow-up pattern (industry sales studies, framed as a pattern, no
 *    fake precision): most businesses stop after a single follow-up;
 *    close to half of unclosed quotes never get one at all.
 *
 * RATES: each severity maps to a [LOW, HIGH] estimate of the FRACTION OF
 * TOTAL MONTHLY INQUIRIES lost to that leak. Channel mix (what share of
 * leads are calls vs forms vs bookings) is folded into the rate — that
 * keeps the math one multiplication: leads × rate = jobs lost. The numbers
 * are deliberately conservative: better to undershoot and be believed.
 * Severity 0 is best practice = no loss. The DATABASE question is a stock,
 * not a flow — its "rates" are recoverable JOBS per month, not a fraction
 * (jobsDirect: true).
 *
 * "Don't know / don't track" options are FINDINGS, not nulls: they carry
 * `untracked: true`, count at the second-worst severity (2), and render
 * with an assumption label plus the you're-not-measuring-this line.
 */

export type Severity = 0 | 1 | 2 | 3;

export interface QuizOption {
  label: string;
  severity: Severity;
  untracked?: boolean;
}

export interface QuizQuestion {
  id: string;
  /** The system we build for this leak — the walkthrough's answer→fix map. */
  system: string;
  question: string;
  /** Ordered best-practice → worst. */
  options: QuizOption[];
  /** [lo, hi] loss per severity 1–3 (fraction of monthly inquiries, or jobs
   *  per month when jobsDirect). */
  rates: Record<1 | 2 | 3, [number, number]>;
  jobsDirect?: boolean;
  /** Their answer restated as fact, per severity. */
  restate: Partial<Record<1 | 2 | 3, string>>;
  restateUntracked?: string;
  /** How the lead is lost — one line. */
  mechanism: string;
  /** Honest acknowledgment when the answer is best practice. */
  clean: string;
  /** Transformation block: before-state per answer bucket, after-state fixed. */
  beforeMild: string;
  beforeBad: string;
  beforeUntracked?: string;
  after: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "after-hours",
    system: "24/7 instant lead response",
    question: "A lead calls or messages at 8pm. What happens?",
    options: [
      { label: "Someone — or something — responds within minutes", severity: 0 },
      { label: "They get voicemail and we call back next morning", severity: 1 },
      { label: "Nothing until someone checks", severity: 2 },
      { label: "Honestly not sure", severity: 2, untracked: true },
    ],
    rates: { 1: [0.01, 0.025], 2: [0.03, 0.06], 3: [0.03, 0.06] },
    restate: {
      1: "You said after-hours leads get voicemail and wait for a morning callback.",
      2: "You said after-hours leads sit until someone checks.",
    },
    restateUntracked: "You're not sure what happens to after-hours leads.",
    mechanism:
      "Evenings are when owners finally sit down to deal with this stuff — the ones who can't reach you book whoever answers.",
    clean: "After-hours response sounds handled — not where you're leaking.",
    beforeMild: "After-hours leads wait for a morning callback",
    beforeBad: "Leads wait overnight",
    beforeUntracked: "Nobody knows what happens after hours",
    after: "Every lead answered in seconds, 24/7",
  },
  {
    id: "missed-calls",
    system: "missed-call text-back",
    question: "A call gets missed during a busy day. Then what?",
    options: [
      { label: "They instantly get a text back", severity: 0 },
      { label: "We call back when we can", severity: 1 },
      {
        label: "They hit voicemail and we hope they leave a message",
        severity: 2,
      },
      { label: "Don't know how many we even miss", severity: 2, untracked: true },
    ],
    rates: { 1: [0.015, 0.03], 2: [0.04, 0.07], 3: [0.04, 0.07] },
    restate: {
      1: "You said missed calls get a callback when someone can get to it.",
      2: "You said missed calls hit voicemail and you hope they leave a message.",
    },
    restateUntracked: "You don't know how many calls you're missing.",
    mechanism:
      "Most callers who reach voicemail don't leave a message — they dial the next name on the list.",
    clean: "Missed calls get an instant text back — that leak's plugged.",
    beforeMild: "Missed calls wait for a callback",
    beforeBad: "Missed calls vanish",
    beforeUntracked: "Nobody counts the missed calls",
    after: "Every missed call gets an instant text back",
  },
  {
    id: "speed-to-lead",
    system: "instant form-fill response",
    question:
      "Someone fills out your website form. How fast does a human or system respond?",
    options: [
      { label: "Under 5 minutes", severity: 0 },
      { label: "Within a few hours", severity: 1 },
      { label: "Within a day or two", severity: 2 },
      { label: "We don't track this", severity: 2, untracked: true },
    ],
    rates: { 1: [0.01, 0.025], 2: [0.03, 0.06], 3: [0.03, 0.06] },
    restate: {
      1: "You said form fills get a response within a few hours.",
      2: "You said form fills wait a day or two.",
    },
    restateUntracked: "You're not tracking how fast form fills get answered.",
    mechanism:
      "A form fill is someone ready to talk right now — by tomorrow they've usually talked to someone else.",
    clean: "Form fills get answered inside five minutes — that's how it should work.",
    beforeMild: "Form fills wait hours",
    beforeBad: "Form fills wait days",
    beforeUntracked: "Nobody tracks response time",
    after: "Every form fill answered in under five minutes",
  },
  {
    id: "quote-follow-up",
    system: "automated quote follow-up",
    question: "You send a quote and hear nothing. What happens next?",
    options: [
      {
        label: "Automatic + personal follow-up over the next days",
        severity: 0,
      },
      { label: "One follow-up if we remember", severity: 1 },
      { label: "Usually nothing", severity: 2 },
      { label: "Nothing — we move on", severity: 3 },
    ],
    rates: { 1: [0.015, 0.03], 2: [0.035, 0.06], 3: [0.05, 0.09] },
    restate: {
      1: "You said quotes get one follow-up — if someone remembers.",
      2: "You said quotes that go quiet usually get nothing.",
      3: "You said quotes that go quiet get nothing — you move on.",
    },
    mechanism:
      "A quote that went quiet isn't a no — it's a maybe nobody asked twice.",
    clean: "Your quote follow-up sounds tight — not where you're leaking.",
    beforeMild: "Quotes get one follow-up, sometimes",
    beforeBad: "Quiet quotes are left for dead",
    after: "Every quote followed up until it's a yes or a no",
  },
  {
    id: "no-shows",
    system: "booking reminders + no-show recovery",
    question: "Someone books and doesn't show. What happens?",
    options: [
      {
        label: "Automated reminders before + a recovery text after",
        severity: 0,
      },
      { label: "We call if we notice", severity: 1 },
      { label: "Nothing", severity: 2 },
      { label: "Don't track no-shows", severity: 2, untracked: true },
    ],
    rates: { 1: [0.01, 0.02], 2: [0.025, 0.05], 3: [0.025, 0.05] },
    restate: {
      1: "You said no-shows get a call if somebody notices.",
      2: "You said no-shows get nothing.",
    },
    restateUntracked: "You're not tracking no-shows at all.",
    mechanism:
      "A no-show already wanted the appointment — silence is how they stay gone.",
    clean: "Bookings get reminded and recovered — handled.",
    beforeMild: "No-shows get a call if someone notices",
    beforeBad: "No-shows never hear from you again",
    beforeUntracked: "No-shows aren't even counted",
    after: "Every booking confirmed, reminded, and recovered",
  },
  {
    id: "database",
    system: "database reactivation",
    question:
      "Past customers and old quotes from last year — does anyone ever contact them again?",
    options: [
      { label: "Systematic re-engagement", severity: 0 },
      { label: "Occasionally, manually", severity: 1 },
      { label: "Never", severity: 2 },
    ],
    // Stock, not flow: recoverable JOBS per month from the existing list.
    jobsDirect: true,
    rates: { 1: [0.5, 1], 2: [1, 2], 3: [1, 2] },
    restate: {
      1: "You said past customers hear from you occasionally, when someone gets to it.",
      2: "You said past customers and old quotes never hear from you again.",
    },
    mechanism:
      "People who already paid you are the easiest booking you'll ever get — if anyone asks.",
    clean: "You're re-engaging your list on a system — most businesses aren't.",
    beforeMild: "Old customers hear from you when someone remembers",
    beforeBad: "Past customers never hear from you again",
    after: "Your past customers hear from you on a schedule",
  },
];

/** Rendered under every untracked (assumed) finding. */
export const UNTRACKED_LINE =
  "You're not measuring this — untracked leaks are usually the biggest ones.";

/** Believability caps (see lib/quizMath.ts). Total low end must stay under
 *  CAP_LO_SHARE of typical monthly revenue for the trade; total high end
 *  under CAP_HI_SHARE. When either trips, ALL ranges compress together and
 *  the copy adds "conservatively" framing — better to undershoot and be
 *  believed. */
export const CAP_LO_SHARE = 0.3;
export const CAP_HI_SHARE = 0.5;
