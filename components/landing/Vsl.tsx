import { VSL_EMBED_URL } from "@/config/brand";

/**
 * The VSL slot — a 16:9 frame in the hero, directly under the subheadline.
 *
 * With VSL_EMBED_URL set it is the embedded player. Until then it renders
 * as a POSTER in the site's ink treatment (same dot grid + gold corner light
 * as InkPanel) with a play glyph and a "coming soon" line, so the hero keeps
 * its shape and nothing looks broken. The poster is a placeholder in the
 * honest, visible sense — it never pretends to be a playable video.
 */
export default function Vsl() {
  return (
    <div
      className="relative w-full aspect-video overflow-hidden rounded-xl bg-ink shadow-card border border-accent/25"
      data-quiet=""
    >
      {VSL_EMBED_URL ? (
        <iframe
          src={VSL_EMBED_URL}
          title="How the system works"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(251,250,247,0.09) 1px, transparent 1.4px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(55% 45% at 88% -8%, rgba(154,123,63,0.38), transparent 70%), radial-gradient(45% 40% at -5% 108%, rgba(154,123,63,0.16), transparent 70%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/60 bg-accent/15"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 translate-x-[2px] fill-bg"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <p className="text-bg/70 text-sm tracking-wide">
              Video coming soon
            </p>
          </div>
        </>
      )}
    </div>
  );
}
