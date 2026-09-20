import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * EYEBROW — the mono label that sits above every section heading on every
 * page. JetBrains Mono, uppercase, .18em, 14px margin below.
 *
 * Colour is the readable accent, never the muted grey: at 10px a mono
 * label in #A5A092 fails contrast. On ink grounds pass tone="ink".
 */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "ink";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mono-label tracking-[0.18em] mb-3.5",
        tone === "ink" ? "text-on-ink-accent" : "text-accent-text",
        className,
      )}
    >
      {children}
    </p>
  );
}
