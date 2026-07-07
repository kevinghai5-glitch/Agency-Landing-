import { fetchWithTimeout } from "./fetchWithTimeout";
import type { ScanResult } from "./types";

const PAGESPEED_TIMEOUT_MS = 12_000;
const ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

type SpeedResult = NonNullable<ScanResult["speed"]>;

/**
 * Google PageSpeed Insights, mobile strategy. Returns the performance score
 * (0–100) and LCP in seconds. Throws on failure so the caller's allSettled
 * records it as a failed source.
 */
export async function getPageSpeed(
  siteUrl: string,
  apiKey: string,
): Promise<SpeedResult> {
  const params = new URLSearchParams({
    url: siteUrl,
    strategy: "mobile",
    category: "performance",
    key: apiKey,
  });

  const res = await fetchWithTimeout(
    `${ENDPOINT}?${params.toString()}`,
    PAGESPEED_TIMEOUT_MS,
  );

  if (!res.ok) {
    throw new Error(`pagespeed http ${res.status}`);
  }

  const data = (await res.json()) as PageSpeedResponse;

  const rawScore =
    data.lighthouseResult?.categories?.performance?.score;
  const lcpMs =
    data.lighthouseResult?.audits?.["largest-contentful-paint"]
      ?.numericValue;

  if (rawScore == null || lcpMs == null) {
    throw new Error("pagespeed missing metrics");
  }

  return {
    score: Math.round(rawScore * 100),
    lcpSeconds: Math.round((lcpMs / 1000) * 10) / 10,
  };
}

interface PageSpeedResponse {
  lighthouseResult?: {
    categories?: { performance?: { score?: number } };
    audits?: {
      "largest-contentful-paint"?: { numericValue?: number };
    };
  };
}
