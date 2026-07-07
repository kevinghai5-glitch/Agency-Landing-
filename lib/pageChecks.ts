import { fetchWithTimeout } from "./fetchWithTimeout";
import type { ScanResult } from "./types";

const HOMEPAGE_TIMEOUT_MS = 3_000;
const MAX_BYTES = 512 * 1024; // cap the HTML we inspect

type Checks = NonNullable<ScanResult["checks"]>;

/**
 * Single fetch of the homepage HTML. No scraping beyond this one request, no
 * screenshots. Extracts three facts:
 *   - https:            did the final resolved URL use https
 *   - mobileViewport:   is <meta name="viewport"> present
 *   - bookingCtaFound:  heuristic — is there any obvious way to book/contact
 *
 * bookingCtaFound is `true | false | null`. We only return `false` when the
 * page clearly has no booking/contact path. If the signal is ambiguous we
 * return `null` so the frontend never flags it. False accusations kill trust.
 */
export async function getPageChecks(siteUrl: string): Promise<Checks> {
  const res = await fetchWithTimeout(siteUrl, HOMEPAGE_TIMEOUT_MS, {
    redirect: "follow",
    headers: {
      // Ask for the mobile-ish HTML a real visitor would get.
      "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
      accept: "text/html",
    },
  });

  const finalUrl = res.url || siteUrl;
  const https = finalUrl.startsWith("https://");

  const html = (await readCapped(res)).toLowerCase();

  const mobileViewport = /<meta[^>]+name=["']viewport["']/.test(html);
  const bookingCtaFound = detectBookingCta(html);

  return { https, mobileViewport, bookingCtaFound };
}

async function readCapped(res: Response): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return await res.text();

  const decoder = new TextDecoder();
  let out = "";
  let received = 0;
  while (received < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    out += decoder.decode(value, { stream: true });
  }
  try {
    await reader.cancel();
  } catch {
    /* ignore */
  }
  return out;
}

/**
 * Heuristic booking/contact detection. Returns:
 *   true  — a clear booking or contact path exists
 *   false — none of the strong signals present AND no weak ones either
 *   null  — ambiguous (weak signal only); do not flag
 */
function detectBookingCta(html: string): boolean | null {
  const hasTel = /href=["']tel:/.test(html);
  const hasMailto = /href=["']mailto:/.test(html);

  const strongWords =
    /\b(book now|book online|book an appointment|schedule (?:now|online|an appointment)|request a quote|get a quote|make an appointment)\b/;
  const weakWords = /\b(book|appointment|contact|quote|schedule|reservation)\b/;

  const bookingHref =
    /href=["'][^"']*(calendly|acuity|squareup|square\.site|booksy|vagaro|setmore|schedulicity|opentable|resy|book)/;

  if (hasTel || bookingHref.test(html) || strongWords.test(html)) {
    return true;
  }
  // A contact route (mailto or "contact") is a real, if weaker, path.
  if (hasMailto || weakWords.test(html)) {
    // Present but not strong — treat as ambiguous rather than accusing.
    return null;
  }
  // Nothing at all: no phone, no email, no booking/contact language.
  return false;
}
