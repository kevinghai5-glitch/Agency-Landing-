import {
  BRAND_NAME,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  PRIVACY_URL,
} from "@/config/brand";

/**
 * Section 11 — minimal footer. Brand name, contact email, privacy link.
 * Nothing else: no social icons, no sitemap, no exit links.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-5 py-10 border-t border-border">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span className="font-serif text-ink">{BRAND_NAME}</span>
        <div className="flex items-center gap-6">
          <a
            href={CONTACT_MAILTO}
            className="hover:text-ink transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={PRIVACY_URL}
            className="hover:text-ink transition-colors"
          >
            Privacy
          </a>
        </div>
        <span>
          © {year} {BRAND_NAME}
        </span>
      </div>
    </footer>
  );
}
