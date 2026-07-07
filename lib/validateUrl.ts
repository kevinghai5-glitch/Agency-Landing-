/**
 * Normalize + validate a user-typed website before spending any API calls.
 * Adds https:// if the scheme is missing, rejects obvious garbage.
 */

export interface NormalizedSite {
  url: string; // full normalized URL, e.g. https://example.com
  hostname: string; // e.g. example.com
}

const GARBAGE_HOSTS = new Set([
  "localhost",
  "example.com",
  "test.com",
  "google.com",
]);

export function normalizeSite(raw: string | undefined): NormalizedSite | null {
  if (!raw || typeof raw !== "string") return null;

  let input = raw.trim();
  if (input.length === 0 || input.length > 253) return null;

  // Strip a leading scheme-less "www." only situations are handled by URL().
  if (!/^https?:\/\//i.test(input)) {
    input = `https://${input}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }

  const hostname = parsed.hostname.toLowerCase();

  // Must look like a real domain: at least one dot, a valid TLD-ish tail,
  // and no spaces. Reject bare words and known throwaways.
  if (!hostname.includes(".")) return null;
  if (/\s/.test(hostname)) return null;
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(hostname)) return null;
  if (GARBAGE_HOSTS.has(hostname)) return null;

  return { url: parsed.toString(), hostname };
}

/**
 * Best-effort locality hint from a hostname is not reliable, so we lean on the
 * business name for Places. This helper is kept minimal on purpose.
 */
export function domainRoot(hostname: string): string {
  const parts = hostname.replace(/^www\./, "").split(".");
  return parts.slice(0, -1).join(".") || hostname;
}
