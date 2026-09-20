import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * CALLOUT — a 2px accent left edge, no box, no background. The document
 * system's way of lifting a line out of the flow; replaces any floating
 * tinted box. Optional mono label above, optional serif title, then body.
 */
export function Callout({
  label,
  title,
  children,
  tone = "light",
  className,
}: {
  label?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  tone?: "light" | "ink";
  className?: string;
}) {
  const ink = tone === "ink";
  return (
    <div className={cn("border-l-2 border-accent pl-5 py-1", className)}>
      {label && (
        <p
          className={cn(
            "mono-label mb-2",
            ink ? "text-on-ink-accent" : "text-accent-text",
          )}
        >
          {label}
        </p>
      )}
      {title && (
        <p
          className={cn(
            "font-serif text-xl sm:text-2xl leading-snug",
            ink ? "text-bg" : "text-ink",
          )}
        >
          {title}
        </p>
      )}
      <div className={cn(title && "mt-3")}>{children}</div>
    </div>
  );
}
