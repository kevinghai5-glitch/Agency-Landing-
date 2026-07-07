/**
 * Section 6 — what the full report adds. Trailer-vs-movie contrast. Lists WHAT
 * is covered, never a sample of the fixes (withholding ladder). No "instant"
 * claim for the full report.
 */
const INCLUDES = [
  "A real screenshot of your site as a customer sees it, with the leaks marked",
  "A full mobile-speed breakdown — where the seconds are going and who it costs you",
  "Your review and competitor comparison, side by side, in your area",
  "A per-leak dollar estimate — roughly what each gap is costing you every month",
] as const;

export default function FullReport() {
  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center">
          The instant scan checks 3 things. The full report covers all 9.
        </h2>
        <p className="text-muted text-lg leading-relaxed mt-5 text-center max-w-xl mx-auto">
          Your full competitor comparison, and the dollar cost of every leak —
          built for your business specifically.
        </p>

        <ul className="mt-10 flex flex-col gap-4 max-w-xl mx-auto">
          {INCLUDES.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden
                className="flex-none mt-1 text-accent"
              >
                <CheckIcon />
              </span>
              <span className="text-ink text-base leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M15 4.5L7 13L3 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
