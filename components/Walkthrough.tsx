/**
 * Section 6 — what the 15-minute walkthrough covers.
 *
 * MIRRORS THE ZOOM SOP's agenda script (Section 4.2) beat for beat, because
 * a promise made here that the call doesn't keep is a broken promise:
 *   audit beat (2 min) → how leads get handled once they arrive → a real
 *   monthly number from their volume + job value → what fixing it looks like
 *   and what it costs → "and if it's not worth fixing, I'll tell you that".
 *
 * DELIBERATELY NOT a website review. The SOP is explicit: "if a prospect
 * finishes this call still thinking your product is website work, the call
 * failed regardless of outcome." Roughly 95% of what's sold is internal, so
 * the visible-site beat is named as the two-minute opener it actually is,
 * never as the substance. No service pricing, no specific dollars here — the
 * price is said out loud ON the call.
 */
const COVERS = [
  "Two minutes on the couple of things I could see from outside — then we move on",
  "How leads actually get handled once they come in: after hours, missed calls, follow-up, no-shows, the list you never re-contact",
  "A real monthly number on what's slipping — built live from your lead volume and what a job is actually worth to you",
  "If it's worth fixing: exactly what fixing it looks like, and what it costs",
  "If it isn't worth fixing: I'll tell you that, and we part as friends",
] as const;

export default function Walkthrough() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center">
          What the walkthrough covers
        </h2>
        <p className="text-muted text-lg leading-relaxed mt-5 text-center max-w-xl mx-auto">
          The scan showed the outside. The walkthrough is mostly about the
          part it couldn&apos;t see — what happens to a lead after it reaches
          you — and it ends with a real monthly number built from your
          figures, not estimates.
        </p>

        <ul className="mt-8 flex flex-col gap-4 max-w-xl mx-auto">
          {COVERS.map((item) => (
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
