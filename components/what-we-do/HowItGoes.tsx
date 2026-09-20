/**
 * E · How it goes — three numbered steps from call to live, same
 * gold-serif-numeral treatment as How-it-works on /scan. "Two weeks" is
 * the one time commitment on the page; no pricing, no dollar figures.
 */
const STEPS = [
  {
    n: "1",
    title: "Strategy call",
    body: "Thirty minutes. We find where your leads are dying. You'll know whether this applies to you before the call ends.",
  },
  {
    n: "2",
    title: "Build",
    body: "Two weeks. Set up in your business's name, with every piece tested before it touches a customer.",
  },
  {
    n: "3",
    title: "Go-live",
    body: "A walkthrough on Zoom. You get a login, an app on your phone, and a report every month showing what it caught.",
  },
] as const;

export default function HowItGoes() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center mb-8">
          Live in two weeks.
        </h2>
        <ol className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col">
              <span className="stat-number text-4xl">{step.n}</span>
              <h3 className="font-serif text-xl text-ink mt-3">{step.title}</h3>
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
