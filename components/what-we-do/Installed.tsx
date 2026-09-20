"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/ui/section-head";
import { ALWAYS, CONDITIONAL, type Workflow } from "@/config/workflows";
import ConnectionMap from "./ConnectionMap";
import WorkflowCard from "./WorkflowCard";
import { WHO_DOT } from "./DemoPlayer";

/**
 * C · What gets installed — the connection map, then fifteen clickable
 * cards in two groups, each opening an animated demo INLINE.
 *
 *   map      → hover lights the card, click opens its demo
 *   grid     → "Ten, always installed" (2 cols) · "Five more, if they fit"
 *   player   → one component, data-driven (config/workflows.ts)
 *
 * One demo open at a time. Focus moves into the panel on open and back to
 * the card on close; a "hands off to" chip closes this demo and opens the
 * target's, scrolling its card into view.
 *
 * These are animated illustrations: no live GoHighLevel connection, no
 * fake account, no invented dashboard numbers.
 */
export default function Installed() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // What to focus after the next render: the panel that just opened, or
  // the card whose panel just closed.
  const pending = useRef<{ kind: "panel" | "card"; id: string; scroll: boolean } | null>(null);

  useEffect(() => {
    const p = pending.current;
    if (!p) return;
    pending.current = null;
    if (p.kind === "panel") {
      const panel = panelRefs.current[p.id];
      if (p.scroll) {
        document
          .getElementById(`card-${p.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      panel?.focus({ preventScroll: true });
    } else {
      cardRefs.current[p.id]?.focus({ preventScroll: true });
    }
  }, [openId]);

  const toggle = useCallback(
    (id: string) => {
      if (openId === id) {
        pending.current = { kind: "card", id, scroll: false };
        setOpenId(null);
      } else {
        pending.current = { kind: "panel", id, scroll: false };
        setOpenId(id);
      }
    },
    [openId],
  );

  // From the map or a hands-off chip: open, and bring the card into view.
  const navigate = useCallback((id: string) => {
    pending.current = { kind: "panel", id, scroll: true };
    setOpenId(id);
  }, []);

  const renderCard = (w: Workflow) => (
    <WorkflowCard
      key={w.id}
      ref={(el) => {
        cardRefs.current[w.id] = el;
      }}
      panelRef={(el) => {
        panelRefs.current[w.id] = el;
      }}
      workflow={w}
      open={openId === w.id}
      highlighted={hoverId === w.id}
      onToggle={() => toggle(w.id)}
      onNavigate={navigate}
    />
  );

  return (
    <section className="px-5 py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <SectionHead
          eyebrow="What gets installed"
          title={<>Fifteen things, running whether you&apos;re free or not.</>}
          lede="Installed once. Nothing to switch on, nothing to remember."
        />

        {/* PART 3 — the map, above the grid */}
        <div className="mt-10">
          <ConnectionMap
            hoverId={hoverId}
            openId={openId}
            onHover={setHoverId}
            onOpen={navigate}
          />
        </div>

        {/* Legend — once, above the grid, never per card */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {(
            [
              ["customer", "Customer"],
              ["system", "System"],
              ["owner", "You"],
            ] as const
          ).map(([who, label]) => (
            <li key={who} className="flex items-center gap-2">
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${WHO_DOT[who]}`} />
              <span className="mono-label text-accent-text">{label}</span>
            </li>
          ))}
        </ul>

        {/* PART 1 — the grid */}
        <Group title="Ten, always installed">
          {ALWAYS.map(renderCard)}
        </Group>
        <Group title="Five more, if they fit">
          {CONDITIONAL.map(renderCard)}
        </Group>
      </div>
    </section>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h3 className="font-serif font-semibold text-xl text-ink pb-3 border-b border-border">
        {title}
      </h3>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">{children}</ul>
    </div>
  );
}
