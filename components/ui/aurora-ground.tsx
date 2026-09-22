import Image from "next/image";
import type { ReactNode } from "react";
import aurora from "@/public/img/aurora.jpg";
import auroraDark from "@/public/img/aurora-dark.jpg";

/**
 * AuroraGround — the Aceternity aurora as the GROUND of every page.
 *
 * Two washes: one at the top (behind nav + hero, fading out over ~1100px)
 * and a fainter one at the bottom (behind the closing block and the
 * footer). Nothing is painted over them — nav and footer are transparent —
 * which is what makes the site read as one surface.
 *
 * PERF — the aurora is a PICTURE, not a live effect. The original runs
 * `filter: blur(10px) invert(1)` over two full-width gradient layers, one
 * blended with `difference` and drifting on `background-position` for
 * 60s — a full-screen GPU blur re-rendered every frame, which is what made
 * the site heat up laptops. It was rendered ONCE (headless Chrome, the
 * exact original CSS at 1440×1200, t = 0) to public/img/aurora.jpg and is
 * shown here as a static image with opacity + mask. Zero per-frame cost;
 * the look is identical. To re-tune, edit the CSS in the bake file and
 * re-render — don't bring the live filter back.
 *
 * DARK THEME: a second render, the demo's own dark variant (black bands
 * instead of white, no invert) — public/img/aurora-dark.jpg. Both images
 * are in the DOM; CSS shows one per theme (globals.css, .aurora-light /
 * .aurora-dark), so the swap is instant and needs no JS.
 */
export function AuroraGround({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-bg">
      <AuroraLayer position="top" />
      {/* Nav, page and footer as one column at least a screen tall: the
          page (<main>) takes the spare height, so a short page (the
          founder page, the pre-scan page) still ends with the footer at
          the bottom of the screen on the aurora — never a blank band
          under it. A section inside <main> with `my-auto` centres itself
          in that spare height. Every section is forced to full width —
          in a flex column, `mx-auto` would otherwise shrink a section to
          its content instead of its max-width. */}
      <div className="relative z-[1] flex min-h-[100dvh] flex-col [&_main]:flex [&_main]:flex-1 [&_main]:flex-col [&_main>*:not(dialog)]:w-full">
        {children}
      </div>
      <AuroraLayer position="bottom" />
    </div>
  );
}

function AuroraLayer({ position }: { position: "top" | "bottom" }) {
  const top = position === "top";
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-x-0 overflow-hidden",
        top ? "top-0 h-[1180px]" : "bottom-0 h-[760px] [transform:scaleY(-1)]",
      ].join(" ")}
    >
      {/* Cover, anchored top-right: the mask reveals that corner, and on
          narrow screens the crop keeps the same colours in view.
          Deliberately faint: the page reads as its ground colour with the
          aurora just showing through, not as an aurora with a page on it. */}
      {[
        { src: aurora, cls: "aurora-light", light: true },
        { src: auroraDark, cls: "aurora-dark", light: false },
      ].map(({ src, cls, light }) => (
        <Image
          key={cls}
          src={src}
          alt=""
          fill
          priority={top && light}
          sizes="100vw"
          quality={70}
          className={[
            cls,
            "object-cover object-right-top select-none",
            top
              ? "[mask-image:linear-gradient(to_bottom,#000_0,#000_45%,transparent_100%),radial-gradient(ellipse_at_100%_0%,#000_10%,transparent_80%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
              : "[mask-image:linear-gradient(to_bottom,#000_0,#000_35%,transparent_100%)]",
            light
              ? top ? "opacity-[.28]" : "opacity-[.22]"
              : top ? "opacity-[.5]" : "opacity-[.38]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
