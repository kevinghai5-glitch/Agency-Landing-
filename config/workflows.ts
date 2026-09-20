/**
 * THE FIFTEEN WORKFLOWS — the data behind "What gets installed" on
 * /what-we-do. ONE player component (components/what-we-do/DemoPlayer.tsx)
 * renders every demo from this array; there are no hand-built demos.
 *
 * Every step is an animated ILLUSTRATION of the workflow, not live data:
 * no real GoHighLevel connection, no fake account, no invented dashboard
 * numbers. "Sarah" and "[Business]" are the same stand-ins the rest of the
 * page uses.
 *
 * Names carry NON-BREAKING hyphens (U+2011) so "Text‑Back", "After‑Hours",
 * "No‑Show", "Follow‑Up", "Hot‑Lead", "Text‑to‑Pay" never split across a
 * line. Keep them when editing.
 */
export type Who = "customer" | "system" | "owner";

export interface WorkflowStep {
  /** Mono timestamp / offset, shown in a fixed-width column. */
  at: string;
  who: Who;
  text: string;
}

export interface Workflow {
  id: string;
  name: string;
  group: "always" | "conditional";
  /** The card's one-liner. */
  line: string;
  /** What starts it, plain English. */
  trigger: string;
  /** Conditional workflows only: the one case where it isn't installed. */
  offCondition?: string;
  steps: WorkflowStep[];
  outcome: string;
  /** Ids this hands off to — rendered as clickable chips in the player. */
  connects: string[];
  /** Where it exits the pipeline, if it ends somewhere rather than
   *  handing off (Lead Nurture → Lost). Not clickable. */
  exitsTo?: string;
  /** Small mono footnote under the outcome. */
  note?: string;
}

export const WORKFLOWS: Workflow[] = [
  // ── THE TEN — ALWAYS INSTALLED ──────────────────────────────────────────
  {
    id: "instant-lead-response",
    name: "Instant Lead Response",
    group: "always",
    line: "Someone fills in your form, they get a text and an email in under a minute.",
    trigger: "A contact form is submitted on your website.",
    steps: [
      { at: "0:00", who: "customer", text: "Sarah submits your contact form. 8:12 PM." },
      { at: "0:04", who: "system", text: "Contact created. A card opens in New Lead." },
      {
        at: "0:11",
        who: "system",
        text: "SMS: “Thanks Sarah — we got your request and we’ll call you shortly. Want to skip the wait? [booking link]”",
      },
      { at: "0:19", who: "system", text: "The same thing by email." },
    ],
    outcome: "Answered in 11 seconds, at 8 at night.",
    connects: ["owner-hot-lead-alert", "booking-confirmation"],
  },
  {
    id: "missed-call-text-back",
    name: "Missed Call Text‑Back",
    group: "always",
    line: "A call is missed, they get a text before they dial the next result.",
    trigger: "A call to your business rings out unanswered.",
    steps: [
      { at: "0:00", who: "customer", text: "Calls. Your crew is on a job. Nobody answers. 6:47 PM." },
      {
        at: "0:08",
        who: "system",
        text: "SMS: “Sorry we missed you — this is [Business]. What’s going on?”",
      },
      { at: "0:47", who: "customer", text: "“Shingles came off in the storm last night.”" },
      { at: "0:52", who: "system", text: "Conversation open. Card in New Lead." },
    ],
    outcome: "A missed call became a conversation instead of a lost one.",
    connects: ["owner-hot-lead-alert"],
  },
  {
    id: "after-hours-auto-reply",
    name: "After‑Hours Auto‑Reply",
    group: "always",
    line: "Evenings and weekends answered, with a booking link attached.",
    trigger: "Anyone contacts you outside your business hours.",
    steps: [
      { at: "9:40 PM", who: "customer", text: "Enquiry arrives. You closed at six." },
      {
        at: "9:40 PM",
        who: "system",
        text: "“Thanks for reaching out — we’re closed until 8:00 AM. Grab a slot here and we’ll confirm first thing: [link]”",
      },
      { at: "7:15 AM", who: "customer", text: "Books Thursday morning." },
    ],
    outcome: "Booked overnight, with nobody awake.",
    connects: ["booking-confirmation"],
  },
  {
    id: "booking-confirmation",
    name: "Booking Confirmation + Reminders",
    group: "always",
    line: "Confirmation, then reminders 24 hours and 2 hours before the job.",
    trigger: "An appointment is booked, by you or by them.",
    steps: [
      { at: "0:00", who: "system", text: "Confirmation SMS and email, with the real date and time." },
      { at: "−24 hrs", who: "system", text: "“You’re booked for tomorrow at 9:00 AM.”" },
      { at: "−2 hrs", who: "system", text: "“See you in a couple of hours.”" },
    ],
    outcome: "Far fewer people forget you were coming.",
    connects: ["cancellation-guard", "no-show-recovery"],
  },
  {
    id: "cancellation-guard",
    name: "Cancellation Guard",
    group: "always",
    line: "A cancelled job stops its own reminders. Nobody gets a text about an appointment that isn't happening.",
    trigger: "A booked appointment is cancelled.",
    steps: [
      { at: "0:00", who: "customer", text: "Cancels Thursday." },
      { at: "0:02", who: "system", text: "Pending reminders cancelled before they send." },
    ],
    outcome: "No 7 AM reminder for a job that isn’t happening.",
    connects: [],
    note: "This one is hygiene, not marketing. It never comes off.",
  },
  {
    id: "no-show-recovery",
    name: "No‑Show Recovery",
    group: "always",
    line: "They don't turn up, they get chased to rebook before the slot is wasted.",
    trigger: "A booked appointment is marked as a no-show.",
    steps: [
      { at: "0:00", who: "system", text: "9:00 AM slot passes. Nobody there." },
      {
        at: "+1 hr",
        who: "system",
        text: "“Sorry we missed you today — want to grab another time? [link]”",
      },
      { at: "+3 hrs", who: "customer", text: "Rebooks for Monday." },
    ],
    outcome: "A wasted slot gets a second chance without anyone chasing it.",
    connects: [],
  },
  {
    id: "estimate-follow-up",
    name: "Estimate Follow‑Up",
    group: "always",
    line: "Quote sent and gone quiet: four follow-ups over sixteen days, then a handoff.",
    trigger: "You move the card into the Quote Sent stage.",
    steps: [
      { at: "Day 0", who: "owner", text: "Quote sent. Card moved to Quote Sent." },
      { at: "Day 2", who: "system", text: "SMS: “Hi Sarah — any questions on the estimate?”" },
      { at: "Day 5", who: "system", text: "Email with the quote attached again." },
      { at: "Day 9", who: "system", text: "SMS: “Still happy to walk you through it.”" },
      { at: "Day 16", who: "system", text: "Final email, then it hands her to the 60-day nurture." },
    ],
    outcome:
      "Four chases you didn’t have to remember. If she replies at any point, it stops and your phone rings instead.",
    connects: ["owner-hot-lead-alert", "lead-nurture"],
    note: "Needs the Quote Sent stage, and you moving cards into it. That is the one habit the system asks of you.",
  },
  {
    id: "lead-nurture",
    name: "Lead Nurture — 60 Day",
    group: "always",
    line: "Quoted in spring, closes in the fall. Thirteen touches over sixty days.",
    trigger:
      "Interested but never booked — or handed over from Estimate Follow‑Up on day 16.",
    steps: [
      { at: "Day 1", who: "system", text: "First touch. Useful, not salesy." },
      { at: "Day 14", who: "system", text: "Still there, still no pressure." },
      { at: "Day 38", who: "system", text: "A reason to come back." },
      { at: "Day 60", who: "system", text: "Last one. Card moves to Lost." },
    ],
    outcome:
      "Roof and restoration cycles are long. This is the only thing still talking to her in month two.",
    connects: [],
    exitsTo: "Lost",
  },
  {
    id: "review-request",
    name: "Review Request",
    group: "always",
    line: "Job finished, review asked for, automatically, while they still like you.",
    trigger: "A job is marked Won.",
    steps: [
      { at: "0:00", who: "owner", text: "Job marked Won." },
      {
        at: "+1 day",
        who: "system",
        text: "“Thanks for having us out — mind leaving a quick review? [link]”",
      },
      { at: "+3 days", who: "customer", text: "Leaves five stars." },
    ],
    outcome: "Reviews without anyone having to remember to ask.",
    connects: ["review-response"],
  },
  {
    id: "owner-hot-lead-alert",
    name: "Owner Hot‑Lead Alert",
    group: "always",
    line: "Strong buying signal, your phone buzzes, you call while they're still holding theirs.",
    trigger:
      "TWO ways in — a card reaches Qualified, or someone replies to an estimate chase.",
    steps: [
      { at: "0:00", who: "system", text: "Sarah’s card hits Qualified." },
      { at: "0:03", who: "system", text: "SMS to your mobile: her name, her number, and what she said." },
      { at: "0:03", who: "system", text: "The same by email, in case you’re at a desk." },
      { at: "0:40", who: "owner", text: "You call her back while she’s still on the driveway." },
    ],
    outcome:
      "The promise that a hot lead gets a human in minutes stops depending on you having the app open.",
    connects: [],
  },

  // ── THE FIVE — INSTALLED UNLESS THE CONDITION APPLIES ───────────────────
  {
    id: "webchat-capture",
    name: "Webchat Capture",
    group: "conditional",
    line: "A visitor's question on your site becomes a text conversation.",
    trigger: "Someone types into the chat box on your website.",
    offCondition: "Only if the widget can’t be placed on your website.",
    steps: [
      { at: "0:00", who: "customer", text: "Types a question into the chat box at 10:20 PM." },
      { at: "0:03", who: "system", text: "Answered, and asked for a number." },
      { at: "0:31", who: "customer", text: "Gives it." },
      { at: "0:33", who: "system", text: "Same chain as everything else. Card in New Lead." },
    ],
    outcome: "The person who’d rather type than phone stops being invisible.",
    connects: [],
  },
  {
    id: "social-dm-capture",
    name: "Social DM Capture",
    group: "conditional",
    line: "Instagram and Facebook messages answered like any other enquiry.",
    trigger: "A message arrives on your Instagram or Facebook.",
    offCondition: "Only if you have no social accounts at all.",
    steps: [
      { at: "0:00", who: "customer", text: "DMs your Instagram after seeing a job you posted." },
      { at: "0:06", who: "system", text: "Answered, booking link sent." },
      { at: "0:44", who: "customer", text: "Books." },
    ],
    outcome: "DMs stop being a second inbox nobody checks.",
    connects: [],
  },
  {
    id: "text-to-pay",
    name: "Text‑to‑Pay",
    group: "conditional",
    line: "Payment link by text the moment work is agreed.",
    trigger: "You mark a deposit or a balance as due.",
    offCondition: "Only if you take payment in person and never ask for deposits.",
    steps: [
      { at: "0:00", who: "owner", text: "Marks the deposit as due." },
      { at: "0:04", who: "system", text: "“Here’s your deposit link for Thursday’s job: [link]”" },
      { at: "+9m", who: "customer", text: "Pays from her phone." },
    ],
    outcome: "No chasing, no cheque, no “I’ll sort it when you’re here.”",
    connects: [],
  },
  {
    id: "database-reactivation",
    name: "Database Reactivation",
    group: "conditional",
    line: "Your dormant list worked with a three-touch campaign.",
    trigger: "A list of old contacts you already have, loaded once.",
    offCondition: "Only if there’s no list to work.",
    steps: [
      { at: "Day 0", who: "system", text: "Touch one goes to 340 old contacts." },
      { at: "Day 3", who: "system", text: "Touch two." },
      { at: "Day 7", who: "system", text: "Touch three." },
      { at: "Day 7", who: "customer", text: "Eleven replies. Four book." },
    ],
    outcome: "Work from people who already know you, without a call being made.",
    connects: [],
    note: "Enters at New Lead like any other lead.",
  },
  {
    id: "review-response",
    name: "Review Response",
    group: "conditional",
    line: "Reviews get replied to. Negative ones get drafted for you, never posted.",
    trigger: "A new review lands on your Google listing.",
    offCondition: "Only if you reply to them yourself.",
    steps: [
      { at: "0:00", who: "customer", text: "Leaves a four-star review." },
      { at: "0:05", who: "system", text: "Replies, in your voice." },
      { at: "0:00", who: "customer", text: "Leaves a one-star review." },
      {
        at: "0:05",
        who: "system",
        text: "Drafts a reply and sends it to you. Nothing posts until you say so.",
      },
    ],
    outcome: "Your listing looks tended, and nothing angry goes out unread.",
    connects: [],
    note: "Runs on your Google listing, outside the pipeline.",
  },
];

export const WORKFLOW_BY_ID: Record<string, Workflow> = Object.fromEntries(
  WORKFLOWS.map((w) => [w.id, w]),
);

export const ALWAYS = WORKFLOWS.filter((w) => w.group === "always");
export const CONDITIONAL = WORKFLOWS.filter((w) => w.group === "conditional");
