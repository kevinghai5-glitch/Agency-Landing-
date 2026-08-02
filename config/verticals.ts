/**
 * Trade-typical numbers per vertical — the SINGLE source of truth for every
 * hedged dollar range on the results page AND the internal-leaks quiz.
 *
 * Keyed by the Google Places primary type of the scanned business (already
 * fetched in lib/places.ts). All values are deliberately ROUND, conservative
 * industry ballparks — never precise, and the copy that consumes them must
 * always hedge ("roughly", "typically", "at X-typical job values"). A
 * precise invented figure is banned sitewide.
 *
 * Fields:
 *   jobLo/jobHi     — rough value of ONE booked job.
 *   leadsLo/leadsHi — conservative monthly inbound-inquiry volume for a
 *                     typical single-location business of this trade. Feeds
 *                     the quiz math (lost jobs = leads × leak rate).
 *   revLo/revHi     — typical TOTAL monthly revenue band. Used only as the
 *                     believability cap on the quiz total (never rendered).
 *
 * When the vertical is unknown (no listing matched, or a type we don't
 * carry), fall back to GENERIC — a plain local-service profile.
 *
 * KEVIN'S TUNING SURFACE: adjust any number here; quiz + scorecard both
 * recompute from this table. The quiz's leak rates live in config/quiz.ts.
 */
export interface Vertical {
  /** Short human label — used by the quiz's trade picker. */
  label: string;
  /** Reads inside copy as `at ${phrase}` — e.g. "at roofing-typical job values". */
  phrase: string;
  jobLo: number;
  jobHi: number;
  leadsLo: number;
  leadsHi: number;
  revLo: number;
  revHi: number;
}

const GENERIC: Vertical = {
  label: "Other service business",
  phrase: "typical service-business job values",
  jobLo: 200,
  jobHi: 800,
  leadsLo: 20,
  leadsHi: 50,
  revLo: 15_000,
  revHi: 60_000,
};

/** Google Places type → trade profile. Small on purpose; GENERIC covers the rest. */
const VERTICALS: Record<string, Vertical> = {
  dentist: {
    label: "Dental practice",
    phrase: "dental-typical job values",
    jobLo: 300,
    jobHi: 900,
    leadsLo: 30,
    leadsHi: 60,
    revLo: 40_000,
    revHi: 120_000,
  },
  doctor: {
    label: "Medical practice",
    phrase: "practice-typical job values",
    jobLo: 200,
    jobHi: 600,
    leadsLo: 30,
    leadsHi: 60,
    revLo: 30_000,
    revHi: 100_000,
  },
  physiotherapist: {
    label: "Physio / rehab clinic",
    phrase: "clinic-typical job values",
    jobLo: 500,
    jobHi: 1500,
    leadsLo: 30,
    leadsHi: 70,
    revLo: 25_000,
    revHi: 80_000,
  },
  veterinary_care: {
    label: "Veterinary clinic",
    phrase: "veterinary-typical job values",
    jobLo: 200,
    jobHi: 600,
    leadsLo: 40,
    leadsHi: 80,
    revLo: 40_000,
    revHi: 120_000,
  },
  roofing_contractor: {
    label: "Roofing",
    phrase: "roofing-typical job values",
    jobLo: 7000,
    jobHi: 12000,
    leadsLo: 10,
    leadsHi: 25,
    revLo: 60_000,
    revHi: 250_000,
  },
  general_contractor: {
    label: "General contracting",
    phrase: "contracting-typical job values",
    jobLo: 4000,
    jobHi: 12000,
    leadsLo: 8,
    leadsHi: 20,
    revLo: 50_000,
    revHi: 200_000,
  },
  plumber: {
    label: "Plumbing",
    phrase: "plumbing-typical job values",
    jobLo: 250,
    jobHi: 800,
    leadsLo: 40,
    leadsHi: 100,
    revLo: 30_000,
    revHi: 120_000,
  },
  electrician: {
    label: "Electrical",
    phrase: "electrical-typical job values",
    jobLo: 300,
    jobHi: 900,
    leadsLo: 30,
    leadsHi: 70,
    revLo: 25_000,
    revHi: 100_000,
  },
  hvac_contractor: {
    label: "HVAC",
    phrase: "HVAC-typical job values",
    jobLo: 400,
    jobHi: 1200,
    leadsLo: 30,
    leadsHi: 80,
    revLo: 40_000,
    revHi: 150_000,
  },
  painter: {
    label: "Painting",
    phrase: "painting-typical job values",
    jobLo: 1500,
    jobHi: 4000,
    leadsLo: 10,
    leadsHi: 25,
    revLo: 20_000,
    revHi: 80_000,
  },
  locksmith: {
    label: "Locksmith",
    phrase: "locksmith-typical job values",
    jobLo: 150,
    jobHi: 400,
    leadsLo: 40,
    leadsHi: 100,
    revLo: 15_000,
    revHi: 50_000,
  },
  moving_company: {
    label: "Moving",
    phrase: "moving-typical job values",
    jobLo: 800,
    jobHi: 2500,
    leadsLo: 30,
    leadsHi: 80,
    revLo: 30_000,
    revHi: 120_000,
  },
  car_repair: {
    label: "Auto repair",
    phrase: "auto-repair-typical job values",
    jobLo: 300,
    jobHi: 900,
    leadsLo: 40,
    leadsHi: 90,
    revLo: 30_000,
    revHi: 100_000,
  },
  lawyer: {
    label: "Law firm",
    phrase: "legal-typical matter values",
    jobLo: 1500,
    jobHi: 5000,
    leadsLo: 15,
    leadsHi: 40,
    revLo: 30_000,
    revHi: 150_000,
  },
  real_estate_agency: {
    label: "Real estate",
    phrase: "real-estate-typical commission values",
    jobLo: 5000,
    jobHi: 12000,
    leadsLo: 15,
    leadsHi: 40,
    revLo: 30_000,
    revHi: 150_000,
  },
  insurance_agency: {
    label: "Insurance",
    phrase: "insurance-typical policy values",
    jobLo: 500,
    jobHi: 1500,
    leadsLo: 20,
    leadsHi: 50,
    revLo: 20_000,
    revHi: 80_000,
  },
  beauty_salon: {
    label: "Salon / hair",
    phrase: "salon-typical visit values",
    jobLo: 60,
    jobHi: 200,
    leadsLo: 40,
    leadsHi: 90,
    revLo: 10_000,
    revHi: 40_000,
  },
  hair_care: {
    label: "Salon / hair",
    phrase: "salon-typical visit values",
    jobLo: 60,
    jobHi: 200,
    leadsLo: 40,
    leadsHi: 90,
    revLo: 10_000,
    revHi: 40_000,
  },
  spa: {
    label: "Spa",
    phrase: "spa-typical visit values",
    jobLo: 100,
    jobHi: 300,
    leadsLo: 30,
    leadsHi: 70,
    revLo: 15_000,
    revHi: 60_000,
  },
  gym: {
    label: "Gym / fitness",
    phrase: "membership-typical values",
    jobLo: 300,
    jobHi: 900,
    leadsLo: 30,
    leadsHi: 80,
    revLo: 15_000,
    revHi: 60_000,
  },
};

export function getVertical(category?: string): Vertical {
  if (!category) return GENERIC;
  return VERTICALS[category] ?? GENERIC;
}

/** True when the scan's Places category maps to a real trade profile —
 *  the quiz skips its trade-picker question in that case. */
export function isKnownVertical(category?: string): boolean {
  return Boolean(category && VERTICALS[category]);
}

/**
 * Choices for the quiz's trade picker (asked only when the scan couldn't
 * identify the vertical). De-duplicated by label (salon/hair share a
 * profile); GENERIC is always the last option (empty key → getVertical
 * falls back to the generic profile).
 */
export const TRADE_CHOICES: Array<{ key: string; label: string }> = [
  ...Object.entries(VERTICALS)
    .filter(
      ([, v], i, all) => all.findIndex(([, w]) => w.label === v.label) === i,
    )
    .map(([key, v]) => ({ key, label: v.label })),
  { key: "", label: GENERIC.label },
];
