/**
 * Dead-simple per-IP sliding-window rate limit. Places API calls cost money;
 * this stops one IP (or a bot) from turning the endpoint into a free-for-all.
 *
 * In-memory, so it shares the same Vercel cold-start caveat as the cache: it is
 * best-effort per warm instance, not a global limiter. Good enough for v1;
 * a durable limiter rides along with the KV upgrade (DEFERRED).
 */

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 10; // 10 scans / hour / IP

const hits = new Map<string, number[]>();

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  const timestamps = (hits.get(ip) ?? []).filter((t) => t > cutoff);

  if (timestamps.length >= MAX_PER_WINDOW) {
    hits.set(ip, timestamps);
    return { allowed: false, remaining: 0 };
  }

  timestamps.push(now);
  hits.set(ip, timestamps);

  // Opportunistic cleanup to bound memory.
  if (hits.size > 5000) {
    for (const [key, ts] of hits) {
      const live = ts.filter((t) => t > cutoff);
      if (live.length === 0) hits.delete(key);
      else hits.set(key, live);
    }
  }

  return { allowed: true, remaining: MAX_PER_WINDOW - timestamps.length };
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
