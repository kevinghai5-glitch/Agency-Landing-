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
 * Legal entity behind the brand. Federal CBCA numbered corporation, Ontario.
 * Carrier A2P review requires the operating name and the legal entity to be
 * connectable on the site itself, so this appears in the footer on every
 * page as well as in the terms and privacy pages.
 */
export const LEGAL_ENTITY = "18081841 Canada Inc.";
export const GOVERNING_LAW = "Ontario, Canada";

/**
 * Publicly displayed business location. Carrier A2P review requires a
 * business address visible on the site — a reviewer loads the page and
 * looks for it.
 *
 * Consumed by: components/Footer.tsx (compliance block, every page).
 */
export const BUSINESS_ADDRESS = "Oakville, Ontario, Canada";

/**
 * ⚠️⚠️ DO NOT "CORRECT" THIS TO THE GOHIGHLEVEL NUMBER. ⚠️⚠️
 *
 * This is the phone number used to VERIFY THE BRAND during A2P
 * registration — NOT the GHL/LeadConnector sending number. Carriers
 * cross-check the number displayed on the site against the number on the
 * brand registration; a mismatch is an automatic rejection. If you are
 * reading this later and it looks "wrong" because it isn't the GHL number,
 * that is intentional. Leave it alone.
 *
 * Consumed by: components/Footer.tsx (compliance block, every page).
 */
export const BUSINESS_PHONE = "+1 905-483-7430";

/**
 * Address shown on /contact. Currently CITY-LEVEL — the street address was
 * pulled down once A2P registration was approved, to keep a residential
 * address off a public, indexed page.
 *
 * ⚠️ Keep an address here. CASL requires commercial electronic messages
 * (your SMS and email) to identify the sender and give a mailing address
 * one click away, and carriers re-vet brands after approval. Removing it
 * entirely is what creates exposure — showing less of it does not.
 *
 * TO RESTORE A FULL ADDRESS: fill line1 (and postalCode) below — a virtual
 * mailbox is the intended replacement. Empty fields are skipped, so it
 * renders correctly either way with no formatting to hand-edit.
 */
export const FULL_ADDRESS = {
  line1: "", // e.g. a virtual mailbox street address
  line2: "", // unit / suite, if any
  city: "Oakville",
  region: "Ontario",
  postalCode: "", // fill alongside line1
  country: "Canada",
};

/** Address as display lines, empty fields skipped. */
export const FULL_ADDRESS_LINES: string[] = [
  FULL_ADDRESS.line1,
  FULL_ADDRESS.line2,
  [FULL_ADDRESS.city, FULL_ADDRESS.region, FULL_ADDRESS.postalCode]
    .filter(Boolean)
    .join(", "),
  FULL_ADDRESS.country,
].filter(Boolean);

/** Digits-only tel: href, so the displayed format stays human-readable. */
export const BUSINESS_PHONE_TEL = `tel:${BUSINESS_PHONE.replace(/[^\d+]/g, "")}`;

/**
 * The real inbox — a plain constant, no env var (same reasoning as the
 * founder photo: it isn't a secret and it isn't environment-specific).
 *
 * Consumed by:
 *   - components/Footer.tsx        (mailto link + visible address)
 *   - app/privacy/page.tsx         (Contact section)
 */
export const CONTACT_EMAIL = "kevin@reclaimed-hq.com";

/** Pre-fills the subject so a click opens a ready-to-send draft. */
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Question for ReclaimedHQ",
)}`;

/**
 * Kevin's real headshot, committed at /public/founder.png — a plain static
 * asset, no env var. (The old env indirection existed only so a placeholder
 * avatar could never ship silently; with a real photo in the repo it was
 * pure friction.) Consumed by: components/WhyTrust.tsx (founder block).
 */
export const FOUNDER_PHOTO = "/founder.png";

/** Kevin's LinkedIn — shown in the founder block as a verifiable identity
 *  signal (a real, checkable person behind the anti-agency claim). */
export const FOUNDER_LINKEDIN =
  "https://www.linkedin.com/in/kevin-ghai-724b1327b/";

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

/** Legal + contact pages, linked from the footer on every page (A2P). */
export const PRIVACY_URL = "/privacy";
export const TERMS_URL = "/terms";
export const CONTACT_URL = "/contact";
/** The ONLY page embedding the chat widget — see app/text-us/page.tsx. */
export const TEXT_US_URL = "/text-us";

/** Shown as the "last updated" date on /terms and /privacy. Bump when the
 *  substance of either page changes. */
export const LEGAL_LAST_UPDATED = "2 August 2026";

/**
 * GoHighLevel chat widget id. A PUBLIC embed identifier (it ships in the
 * page source by design), not a secret — safe to hardcode, no env var.
 * Consumed by: app/layout.tsx.
 */
export const GHL_CHAT_WIDGET_ID = "6a73520857d382a077d2221b";
