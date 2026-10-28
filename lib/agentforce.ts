/**
 * Agentforce practice content. NEW COPY written for this site (not on
 * enabledanalytics.com): it describes the offering and must be reviewed by
 * Enabled Analytics before launch (see MISSING_CONTENT.md). No outcome numbers
 * are claimed. The demos are labelled illustrative.
 */
export const agentforce = {
  slug: "agentforce",
  title: "Agentforce Implementation",
  eyebrow: "Agentforce & AI",
  headline: ["The future of Salesforce", "is agentic."],
  lead: "We design, ground and launch Agentforce AI agents that work alongside your teams across sales, service and field operations, built on your Salesforce data and governed by our Centre of Excellence.",
  why: {
    title: "Why Agentforce, why now",
    body: [
      "Salesforce’s platform is now built around autonomous agents that can reason over your data and take action, not just answer questions. The agents are only as good as the data, processes and guardrails underneath them.",
      "That’s where Enabled Analytics comes in: the same CoE teams, accelerators and Data Cloud practice that power our implementations now prepare your org for agents and put them to work safely.",
    ],
  },
  capabilities: [
    { icon: "route", title: "Use-case discovery", text: "Identify the jobs agents should own first, ranked by value, data readiness and risk." },
    { icon: "layers", title: "Data Cloud grounding", text: "Harmonize data from across your enterprise systems so agents answer from a single, trusted customer view." },
    { icon: "sparkles", title: "Agent build", text: "Topics, instructions, actions (Flows, Apex, MuleSoft) and prompt templates tailored to your processes." },
    { icon: "award", title: "Trust & guardrails", text: "Permissions, data masking and the Einstein Trust Layer configured so agents stay inside policy." },
    { icon: "zap", title: "Testing & launch", text: "Scenario testing before go-live, then a phased rollout with human hand-off built in." },
    { icon: "trending", title: "Adoption & evolution", text: "Monitoring, tuning and new skills over time, the continuous Evolution in our Four E’s." },
  ],
  process: [
    { title: "Assess", text: "AI Readiness Assessment of your data, processes, security and org health." },
    { title: "Ground", text: "Connect and harmonize the data your agents need in Data Cloud." },
    { title: "Build", text: "Configure topics, actions and guardrails; integrate with your systems." },
    { title: "Test", text: "Run real-world scenarios and edge cases before anyone talks to an agent." },
    { title: "Launch", text: "Roll out in phases with clear hand-off to people." },
    { title: "Evolve", text: "Measure, tune and expand agent skills with our CoE." },
  ],
  readiness: {
    title: "AI Readiness Assessment",
    lead: "Know exactly where to start before you build your first agent.",
    deliverables: [
      "Data readiness review across your key objects and sources",
      "Process map of high-value agent use cases",
      "Security, permissions and trust-layer gap analysis",
      "Org health findings that could block agents (technical debt, automation sprawl)",
      "A prioritized Agentforce roadmap with quick wins",
    ],
  },
}

export type DemoTurn =
  | { who: "user"; text: string }
  | { who: "agent"; text: string }
  | { who: "action"; text: string }

export type AgentDemo = { id: string; name: string; cloud: string; summary: string; turns: DemoTurn[] }

/** Illustrative conversations showing how agents reason and act. Not customer data. */
export const agentDemos: AgentDemo[] = [
  {
    id: "service",
    name: "Service Agent",
    cloud: "Service Cloud",
    summary: "Resolves routine cases 24/7 from your knowledge base and hands complex ones to people with full context.",
    turns: [
      { who: "user", text: "My order hasn’t arrived and the tracking hasn’t updated in 4 days." },
      { who: "action", text: "Topic: Order support → Action: Get order & shipment status" },
      { who: "agent", text: "I found order #48213. The carrier flagged a delivery exception yesterday. I can reship it today or issue a refund. Which would you prefer?" },
      { who: "user", text: "Reship please." },
      { who: "action", text: "Action: Create replacement order (Flow) → Update case" },
      { who: "agent", text: "Done. Your replacement ships today and I’ve emailed the new tracking link. Anything else?" },
    ],
  },
  {
    id: "sales",
    name: "Sales Development Agent",
    cloud: "Sales Cloud",
    summary: "Engages inbound leads instantly, qualifies them against your criteria and books meetings with your reps.",
    turns: [
      { who: "user", text: "We’re evaluating CPQ tools for a 40-person sales team." },
      { who: "action", text: "Topic: Lead qualification → Action: Enrich lead & check fit" },
      { who: "agent", text: "Thanks! Are you on Sales Cloud today, and is your goal faster quotes or fewer pricing errors?" },
      { who: "user", text: "Sales Cloud, and mostly faster quotes." },
      { who: "action", text: "Action: Score lead → Find rep availability" },
      { who: "agent", text: "That’s a great fit. I can book 30 minutes with a CPQ specialist on Tuesday at 10:00 or Wednesday at 14:00." },
    ],
  },
  {
    id: "field",
    name: "Field Service Agent",
    cloud: "Salesforce Field Service",
    summary: "Reschedules appointments, finds the right technician and keeps customers updated without a call.",
    turns: [
      { who: "user", text: "Can I move tomorrow’s maintenance visit to Friday morning?" },
      { who: "action", text: "Topic: Appointments → Action: Get service appointment" },
      { who: "agent", text: "Sure. Friday has a technician with the right skills free at 9:00 or 11:30." },
      { who: "user", text: "9:00 works." },
      { who: "action", text: "Action: Reschedule appointment → Notify technician" },
      { who: "agent", text: "You’re booked for Friday 9:00. You’ll get a reminder with live arrival tracking that morning." },
    ],
  },
]
