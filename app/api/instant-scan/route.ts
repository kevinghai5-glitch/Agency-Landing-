import { NextResponse } from "next/server";
import type { ScanRequestBody, ScanResult } from "@/lib/types";
import { normalizeSite } from "@/lib/validateUrl";
import { getPageSpeed } from "@/lib/pagespeed";
import { getReviews } from "@/lib/places";
import { getPageChecks } from "@/lib/pageChecks";
import { getCached, setCached } from "@/lib/cache";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

/**
 * POST /api/instant-scan  — the LIGHT scan.
 *
 * This is NOT the heavy audit/deliverable generator. It runs three cheap,
 * public data pulls in parallel and returns whatever succeeds. It must never
 * import or invoke anything audit-generation related — that stays behind the
 * qualification gate.
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

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    // Misconfiguration — log server-side, don't leak specifics to the client.
    console.error("[instant-scan] GOOGLE_API_KEY is not set");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  // 4. Fire all three sources in parallel; each has its own timeout. We take
  //    whatever settles successfully and record the rest in `errors`.
  const [speedRes, reviewsRes, checksRes] = await Promise.allSettled([
    getPageSpeed(site.url, apiKey),
    getReviews(businessName, site.hostname, apiKey),
    getPageChecks(site.url),
  ]);

  const errors: string[] = [];
  const result: ScanResult = { errors };

  if (speedRes.status === "fulfilled") {
    result.speed = speedRes.value;
  } else {
    errors.push("speed");
    console.error("[instant-scan] speed failed:", speedRes.reason);
  }

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
  const gotSomething =
    result.speed || result.reviews || result.checks;
  if (!gotSomething) {
    return NextResponse.json({ error: "unreachable" }, { status: 502 });
  }

  // 6. Cache the successful (partial) result by domain for 24h.
  setCached(site.hostname, result);

  return NextResponse.json(result);
}
