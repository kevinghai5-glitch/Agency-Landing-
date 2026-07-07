import type { ScanResult } from "@/lib/types";

/**
 * The instant scorecard — the payoff. Renders 2–3 finding cards from the scan
 * response, in place. Partial-render safe: any source that failed or returned
 * nothing simply doesn't produce a card. Never blocks on a failed source.
 *
 * Withholding ladder, layer 1: SYMPTOMS and rough cost framing only. Never a
 * fix, never a how-to, never a tool name. The number is big, gold, serif; the
 * plain-language translation sits under it.
 */
export default function Scorecard({ result }: { result: ScanResult }) {
  const issue = pickIssue(result.checks);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-sm uppercase tracking-widest text-muted text-center mb-6">
        What we found in 30 seconds
      </p>
      <div className="flex flex-col gap-4">
        {result.speed && <SpeedCard speed={result.speed} />}
        {result.reviews && result.reviews.competitorCount > 0 && (
          <ReviewCard reviews={result.reviews} />
        )}
        {issue && <IssueCard title={issue.title} body={issue.body} />}
      </div>
    </div>
  );
}

function Card({
  stat,
  suffix,
  children,
}: {
  stat: string;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-baseline gap-1">
        <span className="stat-number text-5xl sm:text-6xl">{stat}</span>
        {suffix && (
          <span className="stat-number text-2xl sm:text-3xl">{suffix}</span>
        )}
      </div>
      <p className="text-ink text-base leading-relaxed mt-3">{children}</p>
    </div>
  );
}

function SpeedCard({ speed }: { speed: NonNullable<ScanResult["speed"]> }) {
  const slow = speed.lcpSeconds >= 2.5;
  return (
    <Card stat={speed.lcpSeconds.toFixed(1)} suffix="s">
      Your site takes {speed.lcpSeconds.toFixed(1)} seconds to show up on a
      phone
      {slow
        ? " — slow enough that many visitors leave before it finishes loading."
        : ". That's on the faster side, but the full report shows how it holds up under real conditions."}
    </Card>
  );
}

function ReviewCard({
  reviews,
}: {
  reviews: NonNullable<ScanResult["reviews"]>;
}) {
  const competitor = reviews.competitorName
    ? `A competitor near you (${reviews.competitorName})`
    : "A competitor near you";
  return (
    <Card stat={String(reviews.count)}>
      You have {reviews.count} Google review
      {reviews.count === 1 ? "" : "s"}. {competitor} has{" "}
      {reviews.competitorCount}+. When someone compares you side by side, that
      gap is often what decides the call.
    </Card>
  );
}

function IssueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
      <p className="stat-number text-2xl sm:text-3xl mb-2">{title}</p>
      <p className="text-ink text-base leading-relaxed">{body}</p>
    </div>
  );
}

/**
 * Flag ONE detected issue, if clearly present. Priority order picks the most
 * consequential. Only flags what is unambiguously absent — bookingCtaFound is
 * only actioned when it is exactly `false` (null = ambiguous = never flag).
 */
function pickIssue(
  checks: ScanResult["checks"],
): { title: string; body: string } | null {
  if (!checks) return null;

  if (checks.bookingCtaFound === false) {
    return {
      title: "No clear way to book",
      body: "We couldn't find an obvious way for a visitor to book, call, or request a quote from your homepage. Every visitor who's ready to act and can't find how is a lead that quietly leaves.",
    };
  }
  if (!checks.https) {
    return {
      title: "Not secure",
      body: "Your site isn't served over a secure connection, so some browsers warn visitors before they even see it — many turn back at that warning.",
    };
  }
  if (!checks.mobileViewport) {
    return {
      title: "Not built for phones",
      body: "Your site isn't set up to size itself to a phone screen, so mobile visitors get a shrunken desktop version they have to pinch and zoom to use.",
    };
  }
  return null;
}
