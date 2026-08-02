/**
 * The instant-scan response contract. The frontend scorecard is designed
 * directly against this shape. Every finding is optional: if a source fails
 * or returns nothing, its key is omitted and that card is silently skipped.
 */
export interface ScanResult {
  speed?: {
    score: number; // PageSpeed mobile performance score, 0–100
    lcpSeconds: number; // Largest Contentful Paint, in seconds
  };
  reviews?: {
    count: number; // the business's Google review count
    rating: number; // the business's Google star rating
    competitorCount: number; // a nearby same-category competitor's review count
    competitorName?: string;
    /** The business's primary Google Places type (e.g. "dentist",
     *  "roofing_contractor"). Drives the trade-typical job-value lookup in
     *  config/verticals.ts. Absent when no specific type was found. */
    category?: string;
  };
  checks?: {
    https: boolean;
    mobileViewport: boolean;
    bookingCtaFound: boolean | null; // null = ambiguous; never flag on null
    hasTel: boolean; // is there a tap-to-call (tel:) link in the homepage HTML
  };
  /** Which sources failed, for server logs. Never rendered raw to users. */
  errors: string[];
}

export interface ScanRequestBody {
  businessName?: string;
  website?: string;
}
