/**
 * Section 7 — how it works, 3 steps. The scan results ARE the report,
 * delivered on screen the moment the scan finishes. Nothing is emailed,
 * nothing "arrives later" — the only next step after results is booking
 * the 15-minute walkthrough.
 */
const STEPS = [
  {
    n: "1",
    title: "Run the instant scan",
    body: "Two fields, thirty seconds. No signup, nothing to wait for.",
  },
  {
    n: "2",
    title: "See where you're leaking",
    body: "Results on screen immediately. Plain English, real data, no email.",
  },
  {
    n: "3",
    title: "Book the walkthrough",
    body: "Fifteen minutes. A real monthly number, and what fixing it costs.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center mb-8">
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
