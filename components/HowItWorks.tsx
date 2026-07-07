/**
 * Section 7 — how it works, 3 steps. NEVER say "instant" for the full report:
 * the scan is instant; the report arrives within the hour.
 */
const STEPS = [
  {
    n: "1",
    title: "Run the instant scan",
    body: "Two fields, thirty seconds. You see the first leaks right away.",
  },
  {
    n: "2",
    title: "Get your full report",
    body: "In your inbox within the hour — every leak, your competitor comparison, and what each one's costing you.",
  },
  {
    n: "3",
    title: "Optional 15-minute walkthrough",
    body: "If you want it, I'll show you exactly what's leaking and what fixing it looks like. No pressure either way.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="px-5 py-20 sm:py-28 bg-surface border-y border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center mb-12">
          How it works
        </h2>
        <ol className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col">
              <span className="stat-number text-4xl">{step.n}</span>
              <h3 className="font-serif text-xl text-ink mt-3">
                {step.title}
              </h3>
              <p className="text-muted text-base leading-relaxed mt-2">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
