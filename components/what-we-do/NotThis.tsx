import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * A · What this isn't — three negations, thin rules between, then the one
 * sentence that says what it IS. Goes first because the three things it
 * rules out are the three things a prospect assumes an "AI system" means.
 */
const NOT = [
  {
    label: "Not a website.",
    body: "We don't touch your design, your content, or your pages.",
  },
  {
    label: "Not more leads.",
    body: "You already get enough. They're going nowhere.",
  },
  {
    label: "Not another app.",
    body: "Nothing new to log into. It runs whether you open it or not.",
  },
] as const;

export default function NotThis() {
  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <Eyebrow className="text-center">What this isn&apos;t</Eyebrow>
        <ul className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border-y border-border">
          {NOT.map((item) => (
            <li key={item.label} className="py-5 sm:py-2 sm:px-5 first:sm:pl-0 last:sm:pr-0">
              <p className="font-serif font-semibold text-lg text-ink">{item.label}</p>
              <p className="text-muted text-base leading-relaxed mt-1">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-ink text-lg sm:text-xl leading-relaxed text-center mt-8 max-w-xl mx-auto text-balance">
          What we install is the follow-up your business doesn&apos;t have
          time to do — running every hour you&apos;re not.
        </p>
      </div>
    </section>
  );
}
