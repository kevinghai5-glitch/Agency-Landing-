import { VSL_EMBED_URL } from "@/config/brand";

/**
 * The VSL frame — 16:9, dark, rounded. With VSL_EMBED_URL set it is the
 * embedded player; until then it is a still of a video player — a dark
 * poster with a play disc and a scrubber bar at rest. Nothing moves, no
 * duration is claimed.
 */
export default function Vsl() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#26231D] via-[#1A1814] to-[#0F0E0C] shadow-[0_30px_60px_rgba(26,24,20,.18)]">
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
        <div aria-hidden="true">
          {/* the play disc */}
          <div className="absolute left-1/2 top-1/2 grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,.35)]">
            <span className="ml-1 block h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-[#1A1814]" />
          </div>
          {/* the player bar, at rest */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pb-4 pt-10">
            <div className="flex items-center gap-3">
              <span className="block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white/90" />
              <div className="relative h-[3px] flex-1 rounded-full bg-white/25">
                <span className="absolute -top-[4px] left-0 h-[11px] w-[11px] rounded-full bg-white" />
              </div>
              <span className="flex items-end gap-[3px]">
                <i className="block h-2 w-[3px] rounded-sm bg-white/90" />
                <i className="block h-3 w-[3px] rounded-sm bg-white/90" />
                <i className="block h-4 w-[3px] rounded-sm bg-white/90" />
              </span>
              <span className="grid h-4 w-5 place-items-center rounded-[3px] border-[1.5px] border-white/90" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
