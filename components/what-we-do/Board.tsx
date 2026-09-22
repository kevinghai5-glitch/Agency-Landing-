"use client";

import { useCallback, useState } from "react";
import { ALWAYS, CONDITIONAL, WORKFLOW_BY_ID, type Workflow } from "@/config/workflows";
import FitsTogether from "./FitsTogether";
import { SectionHead } from "@/components/ui/section-head";
import WorkflowCard from "./WorkflowCard";
import DemoDialog from "./DemoDialog";
import SwipeRow from "@/components/ui/swipe-row";

/**
 * 02 · WHAT GETS INSTALLED and 03 · THE MAP share one piece of state —
 * which demo is open — so they live in one client component: a name on
 * the map opens the same modal a card does.
 *
 *   02  ten cards, then the five conditional cards, in one panel — on
 *       phones each group is a swipeable row (SwipeRow), a grid from sm
 *       up, so fifteen cards don't make the page three screens tall. A card
 *       opens its demo in ONE modal (DemoDialog) that grows out of the
 *       card and shrinks back into it — the grid never moves. A hand-off
 *       pill inside the modal swaps the workflow.
 *   03  the flowing map (FitsTogether) — no absolute positioning, no SVG.
 */
export default function Board() {
  const [openId, setOpenId] = useState<string | null>(null);
  // The card that opened the modal — the modal grows out of it and shrinks
  // back into it. Null when opened from the map (it just rises).
  const [originId, setOriginId] = useState<string | null>(null);

  const openFromCard = useCallback((id: string) => {
    setOriginId(id);
    setOpenId(id);
  }, []);
  const openFromMap = useCallback((id: string) => {
    setOriginId(null);
    setOpenId(id);
  }, []);
  // A hand-off swaps the workflow but keeps the origin card.
  const swap = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  const renderCard = (w: Workflow) => (
    <WorkflowCard key={w.id} workflow={w} onOpen={() => openFromCard(w.id)} />
  );

  return (
    <>
      <DemoDialog
        workflow={openId ? WORKFLOW_BY_ID[openId] ?? null : null}
        originId={originId}
        onClose={close}
        onNavigate={swap}
      />
      <section id="installed" className="mx-auto max-w-[1600px] px-5 pt-2 sm:px-8 xl:px-12">
        <div className="panel">
          <SectionHead
            eyebrow="The system"
            title={<>Ten always. <em>Five more if they fit.</em></>}
            lede="Installed once. Nothing to switch on, nothing to remember. Tap any one to watch it run."
            className="mb-7 max-w-[60ch]"
          />
          <Group title="Always installed" note="10">
            {ALWAYS.map(renderCard)}
          </Group>
          <Group title="If they fit" note="5 · decided on the call" className="mt-6">
            {CONDITIONAL.map(renderCard)}
          </Group>
        </div>
      </section>

      <section id="map" className="mx-auto max-w-[1600px] px-5 pt-16 sm:px-8 xl:px-12">
        <SectionHead
          title={<>Fifteen pieces. <em>One path.</em></>}
          lede="Five different doors, one chain behind them, then a board that sets off the rest. Build it once and every new way in gets the same behaviour for free."
          className="mb-7 max-w-[60ch]"
        />
        <FitsTogether onOpen={openFromMap} />
      </section>
    </>
  );
}

function Group({
  title,
  note,
  className = "",
  children,
}: {
  title: string;
  note: string;
  className?: string;
  children: React.ReactNode[];
}) {
  return (
    <div className={className}>
      <div className="mb-3 flex items-center gap-3">
        <h3 className="text-ink text-[22px]">{title}</h3>
        <span className="text-[13px] font-semibold text-muted">{note}</span>
      </div>
      <SwipeRow
        label={title}
        gridClassName="sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 2xl:grid-cols-5"
      >
        {children}
      </SwipeRow>
    </div>
  );
}
