import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * EYEBROW — the small-caps label above a heading: 12px, 700, gold,
 * letterspaced, no container. (`tone` is accepted for older call sites.)
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "light" | "ink";
  className?: string;
}) {
  return <span className={cn("chip", className)}>{children}</span>;
}
