/**
 * Copy from the "Website Redesign: Developer Handoff" (draft for review, 12 Nov 2026).
 * Four service offerings plus How We Deliver (the connective page, not a fifth
 * offering), the Industries landing page and the new homepage sections.
 */

export type Step = { title: string; text?: string }
export type Card = { title: string; text?: string; icon?: string }

export type Offering = {
  slug: string
  href: string
  /** Full service name, used in menus, cards, titles and breadcrumbs. */
  title: string
  icon: string
  image: string
  /** One-line card summary (homepage). */
  summary: string
  /** Card text on the Services overview. */
  overviewText: string
  metaDescription: string
  heroTitle: string
  heroLead: string
  overviewTitle: string
  overviewBody: string
  capabilitiesTitle: string
  capabilities: Card[]
  processTitle: string
  process: Step[]
  processText: string
  /** "When it helps", "Example workflows", etc. */
  extra?: { title: string; note?: string; items: string[] }
  /** Further short chip rows shown on the page (e.g. "What we connect"). */
  rows?: { title: string; items: string[] }[]
  why: string[]
  cta: string
  ctaHeading: string
}

const WHY_EA = ["Specialist engineering", "Industry understanding", "Reusable foundations", "Applied AI with purpose"]

export const offerings: Offering[] = [
  {
    slug: "implementation",
    href: "/services/implementation",
    title: "Implementation & Transformation",
    icon: "rocket",
    image: "/images/photos/implementation-architecture.webp",
    summary: "Modernize business workflows through architecture, engineering, integrations, testing and launch readiness.",
    overviewText: "Design and modernize complete business workflows, from discovery and architecture through delivery, testing, adoption and production readiness.",
    metaDescription: "Implementation & Transformation from Enabled Analytics: workflow discovery, architecture, Salesforce engineering, integration, quality and launch readiness.",
    heroTitle: "From business problem to production-ready solution.",
    heroLead: "Modernize the workflow. Engineer the right solution. We help organizations design and deliver dependable Salesforce-based solutions that connect people, processes, data and systems.",
    overviewTitle: "Business outcomes first. Technology choices second.",
    overviewBody:
      "Every transformation begins by understanding how work happens today, where teams encounter friction and what success should look like. From there, Enabled Analytics combines business and solution architecture with hands-on Salesforce engineering, integrations, data, quality engineering, DevOps and adoption support to take solutions from design through launch and beyond.",
    capabilitiesTitle: "What we bring",
    capabilities: [
      { title: "Workflow discovery & architecture", text: "Define needs, roles, outcomes and solution boundaries.", icon: "compass" },
      { title: "Engineering & integration", text: "Build connected Salesforce and enterprise capabilities.", icon: "cable" },
      { title: "Reusable patterns", text: "Apply appropriate frameworks and accelerators rather than starting from zero.", icon: "recycle" },
      { title: "Quality & release readiness", text: "Validate, secure, deploy and prepare teams for adoption.", icon: "shieldcheck" },
      { title: "AI-enabled by choice", text: "Use AI in delivery activities where customers approve its use and governance.", icon: "sparkles" },
    ],
    processTitle: "Delivery steps",
    process: [{ title: "Understand" }, { title: "Shape" }, { title: "Build" }, { title: "Validate" }, { title: "Launch" }, { title: "Operate & Improve" }],
    processText: "We establish the business context, shape the architecture, engineer the solution, validate it against real workflows, launch with the right controls and support continuous improvement after go-live.",
    why: ["Reusable methods", "Industry context", "AI-enabled by choice"],
    cta: "Discuss Your Transformation",
    ctaHeading: "Discuss your project",
  },
  {
    slug: "support",
    href: "/services/support",
    title: "Managed Support & Optimization",
    icon: "headset",
    image: "/images/photos/support-monitoring.webp",
    summary: "Keep platforms dependable while resolving issues, reducing technical debt and improving performance over time.",
    overviewText: "Operate reliably and improve continuously with platform support, specialist engineering, health reviews and a prioritized improvement roadmap.",
    metaDescription: "Managed Support & Optimization from Enabled Analytics: platform operations, specialist engineering, proactive optimization and governance for Salesforce.",
    heroTitle: "Operate reliably. Improve continuously.",
    heroLead: "Operate reliably. Improve continuously. Keep your Salesforce ecosystem dependable while making it easier to maintain, adapt and scale.",
    overviewTitle: "Support that protects today and improves tomorrow.",
    overviewBody:
      "Enabled Analytics provides day-to-day platform support with access to engineers who understand architecture, integrations, data, DevOps, Agentforce and related technologies. Beyond issue resolution, we help identify root causes, address technical debt, improve adoption and prioritize enhancements that advance business goals.",
    capabilitiesTitle: "What we support",
    capabilities: [
      { title: "Platform operations", text: "Respond to issues and maintain service continuity.", icon: "headset" },
      { title: "Specialist engineering", text: "Troubleshoot complex cross-platform, data and integration problems.", icon: "cable" },
      { title: "Proactive optimization", text: "Identify recurring friction, technical debt and automation opportunities.", icon: "trending" },
      { title: "Governance & visibility", text: "Use service measures, reviews and improvement backlogs to guide decisions.", icon: "chart" },
      { title: "Responsible AI support", text: "Use AI for triage, summaries or knowledge retrieval where approved by customers.", icon: "sparkles" },
    ],
    processTitle: "Support and improvement cycle",
    process: [{ title: "Transition & Baseline" }, { title: "Operate & Resolve" }, { title: "Optimize & Enhance" }, { title: "Measure & Improve" }],
    processText: "We establish support context and service expectations, maintain operations, prioritize improvements and measure progress through regular reviews.",
    extra: { title: "How progress is managed", items: ["Service measures", "Health reviews", "Improvement backlog"] },
    why: WHY_EA,
    cta: "Talk About Managed Support",
    ctaHeading: "Connect with support",
  },
  {
    slug: "forward-deployed-engineering",
    href: "/services/forward-deployed-engineering",
    title: "Forward-Deployed Engineering",
    icon: "users",
    image: "/images/photos/staff-augmentation.webp",
    summary: "Bring experienced engineers close to evolving business problems, backed by EA’s wider specialist teams.",
    overviewText: "Put experienced engineers alongside customer teams to understand complex problems, validate options and own solutions through production.",
    metaDescription: "Forward-Deployed Engineering from Enabled Analytics: experienced engineers embedded with your teams, backed by specialists in Salesforce, data, integration and AI.",
    heroTitle: "Engineering close to the problem.",
    heroLead: "Engineering close to the problem. Experienced engineers work alongside your teams to understand evolving needs, test solutions quickly and take ownership through delivery.",
    overviewTitle: "Embedded context. Backed by specialist depth.",
    overviewBody:
      "Forward-Deployed Engineering connects business teams, product owners and technical specialists around difficult or changing problems. Our engineers remain close to the operating context while drawing on Enabled Analytics specialists across Salesforce, architecture, data, integrations, AI, QA and DevOps. The goal is not to fill a seat. It is to make tangible progress on the problem.",
    capabilitiesTitle: "What this approach includes",
    capabilities: [
      { title: "Embedded context", icon: "users" },
      { title: "Rapid prototyping", icon: "zap" },
      { title: "Engineering ownership", icon: "hammer" },
      { title: "Specialist team access", icon: "layers" },
    ],
    processTitle: "How it works",
    process: [{ title: "Understand" }, { title: "Prototype" }, { title: "Validate" }, { title: "Engineer" }, { title: "Scale" }],
    processText: "Start by working with stakeholders, test useful approaches, validate against real needs, engineer production-quality solutions and transfer knowledge as teams scale.",
    extra: { title: "When it helps", items: ["Complex transformations", "Unclear AI opportunities", "New workflows or products", "Cross-system challenges", "Delivery efforts that need rapid validation and engineering ownership"] },
    why: WHY_EA,
    cta: "Explore Forward-Deployed Engineering",
    ctaHeading: "Start a discussion",
  },
  {
    slug: "agentforce",
    href: "/agentforce",
    title: "Agentforce & Applied AI",
    icon: "sparkles",
    image: "/images/photos/implementation-architecture.webp",
    summary: "Turn practical AI use cases into governed, production-ready workflows connected to enterprise data and systems.",
    overviewText: "Identify useful AI opportunities and deliver trusted, governed agents and automations within real enterprise processes.",
    metaDescription: "Agentforce & Applied AI from Enabled Analytics: trusted, governed AI agents and automations designed into real business workflows.",
    heroTitle: "Put trusted AI to work in real business workflows.",
    heroLead: "Put trusted AI to work in real business workflows. Move from AI ideas and demonstrations to secure, governed solutions designed for production.",
    overviewTitle: "Use cases grounded in the work, not technology for its own sake.",
    overviewBody:
      "We begin with a business workflow, the users involved and the outcome the organization needs. Enabled Analytics combines Agentforce, Salesforce, enterprise data, knowledge and integrations to help agents and automations take meaningful actions, with appropriate human oversight and operational controls.",
    capabilitiesTitle: "What we deliver",
    capabilities: [
      { title: "Discover & assess", text: "Select use cases based on value, feasibility, readiness and risk.", icon: "binoculars" },
      { title: "Design & integrate", text: "Connect agents with Salesforce flows, knowledge, data and enterprise systems.", icon: "cable" },
      { title: "Build & evaluate", text: "Test scenarios, edge cases and measurable outcomes.", icon: "hammer" },
      { title: "Govern & protect", text: "Design permissions, human approvals, security, exception handling and monitoring.", icon: "shieldcheck" },
      { title: "Operate & improve", text: "Observe performance, refine workflows and expand use responsibly.", icon: "trending" },
    ],
    processTitle: "Delivery steps",
    process: [{ title: "Discover" }, { title: "Assess" }, { title: "Design" }, { title: "Build" }, { title: "Validate" }, { title: "Operate" }],
    processText: "AI application depends on each customer’s policy, readiness and approval.",
    extra: {
      title: "Example workflows",
      note: "Illustrative examples, not completed client work.",
      items: ["Service case triage and knowledge-assisted resolution", "Sales and proposal preparation", "Order and service operations", "Government intake and program servicing", "Telecommunications support processes"],
    },
    rows: [
      { title: "What we connect", items: ["Salesforce workflows", "Data + knowledge", "Enterprise systems", "Human approvals"] },
      { title: "How trust is built in", items: ["Permissions", "Security", "Evaluation", "Monitoring", "Exception handling"] },
    ],
    why: WHY_EA,
    cta: "Discuss an AI Use Case",
    ctaHeading: "Discuss an AI use case",
  },
]

export const getOffering = (slug: string) => offerings.find((o) => o.slug === slug)!

export const servicesOverview = {
  heroTitle: "Engineering-led services from idea through ongoing operations.",
  heroLead:
    "We start with the workflow and the outcome, then bring the right mix of industry knowledge, Salesforce architecture, data, integration, applied AI and engineering expertise. Our teams can help design, deliver, support and continuously improve business-critical solutions.",
  coreTitle: "The right expertise for every stage.",
  crossTitle: "One approach, connected capabilities.",
  crossBody:
    "Our delivery model brings together business understanding, architecture, Salesforce engineering, data and integration, testing, DevOps, security and operational support. We reuse proven patterns where they fit and engineer what is unique to each customer.",
  crossChips: ["Industry", "Architecture", "Salesforce", "Data", "AI", "Testing", "Operations"],
}

export const howWeDeliver = {
  href: "/services/how-we-deliver",
  title: "How We Deliver",
  heroTitle: "Reuse the proven. Engineer the unique.",
  heroLead: "Reuse the proven. Engineer the unique. Our delivery model combines industry understanding, disciplined engineering and appropriate AI to turn business priorities into solutions that last.",
  overviewTitle: "One team around the business outcome.",
  overviewBody:
    "We combine the right specialists across business architecture, Salesforce, data, integration, security, QA, DevOps, AI and ongoing operations. Proven methods and accelerators provide a starting point; our engineers design and build the parts that are unique to each organization.",
  principles: [
    { title: "Start with the workflow", text: "Define outcomes and understand user needs.", icon: "route" },
    { title: "Bring the right specialists", text: "Assemble connected architecture and engineering disciplines.", icon: "users" },
    { title: "Reuse responsibly", text: "Apply proven assets while protecting customer and EA IP.", icon: "recycle" },
    { title: "Keep people accountable", text: "Use AI with customer approval and human review.", icon: "handshake" },
    { title: "Engineer for operations", text: "Include quality, security, adoption and maintainability from the start.", icon: "shieldcheck" },
  ] as Card[],
  framework: [{ title: "Understand" }, { title: "Shape" }, { title: "Build" }, { title: "Validate" }, { title: "Launch" }, { title: "Operate & Improve" }] as Step[],
  builtIn: ["Quality", "Security", "Adoption", "Maintainability", "Operational readiness"],
  cta: "Start a Conversation",
}

export type IndustryLink = { slug: string; href: string; title: string; icon: "landmark" | "radio" | "building"; text: string; link: string }

export const industryLinks: IndustryLink[] = [
  { slug: "public-sector", href: "/industries/public-sector", title: "Public Sector", icon: "landmark", text: "Modernize grants, constituent services and government workflows with secure, maintainable Salesforce solutions.", link: "Explore Public Sector" },
  { slug: "telecommunications", href: "/industries/telecommunications", title: "Telecommunications", icon: "radio", text: "Connect complex product, sales, order and service processes with Salesforce Communications Cloud and related technologies.", link: "Explore Telecommunications" },
  { slug: "commercial", href: "/industries/commercial", title: "Commercial", icon: "building", text: "Improve customer-facing and operational workflows across sales, service, data and connected business systems.", link: "Explore Commercial" },
]

export const industriesLanding = {
  heroTitle: "Industry expertise that strengthens delivery.",
  heroLead: "Every industry has its own operating realities. Enabled Analytics combines specialist engineering with practical industry knowledge to modernize workflows and support long-term operations.",
  why: [
    { title: "Real-world workflows", icon: "route" },
    { title: "Regulatory needs", icon: "shieldcheck" },
    { title: "Connected systems", icon: "cable" },
    { title: "Lasting outcomes", icon: "trending" },
  ] as Card[],
}

export const homeCopy = {
  label: "Salesforce Summit Partner | Engineering-led transformation",
  heading: "Engineering-led solutions for critical business workflows.",
  lead: "Enabled Analytics helps commercial and public sector organizations modernize, integrate, and operate essential business processes. We combine specialist engineering, industry experience, reusable accelerators, and applied AI, where it creates value, to deliver solutions built for long-term success.",
  differentiators: [
    { title: "Specialist engineering", text: "Architecture, Salesforce, data, integration, and quality engineering expertise brought together around the problem.", icon: "cpu" },
    { title: "Industry understanding", text: "Experience with the workflows, stakeholders and operating realities of Public Sector and Telecommunications organizations.", icon: "landmark" },
    { title: "Reusable foundations", text: "Proven frameworks, patterns and accelerators help teams move faster without compromising quality or exposing proprietary IP.", icon: "recycle" },
    { title: "Applied AI with purpose", text: "AI is introduced where the business case, data readiness, security and customer preference support it and is designed into real workflows.", icon: "sparkles" },
  ] as Card[],
  industriesTitle: "Experience that starts with your industry.",
  industriesLead: "Technology works best when it reflects how your organization operates. Explore our industry experience and the business workflows we help modernize.",
  servicesTitle: "From transformation to continuous improvement.",
}
