"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * THE CONNECTION MAP — the section's opening visual. Not fifteen boxes
 * with arrows: five doors into one pipeline.
 *
 *   FIVE WAYS IN  →  ONE ACTION CHAIN  →  THE PIPELINE (7 stages)
 *                                          └ stage-triggered workflows
 *   OUTSIDE THE CHAIN: Database Reactivation · Review Response
 *
 * Desktop is an SVG (three columns joined by accent lines). Phones get a
 * vertical HTML stack of the same data — a three-column diagram at 390px
 * is unreadable, so we don't try. Every node is interactive: hover
 * highlights its card in the grid below, click opens that demo.
 *
 * Two arrows are drawn heavier on purpose: the day-16 handoff
 * (Estimate Follow‑Up → Lead Nurture) and the second trigger
 * (estimate reply → Owner Hot‑Lead Alert).
 */
interface MapNode {
  id: string;
  label: string;
  conditional?: boolean;
}

const WAYS_IN: MapNode[] = [
  { id: "instant-lead-response", label: "Form fill" },
  { id: "missed-call-text-back", label: "Missed call" },
  { id: "after-hours-auto-reply", label: "After hours" },
  { id: "webchat-capture", label: "Webchat", conditional: true },
  { id: "social-dm-capture", label: "Social DM", conditional: true },
];

const CHAIN = ["contact created", "SMS + email sent", "card created"];

interface Attached extends MapNode {
  /** Branch prefix ("cancelled", "no‑show", "day 16"). */
  prefix?: string;
  /** Indented under the previous item. */
  sub?: boolean;
  /** Drawn with the heavy elbow connector instead of the └ glyph. */
  heavy?: boolean;
}

const STAGES: { name: string; y: number; attached: Attached[] }[] = [
  { name: "New Lead", y: 56, attached: [] },
  {
    name: "Qualified",
    y: 130,
    attached: [{ id: "owner-hot-lead-alert", label: "Owner Hot‑Lead Alert" }],
  },
  {
    name: "Quote Sent",
    y: 200,
    attached: [
      { id: "estimate-follow-up", label: "Estimate Follow‑Up" },
      { id: "lead-nurture", label: "Lead Nurture", prefix: "day 16", sub: true, heavy: true },
    ],
  },
  {
    name: "Booked",
    y: 300,
    attached: [
      { id: "booking-confirmation", label: "Booking Confirmation + Reminders" },
      { id: "cancellation-guard", label: "Cancellation Guard", prefix: "cancelled", sub: true },
      { id: "no-show-recovery", label: "No‑Show Recovery", prefix: "no‑show", sub: true },
    ],
  },
  { name: "Showed", y: 400, attached: [] },
  {
    name: "Won",
    y: 460,
    attached: [
      { id: "review-request", label: "Review Request" },
      { id: "text-to-pay", label: "Text‑to‑Pay" },
    ],
  },
  { name: "Lost", y: 560, attached: [] },
];

const DETACHED: (MapNode & { sub: string })[] = [
  {
    id: "database-reactivation",
    label: "Database Reactivation",
    sub: "Works an existing list · enters at New Lead",
  },
  {
    id: "review-response",
    label: "Review Response",
    sub: "Runs on Google reviews · outside the pipeline",
  },
];

// Desktop geometry (viewBox units).
const WAY_X = 0;
const WAY_W = 180;
const WAY_H = 32;
const WAY_Y0 = 40;
const WAY_GAP = 46;
const CHAIN_X = 250;
const CHAIN_Y = 96;
const CHAIN_W = 210;
const CHAIN_H = 110;
const CHAIN_CY = CHAIN_Y + CHAIN_H / 2;
const SPINE_X = 530;
const LABEL_X = 544;

interface MapProps {
  hoverId: string | null;
  openId: string | null;
  onHover: (id: string | null) => void;
  onOpen: (id: string) => void;
}

export default function ConnectionMap(props: MapProps) {
  return (
    <div>
      <DesktopMap {...props} />
      <MobileMap {...props} />
      <p className="text-muted text-base leading-relaxed mt-6 max-w-[580px] mx-auto text-center text-balance">
        Three of these have two ways in. Five of them run the same chain.
        That is why it behaves like one system and not fifteen switches.
      </p>
    </div>
  );
}

// ─── Desktop: SVG ────────────────────────────────────────────────────────────

function DesktopMap({ hoverId, openId, onHover, onOpen }: MapProps) {
  const bind = (id: string) => ({
    role: "button" as const,
    tabIndex: 0,
    onMouseEnter: () => onHover(id),
    onMouseLeave: () => onHover(null),
    onFocus: () => onHover(id),
    onBlur: () => onHover(null),
    onClick: () => onOpen(id),
    onKeyDown: (e: KeyboardEvent<SVGElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen(id);
      }
    },
    className: "cursor-pointer focus:outline-none",
  });
  const lit = (id: string) => hoverId === id || openId === id;

  return (
    <svg
      viewBox="0 0 800 600"
      className="hidden sm:block w-full h-auto"
      role="group"
      aria-label="How the fifteen workflows connect: five ways in, one action chain, a seven-stage pipeline with workflows attached to the stages they fire from, and two that run outside the chain."
    >
      <defs>
        <marker id="cm-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0.5 L7,4 L0,7.5 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* Column headers */}
      <MonoText x={WAY_X} y={14}>Five ways in</MonoText>
      <MonoText x={CHAIN_X} y={14}>One action chain</MonoText>
      <MonoText x={SPINE_X - 20} y={14}>The pipeline</MonoText>

      {/* Converging lines: each way in → the chain */}
      {WAYS_IN.map((w, i) => {
        const cy = WAY_Y0 + i * WAY_GAP + WAY_H / 2;
        return (
          <path
            key={w.id}
            d={`M${WAY_X + WAY_W},${cy} C${WAY_X + WAY_W + 35},${cy} ${CHAIN_X - 35},${CHAIN_CY} ${CHAIN_X},${CHAIN_CY}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={lit(w.id) ? 1.75 : 1}
            strokeOpacity={lit(w.id) ? 1 : 0.55}
            strokeDasharray={w.conditional ? "3 3" : undefined}
          />
        );
      })}

      {/* Five ways in */}
      {WAYS_IN.map((w, i) => {
        const y = WAY_Y0 + i * WAY_GAP;
        const on = lit(w.id);
        return (
          <g key={w.id} {...bind(w.id)} aria-label={`${w.label}: open the demo`}>
            <rect
              x={WAY_X}
              y={y}
              width={WAY_W}
              height={WAY_H}
              rx={4}
              fill={on ? "var(--accent-tint)" : "var(--surface)"}
              stroke={on ? "var(--accent)" : "var(--border)"}
              strokeDasharray={w.conditional ? "3 3" : undefined}
            />
            <text
              x={WAY_X + 14}
              y={y + WAY_H / 2 + 4.5}
              className="font-sans"
              fontSize={13}
              fill={w.conditional && !on ? "var(--muted)" : "var(--ink)"}
            >
              {w.label}
            </text>
            {w.conditional && (
              <MonoText x={WAY_X + WAY_W - 12} y={y + WAY_H / 2 + 3.5} size={8} anchor="end">
                if it fits
              </MonoText>
            )}
          </g>
        );
      })}

      {/* The chain node */}
      <g>
        <rect
          x={CHAIN_X}
          y={CHAIN_Y}
          width={CHAIN_W}
          height={CHAIN_H}
          rx={4}
          fill="var(--surface-2)"
          stroke="var(--border)"
        />
        <MonoText x={CHAIN_X + 14} y={CHAIN_Y + 22}>The same chain, built once</MonoText>
        {CHAIN.map((line, i) => (
          <g key={line}>
            <circle cx={CHAIN_X + 18} cy={CHAIN_Y + 44 + i * 22} r={2.5} fill="var(--accent)" />
            <text
              x={CHAIN_X + 28}
              y={CHAIN_Y + 48 + i * 22}
              className="font-sans"
              fontSize={12.5}
              fill="var(--ink)"
            >
              {line}
            </text>
          </g>
        ))}
      </g>

      {/* Chain → New Lead */}
      <path
        d={`M${CHAIN_X + CHAIN_W},${CHAIN_CY} C${CHAIN_X + CHAIN_W + 40},${CHAIN_CY} ${SPINE_X - 40},${STAGES[0].y} ${SPINE_X - 6},${STAGES[0].y}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.25}
        markerEnd="url(#cm-arrow)"
      />

      {/* The spine */}
      <line
        x1={SPINE_X}
        y1={STAGES[0].y}
        x2={SPINE_X}
        y2={STAGES[STAGES.length - 1].y}
        stroke="var(--accent)"
        strokeWidth={1.5}
      />

      {/* Stages + attached workflows */}
      {STAGES.map((s) => (
        <g key={s.name}>
          <circle cx={SPINE_X} cy={s.y} r={4.5} fill="var(--accent)" stroke="var(--bg)" strokeWidth={2} />
          <text
            x={LABEL_X}
            y={s.y + 4.5}
            className="font-sans"
            fontSize={13}
            fontWeight={500}
            fill="var(--ink)"
          >
            {s.name}
          </text>
          {s.attached.map((a, i) => {
            const y = s.y + 19 + i * 15;
            const x = a.sub ? LABEL_X + 12 : LABEL_X;
            const on = lit(a.id);
            const glyph = a.heavy ? "" : a.sub ? "└ " : "→ ";
            return (
              <text
                key={a.id}
                {...bind(a.id)}
                aria-label={`${a.label}: open the demo`}
                x={x}
                y={y}
                className={cn("font-mono uppercase cursor-pointer focus:outline-none")}
                fontSize={9.5}
                letterSpacing="0.1em"
                fill={on ? "var(--ink)" : "var(--accent-text)"}
                textDecoration={on ? "underline" : undefined}
              >
                {glyph}
                {a.prefix ? `${a.prefix} → ` : ""}
                {a.label}
              </text>
            );
          })}
        </g>
      ))}

      {/* HEAVY 1 — the day-16 handoff: Estimate Follow‑Up → Lead Nurture */}
      <path
        d={`M${LABEL_X + 4},${STAGES[2].y + 23} L${LABEL_X + 4},${STAGES[2].y + 31} L${LABEL_X + 9},${STAGES[2].y + 31}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2.5}
        strokeLinejoin="round"
        markerEnd="url(#cm-arrow)"
      />
      {/* Lead Nurture → Lost: thin and dashed, swung out past the longest
          label (the viewBox is 800 wide for exactly this) */}
      <path
        d={`M${LABEL_X + 178},${STAGES[2].y + 31} C${LABEL_X + 250},${STAGES[2].y + 31} ${LABEL_X + 250},${STAGES[6].y} ${SPINE_X + 8},${STAGES[6].y}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1}
        strokeDasharray="3 3"
        strokeOpacity={0.7}
        markerEnd="url(#cm-arrow)"
      />

      {/* HEAVY 2 — the second trigger: estimate reply → Owner Hot‑Lead */}
      <path
        d={`M${LABEL_X + 144},${STAGES[2].y + 15} C${LABEL_X + 188},${STAGES[2].y + 15} ${LABEL_X + 188},${STAGES[1].y + 15} ${LABEL_X + 154},${STAGES[1].y + 15}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2.5}
        markerEnd="url(#cm-arrow)"
      />
      <MonoText x={LABEL_X + 176} y={STAGES[1].y + 52} size={8}>on reply</MonoText>

      {/* Outside the chain — detached on purpose */}
      <MonoText x={WAY_X} y={304}>Outside the chain</MonoText>
      {DETACHED.map((d, i) => {
        const y = 318 + i * 62;
        const on = lit(d.id);
        return (
          <g key={d.id} {...bind(d.id)} aria-label={`${d.label}: open the demo`}>
            <rect
              x={WAY_X}
              y={y}
              width={215}
              height={48}
              rx={4}
              fill={on ? "var(--accent-tint)" : "var(--surface)"}
              stroke={on ? "var(--accent)" : "var(--border)"}
              strokeDasharray="3 3"
            />
            <text x={WAY_X + 14} y={y + 20} className="font-sans" fontSize={13} fill="var(--ink)">
              {d.label}
            </text>
            <MonoText x={WAY_X + 14} y={y + 37} size={8}>{d.sub}</MonoText>
          </g>
        );
      })}
    </svg>
  );
}

function MonoText({
  x,
  y,
  size = 10,
  anchor,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  anchor?: "start" | "end";
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      className="font-mono uppercase"
      fontSize={size}
      letterSpacing="0.14em"
      fill="var(--accent-text)"
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

// ─── Mobile: vertical stack ──────────────────────────────────────────────────

function MobileMap({ hoverId, openId, onHover, onOpen }: MapProps) {
  const lit = (id: string) => hoverId === id || openId === id;
  const nodeBtn = (id: string, extra?: string) =>
    cn(
      "w-full text-left min-h-[44px] rounded border px-3.5 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
      lit(id) ? "border-accent bg-accent-tint" : "border-border bg-surface",
      extra,
    );
  const handlers = (id: string) => ({
    onMouseEnter: () => onHover(id),
    onMouseLeave: () => onHover(null),
    onClick: () => onOpen(id),
  });

  return (
    <div className="sm:hidden flex flex-col gap-5">
      <div>
        <p className="mono-label text-accent-text mb-2">Five ways in</p>
        <ul className="flex flex-col gap-2">
          {WAYS_IN.map((w) => (
            <li key={w.id}>
              <button
                type="button"
                {...handlers(w.id)}
                className={nodeBtn(w.id, w.conditional ? "border-dashed" : "")}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-ink text-sm">{w.label}</span>
                  {w.conditional && (
                    <span className="mono-label text-accent-text">if it fits</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Down />

      <div className="rounded border border-border bg-surface-2 px-3.5 py-3">
        <p className="mono-label text-accent-text">The same chain, built once</p>
        <ul className="mt-2 flex flex-col gap-1">
          {CHAIN.map((c) => (
            <li key={c} className="flex items-center gap-2 text-ink text-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      <Down />

      <div>
        <p className="mono-label text-accent-text mb-2">The pipeline</p>
        <ol className="border-l-2 border-accent ml-1.5 pl-4 flex flex-col gap-4">
          {STAGES.map((s) => (
            <li key={s.name} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[1.45rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-bg"
              />
              <p className="text-ink text-sm font-medium">{s.name}</p>
              {s.attached.length > 0 && (
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {s.attached.map((a) => (
                    <li key={a.id} className={a.sub ? "pl-3" : ""}>
                      <button
                        type="button"
                        {...handlers(a.id)}
                        className={cn(
                          "mono-label text-left min-h-[36px] px-2.5 py-1.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                          lit(a.id)
                            ? "border-accent bg-accent-tint text-ink"
                            : "border-border bg-surface text-accent-text",
                        )}
                      >
                        {a.prefix ? `${a.prefix} → ` : "→ "}
                        {a.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <p className="mono-label text-accent-text mb-2">Outside the chain</p>
        <ul className="flex flex-col gap-2">
          {DETACHED.map((d) => (
            <li key={d.id}>
              <button type="button" {...handlers(d.id)} className={nodeBtn(d.id, "border-dashed")}>
                <span className="block text-ink text-sm">{d.label}</span>
                <span className="block mono-label text-accent-text mt-1">{d.sub}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Down() {
  return (
    <div aria-hidden="true" className="flex justify-center text-accent">
      ↓
    </div>
  );
}
