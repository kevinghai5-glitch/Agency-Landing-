/**
 * C · What gets installed — the ten pieces, as plain cards. Name in
 * Fraunces, one line of what it does. No icons, no dollar figures, no
 * tiers: the list IS the offer, and it reads as one system rather than
 * ten products.
 */
const PIECES = [
  {
    name: "Instant Lead Response",
    body: "Someone fills in your form, they get a text and an email in under a minute.",
  },
  {
    name: "Missed Call Text-Back",
    body: "A call is missed, they get a text before they dial the next result.",
  },
  {
    name: "After-Hours Auto-Reply",
    body: "Evenings and weekends answered, with a booking link attached.",
  },
  {
    name: "Booking Confirmation + Reminders",
    body: "Confirmation, then reminders 24 hours and 2 hours before.",
  },
  {
    name: "Cancellation Guard",
    body: "A cancelled job stops its own reminders. Nobody gets a text about an appointment that isn't happening.",
  },
  {
    name: "No-Show Recovery",
    body: "They don't turn up, they get chased to rebook.",
  },
  {
    name: "Estimate Follow-Up",
    body: "Quote sent and gone quiet: four follow-ups over sixteen days.",
  },
  {
    name: "60-Day Nurture",
    body: "Quoted in spring, closes in autumn. It keeps the conversation alive that long.",
  },
  {
    name: "Review Request",
    body: "Job finished, review asked for, automatically.",
  },
  {
    name: "Owner Hot-Lead Alert",
    body: "Strong buying signal, your phone buzzes, you call while they're still holding theirs.",
  },
] as const;

export default function Installed() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink text-center text-balance">
          Ten things, running whether you&apos;re free or not.
        </h2>
        <p className="text-muted text-lg leading-relaxed mt-4 text-center max-w-xl mx-auto">
          Installed once. Nothing to switch on, nothing to remember.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {PIECES.map((piece, i) => (
            <li
              key={piece.name}
              // Ten cards in three columns leaves one orphan; the last card
              // spans the row so the grid ends on a straight edge.
              className={`rounded-lg bg-surface border border-border p-5 ${
                i === PIECES.length - 1 ? "sm:col-span-3" : ""
              }`}
            >
              <h3 className="font-serif text-lg leading-snug text-ink">
                {piece.name}
              </h3>
              <p className="text-muted text-sm leading-relaxed mt-2">
                {piece.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
