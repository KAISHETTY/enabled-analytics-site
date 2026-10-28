/**
 * Trust strip, company journey and Dreamforce feature.
 *
 * Sources: PR Newswire release, 7 Apr 2025 ("Enabled Analytics Expands Global
 * Reach with Strategic Merger of Ventas Consulting"), the enabledanalytics.com
 * site copy, and the Salesforce+ episode page. Items without a verified `href`
 * or `value` are listed in MISSING_CONTENT.md, and unverified badges stay hidden.
 */
export const PRESS_RELEASE =
  "https://www.prnewswire.com/in/news-releases/enabled-analytics-expands-global-reach-with-strategic-merger-of-ventas-consulting-302421029.html"

export type TrustItem = {
  label: string
  value: string
  detail: string
  href?: string
  /** false = hidden until Enabled Analytics supplies the real profile/widget */
  verified: boolean
  kind: "partner" | "rating" | "certs" | "review"
}

export const trustItems: TrustItem[] = [
  // Confirmed by Enabled Analytics (2026-10-28). The Apr 2025 release still says "Crest", so no link until the Partner profile URL is added.
  { kind: "partner", label: "Salesforce", value: "Summit Partner", detail: "Highest Salesforce consulting partner tier", verified: true },
  { kind: "partner", label: "Salesforce", value: "ISV Partner", detail: "Builder of Discover Cloud", href: "/products", verified: true },
  // TODO(EA): replace href with the Discover Cloud AppExchange listing URL.
  { kind: "rating", label: "AppExchange", value: "4.95 / 5", detail: "Rating on Salesforce AppExchange", href: PRESS_RELEASE, verified: true },
  // TODO(EA): link to the Salesforce Trailblazer / Partner Finder profile.
  { kind: "certs", label: "Certified team", value: "500+", detail: "Salesforce certifications", verified: true },
  // TODO(EA): add Clutch / G2 profile URLs + rating, then set verified: true.
  { kind: "review", label: "Clutch", value: "", detail: "Client reviews", verified: false },
  { kind: "review", label: "G2", value: "", detail: "Client reviews", verified: false },
]

export type Milestone = { when?: string; title: string; text: string; tag: string }

export const journey: Milestone[] = [
  {
    tag: "Origin",
    title: "Enabled Analytics is formed",
    text: "With a mission of helping businesses thrive by harnessing the power of Salesforce, and a vision of delivering world-class services and implementations.",
  },
  {
    tag: "Method",
    title: "Centre of Excellence teams",
    text: "Seasoned solution, technical and design architects come together as CoE teams that steer every implementation.",
  },
  {
    tag: "Product",
    title: "Discover Cloud launches",
    text: "Our own product: prebuilt data analytics scorecards that measure, benchmark and sustain the highest quality code.",
  },
  {
    tag: "Partnership",
    title: "Summit Partner & ISV Partner",
    text: "A Salesforce Summit Partner and an ISV partner, rated 4.95/5 on AppExchange, with 500+ Salesforce certifications.",
  },
  {
    when: "April 2025",
    tag: "Growth",
    title: "Ventas Consulting joins EA",
    text: "A strategic merger expands our global reach. Ventas founder Richard Gonzales joins as Chief Revenue Officer.",
  },
  {
    when: "Today",
    tag: "Reach",
    title: "Delivering across four regions",
    text: "Salesforce solutions across the USA, Singapore, Australia and India, for 100+ global clients.",
  },
  {
    when: "Next",
    tag: "Agentic",
    title: "The Agentforce practice",
    text: "AI agents grounded in Data Cloud, built with the same CoE discipline, from readiness assessment to production.",
  },
]

export const dreamforce = {
  event: "Dreamforce 2026",
  series: "Trailblazer Community at Dreamforce 2026",
  title: "Deploy Military Planning Tactics for Salesforce Success",
  speaker: "Lisa Malmanger",
  description:
    "Bad requirements. Stalled decisions. Implementations that fall apart. Military frameworks solve these problems — no uniform needed. Get tools for mission-level clarity in your Salesforce projects.",
  duration: "17:15",
  url: "https://www.salesforce.com/plus/experience/dreamforce_2026/series/trailblazer_community_at_dreamforce_2026/episode/episode-s1e34",
  image: "https://wp.sfdcdigital.com/bxp/wp-content/uploads/sites/6/2026/09/df26-1953-Deploy-Military-Planning-Tactics-for-Salesforce-Success.png",
}
