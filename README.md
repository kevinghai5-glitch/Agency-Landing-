# ReclaimedHQ — Inbound Instant-Scan Landing Page

A standalone Next.js landing page with one job: get a qualified local-business
owner through a 30-second instant scan and into the LeadGate qualification gate.

LeadGate is consumed here as an **embedded form** (an iframe), exactly the way a
client's own website would consume it. This repo never touches LeadGate's code
and never calls the heavy audit generator.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind · deployed on Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
```

## Environment variables

| Var | Scope | Purpose |
|---|---|---|
| `GOOGLE_API_KEY` | **server-only** | Google Cloud key with **PageSpeed Insights API** + **Places API** enabled. Never exposed client-side — the scan runs server-side only. |
| `NEXT_PUBLIC_LEADGATE_EMBED_URL` | public | The embeddable LeadGate form URL. Swappable without a redeploy. Business name + website are appended as `business_name` / `website` query params for pre-fill — **verify LeadGate reads them**. |

## The instant-scan API

`POST /api/instant-scan` — the **light** scan. Runs three public data pulls in
parallel with per-source timeouts and `Promise.allSettled`, returning whatever
succeeds:

1. **PageSpeed Insights** (mobile) → performance score + LCP. ~12s timeout.
2. **Places** → the business's review count + rating, plus one nearby
   same-category competitor's review count. ~5s timeout. No listing → review
   card silently skipped.
3. **Homepage checks** — a single ~3s HTML fetch: HTTPS, mobile viewport, and a
   heuristic booking/contact-CTA check. Ambiguous signals are never flagged.

Guardrails: 24h in-memory cache by domain, 10 scans/hour/IP rate limit, URL
normalization + garbage rejection before any API spend. No scraping beyond the
single homepage fetch, no screenshots, no LLM calls, no audit generator.

## Rebranding

Every brand string comes from [`config/brand.ts`](config/brand.ts)
(`BRAND_NAME`, `FOUNDER_NAME`, `CONTACT_EMAIL`). Change them there and nowhere
else. Drop a real founder photo in `/public` and update `FOUNDER_PHOTO`.

## Deploy (Vercel)

1. Push to a new GitHub repo.
2. Vercel → **Import Project** → pick the repo.
3. Add `GOOGLE_API_KEY` and `NEXT_PUBLIC_LEADGATE_EMBED_URL` in Project
   Settings → Environment Variables.
4. Deploy. Every push auto-deploys.

## Deferred (not built — intentional)

- LeadGate → heavy-audit webhook wiring (separate task).
- Redis/KV cache + durable rate limiter (replaces the in-memory versions; note
  the Vercel cold-start caveat in `lib/cache.ts`).
- Analytics beyond a basic page-view + `scan-completed` event.
- A/B testing, the lead-magnet PDF asset, any CMS/blog/extra pages.
