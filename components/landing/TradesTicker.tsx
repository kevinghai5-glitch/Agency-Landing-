import Image from "next/image";
import { TRADES } from "@/config/trades";

/**
 * "Built for" as a news-bar ticker between the hero and the first panel:
 * every niche in config/trades.ts as a photo chip and a smaller "+more"
 * tail, sliding left on a loop. A pinned "Built for" label sits at the
 * left; the strip beside it fades at both ends.
 *
 * Every avatar loads eagerly (next/image would otherwise lazy-load the
 * ones that start off-screen, and they would slide in blank).
 *
 * On load the strip sits still for two seconds with the first four chips
 * (Roofing, Pest control, Water restoration, Garage door repair — the top
 * of config/trades.ts) in view, then starts moving; every refresh or
 * return to the page starts it over from the same place.
 *
 * Motion is ONE compositor-only transform (translateX) on the track —
 * nothing repaints per frame, so it costs nothing on a laptop. The track
 * holds two identical runs; moving it -50% lands exactly on the second
 * run, so the loop is seamless. It keeps moving under the pointer (no
 * hover pause); reduced-motion gets a still row that scrolls by hand
 * (see .ticker-track in globals.css).
 */

export default function TradesTicker() {
  return (
    <section aria-label="Built for" className="relative mx-auto max-w-[1600px] px-5 pb-10 sm:px-8 xl:px-12">
      <div className="flex items-center gap-4">
        {/* The pinned label; the strip beside it fades at both ends, so
            chips slide in from the right and out beside the label. */}
        <span className="flex-none text-[13px] font-semibold text-muted">Built for</span>
        <div className="ticker-mask min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max py-3">
            <Run />
            <Run hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    // One pass of all seventeen per run (≈3,200px): wider than any screen, so
    // a niche never repeats within the visible line.
    // Each run starts with a 32px gap — the width of the strip's left fade —
    // so at rest the first chip (Roofing) sits fully visible beside the label.
    <ul aria-hidden={hidden || undefined} className="flex flex-none gap-3 pl-8 pr-3">
      {TRADES.map((t) => (
        <li
          key={t.label}
          className="inline-flex flex-none items-center gap-2.5 whitespace-nowrap rounded-full bg-surface py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold shadow-soft"
        >
          <Image
            src={t.img}
            alt=""
            width={30}
            height={30}
            loading="eager"
            className="h-[30px] w-[30px] rounded-full object-cover"
          />
          {t.label}
        </li>
      ))}
      {/* The tail — a smaller, quieter pill after the seventeen. */}
      <li className="inline-flex flex-none items-center self-center whitespace-nowrap rounded-full bg-surface px-3 py-[5px] text-xs font-semibold text-muted shadow-soft">
        +more
      </li>
    </ul>
  );
}
