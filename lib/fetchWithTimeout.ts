/**
 * fetch with a hard timeout via AbortController. Each scan source sets its own
 * budget (PageSpeed ~12s, Places ~5s, homepage ~3s) so one slow upstream can't
 * hold the whole endpoint hostage.
 */
export async function fetchWithTimeout(
  url: string,
  ms: number,
  init?: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
