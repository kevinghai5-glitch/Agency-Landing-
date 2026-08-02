/**
 * Section 5 — "You don't have a lead problem." Conversion framing ONLY. This
 * page never promises new lead volume, added visitors, or SEO. It reframes the
 * problem as the leads they ALREADY get, quietly dying.
 */
export default function Reframe() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-2xl sm:text-4xl leading-tight tracking-tight text-ink">
          You don&apos;t have a lead problem.
        </h2>
        <p className="text-muted text-lg leading-relaxed mt-6">
          The leads are already coming in. They die somewhere in the middle —
          from a slow reply, from no follow-up, from a booking nobody confirmed.
          The people who wanted to hire you found their way to someone else
          while they waited. That&apos;s not a traffic problem. That&apos;s a
          leak.
        </p>

        <div className="mt-10 max-w-xl mx-auto border-l-2 border-accent pl-5 text-left">
          <p className="text-ink text-lg leading-relaxed italic">
            A lead fills out your form at 8pm. By the time someone calls back
            tomorrow, they&apos;ve already booked your competitor.
          </p>
        </div>
      </div>
    </section>
  );
}
