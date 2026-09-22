"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * TILT & SHINE — the home page's card hover. The card tilts toward the
 * pointer in 3D and a soft highlight tracks the cursor across it; on leave
 * it eases back flat.
 *
 * Cost: two compositor-only properties. The tilt is a transform on the
 * card; the shine is a fixed radial gradient on an oversized layer that is
 * MOVED with a transform (never repainted). Nothing runs while the pointer
 * is elsewhere. Desktop pointers only — touch gets the plain card, and so
 * does prefers-reduced-motion (see .tilt in globals.css).
 */
export default function TiltCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      // Big panels tilt less than small cards: ~6° at 360px, ~4° at 560px.
      const max = Math.min(6, 2200 / r.width);
      el.classList.remove("is-leaving");
      el.style.setProperty("--ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--sx", `${((x - 0.5) * r.width).toFixed(1)}px`);
      el.style.setProperty("--sy", `${((y - 0.5) * r.height).toFixed(1)}px`);
    };
    const leave = () => {
      el.classList.add("is-leaving");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={cn("tilt", className)}>
      {children}
    </div>
  );
}
