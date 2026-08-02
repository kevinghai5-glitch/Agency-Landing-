"use client";

import { useMemo, useState } from "react";
import {
  QUIZ_QUESTIONS,
  UNTRACKED_LINE,
} from "@/config/quiz";
import {
  getVertical,
  isKnownVertical,
  TRADE_CHOICES,
} from "@/config/verticals";
import { buildQuizOutcome, usd } from "@/lib/quizMath";

/**
 * SECTION B — the internal-leaks quiz. This IS the business: the scan
 * proves credibility with public data, but the service fixes INTERNAL
 * conversion systems, and this quiz is what makes those leaks hurt.
 *
 * Flow: pivot entry (2–3 lines + one button) → optional trade picker (only
 * when the scan couldn't identify the vertical) → six multiple-choice
 * questions, one at a time, ~60 seconds → findings with hedged monthly
 * ranges, the total, and a transformation block that mirrors THEIR answers.
 *
 * The single CTA (BookCall) renders directly below this section in
 * ScanFlow — this component deliberately contains NO booking button, so
 * the page always has exactly one door.
 *
 * All copy, rates, and dollar inputs live in config/quiz.ts and
 * config/verticals.ts. Math in lib/quizMath.ts. Voice rules: hedged ranges
 * only, no hype, never "guaranteed".
 */

type Stage = "entry" | "trade" | "quiz" | "done";

export default function InternalLeaksQuiz({
  category,
}: {
  /** Google Places type from the scan, when a listing matched. */
  category?: string;
}) {
  const [stage, setStage] = useState<Stage>("entry");
  const [tradeKey, setTradeKey] = useState<string | undefined>(undefined);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const knownFromScan = isKnownVertical(category);
  const vertical = getVertical(knownFromScan ? category : tradeKey);

  const outcome = useMemo(
    () =>
      stage === "done" ? buildQuizOutcome(answers, vertical) : null,
    [stage, answers, vertical],
  );

  function start() {
    setStage(knownFromScan ? "quiz" : "trade");
  }

  function pickTrade(key: string) {
    setTradeKey(key || undefined);
    setStage("quiz");
  }

  function answer(optionIndex: number) {
    if (selected !== null) return; // ignore double-taps during the beat
    setSelected(optionIndex);
    window.setTimeout(() => {
      setAnswers((a) => {
        const next = [...a];
        next[qIndex] = optionIndex;
        return next;
      });
      setSelected(null);
      if (qIndex + 1 >= QUIZ_QUESTIONS.length) {
        setStage("done");
      } else {
        setQIndex((i) => i + 1);
      }
    }, 160);
  }

  function back() {
    if (qIndex === 0) {
      setStage(knownFromScan ? "entry" : "trade");
    } else {
      setQIndex((i) => i - 1);
    }
  }

  function redo() {
    setAnswers([]);
    setQIndex(0);
    setStage(knownFromScan ? "quiz" : "trade");
  }

  return (
    <section className="w-full max-w-2xl mx-auto mt-8" data-quiet="">
      {/* The one inverted-ink panel on the page, so it carries the theme's
          textures in negative: the hero's 28px dot grid (light on ink) and a
          warm gold corner light echoing the aurora. Both are static CSS —
          zero per-frame cost (this page has been burned by that before). */}
      <div className="relative overflow-hidden bg-ink text-bg rounded-xl p-8 sm:p-10 shadow-card border border-accent/25">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(251,250,247,0.09) 1px, transparent 1.4px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(55% 45% at 88% -8%, rgba(154,123,63,0.38), transparent 70%), radial-gradient(45% 40% at -5% 108%, rgba(154,123,63,0.16), transparent 70%)",
          }}
        />
        <div className="relative">
        {stage === "entry" && (
          <>
            <p className="text-xs uppercase tracking-widest text-accent mb-3">
              What the scan can&apos;t see
            </p>
            <p className="font-serif text-2xl sm:text-3xl leading-snug">
              The scan only sees the outside — and the outside is the small
              half.
            </p>
            <p className="text-base sm:text-lg leading-relaxed mt-5 opacity-90">
              The expensive leaks live inside the systems no scan can reach:
              what happens <em>after</em> a lead reaches out. Every one of
              them hits leads you already paid for.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3">
              <button
                type="button"
                onClick={start}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 h-14 rounded-lg bg-accent text-surface font-medium text-base tracking-tight hover:opacity-90 active:opacity-100 transition-opacity"
              >
                Answer 6 quick questions — see what the inside leaks cost →
              </button>
              <p className="text-sm opacity-60">
                Multiple choice, about a minute. No signup, nothing sent
                anywhere.
              </p>
            </div>
          </>
        )}

        {stage === "trade" && (
          <>
            <p className="font-serif text-xl sm:text-2xl leading-snug">
              Quick setup — what kind of business is this?
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {TRADE_CHOICES.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => pickTrade(c.key)}
                  className="px-4 py-2 rounded-lg border border-bg/25 text-sm text-bg/90 hover:border-accent hover:text-bg transition-colors"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </>
        )}

        {stage === "quiz" && (
          <Question
            qIndex={qIndex}
            selected={selected}
            onAnswer={answer}
            onBack={back}
          />
        )}

        {stage === "done" && outcome && (
          <QuizResults
            outcome={outcome}
            phrase={vertical.phrase}
            onRedo={redo}
          />
        )}
        </div>
      </div>
    </section>
  );
}

// ── Question screen ───────────────────────────────────────────────────────────

function Question({
  qIndex,
  selected,
  onAnswer,
  onBack,
}: {
  qIndex: number;
  selected: number | null;
  onAnswer: (i: number) => void;
  onBack: () => void;
}) {
  const q = QUIZ_QUESTIONS[qIndex];
  const progress = (qIndex / QUIZ_QUESTIONS.length) * 100;

  return (
    <div>
      <div className="flex items-center justify-between text-sm opacity-60">
        <button
          type="button"
          onClick={onBack}
          className="hover:opacity-100 transition-opacity"
        >
          ← Back
        </button>
        <span>
          Question {qIndex + 1} of {QUIZ_QUESTIONS.length}
        </span>
      </div>
      <div className="mt-3 h-1 rounded-full bg-bg/15 overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="font-serif text-xl sm:text-2xl leading-snug mt-6">
        {q.question}
      </p>

      <div className="mt-5 flex flex-col gap-2">
        {q.options.map((opt, i) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onAnswer(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border text-base leading-snug transition-colors ${
              selected === i
                ? "border-accent bg-accent/15 text-bg"
                : "border-bg/25 text-bg/90 hover:border-accent"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────

function QuizResults({
  outcome,
  phrase,
  onRedo,
}: {
  outcome: ReturnType<typeof buildQuizOutcome>;
  phrase: string;
  onRedo: () => void;
}) {
  const { leaks, cleans, totalLo, totalHi, capped, allClean } = outcome;

  if (allClean) {
    // Persona: every answer best-practice. Say so plainly; the CTA below
    // stays but its qualification line does the honest gatekeeping.
    return (
      <div>
        <p className="text-sm uppercase tracking-widest opacity-60">
          What your six answers say
        </p>
        <p className="font-serif text-2xl sm:text-3xl leading-snug mt-4">
          By your answers, the inside of your business sounds tight.
        </p>
        <ul className="mt-5 flex flex-col gap-2">
          {cleans.map((c) => (
            <li key={c.q.id} className="text-base leading-relaxed opacity-80">
              ✓ {c.text}
            </li>
          ))}
        </ul>
        <p className="text-base sm:text-lg leading-relaxed mt-6 opacity-90">
          If that holds up in your real numbers, you don&apos;t need the
          walkthrough — and if you book it anyway, I&apos;ll tell you exactly
          that. The scan above is the only place we saw anything leaking.
        </p>
        {/* Same scope disclosure as the leaky path — a clean six is not a
            clean seventeen, and letting someone believe otherwise would be
            the same credibility failure as inventing a leak. */}
        <p className="text-base leading-relaxed mt-4 opacity-90">
          Worth saying: six is what a minute of questions can cover. A full
          diagnosis looks at seventeen — but nothing you&apos;ve told me here
          says you&apos;re bleeding.
        </p>
        <RedoLink onRedo={onRedo} />
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm uppercase tracking-widest opacity-60">
        What your six answers say
      </p>

      {/* 1 — per-leak findings, worst first */}
      <div className="mt-6 flex flex-col gap-6">
        {leaks.map((l) => (
          <div key={l.q.id}>
            <p className="text-base sm:text-lg font-medium leading-snug">
              {l.restated}
            </p>
            {l.untracked && (
              <p className="text-sm leading-relaxed mt-1 opacity-70 italic">
                {UNTRACKED_LINE}
              </p>
            )}
            <p className="text-base leading-relaxed mt-1 opacity-70">
              {l.q.mechanism}
            </p>
            <p className="text-base leading-relaxed mt-1 text-accent">
              Roughly {usd(l.lo)}–{usd(l.hi)} a month at {phrase}
              {l.untracked ? " — counted cautiously, as an assumption" : ""}.
            </p>
          </div>
        ))}
      </div>

      {cleans.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2">
          {cleans.map((c) => (
            <li key={c.q.id} className="text-base leading-relaxed opacity-70">
              ✓ {c.text}
            </li>
          ))}
        </ul>
      )}

      {/* 2 — the monthly total */}
      <div className="mt-8 border-l-2 border-accent pl-5 py-1">
        <p className="font-serif text-xl sm:text-2xl leading-snug">
          {capped ? "Conservatively, that" : "That"} puts the inside leaks
          somewhere in the range of {usd(totalLo)}–{usd(totalHi)} a month —
          every month it stays like this.
        </p>
        {/* Scope, stated plainly and given its own line — buried in the
            methodology footnote nobody read it. Honest framing only: no
            escalation, no "even more!!", no second number invented for the
            other eleven. Just the fact that they aren't counted. */}
        <p className="text-base sm:text-lg leading-relaxed mt-4">
          And that&apos;s six leaks. A full diagnosis covers seventeen — the
          other eleven aren&apos;t in that number.
        </p>
        <p className="text-sm leading-relaxed mt-3 opacity-60">
          Based on your six answers, {phrase}, and published industry
          benchmarks. On the call we start from these answers and go further —
          your actual lead volume, what a job is really worth to you, and the
          leaks these six couldn&apos;t cover.
        </p>
      </div>

      {/* 3 — transformation, mirrored from THEIR answers */}
      <div className="mt-9">
        <p className="font-serif text-xl sm:text-2xl leading-snug">
          What changes
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-base leading-relaxed">
          <p className="text-sm uppercase tracking-widest opacity-50 sm:mb-1">
            Today
          </p>
          <p className="hidden sm:block text-sm uppercase tracking-widest text-accent/80 sm:mb-1">
            With the system live
          </p>
          {leaks.map((l) => (
            <Row key={l.q.id} before={l.beforeLine} after={l.q.after} />
          ))}
        </div>
        <p className="text-base sm:text-lg leading-relaxed mt-6 opacity-90">
          This is what we build — done for you, running inside your business
          in weeks. That&apos;s the transformation the walkthrough maps out
          on your numbers.
        </p>
      </div>

      <RedoLink onRedo={onRedo} />
    </div>
  );
}

function Row({ before, after }: { before: string; after: string }) {
  return (
    <>
      <p className="opacity-60">— {before}</p>
      <p className="mb-3 sm:mb-1">
        <span aria-hidden className="text-accent">
          →{" "}
        </span>
        {after}
      </p>
    </>
  );
}

function RedoLink({ onRedo }: { onRedo: () => void }) {
  return (
    <p className="mt-6">
      <button
        type="button"
        onClick={onRedo}
        className="text-sm opacity-50 hover:opacity-90 transition-opacity"
      >
        Redo the questions →
      </button>
    </p>
  );
}
