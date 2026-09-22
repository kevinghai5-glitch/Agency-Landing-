/**
 * The home hero's drawn scene — a phone with the 8:12 PM thread and four
 * cards floating around it (new lead, "11s", owner alert, missed call).
 * Pure CSS/HTML, static: it is a picture of the product, not the product.
 * Nothing here is live and nothing is a form.
 *
 * Below sm the scene is recomposed for a phone screen rather than shrunk:
 * the phone sits centred, only the "11s" and owner-alert cards float on
 * it, and nothing hangs past the edges. From sm up, the full composition.
 *
 * The floating cards sit over the phone's bezel and the gaps between
 * bubbles — never over the thread's text (the "11s" card rides beside the
 * answer it measures). Keep it that way when nudging anything.
 */
export default function HeroScene() {
  return (
    <div
      className="relative mx-auto h-[540px] w-full max-w-[520px] sm:h-[560px] lg:mr-0 lg:max-w-[600px]"
      aria-label="Illustration: a form fill at 8:12 PM answered by text eleven seconds later"
    >
      <FloatCard className="hidden sm:block left-0 top-[116px] z-[2] w-[200px] -rotate-[4deg]" label="New lead · 8:12 PM">
        <b>Sarah Mitchell</b>
        <small>Shingles off after the storm</small>
      </FloatCard>

      <div className="absolute left-1/2 top-2 h-[470px] w-[240px] -translate-x-1/2 rounded-[44px] bg-ink p-[10px] shadow-phone sm:left-auto sm:right-14 sm:top-5 sm:h-[520px] sm:w-[264px] sm:translate-x-0">
        <div className="flex h-full flex-col gap-[10px] overflow-hidden rounded-[36px] bg-surface px-3.5 pb-3.5 pt-[18px]">
          <div className="flex justify-between px-2 text-xs font-bold text-ink"><span>8:12</span><span>●●●</span></div>
          <div className="border-b border-panel-2 pb-2 pt-1.5 text-center text-xs font-bold text-muted">
            Messages<b className="block text-[13px] text-ink">Apex Roofing</b>
          </div>
          <Bubble me>Just sent the form — shingles came off in the storm last night.<time>8:12 PM</time></Bubble>
          <Bubble>Thanks Sarah — we got it and we&apos;ll call you shortly. Want to skip the wait? Book here: apexroofing.ca/book<time>8:12 PM</time></Bubble>
          <Bubble me>Booked Thursday 9am. Thank you!<time>8:14 PM</time></Bubble>
        </div>
      </div>

      <div className="absolute right-0 top-[214px] w-[104px] rotate-[5deg] rounded-[18px] bg-surface px-2.5 py-[18px] text-center shadow-float sm:-right-2 sm:top-[240px] sm:w-[112px]">
        <div className="mb-1 text-xs font-bold text-muted">Answered in</div>
        <div className="text-[38px] font-bold leading-none tracking-[-0.04em] text-accent">11s</div>
      </div>

      <FloatCard className="left-0 bottom-[10px] w-[220px] rotate-[3deg] sm:bottom-[4px] sm:w-[236px]" label="Owner alert">
        <b>Your phone buzzes</b>
        <small>Her name, her number, what she said.</small>
      </FloatCard>

      <FloatCard className="hidden sm:block right-0 bottom-[6px] w-[210px] -rotate-[2deg]" label="Missed call · 6:47 PM" dot="bg-[#C64C3F]">
        <b>Text sent 8 seconds later</b>
        <small>Before she dialled the next result.</small>
      </FloatCard>
    </div>
  );
}

function FloatCard({
  className,
  label,
  dot = "bg-accent",
  children,
}: {
  className: string;
  label: string;
  dot?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`absolute rounded-[18px] bg-surface px-4 py-3.5 text-[13px] shadow-float [&_b]:block [&_b]:text-sm [&_b]:font-bold [&_b]:tracking-[-0.01em] [&_small]:text-xs [&_small]:text-muted ${className}`}>
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold tracking-[0.02em] text-muted">
        <i className={`inline-block h-2 w-2 rounded-full ${dot}`} />
        {label}
      </div>
      {children}
    </div>
  );
}

function Bubble({ me, children }: { me?: boolean; children: React.ReactNode }) {
  return (
    <p
      className={
        me
          ? "max-w-[88%] self-end rounded-[18px] rounded-br-md bg-surface-2 px-3 py-2.5 text-[13px] leading-[1.35] text-ink [&_time]:mt-1 [&_time]:block [&_time]:text-xs [&_time]:font-semibold [&_time]:text-muted"
          : "max-w-[82%] self-start rounded-[18px] rounded-bl-md bg-accent px-3 py-2.5 text-[13px] leading-[1.35] text-surface [&_time]:mt-1 [&_time]:block [&_time]:text-xs [&_time]:font-semibold"
      }
    >
      {children}
    </p>
  );
}
