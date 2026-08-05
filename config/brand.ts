/**
 * SINGLE SOURCE OF TRUTH for brand identity.
 *
 * Every brand string on the page comes from here — there are ZERO hardcoded
 * brand names in components. To rebrand, change these constants and nothing
 * else.
 */
export const BRAND_NAME = "ReclaimedHQ";
export const FOUNDER_NAME = "Kevin Ghai";

/**
 * ⚠️ TODO(CONTACT_EMAIL): set NEXT_PUBLIC_CONTACT_EMAIL to the REAL ReclaimedHQ
 * inbox before traffic. Sourced from env so a fabricated address never ships
 * silently — the fallback below is an obvious placeholder on an unowned domain:
 * a prospect who emails it bounces. `CONTACT_EMAIL_IS_PLACEHOLDER` is true
 * whenever the real value is unset, so the build flags it loudly instead of
 * shipping a dead address.
 *
 * Consumed by:
 *   - components/Footer.tsx        (mailto link + visible address)
 *   - app/privacy/page.tsx         (Contact section)
 */
const CONTACT_EMAIL_FALLBACK = "PLACEHOLDER@example.com";
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || CONTACT_EMAIL_FALLBACK;
export const CONTACT_EMAIL_IS_PLACEHOLDER =
  CONTACT_EMAIL === CONTACT_EMAIL_FALLBACK;

/**
 * Kevin's real headshot, committed at /public/founder.png — a plain static
 * asset, no env var. (The old env indirection existed only so a placeholder
 * avatar could never ship silently; with a real photo in the repo it was
 * pure friction.) Consumed by: components/WhyTrust.tsx (founder block).
 */
export const FOUNDER_PHOTO = "/founder.png";

/**
 * ⚠️ TODO(BOOKING_URL): set NEXT_PUBLIC_BOOKING_URL to the real GoHighLevel
 * calendar link (Kevin supplies it) so the pre-Zoom nurture sequences fire on
 * booking. This is the funnel's ONLY conversion step after scan results — the
 * "Book the 15-minute walkthrough" button.
 *
 * Placeholder detection: unset, or any value containing "REPLACE", counts as
 * a placeholder → the build warns loudly. When fully unset the post-scan CTA
 * renders an obvious dev box instead of a live button, so a dead booking link
 * can never ship silently.
 *
 * Consumed by: components/BookCall.tsx (post-scan CTA block).
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "";
export const BOOKING_URL_IS_PLACEHOLDER =
  !BOOKING_URL || BOOKING_URL.includes("REPLACE");

/** Where the minimal footer's privacy link points. */
export const PRIVACY_URL = "/privacy";

/**
 * GoHighLevel chat widget id. A PUBLIC embed identifier (it ships in the
 * page source by design), not a secret — safe to hardcode, no env var.
 * Consumed by: app/layout.tsx.
 */
export const GHL_CHAT_WIDGET_ID = "6a73516657d382a077d1f835";
