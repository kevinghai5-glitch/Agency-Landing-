"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GHL_CHAT_WIDGET_ID } from "@/config/brand";
import { useScan } from "./ScanContext";

/**
 * The GoHighLevel chat widget — PRE-SCAN ONLY.
 *
 * Why this can't just live in the root layout: the pitch page and the report
 * page are the same route (/), swapped client-side on scan phase. So the
 * only thing that can gate the widget is `phase`, not the URL.
 *
 * It must disappear once results render, because the report page carries the
 * booking CTA (and will soon carry an embedded GHL calendar) — two GHL
 * embeds on one page is the conflict we're avoiding.
 *
 * Two mechanisms, deliberately belt-and-braces:
 *   1. The <Script> isn't rendered at all in report mode, so the loader never
 *      *starts* fetching while results are up.
 *   2. A class on <html> hides any widget the loader already injected. The
 *      loader appends <chat-widget> to <body> as a side effect — unmounting
 *      the <Script> does NOT take that element with it, so hiding is what
 *      actually removes it from the page. CSS in globals.css.
 *
 * Hiding rather than removing the element is intentional: "Scan another site"
 * returns to pitch mode, and re-creating the widget after tearing it out is
 * fragile. Hidden ⇄ shown is reversible and instant.
 */
export default function ChatWidget() {
  const { phase } = useScan();
  const hidden = phase === "results";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("hide-chat-widget", hidden);
    return () => root.classList.remove("hide-chat-widget");
  }, [hidden]);

  if (hidden) return null;

  return (
    // strategy="lazyOnload": loads only after the page is interactive, so a
    // third-party script can never delay the scan. The widget id is a public
    // embed identifier (it ships in page source by design), not a secret.
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={GHL_CHAT_WIDGET_ID}
      data-source="WEB_USER"
      strategy="lazyOnload"
    />
  );
}
