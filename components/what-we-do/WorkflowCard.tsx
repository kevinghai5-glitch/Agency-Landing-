"use client";

import type { Workflow } from "@/config/workflows";

/**
 * One workflow card — a compact row at every width (the list item around
 * it belongs to SwipeRow): the name, one line,
 * and a small arrow in the corner. It is a real <button> that opens the
 * demo in the modal (DemoDialog); ten of them take three rows of a
 * four-column grid, and nothing on the page moves when one opens.
 */
export default function WorkflowCard({
  workflow,
  onOpen,
}: {
  workflow: Workflow;
  onOpen: () => void;
}) {
  return (
    <div
      id={`card-${workflow.id}`}
      className="on-panel flex flex-1 rounded-[22px] bg-surface transition-transform duration-150 ease-out active:scale-[0.985]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="group relative flex flex-1 flex-col rounded-[22px] py-4 pl-[18px] pr-14 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2"
      >
        <span className="block text-[15px] font-bold leading-snug tracking-[-0.02em] text-ink">
          {workflow.name}
        </span>
        <span className="mt-1 block text-[13px] leading-[1.4] text-muted">
          {workflow.line}
        </span>
        <span
          aria-hidden="true"
          className="absolute right-3.5 top-3.5 grid h-7 w-7 place-items-center rounded-full bg-surface-2 text-[13px] font-bold text-ink transition-colors group-hover:bg-accent group-hover:text-surface"
        >
          →
        </span>
      </button>
    </div>
  );
}
