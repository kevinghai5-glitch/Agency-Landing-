"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Workflow } from "@/config/workflows";
import DemoPanel from "./DemoPanel";

/**
 * The demo, in a MODAL: a native <dialog> opened with showModal(), so the
 * browser gives us the top layer, the backdrop, Escape, focus moving in on
 * open and back to the card on close, and an inert page behind it. The
 * board never moves. Clicking the backdrop closes; a hand-off pill swaps
 * the workflow in place. Below sm it rises as a bottom sheet (globals.css,
 * .demo-dialog).
 *
 * THE OPEN: the card you clicked grows into the panel. On open we measure
 * the card's rectangle and the panel's final rectangle, start the panel
 * transformed to sit exactly over the card, and let it travel to its
 * place while the content fades in. Close runs it in reverse — the panel
 * shrinks back into its card. Opened from the map (no card on screen) it
 * simply rises and fades in; a hand-off swap cross-fades the content.
 * All of it is transform + opacity via the Web Animations API — nothing
 * paints per frame — and none of it runs under prefers-reduced-motion.
 */
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 0.2, 1)";

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function DemoDialog({
  workflow,
  originId,
  onClose,
  onNavigate,
}: {
  workflow: Workflow | null;
  /** The card that opened it (its rectangle is the start/end of the morph). */
  originId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const shownId = useRef<string | null>(null);

  const originRect = useCallback(() => {
    if (!originId) return null;
    const card = document.getElementById(`card-${originId}`);
    if (!card) return null;
    const r = card.getBoundingClientRect();
    // Only morph from a card that is actually on screen.
    if (r.bottom < 0 || r.top > window.innerHeight) return null;
    return r;
  }, [originId]);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el) return;

    if (workflow) {
      if (!el.open) {
        el.showModal();
        el.scrollTop = 0;
        document.documentElement.classList.add("demo-open");

        if (!reduceMotion()) {
          const from = originRect();
          const to = el.getBoundingClientRect();
          el.style.transformOrigin = "top left";
          if (from) {
            el.animate(
              [
                {
                  transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`,
                  opacity: 0.6,
                  borderRadius: "22px",
                },
                { transform: "none", opacity: 1, borderRadius: "28px" },
              ],
              { duration: 480, easing: EASE_OUT },
            );
          } else {
            el.animate(
              [
                { transform: "translateY(18px) scale(0.96)", opacity: 0 },
                { transform: "none", opacity: 1 },
              ],
              { duration: 340, easing: EASE_OUT },
            );
          }
          inner?.animate(
            [{ opacity: 0 }, { opacity: 0, offset: 0.3 }, { opacity: 1 }],
            { duration: 520, easing: "ease-out" },
          );
        }
      } else if (shownId.current && shownId.current !== workflow.id) {
        // A hand-off swapped the workflow while open: cross-fade the content.
        el.scrollTop = 0;
        if (!reduceMotion()) {
          inner?.animate(
            [
              { opacity: 0, transform: "translateY(10px)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 280, easing: EASE_OUT },
          );
        }
      }
      shownId.current = workflow.id;
    } else {
      shownId.current = null;
      if (el.open) el.close();
      // Drop any finished close animation so the next open starts clean.
      el.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      document.documentElement.classList.remove("demo-open");
    }
  }, [workflow, originRect]);

  // Shrink back into the card, then let the parent drop the state.
  const requestClose = useCallback(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || closing.current) return;
    if (!el.open || reduceMotion()) {
      onClose();
      return;
    }
    closing.current = true;
    const from = originRect();
    const to = el.getBoundingClientRect();
    inner?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: "forwards" });
    try {
      el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 300,
        fill: "forwards",
        pseudoElement: "::backdrop",
      });
    } catch {
      /* older engines: the backdrop just disappears with the dialog */
    }
    const a = el.animate(
      from
        ? [
            { transform: "none", opacity: 1, borderRadius: "28px" },
            {
              transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`,
              opacity: 0,
              borderRadius: "22px",
            },
          ]
        : [
            { transform: "none", opacity: 1 },
            { transform: "translateY(12px) scale(0.97)", opacity: 0 },
          ],
      { duration: 320, easing: EASE_IN, fill: "forwards" },
    );
    // The animation's end, or a short backstop if the tab is hidden and
    // animations aren't ticking — the modal must never get stuck open.
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      closing.current = false;
      onClose();
    };
    a.finished.then(finish, finish);
    window.setTimeout(finish, 450);
  }, [onClose, originRect]);

  return (
    <dialog
      ref={ref}
      className="demo-dialog"
      aria-labelledby={workflow ? `demo-title-${workflow.id}` : undefined}
      // Escape: the browser fires cancel → we run the close animation first.
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      // A click on the backdrop lands on the <dialog> itself, not a child.
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div ref={innerRef}>
        {workflow && (
          <DemoPanel workflow={workflow} onClose={requestClose} onNavigate={onNavigate} />
        )}
      </div>
    </dialog>
  );
}
