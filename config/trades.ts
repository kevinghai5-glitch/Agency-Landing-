/**
 * The "Built for" ticker under the home hero (components/landing/
 * TradesTicker.tsx): every niche the system is built for, each with a photo
 * avatar — seventeen in all, so one pass of the strip is wider than any
 * screen and a niche never repeats within the visible line.
 *
 * ORDER MATTERS. The strip always starts from the top of this list on
 * load, and holds still for a beat before it moves — so the first four
 * are the four that must be seen first: Roofing, Pest control, Water
 * restoration, Garage door repair (Kevin's call; keep them at the top).
 *
 * Photos are placeholders from Wikimedia Commons (see public/img/CREDITS.md
 * — replace or credit before this ships).
 */
export const TRADES = [
  // The four that lead, in this order.
  { label: "Roofing", img: "/img/trade-roofing.jpg" },
  { label: "Pest control", img: "/img/trade-pest.jpg" },
  { label: "Water restoration", img: "/img/trade-water.jpg" },
  { label: "Garage door repair", img: "/img/trade-garage.jpg" },
  // Home exterior
  { label: "Siding", img: "/img/trade-siding.jpg" },
  { label: "Gutters", img: "/img/trade-gutters.jpg" },
  { label: "Windows & doors", img: "/img/trade-windows.jpg" },
  { label: "Fencing", img: "/img/trade-fencing.jpg" },
  { label: "Concrete & masonry", img: "/img/trade-concrete.jpg" },
  { label: "Pressure washing", img: "/img/trade-pressure.jpg" },
  { label: "Tree service", img: "/img/trade-tree.jpg" },
  // Emergency
  { label: "Fire & smoke restoration", img: "/img/trade-fire.jpg" },
  { label: "Mold remediation", img: "/img/trade-mold.jpg" },
  { label: "Plumbing", img: "/img/trade-plumbing.jpg" },
  { label: "HVAC", img: "/img/trade-hvac.jpg" },
  { label: "Electrical", img: "/img/trade-electrical.jpg" },
  { label: "Locksmith", img: "/img/trade-locksmith.jpg" },
] as const;
