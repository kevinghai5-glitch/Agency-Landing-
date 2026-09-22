/**
 * Page transition — the one bit of motion between pages. A template
 * (unlike a layout) re-mounts on every navigation, so the incoming page
 * fades up 8px over 320ms instead of cutting in. Nav, footer and the
 * aurora live in the layout and stay put; only the page body moves.
 *
 * Opacity + transform only, one-shot, and off under prefers-reduced-motion
 * (see .page-enter in globals.css). It is NOT an entrance animation on the
 * page itself — it only runs on a route change.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter flex flex-1 flex-col">{children}</div>;
}
