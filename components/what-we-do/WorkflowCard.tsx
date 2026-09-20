"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { Workflow } from "@/config/workflows";
import DemoPlayer from "./DemoPlayer";

/**
 * One workflow card. The card face is a real <button> (keyboard focusable,
 * accent focus ring, aria-expanded / aria-controls); when open, the card
 * spans both grid columns and the demo plays INLINE beneath the face,
 * pushing the grid down — never a modal, so people can browse several.
 *
 * `highlighted` is the connection-map hover: the map node above lights
 * up its card here.
 */
const WorkflowCard = forwardRef<
  HTMLButtonElement,
  {
    workflow: Workflow;
    open: boolean;
    highlighted: boolean;
    onToggle: () => void;
    onNavigate: (id: string) => void;
    panelRef: (el: HTMLDivElement | null) => void;
  }
>(function WorkflowCard(
  { workflow, open, highlighted, onToggle, onNavigate, panelRef },
  ref,
) {
  const panelId = `demo-${workflow.id}`;
  const conditional = workflow.group === "conditional";

  return (
    <li
      id={`card-${workflow.id}`}
      className={cn(
        "flex flex-col rounded bg-surface border transition-colors scroll-mt-24",
        open && "sm:col-span-2",
        open || highlighted ? "border-accent" : "border-border",
        highlighted && !open && "bg-accent-tint",
      )}
    >
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex flex-col flex-1 text-left p-5 min-h-[44px] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        {conditional && (
          <span className="mono-label text-accent-text inline-flex items-center self-start rounded-full bg-accent-tint px-2.5 py-1 mb-3">
            Installed by default
          </span>
        )}
        <span className="block font-serif font-semibold text-[19px] leading-snug text-ink">
          {workflow.name}
        </span>
        <span className="block text-muted text-sm leading-relaxed mt-2">
          {workflow.line}
        </span>
        {conditional && workflow.offCondition && (
          <span className="block text-muted text-xs leading-relaxed mt-2">
            Off: {workflow.offCondition}
          </span>
        )}
        <span className="mono-label text-accent-text mt-auto pt-4 group-hover:text-ink transition-colors">
          {open ? "Close ↑" : "See it run →"}
        </span>
      </button>

      {open && (
        <div id={panelId} ref={panelRef} tabIndex={-1} className="focus:outline-none">
          <DemoPlayer workflow={workflow} onNavigate={onNavigate} onClose={onToggle} />
        </div>
      )}
    </li>
  );
});

export default WorkflowCard;
