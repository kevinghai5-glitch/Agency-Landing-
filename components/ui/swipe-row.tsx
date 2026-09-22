"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SWIPE ROW — on phones, a set of cards becomes one horizontal row you
 * swipe through instead of a tall stack; from `sm` up it is the grid it
 * always was (pass the grid classes in `gridClassName`).
 *
 * Native scroll with snap points — no carousel library, no per-frame JS.
 * The row bleeds to both screen edges so a card peeks in from the right,
 * which is what tells you it swipes; dots under it show where you are and
 * are a real tablist (tap one to jump). The dots are the only JS here: a
 * scroll listener, passive, that rounds scrollLeft to an index.
 *
 * `children` must be the cards themselves (each becomes a snap item).
 */
export default function SwipeRow({
  children,
  gridClassName,
  label,
  className,
}: {
  children: ReactNode[];
  /** Classes for the sm+ grid, e.g. "sm:grid-cols-2 lg:grid-cols-4". */
  gridClassName: string;
  /** Accessible name for the row, e.g. "Always installed". */
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = children.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const first = el.firstElementChild as HTMLElement | null;
        if (!first) return;
        const step = first.offsetWidth + 8; // card + gap-2
        setIndex(Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / step))));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  const goTo = (i: number) => {
    const el = ref.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <ul
        ref={ref}
        aria-label={label}
        className={cn(
          // phones: one swipeable row, bleeding to both screen edges
          "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 [scroll-padding-left:20px]",
          // sm+: the grid, no scrolling
          "sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0",
          gridClassName,
        )}
      >
        {children.map((child, i) => (
          <li
            key={i}
            className="flex w-[78%] max-w-[320px] flex-none snap-start sm:w-auto sm:max-w-none"
          >
            {child}
          </li>
        ))}
      </ul>

      {/* where you are in the row — phones only */}
      <div role="tablist" aria-label={`${label}: card`} className="mt-3 flex justify-center gap-1.5 sm:hidden">
        {children.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Card ${i + 1} of ${count}`}
            onClick={() => goTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200",
              i === index ? "w-5 bg-accent" : "w-1.5 bg-ink/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}
