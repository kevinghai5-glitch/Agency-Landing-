import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * The site's "rich" surface: inverted ink carrying the hero's dot grid in
 * negative plus a warm gold corner light. Extracted so the treatment lives
 * in one place instead of being copy-pasted per section.
 *
 * All static CSS — no filters, no animation, zero per-frame cost.
 */
export function InkPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-ink text-bg shadow-card border border-accent/25 p-7 sm:p-9",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(251,250,247,0.09) 1px, transparent 1.4px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 88% -8%, rgba(154,123,63,0.38), transparent 70%), radial-gradient(45% 40% at -5% 108%, rgba(154,123,63,0.16), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
