"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

/**
 * AuroraBackground — slow-drifting gradient wash behind page content.
 * Adapted from the original full-screen version for this site:
 *   - Section-scoped wrapper (`relative w-full`), not an `h-screen` centered
 *     hero, and no <main> of its own (the pages already have one) — it wraps
 *     everything below the hero, which keeps its own KineticGrid background.
 *   - PALETTE ONLY: the stock blue/indigo aurora and its light-mode `invert`
 *     trick are gone (inverting gold produces blue — off-budget). The bands
 *     are built from the site tokens via the CSS variables the tailwind
 *     config plugin exposes: var(--accent) gold, var(--border), var(--muted),
 *     on var(--bg) paper. Light-only, so all dark: variants are removed.
 *
 * PERF — this layer sits behind the whole page, so it must cost nothing when
 * idle. Three things the original did that made the page feel heavy:
 *   1. `background-attachment: fixed` → full-page repaint on every scroll.
 *   2. Animating `background-position` → re-rasterizes the entire blurred,
 *      blend-mode surface every frame, forever. Now the gradient is static
 *      and a 200%-wide layer is TRANSLATED instead: rasterized once, then
 *      moved by the compositor. `alternate` avoids a seam at the loop point.
 *   3. A second `::after` layer doing `mix-blend-soft-light` at full size —
 *      dropped. At low opacity behind text the extra richness wasn't
 *      visible enough to justify a second blended surface.
 *   4. `filter: blur()` on a layer this size (~2560×3000 CSS px, doubled
 *      again at 2× DPR) is a very large blurred texture to rasterize and
 *      hold in GPU memory. Removed — but note that dropping blur from the
 *      original REPEATING-LINEAR stripes left hard banding that read as
 *      broken, so the bands were replaced with soft radial blobs, which are
 *      smooth by construction and need no filter at all.
 * `will-change: transform` is correct here (the layer genuinely transforms)
 * where it was waste on the old static element.
 *
 * The wrapper carries a top/bottom mask so the wash fades IN beneath the
 * hero rather than starting on a hard edge.
 *
 * Loudness knobs: the layer opacity (opacity-30) and the blur radius.
 */
interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = false,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn("relative w-full bg-bg", className)}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{
          // Fades the wash IN over the first 200px so the boundary with the
          // hero's KineticGrid dissolves instead of cutting, and back OUT at
          // the very bottom into the footer.
          maskImage:
            "linear-gradient(to bottom, transparent 0, black 200px, black calc(100% - 120px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, black 200px, black calc(100% - 120px), transparent 100%)",
        }}
      >
        <div
          className={cn(
            "absolute -top-[10px] -bottom-[10px] -left-[10px] w-[200%] opacity-70 animate-aurora [will-change:transform]",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]",
          )}
          style={{
            // Soft radial blobs instead of hard-edged repeating stripes. A
            // radial gradient is smooth by construction, so the wash reads
            // organic with NO blur filter — which is what made this layer
            // expensive at ~2560×3000 CSS px (doubled again at 2× DPR).
            backgroundImage: [
              "radial-gradient(55% 40% at 18% 12%, rgba(154,123,63,0.20), transparent 70%)",
              "radial-gradient(50% 38% at 82% 30%, rgba(231,227,216,0.55), transparent 72%)",
              "radial-gradient(60% 42% at 42% 58%, rgba(154,123,63,0.13), transparent 70%)",
              "radial-gradient(48% 36% at 88% 78%, rgba(107,102,89,0.12), transparent 70%)",
              "radial-gradient(52% 40% at 25% 88%, rgba(154,123,63,0.10), transparent 72%)",
            ].join(","),
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
