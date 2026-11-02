/**
 * Content from "Enabled Analytics Salesforce Overview v1.0" (company deck,
 * supplied by Enabled Analytics 2026-11-02). Wording follows the deck; obvious
 * typos are fixed ("Gaurdrails", "Priortised", "Iniital"). Project and client
 * totals stay off the homepage per the 2026-10-30 feedback.
 */

export const overview = {
  positioning:
    "Enabled Analytics is a leading Salesforce Summit Consulting Partner and ISV partner, recognized for providing outstanding Salesforce-exclusive solutions throughout the USA, Singapore, Australia and India.",
  focus: "We are solely focused on the Salesforce platform and equipped with industry and technical specialists, offering both vertical and horizontal solutions that are augmented by our accelerators, frameworks and methodologies.",
  regions: ["USA", "Singapore", "Australia", "India"],
  stats: [
    { value: 4.96, decimals: 2, suffix: "", label: "Average CSAT" },
    { value: 120, suffix: "+", label: "Salesforce Certified Professionals" },
    { value: 500, suffix: "+", label: "Salesforce Certifications" },
  ],
}

/** "Cloud Expertise" slide, grouped for scanning. */
export const cloudGroups: { title: string; clouds: string[] }[] = [
  { title: "Core clouds", clouds: ["Sales Cloud", "Service Cloud", "Marketing Cloud", "Experience Cloud", "Field Service", "Platform"] },
  { title: "Revenue & commerce", clouds: ["Revenue Cloud", "Salesforce Billing", "Contract Lifecycle Management (CLM)", "B2B Commerce", "B2C Commerce", "Commerce / Order Management (OMS)"] },
  { title: "Industry clouds", clouds: ["Industry Clouds", "Public Sector Solutions", "Communications Cloud", "Manufacturing Cloud", "Financial Services Cloud", "Nonprofit Cloud", "Education Cloud"] },
  { title: "Data, AI & integration", clouds: ["Agentforce", "Data Cloud", "CRM Analytics (CRMA)", "MuleSoft", "Apps"] },
]

export type Industry = { slug: string; title: string; icon: string; points: string[] }

/** "Salesforce Solutions and Industry Expertise" slide. */
export const industryExpertise: Industry[] = [
  {
    slug: "telecom",
    title: "Telecom",
    icon: "radio",
    points: ["Customer 360", "Reduced time to market", "Smart pricing strategy", "Enhanced quotation lifecycle management", "IT autonomy for product modifications"],
  },
  {
    slug: "public-sector",
    title: "Public Sector",
    icon: "landmark",
    points: ["Self-service portals", "Grants management", "Workforce and volunteer management", "Online applications and case management", "Risk assessment and automation", "Workflow improvements and efficiencies"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    icon: "factory",
    points: ["Rapidly and precisely set up intricate products", "Reduce errors in ordering and manufacturing", "Seamless ERP integration", "Audit quotes effectively", "Perform margin calculations and generate reports", "Automate pricing processes"],
  },
  {
    slug: "retail",
    title: "Retail",
    icon: "shopping",
    points: ["Retail customer engagement and loyalty", "Consumer shopper engagement", "Omni-channel sales acceleration", "Flexible guided selling", "Immersive in-store experience", "AI and automation", "Analytics and insights", "Marketing automation"],
  },
  {
    slug: "services",
    title: "Services",
    icon: "briefcase",
    points: ["Enhanced quote precision", "Minimize discrepancies in quote and project data", "Tailored outreach and marketing insights", "Transformation of contact centre operations", "Optimize quote amendments", "Standardize sales procedures", "Directed project oversight"],
  },
  {
    slug: "financial-services",
    title: "Financial & Insurance Services",
    icon: "landmark",
    points: ["Digital portals for brokers, carriers, wealth and asset platforms", "Enhance data accuracy", "Boost business intelligence", "Speed up application closing processes", "Manage pricing and discounts", "Decrease data entry redundancies and mistakes", "Leverage AI and automation", "Provide analytics and insights"],
  },
]

export const getIndustry = (slug: string) => industryExpertise.find((i) => i.slug === slug)!

/** "Our Comprehensive Services" slide: five practice pillars. */
export const servicePillars: { title: string; icon: string; items: string[] }[] = [
  { title: "Architecture Guardrails", icon: "shield", items: ["Business architecture", "Solution architecture", "Technology architecture", "Data & API integration", "Application design", "Data architecture", "Security architecture", "Governance"] },
  { title: "Consulting & Application Services", icon: "compass", items: ["Vision and strategy", "Strategic roadmap", "Business capability mapping", "Process transformation", "Implementations", "Change management", "Support services", "CoE", "Org assessments"] },
  { title: "DevOps", icon: "git", items: ["Salesforce CI/CD", "Release management", "Native DevOps", "Test strategy and automation", "Monitoring & security", "Automation", "DevOps integration"] },
  { title: "Quality Engineering", icon: "shieldcheck", items: ["Functional testing", "Integration testing", "Performance testing", "SIT, E2E & UAT", "Automation", "KPIs & SLA management", "Traceability management"] },
  { title: "Managed Services", icon: "headset", items: ["Dedicated support", "Expert services", "Shared support", "Catalog-driven support"] },
]

/** "Key Success Factors Derived from Our Learnings" slide. */
export const successFactors: { title: string; items: { title: string; text: string }[] }[] = [
  {
    title: "Alignment with strategy",
    items: [
      { title: "Align stakeholders", text: "Use insights from cross-functional stakeholders to reach consensus on the key capabilities and use cases that matter most to customers and the business." },
      { title: "Emphasize experience", text: "Prioritize customer experiences that improve engagement, acquisition, retention and overall lifetime value." },
    ],
  },
  {
    title: "Guardrails",
    items: [
      { title: "Improve technology stack functionality", text: "Use the right mix of technology platforms to discover new use cases." },
      { title: "Minimize technical debt", text: "Align the right Salesforce and non-Salesforce products to achieve the highest value with the least cost and effort." },
    ],
  },
  {
    title: "Pragmatic plan",
    items: [
      { title: "Enhance time to value", text: "Outline a practical strategy for advancing Salesforce and other technologies by empowering the people, processes and technology involved." },
      { title: "Solutions for long-term viability", text: "A strategic framework for scalable, sustainable experiences, with the adaptability to reduce future risk." },
    ],
  },
]

/** "Technology Orchestrator" slide. */
export const orchestrator = {
  title: "Technology orchestrator",
  lead: "We seamlessly unite, integrate and optimize tools and systems to deliver transformative results. With a proven end-to-end methodology, every step of your journey is guided by precision and expertise.",
  items: [
    { title: "Curated competency", text: "We act as technology orchestrators, uniting, integrating and optimizing tools and systems from the client.", icon: "award" },
    { title: "Methodology", text: "Our proven end-to-end approach and operating model.", icon: "refresh" },
    { title: "Industry experts", text: "We speak the customer’s language, approaching conversations with specificity, relevance and awareness.", icon: "hammer" },
    { title: "Mature global delivery", text: "A resilient delivery center with the right mindset and culture.", icon: "truck" },
    { title: "Continuous enablement", text: "Talent acquisition, retention and building.", icon: "binoculars" },
    { title: "Tech-savvy relationships", text: "We build relationships through trusted and valued interactions.", icon: "brickwall" },
  ],
}

/** "Key Differentiators" slide. The deck repeats the "Trusted partner" bullets under two other columns, so those show as titles only. */
export const differentiators = [
  { title: "Understand your business", points: ["Industry", "Customers", "Processes", "Culture"] },
  { title: "Trusted partner", points: ["Customer experience", "Strategic innovation", "Automation & efficiency", "Organizational maturity"] },
  { title: "Apply the best practices", points: [] },
  { title: "Services for the long term", points: [] },
  { title: "Mature global delivery model", points: ["High degree of focus & flexibility", "Tech-savvy leadership"] },
  { title: "The right business outcomes", points: ["Exceptional customer satisfaction", "Accelerated productivity", "Streamlined capabilities"] },
]

/** "Key Offerings" slide. */
export const keyOfferings = [
  "Innovation in core platforms and digital transformation",
  "Tailored experiences with industry-specific solutions",
  "Strategy for data and analytics",
  "Growth and change with our flagship assets",
  "AI Thinkubator",
  "Adopt new technologies with adaptable models",
  "Nearshore / rightshore delivery models",
  "Flourishing teams through our CoE groups",
]

/** "Implementation Methodology" slide. */
export const implementationMethodology = {
  lead: "A collaborative approach that prioritizes business value while meeting your need for agility and flexibility.",
  phases: [
    {
      n: "1",
      title: "Pre-Game",
      focus: "Analysis and design",
      sprints: "Sprint 0 … Sprint 0.N",
      sprintChips: ["Sprint 0", "…", "Sprint 0.N"],
      activities: ["Design product backlog", "Define architecture", "Detail business processes", "Design integration", "Design data migration", "Design reports", "Sprint plans and estimations", "Set up tools and environment"],
      tools: ["Conference Room Pilots (CRP)", "Integration Playbook", "Data Migration Playbook"],
      milestone: "Prioritized product backlog",
    },
    {
      n: "2",
      title: "Development",
      focus: "Configure and customize",
      sprints: "Sprint 1 … Sprint N + hardening sprint",
      sprintChips: ["Sprint 1", "Sprint 2", "…", "Sprint N", "Hardening sprint"],
      activities: ["Configure and customize processes", "Build interfaces and integrations", "Functional and integration testing", "Clean, de-dup and migrate data", "Create reports and dashboards", "End-to-end testing", "Deploy package", "Create training guides"],
      tools: ["Salesforce Starter Kit"],
      milestone: "Ready for QA",
    },
    {
      n: "3",
      title: "Closure",
      focus: "Validate and deploy",
      sprints: "Final acceptance & release",
      sprintChips: [],
      activities: ["Final user acceptance", "User training", "Production release", "Operational handover"],
      tools: [],
      milestone: "Operational release",
    },
  ],
  cadence: ["Sprint demos", "Sprint planning", "Retrospectives", "User feedback", "Interim user acceptance", "Product backlog grooming"],
  /** The sprint loop under Development: feedback on the left of the loop, ceremonies on the right. */
  loop: { feedback: ["User feedback", "Interim user acceptance", "Groom product backlog"], ceremonies: ["Sprint demos", "Sprint planning", "Retrospectives"] },
  /** Gates along the bottom axis, left to right. */
  milestones: ["Initial product vision", "Prioritized product backlog", "Ready for QA", "Ready for acceptance", "Operational release"],
  after: "Rollout & application management",
  roles: ["Product Owner", "Scrum Master", "Process Owners", "IT Owners", "Architects", "Salesforce Developers", "Testers"],
}

/** "Managed Services" slide: seven-week transition into support ownership. */
export const managedServices = {
  lead: "Support models designed to adapt to dynamic business demands, with scalability, operational efficiency and continuous evolution.",
  benefits: [
    { title: "Flexibility in demand", text: "Part-time or FTE demand, with easy scaling up or down." },
    { title: "Standardization", text: "Standardized tools, processes and frameworks." },
    { title: "Innovation", text: "Continuous learning and best practices that keep pace with Salesforce product evolution." },
    { title: "Governance", text: "A quicker response to the changing needs of the business and technology." },
  ],
  phases: [
    { title: "Knowledge transition", weeks: "W1–W2" },
    { title: "Shadow / reverse-shadow support", weeks: "W3–W6" },
    { title: "Support ownership", weeks: "W7" },
  ],
  milestones: [
    { week: "W1", title: "Engagement kick-off and staffing" },
    { week: "W2", title: "Knowledge transfer initiation" },
    { week: "W3", title: "KT closure and shadow support initiation" },
    { week: "W5", title: "Reverse-shadow support initiation" },
    { week: "W7", title: "Stabilization and support ownership" },
  ],
  /** Swimlanes on the slide; weeks are 1-based and inclusive. */
  lanes: [
    { label: "Transition governance", bars: [{ from: 1, to: 5, text: "Kick-off meetings, weekly status reports, track plan, risk and issue management" }] },
    { label: "Engagement management set-up", bars: [{ from: 2, to: 3, text: "Delivery and service models" }] },
    { label: "Staffing", bars: [{ from: 1, to: 3, text: "Onboard resources" }] },
    {
      label: "Knowledge transfer & documentation",
      bars: [
        { from: 1, to: 2, text: "KT plan · process and approach · alignments · environment management · planning · monitoring · source control · issue tracking · deployment" },
        { from: 3, to: 6, text: "Understand incidents and enhancement requests · help the support team resolve issues · resolve issues with support from the existing team" },
      ],
    },
    { label: "Process & approach", bars: [{ from: 1, to: 5, text: "Define process, review SLAs, establish reporting and escalation" }] },
    { label: "Technology & infra", bars: [{ from: 1, to: 2, text: "Connectivity and application & tools access" }] },
    { label: "Contracts", bars: [{ from: 1, to: 1, text: "SOW signed" }] },
  ],
  kt: ["KT plan", "Process and approach", "Alignments", "Environment management", "Planning", "Monitoring", "Source control", "Issue tracking", "Deployment"],
  models: ["Dedicated support", "Expert services", "Shared support", "Catalog-driven support"],
}

/** "Our Thinkubator Models" slide (data and AI). */
export const thinkubator = {
  lead: "With a focus on measurable value and enterprise-wide adoption, our Thinkubator models unlock new possibilities and sustained growth.",
  steps: [
    { title: "Think big", text: "Define the vision, mission, roadmap and business case. Understand the systems of engagement and data sources, and build a use-case roadmap from the value proposition." },
    { title: "MVP (start small)", text: "Prioritize which business lines to start with and finalize the first use cases." },
    { title: "Design for industrialization", text: "Adopt EA’s industrialized data models, data ingestion framework, data catalogue, business glossary and rules, data quality and profiling, and reference and master data management." },
    { title: "Run and monitor", text: "Define the operating model to sustain and enhance, with value measurement and adoption strategies." },
    { title: "Scale", text: "Execute the roadmap to roll out use cases across the enterprise and stand up a Data Cloud Center of Excellence." },
  ],
}

export type Accelerator = { id: string; title: string; kind: string; icon: string; text: string; points: string[] }

/** Accelerators named in the deck's methodology, Thinkubator and success stories. */
export const accelerators: Accelerator[] = [
  {
    id: "starter-kit",
    title: "Salesforce Starter Kit",
    kind: "Implementation accelerator",
    icon: "rocket",
    text: "Prebuilt configuration and patterns our teams use to configure and customize Salesforce from a solid foundation instead of from scratch.",
    points: ["Used through every development sprint", "Integration frameworks and pre-built data models", "Deploy at up to 3X speed"],
  },
  {
    id: "crp",
    title: "Conference Room Pilots",
    kind: "Design accelerator",
    icon: "presentation",
    text: "Hands-on pilots in the Pre-Game phase so stakeholders see and shape the solution before it is built.",
    points: ["Validate business processes early", "Shape the prioritized product backlog", "Align stakeholders on use cases"],
  },
  {
    id: "integration-playbook",
    title: "Integration Playbook",
    kind: "Integration accelerator",
    icon: "cable",
    text: "Our proven patterns for designing and building interfaces between Salesforce and your ERP, data and line-of-business systems.",
    points: ["Integration design in Pre-Game", "Bulk API and MuleSoft patterns", "Seamless ERP integration"],
  },
  {
    id: "data-migration-playbook",
    title: "Data Migration Playbook",
    kind: "Data accelerator",
    icon: "database",
    text: "Templates and utilities to clean, de-duplicate, transform and migrate legacy data safely, including exclusion criteria and impact analysis.",
    points: ["Data migration templates and Apex utilities", "Cleansing and transformation strategies", "Proven on 10+ years of legacy data"],
  },
  {
    id: "data-cloud-framework",
    title: "Industrialized Data Cloud Framework",
    kind: "Data & AI accelerator",
    icon: "layers",
    text: "EA’s industrialized data models, ingestion framework, catalogue, business glossary and data-quality rules to jump-start Data Cloud and AI.",
    points: ["Data ingestion framework", "Data catalogue and business glossary", "Reference & master data management"],
  },
  {
    id: "review-reduce-reuse",
    title: "Review-Reduce-Reuse Model",
    kind: "Optimization accelerator",
    icon: "recycle",
    text: "A structured model to analyze, optimize and standardize heavily customized Salesforce orgs.",
    points: ["Analyze existing processes", "Reduce customization and technical debt", "Standardize and reuse"],
  },
]
