"use client";

import { useState } from "react";

export interface ScanFormValues {
  businessName: string;
  website: string;
}

interface ScanFormProps {
  onSubmit: (values: ScanFormValues) => void;
  /** Disable + relabel the button while a scan is in flight. */
  pending?: boolean;
  /** Distinguishes the hero instance from the final-CTA instance for a11y ids. */
  idPrefix?: string;
  autoFocus?: boolean;
}

/**
 * The two-field + one-button unit: business name + website. The name sharpens
 * the Google listing match; the website drives the audit. This exact component
 * is reused by the hero (section 1) and the final CTA (section 10) — a convinced
 * scroller can act without scrolling back up.
 */
export default function ScanForm({
  onSubmit,
  pending = false,
  idPrefix = "scan",
  autoFocus = false,
}: ScanFormProps) {
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [touched, setTouched] = useState(false);

  const websiteValid = website.trim().length > 3 && website.includes(".");
  const canSubmit =
    businessName.trim().length > 0 && websiteValid && !pending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    onSubmit({ businessName: businessName.trim(), website: website.trim() });
  }

  const nameId = `${idPrefix}-business`;
  const siteId = `${idPrefix}-website`;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
      noValidate
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <label htmlFor={nameId} className="sr-only">
            Business name
          </label>
          <input
            id={nameId}
            type="text"
            inputMode="text"
            autoComplete="organization"
            autoFocus={autoFocus}
            placeholder="Business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="h-14 w-full rounded-full bg-surface px-6 text-base font-medium text-ink shadow-soft outline-none placeholder:text-[#9A968C] focus:ring-2 focus:ring-accent transition-shadow"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={siteId} className="sr-only">
            Website
          </label>
          <input
            id={siteId}
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="Website (e.g. yourbusiness.com)"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="h-14 w-full rounded-full bg-surface px-6 text-base font-medium text-ink shadow-soft outline-none placeholder:text-[#9A968C] focus:ring-2 focus:ring-accent transition-shadow"
          />
          {touched && !websiteValid && (
            <p className="text-sm text-muted mt-1">
              Enter your website address so we can look at your real site.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="pill pill--gold h-14 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Running your scan…" : "Run my free scan →"}
        </button>
      </div>

    </form>
  );
}
