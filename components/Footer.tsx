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

/**
 * Footer — also the A2P COMPLIANCE BLOCK, and it renders on every page.
 *
 * Carrier A2P registration requires a human reviewer to load the site and
 * find: the operating name tied to the legal entity, a physical business
 * address, a business email, the phone number used to verify the brand, and
 * links to Terms and Privacy. Missing any one of them is an automatic
 * rejection, so treat everything here as load-bearing — this is a compliance
 * artifact, not a design element. Keep it visually quiet, but do not remove
 * fields to tidy it up.
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
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-5 py-10 border-t border-border">
      <div className="max-w-2xl mx-auto flex flex-col gap-6 text-sm text-muted">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* Operating name + legal entity */}
          <div className="flex flex-col gap-1">
            <span className="font-serif text-ink text-base">{BRAND_NAME}</span>
          </div>

          {/* Address · email · phone — the reviewer's checklist */}
          <address className="not-italic flex flex-col gap-1 sm:text-right">
            <span>{BUSINESS_ADDRESS}</span>
            <a
              href={CONTACT_MAILTO}
              className="hover:text-ink transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={BUSINESS_PHONE_TEL}
              className="hover:text-ink transition-colors"
            >
              {BUSINESS_PHONE}
            </a>
          </address>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5 border-t border-border">
          <div className="flex items-center gap-6">
            <a href={CONTACT_URL} className="hover:text-ink transition-colors">
              Contact
            </a>
            <a href={TEXT_US_URL} className="hover:text-ink transition-colors">
              Text us
            </a>
            <a href={TERMS_URL} className="hover:text-ink transition-colors">
              Terms of Service
            </a>
            <a href={PRIVACY_URL} className="hover:text-ink transition-colors">
              Privacy Policy
            </a>
          </div>
          <span>
            © {year} {BRAND_NAME}
          </span>
        </div>
      </div>
    </footer>
  );
}
