import type { ScanResult } from "./types";
import { getVertical, type Vertical } from "@/config/verticals";

/**
 * The findings engine — turns a raw ScanResult into the exact content of the
 * results page, as PLAIN DATA (no JSX). One pass produces:
 *
 *   leaks      — every detected leak, worst-first. Each carries THE NUMBER
 *                (their real data), THE MECHANISM (how the lead is lost, as
 *                customer behavior), and THE MONTHLY FRAME (hedged dollar
 *                range from trade-typical job values).
 *   cleanLines — one line per dimension that checked out or returned no
 *                verdict. Saying "your speed is fine — that's not where
 *                you're leaking" is what makes the found leaks believable.
 *   sumLo/Hi   — the visible leaks' ranges summed, for the recurrence block.
 *
 * DIRECTION RULES (unchanged, they are the brand):
 *   - Never manufacture a problem from good data.
 *   - Never flag ambiguous data (null booking signal → soft line, not a card).
 *   - Clean checks are acknowledged, not hidden.
 *
 * DOLLAR RULES: always ranges, always hedged in the copy ("roughly", "at
 * X-typical job values"), always derived from config/verticals.ts. Never a
 * precise invented figure. Job-count assumptions stay inside the sentence
 * ("even a couple of those a month", "one or two jobs") so the math is
 * legible and honest.
 */

export interface Leak {
  key: string;
  /** The big stat: their real number. */
  stat: string;
  statSuffix?: string;
  /** Mechanism + monthly frame, 2–3 sentences, already fully written. */
  body: string;
  /** Hedged monthly dollar range this leak contributes. */
  lo: number;
  hi: number;
}

export interface CleanLine {
  key: string;
  text: string;
  /** True for no-verdict/ambiguous lines — rendered without the ✓ a genuine
   *  pass earns. A checkmark on "we couldn't tell" would be a false pass. */
  soft?: boolean;
}

export interface Findings {
  leaks: Leak[];
  cleanLines: CleanLine[];
  sumLo: number;
  sumHi: number;
  /** True when every dimension that returned data came back clean. */
  allClean: boolean;
  vertical: Vertical;
}

function usd(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function range(lo: number, hi: number): string {
  return `${usd(lo)}–${usd(hi)}`;
}

// ── Direction thresholds (single place to tune) ──
const REVIEW_LEAK_RATIO = 0.6; // below this share of the leader = leak
const REVIEW_LEAK_MIN_COMPETITOR = 25; // ignore trivially-small "leaders"
const RATING_LEAK_MAX = 4.0;
const RATING_LEAK_MIN_REVIEWS = 10; // a low rating off 3 reviews means nothing
const SPEED_LEAK_LCP = 2.5;
const SPEED_LEAK_SCORE = 80;

export function buildFindings(result: ScanResult): Findings {
  const { reviews, speed, checks } = result;
  const vertical = getVertical(reviews?.category);
  const { jobLo, jobHi, phrase } = vertical;

  const leaks: Leak[] = [];
  const cleanLines: CleanLine[] = [];

  // ── Dimension 1: site speed ──
  if (speed) {
    const isLeak =
      speed.score < SPEED_LEAK_SCORE || speed.lcpSeconds > SPEED_LEAK_LCP;
    if (isLeak) {
      const s = speed.lcpSeconds.toFixed(1);
      leaks.push({
        key: "speed",
        stat: s,
        statSuffix: "s",
        lo: 2 * jobLo,
        hi: 2 * jobHi,
        body:
          `Your site takes ${s} seconds to show on a phone. A lead searching ` +
          `from their truck gives it about three before hitting back and ` +
          `tapping the next result — they never see what you'd have quoted. ` +
          `At ${phrase}, even a couple of those a month is roughly ` +
          `${range(2 * jobLo, 2 * jobHi)} walking.`,
      });
    } else {
      cleanLines.push({
        key: "speed",
        text: `Your site speed is fine (${speed.score}/100) — that's not where you're leaking.`,
      });
    }
  }
  // No speed data at all → the pending/failed line is handled by the UI layer
  // (it knows whether the background audit is still running). We never guess.

  // ── Dimension 2: the Google listing (review gap + rating) ──
  if (reviews) {
    const { count, rating, competitorCount, competitorName } = reviews;
    const leader = competitorName || "the local leader";

    const gapIsLeak =
      competitorCount >= REVIEW_LEAK_MIN_COMPETITOR &&
      count < REVIEW_LEAK_RATIO * competitorCount;

    if (gapIsLeak) {
      // Frame by decision behavior, not vanity count. Multiple only when it
      // reads honestly (2x+); below that the ratio phrasing softens.
      const times = count > 0 ? competitorCount / count : Infinity;
      const timesPhrase =
        times >= 3
          ? `${Math.round(times)}× the reviews`
          : times >= 2
            ? "double the reviews"
            : "the longer track record";
      leaks.push({
        key: "review-gap",
        stat: count.toLocaleString("en-US"),
        lo: 1 * jobLo,
        hi: 2 * jobHi,
        body:
          `${leader} shows ${competitorCount.toLocaleString("en-US")} Google ` +
          `reviews next to your ${count.toLocaleString("en-US")}. When a lead ` +
          `has two tabs open side by side, the one with ${timesPhrase} gets ` +
          `the call — you never hear the phone not ring. If that routes even ` +
          `one or two jobs a month next door, that's roughly ` +
          `${range(jobLo, 2 * jobHi)} in booked work at ${phrase}.`,
      });
    } else if (competitorCount > 0 && count >= competitorCount) {
      cleanLines.push({
        key: "review-gap",
        text: `You're winning the review comparison — ${count.toLocaleString("en-US")} to ${leader}'s ${competitorCount.toLocaleString("en-US")}. Not your problem.`,
      });
    } else if (competitorCount > 0) {
      // Murky middle: behind, but not decisively. A weak finding rendered
      // prominently kills credibility — say so in one honest line instead.
      cleanLines.push({
        key: "review-gap",
        soft: true,
        text: `Your review count trails ${leader}'s, but not by enough to call it a leak. No verdict there.`,
      });
    }

    if (
      rating > 0 &&
      rating < RATING_LEAK_MAX &&
      count >= RATING_LEAK_MIN_REVIEWS
    ) {
      const r = rating.toFixed(1);
      leaks.push({
        key: "rating",
        stat: r,
        statSuffix: "★",
        lo: jobLo,
        hi: jobHi,
        body:
          `Your Google listing shows ${r} stars. Most searchers filter at ` +
          `four — under it, they skip to the next name without a click, no ` +
          `matter how good the work is. Even one job a month lost to that ` +
          `filter is roughly ${range(jobLo, jobHi)} at ${phrase}.`,
      });
    } else if (rating >= RATING_LEAK_MAX && count >= RATING_LEAK_MIN_REVIEWS) {
      cleanLines.push({
        key: "rating",
        text: `${rating.toFixed(1)}★ on Google — your rating isn't costing you calls.`,
      });
    }
  } else {
    cleanLines.push({
      key: "reviews",
      soft: true,
      text: "We couldn't match a Google Business listing from what you entered — no verdict on your listing this run.",
    });
  }

  // ── Dimension 3: the booking path (homepage checks) ──
  if (checks) {
    // bookingCtaFound === false implies no tel link too (a tappable number
    // counts as a booking path) — ONE finding covers that whole absence.
    if (checks.bookingCtaFound === false) {
      leaks.push({
        key: "booking-path",
        stat: "0",
        lo: jobLo,
        hi: jobHi,
        body:
          `A lead lands on your site ready to move — and there's no button ` +
          `to book, no number to tap. They don't hunt; they hit back and ` +
          `call whoever makes it easy. Even one of those a month is roughly ` +
          `${range(jobLo, jobHi)} in work that was already yours.`,
      });
    }
    // NO tap-to-call finding on `hasTel === false` — REMOVED 2026-07-24 per
    // Kevin: the tel: grep misses phone numbers rendered via JS or as plain
    // text, so the card accused real businesses falsely. `hasTel` stays in
    // the scan payload as data, but it is never strong enough evidence to
    // flag on its own. Do not re-add without a more reliable detection.

    if (!checks.https) {
      leaks.push({
        key: "https",
        stat: "!",
        lo: jobLo,
        hi: jobHi,
        body:
          `Your site loads without a secure connection, so some phones warn ` +
          `leads before they ever see your name — "this site may not be ` +
          `safe." Plenty turn back right there. Even one spooked lead a ` +
          `month is roughly ${range(jobLo, jobHi)} at ${phrase}.`,
      });
    }

    if (!checks.mobileViewport) {
      leaks.push({
        key: "viewport",
        stat: "!",
        lo: jobLo,
        hi: jobHi,
        body:
          `On a phone your site renders as a shrunken desktop page — pinch, ` +
          `zoom, squint. Most local searches happen on phones, and most ` +
          `leads won't fight it. Even one who gives up each month is ` +
          `roughly ${range(jobLo, jobHi)} at ${phrase}.`,
      });
    }

    if (checks.https && checks.mobileViewport && checks.bookingCtaFound === true) {
      cleanLines.push({
        key: "booking-path",
        text: "Secure site, phone-friendly, clear way to book — the basics check out.",
      });
    } else if (
      checks.https &&
      checks.mobileViewport &&
      checks.bookingCtaFound === null
    ) {
      // Ambiguous signal: soften, never accuse.
      cleanLines.push({
        key: "booking-path",
        soft: true,
        text: "A contact path exists but it's not obvious — a lead has to go looking. Worth tightening; not your biggest leak.",
      });
    }
  }

  // Rank worst-first: by what it's plausibly costing per month.
  leaks.sort((a, b) => b.hi - a.hi || b.lo - a.lo);

  const sumLo = leaks.reduce((n, l) => n + l.lo, 0);
  const sumHi = leaks.reduce((n, l) => n + l.hi, 0);

  return {
    leaks,
    cleanLines,
    sumLo,
    sumHi,
    allClean: leaks.length === 0,
    vertical,
  };
}
