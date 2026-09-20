/**
 * D · The messages — "you don't write any of it", beside a CSS-only phone
 * showing what goes out. No image asset: the frame is a rounded ink
 * border, a notch, and bubbles. Incoming bubbles are wash-on-paper,
 * outgoing are the gold accent with white text.
 *
 * Every bubble shown is OUTGOING — this is the owner's side, the messages
 * sent in their business's name — so nothing here is invented customer
 * dialogue. `from: "them"` exists so a real reply can be dropped in later.
 */
const THREAD = [
  {
    from: "us",
    text: "Sorry we missed you — this is [Business]. What’s going on?",
  },
  {
    from: "us",
    text: "Hi Sarah — following up on the estimate we sent Tuesday. Any questions on it?",
  },
  {
    from: "us",
    text: "You’re confirmed for tomorrow at 9:00 AM. Reply C to cancel.",
  },
] as const;

import { SectionHead } from "@/components/ui/section-head";

export default function Messages() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto grid gap-10 sm:grid-cols-2 sm:items-center">
        <SectionHead
          align="left"
          eyebrow="The messages"
          title={<>You don&apos;t write any of it.</>}
          lede={
            <>
              Every message is written, tested, and live on day one — sent
              in your business&apos;s name, not ours. You can change any of
              them. Most owners never do.
            </>
          }
        />

        {/* CSS phone frame */}
        <div className="mx-auto w-full max-w-[280px]" aria-label="Example messages">
          <div className="rounded-[2rem] border-[6px] border-ink bg-bg shadow-card px-3 pt-8 pb-6 relative">
            <span
              aria-hidden="true"
              className="absolute top-2 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-full bg-ink"
            />
            <ul className="flex flex-col gap-2.5">
              {THREAD.map((m, i) => {
                const outgoing = m.from === "us";
                return (
                  <li
                    key={i}
                    className={`flex ${outgoing ? "justify-end" : "justify-start"}`}
                  >
                    <p
                      className={`max-w-[85%] rounded-[14px] px-3.5 py-2 text-sm leading-snug ${
                        outgoing
                          ? "bg-accent text-surface rounded-br"
                          : "bg-surface-2 text-ink rounded-bl"
                      }`}
                    >
                      {m.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
