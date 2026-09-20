import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * INK PANEL — the site's "rich" surface: ink ground, 4px radius, the
 * hero's dot grid in negative plus a warm gold corner light. Everything
 * inside uses the on-ink tokens (on-ink-accent / on-ink-muted /
 * on-ink-rule). All static CSS — no filters, no animation.
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
        "relative overflow-hidden rounded bg-ink text-bg shadow-card border border-accent/25 p-7 sm:p-9",
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

/**
 * INK SEQUENCE — a numbered sequence inside an InkPanel: mono number in
 * the on-ink accent, serif title, muted detail, on-ink hairlines between.
 * Extracted from the 01–05 walkthrough panel on /scan; used for any
 * numbered or emphasised sequence ("Live in two weeks" on /what-we-do).
 */
export function InkSequence({
  items,
  className,
}: {
  items: ReadonlyArray<{ title: ReactNode; detail: ReactNode }>;
  className?: string;
}) {
  return (
    <InkPanel className={className}>
      <ol className="flex flex-col">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-5 sm:gap-6 py-4 first:pt-0 last:pb-0 border-b border-on-ink-rule last:border-b-0"
          >
            <span
              className="mono-label text-on-ink-accent flex-none w-8 pt-[0.45rem]"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-serif font-semibold text-lg sm:text-xl leading-snug text-bg">
                {item.title}
              </p>
              <p className="text-base leading-relaxed mt-1 text-on-ink-muted">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </InkPanel>
  );
}
