"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { BOOKING_URL, BRAND_NAME, HOME_URL, NAV_LINKS } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * Site nav — the four pages (config/brand.ts NAV_LINKS), on every page from
 * the root layout, sitting TRANSPARENT on the aurora ground.
 *
 * md and up: wordmark left; the links as a translucent pill group with the
 * current page lifted white; an ink pill "Book a demo" on the right (the
 * approved mock's layout).
 *
 * Below md: wordmark left, a "Menu" pill right. The menu opens as a white
 * card under the bar with the three links as rows and "Book a demo" at the
 * bottom — four labels don't fit a phone as a pill row, and a horizontal
 * scroller hides the pages it exists to show. Closes on navigation and on
 * Escape. Client component for `usePathname` and the open state.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Route changed → the menu has done its job.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === HOME_URL ? pathname === HOME_URL : pathname.startsWith(href);

  return (
    <header className="relative z-[3]">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 xl:px-12 md:h-[88px]"
      >
        <Link
          href={HOME_URL}
          className="text-ink text-xl font-bold tracking-[-0.02em]"
        >
          {BRAND_NAME}
        </Link>

        {/* md+: the pill group and Book a demo */}
        <div className="hidden items-center gap-3 md:flex">
          <ul className="flex items-center gap-1 rounded-full bg-surface/55 p-1 backdrop-blur-sm">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      active ? "bg-surface text-ink shadow-soft dark:bg-panel-2" : "text-muted hover:text-ink",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {BOOKING_URL && (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center whitespace-nowrap rounded-full bg-ink px-[18px] py-[11px] text-sm font-semibold text-bg transition-opacity hover:opacity-90 lg:inline-flex"
            >
              Book a demo
            </a>
          )}
        </div>

        {/* < md: the Menu pill */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-semibold text-ink shadow-soft md:hidden"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="relative block h-3 w-4">
            <i
              className={cn(
                "absolute left-0 block h-[2px] w-4 rounded-full bg-ink transition-transform",
                open ? "top-[5px] rotate-45" : "top-0",
              )}
            />
            <i
              className={cn(
                "absolute left-0 block h-[2px] w-4 rounded-full bg-ink transition-transform",
                open ? "top-[5px] -rotate-45" : "top-[10px]",
              )}
            />
          </span>
        </button>
      </nav>

      {/* The mobile menu card */}
      <div
        id={menuId}
        hidden={!open}
        className="absolute inset-x-5 top-[64px] rounded-[24px] bg-surface p-2 shadow-float md:hidden"
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-[18px] px-4 py-3.5 text-[15px] font-semibold transition-colors",
                    active ? "bg-surface-2 text-ink" : "text-ink hover:bg-bg",
                  )}
                >
                  {label}
                  {active && <span className="h-2 w-2 rounded-full bg-accent" />}
                </Link>
              </li>
            );
          })}
        </ul>
        {BOOKING_URL && (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center rounded-full bg-ink px-[18px] py-3.5 text-[15px] font-semibold text-bg"
          >
            Book a demo
          </a>
        )}
      </div>
    </header>
  );
}
