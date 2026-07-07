import type { ScanResult } from "./types";

/**
 * Simple in-memory LRU with 24h TTL, keyed by domain.
 *
 * NOTE (Vercel cold-start limitation): serverless instances are ephemeral and
 * not shared, so this cache only helps within a warm instance's lifetime. It
 * meaningfully cuts repeat Places/PageSpeed spend during a traffic burst but is
 * not a durable store. Upgrading to Upstash/Vercel KV is DEFERRED (see task).
 */

const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 500;

interface Entry {
  value: ScanResult;
  expires: number;
}

const store = new Map<string, Entry>();

export function getCached(domain: string): ScanResult | null {
  const key = domain.toLowerCase();
  const entry = store.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expires) {
    store.delete(key);
    return null;
  }
  // LRU touch: re-insert to move to the end.
  store.delete(key);
  store.set(key, entry);
  return entry.value;
}

export function setCached(domain: string, value: ScanResult): void {
  const key = domain.toLowerCase();
  store.delete(key);
  store.set(key, { value, expires: Date.now() + TTL_MS });

  // Evict oldest while over capacity.
  while (store.size > MAX_ENTRIES) {
    const oldest = store.keys().next().value;
    if (oldest === undefined) break;
    store.delete(oldest);
  }
}
