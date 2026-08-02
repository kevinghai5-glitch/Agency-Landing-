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
 * ⚠️ TODO(FOUNDER_PHOTO): /public/founder.svg is a PLACEHOLDER avatar. Drop a
 * REAL photo into /public (e.g. /founder.jpg) and point
 * NEXT_PUBLIC_FOUNDER_PHOTO at it. Empty is honest too: the founder block
 * renders name-only rather than a generic avatar (a fake face contradicts the
 * "real face" job of the trust section).
 *
 * Consumed by: components/WhyTrust.tsx (founder block).
 */
export const FOUNDER_PHOTO =
  process.env.NEXT_PUBLIC_FOUNDER_PHOTO?.trim() || "";
export const FOUNDER_PHOTO_IS_PLACEHOLDER =
  FOUNDER_PHOTO.endsWith("founder.svg");

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
