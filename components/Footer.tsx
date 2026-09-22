import {
  BRAND_NAME,
  BUSINESS_ADDRESS,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_URL,
  TEXT_US_URL,
  PRIVACY_URL,
  TERMS_URL,
} from "@/config/brand";
import ThemeToggle from "./ThemeToggle";

/**
 * Footer — also the A2P COMPLIANCE BLOCK, and it renders on every page.
 *
 * Carrier A2P registration requires a human reviewer to load the site and
 * find: the operating name, a physical business address, a business email,
 * the phone number used to verify the brand, and links to Terms and
 * Privacy. Missing any one of them is an automatic rejection, so treat
 * everything here as load-bearing — this is a compliance artifact, not a
 * design element. Keep it visually quiet, but do not remove fields to tidy
 * it up.
 *
 * NOTE on the phone number: it is the BRAND-VERIFICATION number, deliberately
 * NOT the GoHighLevel sending number. See config/brand.ts before changing it.
 *
 * The address here is CITY-LEVEL on purpose (BUSINESS_ADDRESS).
 *
 * ⚠️ THE LEGAL ENTITY NAME IS DELIBERATELY ABSENT FROM THIS FOOTER — both
 * from the trade-name line and from the copyright. ReclaimedHQ is used for
 * high-volume cold outreach, and publishing the numbered company next to the
 * brand creates a short path to a home address: brand → site → corporate
 * name → free Corporations Canada search → registered office. The entity is
 * still named on /terms and /privacy (one click away, where anyone actually
 * verifying the business will look), which preserves the A2P corroborating
 * signal. Do not re-add it here while the registered office is residential.
 *
 * Layout: the same column as the nav, on the aurora ground, set apart
 * from the page above by a hairline rule across the full width and a
 * frosted wash behind it (the same finish as the panels) — wordmark
 * left with the light/dark toggle under it, the contact block right,
 * links along the bottom.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] mt-6 border-t border-ink/10 bg-surface/40">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-7 px-5 pb-12 pt-12 text-sm text-muted sm:px-8 xl:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-start gap-3">
            <span className="text-ink text-lg font-bold tracking-[-0.02em]">
              {BRAND_NAME}
            </span>
            <ThemeToggle />
          </div>

          {/* Address · email · phone — the reviewer's checklist */}
          <address className="not-italic flex flex-col gap-1.5 sm:text-right">
            <span>{BUSINESS_ADDRESS}</span>
            <a href={CONTACT_MAILTO} className="hover:text-ink transition-colors">
              {CONTACT_EMAIL}
            </a>
            <a href={BUSINESS_PHONE_TEL} className="hover:text-ink transition-colors">
              {BUSINESS_PHONE}
            </a>
          </address>
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a href={CONTACT_URL} className="hover:text-ink transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href={TEXT_US_URL} className="hover:text-ink transition-colors">
                Text us
              </a>
            </li>
            <li>
              <a href={TERMS_URL} className="hover:text-ink transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href={PRIVACY_URL} className="hover:text-ink transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
          <span>
            © {year} {BRAND_NAME}
          </span>
        </div>
      </div>
    </footer>
  );
}
