/**
 * Proof shown on the landing page (components/landing/Proof.tsx): case
 * studies, testimonials, results. EMPTY ON PURPOSE — there are none yet,
 * and the section renders nothing until this has entries.
 *
 * ⚠️ Never fill this with placeholder or "example" entries to see the
 * layout. A made-up testimonial on a live page is a fabricated review, and
 * it will ship the moment someone forgets it's fake. Real ones only.
 */
export interface ProofItem {
  /** What they said, or the one-line result. */
  quote: string;
  /** Who — first name + business, as they agreed to be shown. */
  name: string;
  business: string;
  /** Optional headline figure ("3× more booked jobs in 60 days"). */
  result?: string;
}

export const PROOF: ProofItem[] = [];
