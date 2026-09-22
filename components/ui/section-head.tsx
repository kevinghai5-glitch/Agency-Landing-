import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

/**
 * SECTION HEAD — chip, heading (600, tight), lede. Left-aligned by default
 * (the kit's rows and panels); pass align="center" for the closing blocks.
 * `em` inside the title renders in gold — the mock's one accent word.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Heading = "h2",
  headingClassName,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  headingClassName?: string;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "text-ink text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.04] [&_em]:not-italic [&_em]:text-accent",
          eyebrow && "mt-3",
          headingClassName,
        )}
      >
        {title}
      </Heading>
      {lede && (
        <p
          className={cn(
            "text-muted text-lg leading-relaxed mt-4 max-w-[42ch]",
            centered && "mx-auto",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
