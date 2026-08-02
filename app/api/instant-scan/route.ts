import { NextResponse } from "next/server";
import type { ScanRequestBody, ScanResult } from "@/lib/types";
import { normalizeSite } from "@/lib/validateUrl";
import { getReviews } from "@/lib/places";
import { getPageChecks } from "@/lib/pageChecks";
import { getCached, setCached } from "@/lib/cache";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

/**
 * POST /api/instant-scan  — the LIGHT, INSTANT scan.
 *
 * This is NOT the heavy audit/deliverable generator. It runs two cheap, fast
 * public data pulls in parallel (reviews + page checks) and returns whatever
 * succeeds, typically in ~1–2s. Site speed is deliberately NOT here: PageSpeed's
 * live audit takes ~30s and would make this scan slow and often empty. It's
 * fetched separately, in the background, via POST /api/instant-scan/speed.
 * This route must never import or invoke anything audit-generation related —
 * that stays behind the qualification gate.
 */

// Node runtime: the homepage HTML fetch + streaming reader want Node APIs, and
// the Google keys must stay server-side.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // 1. Rate limit by IP before spending anything.
  const ip = clientIp(req.headers);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": "3600" } },
    );
  }

  // 2. Parse + validate input.
  let body: ScanRequestBody;
  try {
    body = (await req.json()) as ScanRequestBody;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const site = normalizeSite(body.website);
  const businessName = (body.businessName ?? "").trim();
  if (!site) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  // 3. Cache hit? Return immediately (keyed by domain).
  const cached = getCached(site.hostname);
  if (cached) {
    return NextResponse.json(cached);
  }

  // Places key powers the reviews pull; page checks need no key. (Speed lives in
  // the separate /speed route with its own PageSpeed key.)
  const placesKey = process.env.GOOGLE_PLACES_KEY;

  // 4. Fire the two fast sources in parallel; each has its own timeout. We take
  //    whatever settles successfully and record the rest in `errors`. A missing
  //    key for reviews just skips that source rather than failing the scan.
  const [reviewsRes, checksRes] = await Promise.allSettled([
    placesKey
      ? getReviews(businessName, site.hostname, placesKey)
      : Promise.reject(new Error("no places key")),
    getPageChecks(site.url),
  ]);

  const errors: string[] = [];
  const result: ScanResult = { errors };

  if (reviewsRes.status === "fulfilled") {
    // null means "no listing found" — a valid outcome, not an error.
    if (reviewsRes.value) result.reviews = reviewsRes.value;
  } else {
    errors.push("reviews");
    console.error("[instant-scan] reviews failed:", reviewsRes.reason);
  }

  if (checksRes.status === "fulfilled") {
    result.checks = checksRes.value;
  } else {
    errors.push("checks");
    console.error("[instant-scan] checks failed:", checksRes.reason);
  }

  // 5. If EVERYTHING failed, treat it as an unreachable site so the frontend
  //    shows the friendly fallback rather than an empty scorecard.
  const gotSomething = result.reviews || result.checks;
  if (!gotSomething) {
    return NextResponse.json({ error: "unreachable" }, { status: 502 });
  }

  // 6. Cache the successful (partial) result by domain for 24h.
  setCached(site.hostname, result);

  return NextResponse.json(result);
}
