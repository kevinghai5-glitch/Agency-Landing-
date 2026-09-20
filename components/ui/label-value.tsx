import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * LABEL / VALUE ROW — [mono label, fixed ~150px] [Inter body], hairline
 * between rows. For specs and facts only, never for things people compare
 * (those stay cards). Wrap rows in <LabelValueList>.
 */
export function LabelValueList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <dl className={cn("flex flex-col divide-y divide-border", className)}>
      {children}
    </dl>
  );
}

export function LabelValueRow({
  label,
  children,
  tone = "light",
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  tone?: "light" | "ink";
  className?: string;
}) {
  const ink = tone === "ink";
  return (
    <div className={cn("flex flex-col sm:flex-row gap-1 sm:gap-6 py-4", className)}>
      <dt
        className={cn(
          "mono-label sm:w-[150px] sm:flex-none sm:pt-[0.4rem]",
          ink ? "text-on-ink-accent" : "text-accent-text",
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          "text-base leading-relaxed",
          ink ? "text-bg" : "text-ink",
        )}
      >
        {children}
      </dd>
    </div>
  );
}
