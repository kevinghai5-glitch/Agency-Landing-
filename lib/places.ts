import { fetchWithTimeout } from "./fetchWithTimeout";
import type { ScanResult } from "./types";

const PLACES_TIMEOUT_MS = 5_000;
const TEXT_SEARCH =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
const DETAILS =
  "https://maps.googleapis.com/maps/api/place/details/json";
const NEARBY =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

type ReviewsResult = NonNullable<ScanResult["reviews"]>;

/**
 * Find the business on Google, pull its review count + rating, then find ONE
 * same-category competitor nearby and pull their review count.
 *
 * Returns null (not a throw) when no listing is found — the frontend simply
 * skips the review card. Throws only on hard API failure so allSettled logs it.
 */
export async function getReviews(
  businessName: string,
  siteHostname: string,
  apiKey: string,
): Promise<ReviewsResult | null> {
  // 1. Find the business. Bias the query with the domain root so a generic
  //    name is more likely to resolve to the right listing.
  const query = `${businessName} ${siteHostname.replace(/^www\./, "")}`;
  const searchParams = new URLSearchParams({ query, key: apiKey });

  const searchRes = await fetchWithTimeout(
    `${TEXT_SEARCH}?${searchParams.toString()}`,
    PLACES_TIMEOUT_MS,
  );
  if (!searchRes.ok) throw new Error(`places search http ${searchRes.status}`);

  const search = (await searchRes.json()) as TextSearchResponse;
  const top = search.results?.[0];
  if (!top?.place_id) {
    return null; // no listing — skip the card silently
  }

  // 2. Details for authoritative review count + rating + geometry + type.
  const detailParams = new URLSearchParams({
    place_id: top.place_id,
    fields: "user_ratings_total,rating,geometry,types,name",
    key: apiKey,
  });
  const detailRes = await fetchWithTimeout(
    `${DETAILS}?${detailParams.toString()}`,
    PLACES_TIMEOUT_MS,
  );
  if (!detailRes.ok) throw new Error(`places details http ${detailRes.status}`);

  const detail = (await detailRes.json()) as DetailsResponse;
  const place = detail.result;
  if (!place) return null;

  const count = place.user_ratings_total ?? 0;
  const rating = place.rating ?? 0;

  // 3. One competitor: same primary category, nearby. Best-effort — if this
  //    fails we still return the business's own numbers with competitor 0.
  let competitorCount = 0;
  let competitorName: string | undefined;
  const category = pickCategory(place.types);
  const loc = place.geometry?.location;

  if (category && loc) {
    try {
      const nearbyParams = new URLSearchParams({
        location: `${loc.lat},${loc.lng}`,
        rankby: "distance",
        keyword: category,
        key: apiKey,
      });
      const nearbyRes = await fetchWithTimeout(
        `${NEARBY}?${nearbyParams.toString()}`,
        PLACES_TIMEOUT_MS,
      );
      if (nearbyRes.ok) {
        const nearby = (await nearbyRes.json()) as NearbyResponse;
        const competitor = (nearby.results ?? []).find(
          (r) =>
            r.place_id !== top.place_id &&
            (r.user_ratings_total ?? 0) > 0,
        );
        if (competitor) {
          competitorCount = competitor.user_ratings_total ?? 0;
          competitorName = competitor.name;
        }
      }
    } catch {
      // competitor lookup is non-fatal; keep the business's own data
    }
  }

  return { count, rating, competitorCount, competitorName };
}

// Skip generic Google types so the competitor keyword is meaningful.
const GENERIC_TYPES = new Set([
  "point_of_interest",
  "establishment",
  "food",
  "store",
  "health",
]);

function pickCategory(types?: string[]): string | null {
  if (!types) return null;
  const specific = types.find((t) => !GENERIC_TYPES.has(t));
  return specific ? specific.replace(/_/g, " ") : null;
}

interface TextSearchResponse {
  results?: Array<{ place_id?: string }>;
}
interface DetailsResponse {
  result?: {
    user_ratings_total?: number;
    rating?: number;
    types?: string[];
    name?: string;
    geometry?: { location?: { lat: number; lng: number } };
  };
}
interface NearbyResponse {
  results?: Array<{
    place_id?: string;
    name?: string;
    user_ratings_total?: number;
  }>;
}
