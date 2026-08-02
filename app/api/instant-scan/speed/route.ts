import { NextResponse } from "next/server";
import type { ScanRequestBody } from "@/lib/types";
import { normalizeSite } from "@/lib/validateUrl";
import { getPageSpeed } from "@/lib/pagespeed";
import { getCached, setCached } from "@/lib/cache";

/**
 * POST /api/instant-scan/speed  — the SLOW, non-blocking half of the scan.
 *
 * PageSpeed runs a live mobile Lighthouse audit that genuinely takes ~20–35s
 * (measured directly against Google), and for low-traffic local sites it often
 * never resolves at all. Blocking the scorecard on it made the scan feel broken:
 * slow AND, when it timed out, a lonely single card. So speed is split out here
 * and fetched by the client in the BACKGROUND after the instant scorecard has
 * already rendered from reviews + checks. Its card slots in if/when it lands.
 *
 * Because nothing is waiting on the UI here, the timeout is generous (40s) — the
 * point is to actually get the number, not to be fast.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Cache namespace so a speed result never collides with the reviews+checks
// entry the main scan stores under the bare hostname.
const speedKey = (hostname: string) => `speed:${hostname}`;

// Long, because this call is off the UI's critical path.
const SPEED_TIMEOUT_MS = 40_000;

export async function POST(req: Request) {
  let body: ScanRequestBody;
  try {
    body = (await req.json()) as ScanRequestBody;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const site = normalizeSite(body.website);
  if (!site) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  const cached = getCached(speedKey(site.hostname));
  if (cached?.speed) {
    return NextResponse.json({ speed: cached.speed });
  }

  const pagespeedKey = process.env.GOOGLE_PAGESPEED_KEY;
  if (!pagespeedKey) {
    console.error("[instant-scan/speed] GOOGLE_PAGESPEED_KEY is not set");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  try {
    const speed = await getPageSpeed(site.url, pagespeedKey, SPEED_TIMEOUT_MS);
    setCached(speedKey(site.hostname), { speed, errors: [] });
    return NextResponse.json({ speed });
  } catch (err) {
    // A timeout or upstream error here is expected and harmless — the scorecard
    // already rendered without speed. Log it, tell the client, move on.
    console.error("[instant-scan/speed] speed failed:", err);
    return NextResponse.json({ error: "speed_failed" }, { status: 502 });
  }
}
