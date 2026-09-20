"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_NAME, HOME_URL, NAV_LINKS } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * Site nav — the three funnel pages (config/brand.ts NAV_LINKS), on every
 * page from the root layout. Outreach deep-links to whichever page fits
 * where the prospect is, and this is how they move between them.
 *
 * Deliberately plain: brand mark, three links, current page underlined in
 * gold. No CTA button up here — every page already ends in its own door
 * and a nav button would compete with the hero's.
 *
 * Client component only for `usePathname` (the active underline).
 */
export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="px-5 border-b border-border bg-bg">
      <nav
        aria-label="Main"
        className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 py-4"
      >
        <Link
          href={HOME_URL}
          className="font-serif text-ink text-lg tracking-tight self-start"
        >
          {BRAND_NAME}
        </Link>

        <ul className="flex items-center gap-5 sm:gap-6 text-sm">
          {NAV_LINKS.map(({ href, label }) => {
            const active =
              href === HOME_URL ? pathname === HOME_URL : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-block py-1 border-b-2 transition-colors",
                    active
                      ? "text-ink border-accent"
                      : "text-muted border-transparent hover:text-ink",
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
