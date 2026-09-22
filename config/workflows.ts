/**
 * THE FIFTEEN WORKFLOWS — the data behind "What gets installed" on
 * /what-we-do. ONE panel component (components/what-we-do/DemoPanel.tsx)
 * renders every demo from this array; there are no hand-built demos.
 *
 * Each demo is a DRAWN MOMENT, not live data: what she did (the left
 * frame), how long it took (the elapsed figure), what landed on the phone
 * (the right frame), then three timed beats and the payoff line. No real
 * GoHighLevel connection, no "connecting…", no dashboard numbers. "Apex
 * Roofing", "apexroofing.ca", "Sarah Mitchell" and the 555 number are the
 * stand-ins from the approved canvas — fictional on purpose.
 *
 * ⚠️ A2P: the scene's "form" is a PICTURE of a form — DemoPanel renders
 * the fields as static <div>s, never <input>/<form>/<button>. Keep it so.
 *
 * Names carry NON-BREAKING hyphens (U+2011) so "Text‑Back", "After‑Hours",
 * "Auto‑Reply", "Follow‑Up", "60‑Day", "Hot‑Lead" never split across a
 * line. Keep them when editing. No dollar figures anywhere in here.
 */
export interface SceneFrame {
  /** Mono label above the frame — whose moment this is. */
  label: string;
  /** Mono caption in the frame's title bar (a domain, a time, a place). */
  caption: string;
  /** Serif title inside the frame. */
  title: string;
  /** Static "field" lines — rendered as plain boxes, never inputs. */
  fields: string[];
  /** Optional solid accent block under the fields ("Send"). Decorative. */
  action?: string;
  /** Mono line under the frame ("8:12 PM · sent"). */
  stamp: string;
}

export interface ScenePhone {
  /** Mono label above the phone — whose phone. */
  label: string;
  /** Centred header inside the screen — who the messages are from. */
  header: string;
  bubbles: { from: "business" | "her"; text: string }[];
  /** For the one workflow whose product is a message NOT sent. */
  empty?: string;
  /** Mono timestamp under the bubbles. Decorative. */
  stamp: string;
}

export interface Workflow {
  id: string;
  name: string;
  /** Short name for the "hands off to" pills. */
  short: string;
  group: "always" | "conditional";
  /** The card's one-liner. */
  line: string;
  /** Completes the sentence "Starts when …" — lower-case first letter. */
  trigger: string;
  /** Conditional only — completes "Comes off …". */
  offCondition?: string;
  scene: {
    left: SceneFrame;
    right: ScenePhone;
    /** The gap between the two frames: a big mono figure and its label. */
    elapsed: { value: string; label: string };
  };
  /** Three timed beats after the moment. `**bold**` marks a stage or a
   *  workflow name. */
  beats: { at: string; text: string }[];
  payoff: string;
  /** Ids this hands off to — rendered as clickable pills. */
  handsOffTo: string[];
}

const SITE = "apexroofing.ca";

export const WORKFLOWS: Workflow[] = [
  // ── THE TEN — ALWAYS INSTALLED ──────────────────────────────────────────
  {
    id: "instant-lead-response",
    name: "Instant Lead Response",
    short: "Instant Lead Response",
    group: "always",
    line: "Someone fills in your form, they get a text and an email in under a minute.",
    trigger: "a contact form is submitted on your website.",
    scene: {
      left: {
        label: "Her, on your website",
        caption: SITE,
        title: "Get a Free Estimate",
        fields: ["Sarah Mitchell", "(905) 555-0114", "Shingles off after the storm"],
        action: "Send",
        stamp: "8:12 PM · sent",
      },
      elapsed: { value: "11s", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Thanks Sarah — we got your request and we’ll call you shortly. Want to skip the wait? Book here: apexroofing.ca/book",
          },
        ],
        stamp: "8:12 PM",
      },
    },
    beats: [
      { at: "0:04", text: "Contact created in your CRM." },
      { at: "0:11", text: "A card opens in **New Lead**." },
      { at: "0:19", text: "The same message by email." },
    ],
    payoff:
      "She was answered in eleven seconds, at eight at night, without you touching your phone.",
    handsOffTo: ["owner-hot-lead-alert", "arrival-confirmation"],
  },
  {
    id: "missed-call-text-back",
    name: "Missed Call Text‑Back",
    short: "Missed Call Text‑Back",
    group: "always",
    line: "A call is missed, they get a text before they dial the next result.",
    trigger: "a call to your business rings out unanswered.",
    scene: {
      left: {
        label: "Her, calling you",
        caption: "6:47 PM",
        title: "Apex Roofing",
        fields: ["(905) 555-0198", "Calling…", "No answer"],
        stamp: "6:47 PM · rang out",
      },
      elapsed: { value: "8s", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Sorry we missed you — this is Apex Roofing. What’s going on?",
          },
          { from: "her", text: "Shingles came off in the storm last night." },
        ],
        stamp: "6:47 PM",
      },
    },
    beats: [
      { at: "0:08", text: "The text lands before she dials the next result." },
      { at: "0:47", text: "She replies, and says what she needs." },
      { at: "0:52", text: "Conversation open. A card opens in **New Lead**." },
    ],
    payoff: "A missed call became a conversation instead of a lost one.",
    handsOffTo: ["owner-hot-lead-alert"],
  },
  {
    id: "after-hours-auto-reply",
    name: "After‑Hours Auto‑Reply",
    short: "After‑Hours Auto‑Reply",
    group: "always",
    line: "Evenings and weekends answered. Emergencies get a call back, not a closed sign.",
    trigger: "anyone contacts you outside your business hours.",
    scene: {
      left: {
        label: "Her, at 9:40 PM",
        caption: SITE,
        title: "Get a Free Estimate",
        fields: ["Sarah Mitchell", "(905) 555-0114", "Quote for a new roof — no rush"],
        action: "Send",
        stamp: "9:40 PM · sent · you closed at six",
      },
      elapsed: { value: "<1m", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Thanks for reaching out — we’re closed until 8:00 AM. Grab a slot here and we’ll confirm first thing: apexroofing.ca/book",
          },
        ],
        stamp: "9:40 PM",
      },
    },
    beats: [
      { at: "9:40 PM", text: "A card opens in **New Lead**, flagged after-hours. An emergency would ring your phone instead." },
      { at: "7:15 AM", text: "She books Thursday morning from the link." },
      { at: "7:15 AM", text: "Confirmation goes out the moment the booking lands — nobody’s awake yet." },
    ],
    payoff: "Booked overnight, with nobody awake.",
    handsOffTo: ["arrival-confirmation"],
  },
  {
    id: "owner-hot-lead-alert",
    name: "Owner Hot‑Lead Alert",
    short: "Owner Hot‑Lead",
    group: "always",
    line: "Strong buying signal, your phone buzzes, you call while they're still holding theirs.",
    trigger: "a card reaches Qualified — or someone replies to an estimate chase.",
    scene: {
      left: {
        label: "Her card, on the board",
        caption: "Your pipeline",
        title: "Sarah Mitchell",
        fields: ["Moved to Qualified", "Shingles off after the storm", "(905) 555-0114"],
        stamp: "8:14 PM",
      },
      elapsed: { value: "3s", label: "Later" },
      right: {
        label: "Your phone",
        header: "Apex Roofing · Alert",
        bubbles: [
          {
            from: "business",
            text: "Hot lead: Sarah Mitchell, (905) 555-0114 — “Shingles off after the storm.” Call her now.",
          },
        ],
        stamp: "8:14 PM",
      },
    },
    beats: [
      { at: "0:03", text: "The same by email, in case you’re at a desk." },
      { at: "0:40", text: "You call her while she’s still holding her phone." },
      { at: "Also", text: "A reply to any **Estimate Follow‑Up** chase fires this too — the second way in." },
    ],
    payoff:
      "The promise that a hot lead gets a human in minutes stops depending on you having the app open.",
    handsOffTo: [],
  },
  {
    id: "arrival-confirmation",
    name: "Arrival Confirmation + Reminders",
    short: "Arrival Confirmation",
    group: "always",
    line: "Confirmation, then reminders 24 hours and 2 hours before you're due out.",
    trigger: "a visit is booked, by you or by them.",
    scene: {
      left: {
        label: "Her booking",
        caption: `${SITE}/book`,
        title: "Book a visit",
        fields: ["Sarah Mitchell", "Thursday, 9:00 AM", "Shingles off after the storm"],
        action: "Confirm",
        stamp: "Tuesday, 4:12 PM · booked",
      },
      elapsed: { value: "0s", label: "Right away" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "You’re booked for Thursday at 9:00 AM. We’ll remind you the day before. Reply C to cancel.",
          },
        ],
        stamp: "Tuesday, 4:12 PM",
      },
    },
    beats: [
      { at: "−24 hrs", text: "“You’re booked for tomorrow at 9:00 AM.”" },
      { at: "−2 hrs", text: "“See you in a couple of hours.”" },
      { at: "9:00 AM", text: "The crew arrives. She’s expecting you." },
    ],
    payoff: "Far fewer people forget you were coming.",
    handsOffTo: ["cancellation-guard", "missed-visit-recovery"],
  },
  {
    id: "cancellation-guard",
    name: "Cancellation Guard",
    short: "Cancellation Guard",
    group: "always",
    line: "A cancelled job stops its own reminders. Nobody gets a text about a visit that isn't happening.",
    trigger: "a booked visit is cancelled.",
    scene: {
      left: {
        label: "Her, on Wednesday",
        caption: `${SITE}/book`,
        title: "Your booking",
        fields: ["Sarah Mitchell", "Thursday, 9:00 AM"],
        action: "Cancel",
        stamp: "Wednesday, 6:03 PM · cancelled",
      },
      elapsed: { value: "2s", label: "Later" },
      right: {
        label: "Her phone, Thursday",
        header: "Apex Roofing",
        bubbles: [],
        empty:
          "No “see you in a couple of hours” at 7:00 AM. The reminders were cancelled with the visit — nothing sent.",
        stamp: "7:00 AM",
      },
    },
    beats: [
      { at: "0:02", text: "Pending reminders cancelled before they send." },
      { at: "7:00 AM", text: "Nothing goes out about a visit that isn’t happening." },
      { at: "9:00 AM", text: "No wasted trip — the slot was freed on Wednesday." },
    ],
    payoff: "No 7 AM reminder for a job that isn’t happening.",
    handsOffTo: [],
  },
  {
    id: "missed-visit-recovery",
    name: "Missed Visit Recovery",
    short: "Missed Visit Recovery",
    group: "always",
    line: "Your crew turns up and nobody's home. It rebooks them instead of writing off the trip.",
    trigger: "your crew arrives and nobody’s home.",
    scene: {
      left: {
        label: "Your crew, on the driveway",
        caption: "Thursday",
        title: "9:00 AM visit",
        fields: ["Sarah Mitchell", "Knocked twice", "Nobody home"],
        stamp: "9:06 AM · marked missed",
      },
      elapsed: { value: "1h", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Sorry we missed you this morning — want to grab another time? apexroofing.ca/book",
          },
          { from: "her", text: "So sorry — Monday?" },
        ],
        stamp: "10:06 AM",
      },
    },
    beats: [
      { at: "+1 hr", text: "The text goes out. Nobody on the crew had to chase it." },
      { at: "+3 hrs", text: "She rebooks for Monday." },
      { at: "Monday", text: "Same crew, same job. No write-off." },
    ],
    payoff: "A wasted slot gets a second chance without anyone chasing it.",
    handsOffTo: ["arrival-confirmation"],
  },
  {
    id: "estimate-follow-up",
    name: "Estimate Follow‑Up",
    short: "Estimate Follow‑Up",
    group: "always",
    line: "Quote sent and gone quiet: four follow-ups over sixteen days, then it hands off.",
    trigger: "you move the card into the Quote Sent stage.",
    scene: {
      left: {
        label: "You, on the board",
        caption: "Your pipeline",
        title: "Sarah Mitchell",
        fields: ["Quote sent — Day 0", "Moved to Quote Sent", "Follow-ups armed"],
        stamp: "Day 0",
      },
      elapsed: { value: "2d", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Hi Sarah — any questions on the estimate we sent Tuesday?",
          },
        ],
        stamp: "Day 2, 10:00 AM",
      },
    },
    beats: [
      { at: "Day 5", text: "Email, with the quote attached again." },
      { at: "Day 9", text: "“Still happy to walk you through it.”" },
      { at: "Day 16", text: "Final email, then it hands her to the **60‑Day Nurture**." },
    ],
    payoff:
      "Four chases you didn’t have to remember. If she replies at any point, it stops and your phone rings instead.",
    handsOffTo: ["owner-hot-lead-alert", "sixty-day-nurture"],
  },
  {
    id: "sixty-day-nurture",
    name: "60‑Day Nurture",
    short: "60‑Day Nurture",
    group: "always",
    line: "Quoted in spring, closes in the fall. It keeps the conversation alive that long.",
    trigger: "she was interested but never booked — or Estimate Follow‑Up handed her over on day 16.",
    scene: {
      left: {
        label: "Her card, month two",
        caption: "Your pipeline",
        title: "Sarah Mitchell",
        fields: ["Quoted in April", "Quiet since the last chase", "Nurture running"],
        stamp: "Day 0 of 60 · handed over",
      },
      elapsed: { value: "1d", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Hi Sarah — no pressure on the quote. If you want a second look before the fall rain, we’re around.",
          },
        ],
        stamp: "Day 1 of 60",
      },
    },
    beats: [
      { at: "Day 14 of 60", text: "Still there, still no pressure." },
      { at: "Day 38 of 60", text: "A reason to come back." },
      { at: "Day 60 of 60", text: "Last one. Her card moves to **Lost**." },
    ],
    payoff:
      "Roof and restoration cycles are long. This is the only thing still talking to her in month two.",
    handsOffTo: [],
  },
  {
    id: "review-request",
    name: "Review Request",
    short: "Review Request",
    group: "always",
    line: "Job finished, review asked for, automatically, while they still like you.",
    trigger: "a job is marked Won.",
    scene: {
      left: {
        label: "You, on the board",
        caption: "Your pipeline",
        title: "Sarah Mitchell",
        fields: ["Roof repair — done", "Moved to Won", "Review request queued"],
        stamp: "Friday, 3:40 PM",
      },
      elapsed: { value: "1d", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Thanks for having us out, Sarah — mind leaving a quick review? apexroofing.ca/review",
          },
        ],
        stamp: "Saturday, 10:00 AM",
      },
    },
    beats: [
      { at: "+1 day", text: "The ask goes out while the job is still fresh." },
      { at: "+3 days", text: "She leaves five stars." },
      { at: "Then", text: "**Review Response** picks it up and replies in your voice." },
    ],
    payoff: "Reviews without anyone having to remember to ask.",
    handsOffTo: ["review-response"],
  },

  // ── THE FIVE — ON BY DEFAULT, OFF ONLY FOR THE REASON WRITTEN ON THEM ───
  {
    id: "webchat-capture",
    name: "Webchat Capture",
    short: "Webchat Capture",
    group: "conditional",
    line: "A visitor's question on your site becomes a text conversation.",
    trigger: "someone types into the chat box on your website.",
    offCondition: "only if the widget can’t go on your website.",
    scene: {
      left: {
        label: "Her, on your website",
        caption: SITE,
        title: "Chat with Apex Roofing",
        fields: [
          "Do you do emergency tarping?",
          "We do — where are you? Can we text you?",
          "Sarah, (905) 555-0114",
        ],
        stamp: "10:20 PM · sent",
      },
      elapsed: { value: "3s", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Hi Sarah — Apex Roofing, picking up from the chat. We can be out first thing. Book here, or reply and we’ll call: apexroofing.ca/book",
          },
        ],
        stamp: "10:21 PM",
      },
    },
    beats: [
      { at: "0:03", text: "Answered, and asked for a number." },
      { at: "0:31", text: "She gives it." },
      { at: "0:33", text: "Same chain as everything else. A card opens in **New Lead**." },
    ],
    payoff: "The person who’d rather type than phone stops being invisible.",
    handsOffTo: ["owner-hot-lead-alert"],
  },
  {
    id: "social-dm-capture",
    name: "Social DM Capture",
    short: "Social DM Capture",
    group: "conditional",
    line: "Instagram and Facebook messages answered like any other enquiry.",
    trigger: "a message arrives on your Instagram or Facebook.",
    offCondition: "only if you have no social accounts at all.",
    scene: {
      left: {
        label: "Her, on Instagram",
        caption: "instagram.com/apexroofing",
        title: "Direct message",
        fields: ["Saw the roof you posted last week.", "Do you do estimates in Oakville?"],
        stamp: "7:52 PM · sent",
      },
      elapsed: { value: "6s", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "We do — and this week’s open. Pick a time here and we’ll confirm: apexroofing.ca/book",
          },
          { from: "her", text: "Booked Thursday. Thanks!" },
        ],
        stamp: "7:52 PM",
      },
    },
    beats: [
      { at: "0:06", text: "Answered, booking link sent. A card opens in **New Lead** — the same chain as the website." },
      { at: "0:44", text: "She books." },
      { at: "0:45", text: "Her card moves to **Booked**, and the confirmation goes out." },
    ],
    payoff: "DMs stop being a second inbox nobody checks.",
    handsOffTo: ["arrival-confirmation"],
  },
  {
    id: "deposit-by-text",
    name: "Deposit by Text",
    short: "Deposit by Text",
    group: "conditional",
    line: "A payment link by text the moment the work is agreed.",
    trigger: "you mark a deposit as due.",
    offCondition: "only if you take payment in person and never ask for deposits.",
    scene: {
      left: {
        label: "You, on the board",
        caption: "Your pipeline",
        title: "Sarah Mitchell",
        fields: ["Roof repair — agreed", "Moved to Won", "Deposit due"],
        stamp: "Tuesday, 11:30 AM",
      },
      elapsed: { value: "4s", label: "Later" },
      right: {
        label: "Her phone",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Here’s your deposit link for Thursday’s job: apexroofing.ca/pay",
          },
          { from: "her", text: "Paid — see you Thursday." },
        ],
        stamp: "Tuesday, 11:39 AM",
      },
    },
    beats: [
      { at: "+9 min", text: "She pays from her phone." },
      { at: "+9 min", text: "Her card shows the deposit as received." },
      { at: "Thursday", text: "The crew rolls up to a job that’s already committed." },
    ],
    payoff: "No chasing, no cheque, no “I’ll sort it when you’re here.”",
    handsOffTo: [],
  },
  {
    id: "database-reactivation",
    name: "Database Reactivation",
    short: "Database Reactivation",
    group: "conditional",
    line: "Everyone you quoted last spring who never called back, worked with three touches.",
    trigger: "a list of people you already quoted is loaded, once.",
    offCondition: "only if there’s no list to work.",
    scene: {
      left: {
        label: "Your list, loaded once",
        caption: "Your pipeline",
        title: "Spring quotes, never booked",
        fields: ["340 contacts", "Three touches over seven days", "Replies land in New Lead"],
        stamp: "Day 0",
      },
      elapsed: { value: "3×", label: "Over 7 days" },
      right: {
        label: "Their phones",
        header: "Apex Roofing",
        bubbles: [
          {
            from: "business",
            text: "Hi Sarah — Apex Roofing here. We quoted your roof in the spring. If it’s still on the list, we’ve got room this month: apexroofing.ca/book",
          },
        ],
        stamp: "Day 0",
      },
    },
    beats: [
      { at: "Day 3", text: "Touch two." },
      { at: "Day 7", text: "Touch three." },
      { at: "Day 7", text: "Eleven replies. Four book. Each one lands in **New Lead**." },
    ],
    payoff: "Work from people who already know you, without a call being made.",
    handsOffTo: [],
  },
  {
    id: "review-response",
    name: "Review Response",
    short: "Review Response",
    group: "conditional",
    line: "Reviews get replied to. Negative ones get drafted for you, never posted.",
    trigger: "a new review lands on your Google listing.",
    offCondition: "only if you reply to them yourself.",
    scene: {
      left: {
        label: "Two reviews, on Google",
        caption: "google.com/maps",
        title: "Apex Roofing — reviews",
        fields: ["★★★★★ “Quick, tidy, fair.”", "★☆☆☆☆ “Nobody called me back.”"],
        stamp: "9:05 AM · two new",
      },
      elapsed: { value: "5s", label: "Later" },
      right: {
        label: "Your phone",
        header: "Apex Roofing · Alert",
        bubbles: [
          {
            from: "business",
            text: "5★ from Sarah M. — replied in your voice, already posted.",
          },
          {
            from: "business",
            text: "1★ — draft ready. Nothing posts until you say so. Reply YES to post it.",
          },
        ],
        stamp: "9:05 AM",
      },
    },
    beats: [
      { at: "0:05", text: "The five-star gets a reply, in your voice." },
      { at: "0:05", text: "The one-star gets a draft, sent to you." },
      { at: "Later", text: "You reply YES from the truck, or edit it first. Then it posts." },
    ],
    payoff: "Your listing looks tended, and nothing angry goes out unread.",
    handsOffTo: [],
  },
];

export const WORKFLOW_BY_ID: Record<string, Workflow> = Object.fromEntries(
  WORKFLOWS.map((w) => [w.id, w]),
);

export const ALWAYS = WORKFLOWS.filter((w) => w.group === "always");
export const CONDITIONAL = WORKFLOWS.filter((w) => w.group === "conditional");
