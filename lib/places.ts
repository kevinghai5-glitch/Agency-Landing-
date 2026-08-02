import { fetchWithTimeout } from "./fetchWithTimeout";
import { domainRoot } from "./validateUrl";
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
 * The typed business name is the primary signal for the Places match; we pair
 * it with the hostname to disambiguate. If the name is blank, we fall back to
 * the domain root (e.g. "joespizza") so the lookup still has something to go on.
 *
 * Returns null (not a throw) when no listing is found — the frontend simply
 * skips the review card. Throws only on hard API failure so allSettled logs it.
 */
export async function getReviews(
  businessName: string,
  siteHostname: string,
  apiKey: string,
): Promise<ReviewsResult | null> {
  // 1. Identify the business. Prefer the typed name; fall back to the domain
  //    root. Pairing with the hostname sharpens the match either way.
  const host = siteHostname.replace(/^www\./, "");
  const identifier = businessName.trim() || domainRoot(siteHostname);
  const query = `${identifier} ${host}`.trim();
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
  //    The raw type (e.g. "roofing_contractor") also rides back on the result
  //    as `category` — it drives the vertical job-value lookup for dollar
  //    ranges (config/verticals.ts).
  let competitorCount = 0;
  let competitorName: string | undefined;
  const rawType = pickRawType(place.types);
  const category = rawType ? rawType.replace(/_/g, " ") : null;
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
        // The comparison is only meaningful against the LOCAL LEADER, not a
        // random weak neighbor. Pick the same-category competitor with the
        // HIGHEST review count (excluding the target business itself).
        const competitor = (nearby.results ?? [])
          .filter(
            (r) =>
              r.place_id !== top.place_id &&
              (r.user_ratings_total ?? 0) > 0,
          )
          .reduce<NonNullable<NearbyResponse["results"]>[number] | null>(
            (best, r) =>
              (r.user_ratings_total ?? 0) > (best?.user_ratings_total ?? 0)
                ? r
                : best,
            null,
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

  return {
    count,
    rating,
    competitorCount,
    competitorName,
    category: rawType ?? undefined,
  };
}

// Skip generic Google types so the competitor keyword is meaningful.
const GENERIC_TYPES = new Set([
  "point_of_interest",
  "establishment",
  "food",
  "store",
  "health",
]);

function pickRawType(types?: string[]): string | null {
  if (!types) return null;
  return types.find((t) => !GENERIC_TYPES.has(t)) ?? null;
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
