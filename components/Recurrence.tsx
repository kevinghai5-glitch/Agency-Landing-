import { Callout } from "@/components/ui/callout";

/**
 * SECTION C — urgency through recurrence. No hype vocabulary, no countdowns,
 * no scarcity: the math IS the urgency. Sums the visible leaks' hedged
 * ranges into one monthly figure and states that it repeats.
 *
 * Renders ONLY when at least one dollar-bearing leak exists — an all-clean
 * scan has nothing to sum, and inventing a number would break the brand.
 * Recomputes automatically if the background speed audit lands a late leak.
 */
export default function Recurrence({
  sumLo,
  sumHi,
}: {
  sumLo: number;
  sumHi: number;
}) {
  if (sumLo <= 0) return null;

  const lo = "$" + sumLo.toLocaleString("en-US");
  const hi = "$" + sumHi.toLocaleString("en-US");

  return (
    <section className="w-full max-w-2xl mx-auto mt-8" data-quiet="">
      <Callout title={<>These aren&apos;t one-time losses.</>}>
        <p className="text-ink text-base sm:text-lg leading-relaxed">
          Add up just the leaks visible from the outside and it comes to
          roughly {lo}–{hi} a month, every month it stays like this — and
          that&apos;s before the internal leaks the scan can&apos;t see.
        </p>
      </Callout>
    </section>
  );
}
