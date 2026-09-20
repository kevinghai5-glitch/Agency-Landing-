import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

/**
 * SECTION HEAD — eyebrow, optional mono number, serif heading, Inter lede.
 *
 *   [eyebrow]
 *   [mono number]  [Source Serif 4 heading, weight 400]
 *                  [Inter lede, ink-muted, max-width ~580px]
 *
 * The number is optional — only where sections are genuinely sequential.
 * `as` controls the heading element (h1 for a hero, h2 elsewhere); the
 * hero weight is 300 and comes from the caller via `headingClassName`.
 */
export function SectionHead({
  eyebrow,
  number,
  title,
  lede,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  headingClassName,
  className,
}: {
  eyebrow?: ReactNode;
  number?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "ink";
  as?: "h1" | "h2" | "h3";
  headingClassName?: string;
  className?: string;
}) {
  const centered = align === "center";
  const ink = tone === "ink";
  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <div className={cn("flex gap-4", centered ? "justify-center" : "")}>
        {number && (
          <span
            className={cn(
              "mono-label flex-none pt-[0.55em]",
              ink ? "text-on-ink-accent" : "text-accent-text",
            )}
            aria-hidden="true"
          >
            {number}
          </span>
        )}
        <Heading
          className={cn(
            "font-serif font-normal text-2xl sm:text-4xl leading-tight tracking-tight text-balance",
            ink ? "text-bg" : "text-ink",
            headingClassName,
          )}
        >
          {title}
        </Heading>
      </div>
      {lede && (
        <p
          className={cn(
            "text-lg leading-relaxed mt-4 max-w-[580px] text-balance",
            centered && "mx-auto",
            ink ? "text-on-ink-muted" : "text-muted",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
