"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * KineticGrid — interactive canvas grid that warps toward the pointer and
 * ripples on click. Adapted from the original full-viewport version:
 *   - Canvas is scoped to THIS container (absolute, sized by ResizeObserver),
 *     not fixed to the window, so it works as a section background.
 *   - Added a "paper" theme matching the site palette (warm paper bg, faint
 *     ink lines, gold #9A7B3F active glow) — the only accent the design allows.
 *   - Canvas height is capped and bottom-faded so a tall container (e.g. the
 *     hero after scan results render) never drives a huge per-frame repaint.
 *   - Respects prefers-reduced-motion (static grid, no listeners), renders at
 *     device pixel ratio, and skips drawing while scrolled offscreen.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface Point {
  x: number;
  y: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  born: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CELL_SIZE = 55;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;
const MAX_CANVAS_H = 1100; // repaint budget: cap height, fade the bottom edge

// Quiet-zone tuning: elements matched by `quietSelector` suppress the
// interactive effects (warp, glow, ripples) in and around their box, so the
// motion never competes with content the visitor is reading or filling in.
const QUIET_PAD = 24; // px of dead margin beyond the element's box
const QUIET_FALLOFF = 110; // px over which interactivity fades back in

const NODE_BASE_RADIUS = 1.8;
const NODE_ACTIVE_RADIUS = 3.2;

type Rgba = { r: number; g: number; b: number; a: number };

interface Theme {
  bg: string;
  wrapClass: string;
  lineBase: Rgba;
  nodeBase: Rgba;
  dot: string;
  lineActive: Rgba;
  nodeActive: Rgba;
  glow: string;
  ripple: string;
}

const THEMES: Record<"default" | "monochrome" | "paper", Theme> = {
  default: {
    bg: "#161618",
    wrapClass: "bg-[#161618]",
    lineBase: { r: 255, g: 255, b: 255, a: 0.13 },
    nodeBase: { r: 255, g: 255, b: 255, a: 0.2 },
    dot: "rgba(255,255,255,0.05)",
    lineActive: { r: 74, g: 158, b: 255, a: 0.9 },
    nodeActive: { r: 74, g: 158, b: 255, a: 1.0 },
    glow: "74,158,255",
    ripple: "100,180,255",
  },
  monochrome: {
    bg: "#000000",
    wrapClass: "bg-[#000000]",
    lineBase: { r: 255, g: 255, b: 255, a: 0.13 },
    nodeBase: { r: 255, g: 255, b: 255, a: 0.2 },
    dot: "rgba(255,255,255,0.05)",
    lineActive: { r: 255, g: 255, b: 255, a: 0.9 },
    nodeActive: { r: 255, g: 255, b: 255, a: 1.0 },
    glow: "255,255,255",
    ripple: "255,255,255",
  },
  // The site palette (tailwind.config.ts): bg #FBFAF7, ink #1A1814,
  // accent #9A7B3F. Base lines stay near-invisible so copy on top reads.
  paper: {
    bg: "#FBFAF7",
    wrapClass: "bg-[#FBFAF7]",
    lineBase: { r: 26, g: 24, b: 20, a: 0.07 },
    nodeBase: { r: 26, g: 24, b: 20, a: 0.14 },
    dot: "rgba(26,24,20,0.05)",
    lineActive: { r: 154, g: 123, b: 63, a: 0.9 },
    nodeActive: { r: 154, g: 123, b: 63, a: 1.0 },
    glow: "154,123,63",
    ripple: "154,123,63",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(base: Rgba, active: Rgba, t: number): string {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

interface QuietRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * 1 = fully interactive, 0 = inside a quiet zone. Distance from the point to
 * the padded rect, smoothstepped over QUIET_FALLOFF so the effect fades out
 * instead of snapping at an invisible boundary.
 */
function quietDamp(x: number, y: number, rects: QuietRect[]): number {
  let damp = 1;
  for (const r of rects) {
    const dx = Math.max(r.left - QUIET_PAD - x, 0, x - (r.right + QUIET_PAD));
    const dy = Math.max(r.top - QUIET_PAD - y, 0, y - (r.bottom + QUIET_PAD));
    const dist = Math.hypot(dx, dy);
    const t = Math.min(1, dist / QUIET_FALLOFF);
    damp = Math.min(damp, t * t * (3 - 2 * t));
  }
  return damp;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function KineticGrid({
  children,
  className,
  globalColor = "default",
  quietSelector,
}: {
  children?: ReactNode;
  className?: string;
  globalColor?: "default" | "monochrome" | "paper";
  /** CSS selector (scoped to this wrapper) for content the interactive
   *  effects must stay away from — e.g. a form the visitor is filling in.
   *  The static grid still renders there; warp/glow/ripples do not. */
  quietSelector?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const targetMouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const quietRectsRef = useRef<QuietRect[]>([]);
  /** Cached paper + dot texture; rebuilt on resize, blitted every frame. */
  const bgLayerRef = useRef<HTMLCanvasElement | null>(null);
  /** Forces at least one more draw (first paint, resize, theme change). */
  const dirtyRef = useRef(true);

  const theme = THEMES[globalColor] ?? THEMES.default;

  // ── Warp ────────────────────────────────────────────────────────────────────

  const getWarpedPoint = useCallback(
    (
      gx: number,
      gy: number,
      col: number,
      row: number,
      mouse: Point,
      ripples: Ripple[],
      cols: number,
      rows: number,
      damp: number,
    ): { pt: Point; proximity: number } => {
      // Edge pin — smoothly locks boundary rows/cols in place. The quiet-zone
      // damp folds in here so it silences warp, glow AND ripple displacement
      // through the one factor everything already respects.
      const edgeMargin = 1.5;
      const colPin = Math.min(
        col / edgeMargin,
        (cols - 1 - col) / edgeMargin,
        1,
      );
      const rowPin = Math.min(
        row / edgeMargin,
        (rows - 1 - row) / edgeMargin,
        1,
      );
      const pinFactor = colPin * colPin * rowPin * rowPin * damp;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

      // Ripple displacement
      let rx = 0,
        ry = 0;
      for (const r of ripples) {
        const rdx = gx - r.x;
        const rdy = gy - r.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const waveWidth = 55;
        const diff = rdist - r.radius;
        if (Math.abs(diff) < waveWidth) {
          const strength =
            (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pinFactor;
          const angle = Math.atan2(rdy, rdx);
          const sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }

      // Cursor warp with bell falloff
      if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
        const t = dist / INFLUENCE_RADIUS;
        const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
        const warpAmt = eased * MAX_WARP * pinFactor;
        const angle = Math.atan2(dy, dx);
        return {
          pt: {
            x: gx - Math.cos(angle) * warpAmt + rx,
            y: gy - Math.sin(angle) * warpAmt + ry,
          },
          proximity,
        };
      }

      return { pt: { x: gx + rx, y: gy + ry }, proximity };
    },
    [],
  );

  // ── Draw ────────────────────────────────────────────────────────────────────

  const draw = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w: W, h: H } = sizeRef.current;
      const mouse = mouseRef.current;
      const ripples = ripplesRef.current;

      // Quiet zones are measured OUTSIDE the draw loop (see measureQuiet in
      // the setup effect). Calling getBoundingClientRect here would force a
      // synchronous layout on every animation frame — the single most
      // expensive thing this component can do to the page.
      const quietRects = quietRectsRef.current;

      ctx.clearRect(0, 0, W, H);

      // Background + the static dot texture, blitted from a cached layer.
      // Drawn per-frame this was ~1,700 arc() calls that never change; the
      // cache is rebuilt only when the canvas is resized.
      const bg = bgLayerRef.current;
      if (bg) {
        ctx.drawImage(bg, 0, 0, W, H);
      } else {
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, W, H);
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = (now - r.born) / 1000;
        r.radius = Math.max(0, age * 400);
        r.opacity = Math.max(0, 1 - age * 1.2);
        if (r.opacity <= 0) ripples.splice(i, 1);
      }

      // ── Build warped grid ─────────────────────────────────────────────────
      const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
      const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
      const cellW = W / (cols - 1);
      const cellH = H / (rows - 1);

      const pts: Point[][] = [];
      const prox: number[][] = [];

      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        prox[row] = [];
        for (let col = 0; col < cols; col++) {
          const gx = col * cellW;
          const gy = row * cellH;
          const { pt, proximity } = getWarpedPoint(
            gx,
            gy,
            col,
            row,
            mouse,
            ripples,
            cols,
            rows,
            quietDamp(gx, gy, quietRects),
          );
          pts[row][col] = pt;
          prox[row][col] = proximity;
        }
      }

      // ── Grid lines ────────────────────────────────────────────────────────
      // BATCHED: nearly every segment sits at rest (only the handful near the
      // cursor light up), so all resting segments go into ONE Path2D and one
      // stroke() call. Previously this was ~1,000 separate stroke() calls per
      // frame, which is what made cursor movement feel heavy.
      const TAU = Math.PI * 2;
      const restPath = new Path2D();
      const liveSegs: Array<{ p1: Point; p2: Point; t: number }> = [];

      const collectSeg = (p1: Point, p2: Point, pr1: number, pr2: number) => {
        const avg = (pr1 + pr2) / 2;
        if (avg < 0.02) {
          restPath.moveTo(p1.x, p1.y);
          restPath.lineTo(p2.x, p2.y);
        } else {
          liveSegs.push({ p1, p2, t: avg * avg * (3 - 2 * avg) });
        }
      };

      ctx.lineCap = "butt";

      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols - 1; col++)
          collectSeg(
            pts[row][col],
            pts[row][col + 1],
            prox[row][col],
            prox[row][col + 1],
          );

      for (let col = 0; col < cols; col++)
        for (let row = 0; row < rows - 1; row++)
          collectSeg(
            pts[row][col],
            pts[row + 1][col],
            prox[row][col],
            prox[row + 1][col],
          );

      ctx.strokeStyle = lerpColor(theme.lineBase, theme.lineActive, 0);
      ctx.lineWidth = 0.8;
      ctx.stroke(restPath);

      for (const s of liveSegs) {
        ctx.beginPath();
        ctx.moveTo(s.p1.x, s.p1.y);
        ctx.lineTo(s.p2.x, s.p2.y);
        ctx.strokeStyle = lerpColor(theme.lineBase, theme.lineActive, s.t);
        ctx.lineWidth = lerpN(0.8, 1.5, s.t);
        ctx.stroke();
      }

      // ── Intersection nodes ────────────────────────────────────────────────
      // Same batching: resting nodes are one path, one fill.
      const restNodes = new Path2D();
      const liveNodes: Array<{ p: Point; t: number }> = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = pts[row][col];
          const pr = prox[row][col];
          const t = pr * pr * (3 - 2 * pr); // smoothstep
          if (t < 0.02) {
            // moveTo before arc, else each circle is joined to the last.
            restNodes.moveTo(p.x + NODE_BASE_RADIUS, p.y);
            restNodes.arc(p.x, p.y, NODE_BASE_RADIUS, 0, TAU);
          } else {
            liveNodes.push({ p, t });
          }
        }
      }

      ctx.fillStyle = lerpColor(theme.nodeBase, theme.nodeActive, 0);
      ctx.fill(restNodes);

      for (const n of liveNodes) {
        const { p, t } = n;
        const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

        // Outer glow ring for active nodes
        if (t > 0.3) {
          const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
          const grd = ctx.createRadialGradient(
            p.x,
            p.y,
            r * 0.5,
            p.x,
            p.y,
            glowR,
          );
          grd.addColorStop(0, `rgba(${theme.glow},${(t * 0.3).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${theme.glow},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, TAU);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Node fill
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, TAU);
        ctx.fillStyle = lerpColor(theme.nodeBase, theme.nodeActive, t);
        ctx.fill();
      }

      // ── Ripple rings ──────────────────────────────────────────────────────
      // Clip the padded quiet rects out so a ring passing through never
      // draws over the protected content area.
      ctx.save();
      if (quietRects.length > 0) {
        const clip = new Path2D();
        clip.rect(0, 0, W, H);
        for (const q of quietRects) {
          clip.rect(
            q.left - QUIET_PAD,
            q.top - QUIET_PAD,
            q.right - q.left + QUIET_PAD * 2,
            q.bottom - q.top + QUIET_PAD * 2,
          );
        }
        ctx.clip(clip, "evenodd");
      }
      for (const r of ripples) {
        const safeRadius = Math.max(0, r.radius);
        ctx.beginPath();
        ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${theme.ripple},${(r.opacity * 0.28).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();
    },
    [getWarpedPoint, theme, quietSelector],
  );

  // ── Animation loop ──────────────────────────────────────────────────────────

  const animate = useCallback(
    (now: number) => {
      const m = mouseRef.current;
      const t = targetMouseRef.current;

      // Only paint when something is actually moving. At rest — cursor
      // parked or off the grid, no ripples alive — the canvas is identical
      // frame to frame, so redrawing it 60×/sec burns CPU for nothing and
      // makes the whole page feel heavy.
      const settling =
        Math.abs(m.x - t.x) > 0.5 || Math.abs(m.y - t.y) > 0.5;
      const active = settling || ripplesRef.current.length > 0;

      if (active || dirtyRef.current) {
        m.x = lerpN(m.x, t.x, LERP_SPEED);
        m.y = lerpN(m.y, t.y, LERP_SPEED);
        draw(now);
        dirtyRef.current = false;
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [draw],
  );

  // ── Setup ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Measure the quiet zones ONCE per layout change, not per frame. Each
    // getBoundingClientRect forces a synchronous layout, so this is the one
    // call that must stay out of the animation loop.
    const measureQuiet = () => {
      if (!quietSelector) {
        quietRectsRef.current = [];
        return;
      }
      const cRect = canvas.getBoundingClientRect();
      const rects: QuietRect[] = [];
      wrap.querySelectorAll(quietSelector).forEach((el) => {
        const r = el.getBoundingClientRect();
        rects.push({
          left: r.left - cRect.left,
          top: r.top - cRect.top,
          right: r.right - cRect.left,
          bottom: r.bottom - cRect.top,
        });
      });
      // Only flag a repaint when the zones actually MOVED. Flagging on every
      // tick would defeat the idle-skip and keep the canvas redrawing while
      // the page sits still.
      const prev = quietRectsRef.current;
      const changed =
        prev.length !== rects.length ||
        rects.some((r, i) => {
          const p = prev[i];
          return (
            Math.abs(p.left - r.left) > 1 ||
            Math.abs(p.top - r.top) > 1 ||
            Math.abs(p.right - r.right) > 1 ||
            Math.abs(p.bottom - r.bottom) > 1
          );
        });
      quietRectsRef.current = rects;
      if (changed) dirtyRef.current = true;
    };

    // Rebuild the static paper + dot texture. Only changes with size/theme.
    const buildBgLayer = (w: number, h: number, dpr: number) => {
      const layer = document.createElement("canvas");
      layer.width = Math.max(1, w * dpr);
      layer.height = Math.max(1, h * dpr);
      const lc = layer.getContext("2d");
      if (!lc) return;
      lc.setTransform(dpr, 0, 0, dpr, 0, 0);
      lc.fillStyle = theme.bg;
      lc.fillRect(0, 0, w, h);
      lc.fillStyle = theme.dot;
      for (let x = DOT_SPACING / 2; x < w; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < h; y += DOT_SPACING) {
          lc.beginPath();
          lc.arc(x, y, 0.7, 0, Math.PI * 2);
          lc.fill();
        }
      }
      bgLayerRef.current = layer;
    };

    const setSize = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.min(Math.round(rect.height), MAX_CANVAS_H);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      buildBgLayer(w, h, dpr);
      measureQuiet();
      dirtyRef.current = true;
      // Under reduced motion there's no loop — paint the static grid once.
      if (reducedMotion) draw(performance.now());
    };

    setSize();
    // ResizeObserver catches content-driven growth (e.g. scan results
    // rendering); the window listener is the belt-and-braces fallback for
    // environments where observer callbacks are unreliable.
    const ro = new ResizeObserver(setSize);
    ro.observe(wrap);
    window.addEventListener("resize", setSize);

    if (reducedMotion) {
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", setSize);
      };
    }

    // Safety net for layout shifts that don't resize the wrapper (a quiz
    // step swapping, an accordion opening). Cheap at this cadence.
    const quietTimer = window.setInterval(measureQuiet, 400);

    // The canvas's viewport position is cached too: mousemove fires far more
    // often than 60Hz, and a getBoundingClientRect in that handler is another
    // forced layout per event. Refreshed on scroll/resize instead.
    let canvasRect = canvas.getBoundingClientRect();
    const refreshRect = () => {
      canvasRect = canvas.getBoundingClientRect();
    };
    window.addEventListener("scroll", refreshRect, { passive: true });

    // Window-level listeners, translated into canvas space, so the warp
    // tracks the cursor even over content layered above the canvas.
    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: e.clientX - canvasRect.left,
        y: e.clientY - canvasRect.top,
      };
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvasRect;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      // Clicks in a quiet zone (the form, most likely) spawn nothing — the
      // visitor is acting on content, not playing with the background.
      if (quietDamp(x, y, quietRectsRef.current) < 0.99) return;
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        opacity: 1,
        born: performance.now(),
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      window.clearInterval(quietTimer);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("scroll", refreshRect);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, draw, quietSelector, theme]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative w-full overflow-hidden",
        theme.wrapClass,
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-x-0 top-0 z-0 pointer-events-none"
        style={{
          // Dissolve into the section background instead of a hard edge when
          // the container outgrows the capped canvas height.
          maskImage:
            "linear-gradient(to bottom, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 78%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
