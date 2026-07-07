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
  };
  checks?: {
    https: boolean;
    mobileViewport: boolean;
    bookingCtaFound: boolean | null; // null = ambiguous; never flag on null
  };
  /** Which sources failed, for server logs. Never rendered raw to users. */
  errors: string[];
}

export interface ScanRequestBody {
  businessName?: string;
  website?: string;
}
