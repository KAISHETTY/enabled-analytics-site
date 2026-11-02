import { testimonials, type Testimonial } from "@/lib/content"

/**
 * Case studies in Challenge → Solution → Result form.
 *
 * Commercial studies are built ONLY from the client testimonials published on enabledanalytics.com:
 * the challenge and solution restate what each client described, and the result
 * is the client's own words. Clients are anonymous (industry + role) because the
 * source does not name them. `metrics` stays empty until Enabled Analytics
 * supplies approved numbers; the UI shows a clearly marked slot instead of
 * inventing figures (see MISSING_CONTENT.md).
 *
 * Public Sector studies come from Enabled Analytics' approved Grantmaking case
 * study PDFs (supplied 2026-10-29). Clients stay anonymous, as in the PDFs.
 */
export type Metric = { value: string; label: string }

export type Sector = "Commercial" | "Public Sector"

export type CaseStudy = {
  slug: string
  sector: Sector
  title: string
  industry: string
  role: string
  clouds: string[]
  challenge: string
  solution: string[]
  outcomes: string[]
  metrics: Metric[]
  testimonialId?: string
  /** Public Sector PDFs: executive summary, "At a Glance" rows and EA delivery services. */
  summary?: string
  glance?: { label: string; value: string }[]
  services?: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    sector: "Commercial",
    slug: "communications-sales-ecosystem",
    title: "Giving a communications sales team clear sight of pipeline and revenue",
    industry: "Communications",
    role: "IT Director",
    clouds: ["Sales Cloud", "Data Analytics"],
    challenge: "The sales team found it hard to track and act on leading and lagging indicators, revenue projection and pipeline conversion in Salesforce.",
    solution: ["Reviewed the sales ecosystem and recommended improvements", "Shaped tracking for Leads & Lags, Revenue Projection and Pipeline Conversion"],
    outcomes: ["The team is now comfortable tracking and taking action on Leads & Lags, Revenue Projection and Pipeline Conversion", "The client plans to engage EA for future expansions and enhancements"],
    metrics: [],
    testimonialId: "communications-it-director",
  },
  {
    sector: "Commercial",
    slug: "manufacturing-implementation-risk",
    title: "An on-time Salesforce delivery for a manufacturer, de-risked from day one",
    industry: "Manufacturing",
    role: "IT Director",
    clouds: ["Salesforce Implementation", "CoE Teams"],
    challenge: "A manufacturer needed a Salesforce project delivered on time, without the pitfalls that could derail it, and fitted to its unique business processes.",
    solution: ["Took time to fully comprehend the client’s business processes", "Planned in detail to surface potential pitfalls and challenges early", "Applied structured risk management throughout delivery"],
    outcomes: ["High-quality work delivered on time", "Expectations exceeded “in every way possible”", "A lasting impact on the company"],
    metrics: [],
    testimonialId: "manufacturing-it-director",
  },
  {
    sector: "Commercial",
    slug: "manufacturing-user-adoption",
    title: "Making every user confident in Salesforce at a manufacturer",
    industry: "Manufacturing",
    role: "CEO",
    clouds: ["Salesforce Implementation", "Adoption Services"],
    challenge: "A manufacturer’s implementation needed every user to understand and use each Salesforce feature, not just a working system.",
    solution: ["Ran detailed discovery sessions, explaining each concept along the way", "Kept every session interactive and productive", "Provided prompt, ongoing customer service after go-live"],
    outcomes: ["Every user understands each Salesforce feature", "Service delivery “more than expected”, and a long-running relationship"],
    metrics: [],
    testimonialId: "manufacturing-ceo",
  },
  {
    sector: "Commercial",
    slug: "professional-services-operations",
    title: "Streamlining operations and lifting customer satisfaction for a professional services firm",
    industry: "Professional Services",
    role: "CTO",
    clouds: ["Salesforce Implementation"],
    challenge: "A professional services firm needed a Salesforce project completed successfully, with operations streamlined and customer satisfaction improved.",
    solution: ["Delivered the project in conjunction with Salesforce", "Put the platform’s versatile features and user-friendly interface to work", "Supported the team throughout"],
    outcomes: ["Operations streamlined", "Performance and customer satisfaction levels elevated"],
    metrics: [],
    testimonialId: "professional-services-cto",
  },
  {
    sector: "Commercial",
    slug: "professional-services-ahead-of-schedule",
    title: "Delivering on time (and some tasks early) for a professional services team",
    industry: "Professional Services",
    role: "Customer Success Director",
    clouds: ["Salesforce Implementation"],
    challenge: "A professional services team needed its Salesforce project completed to schedule.",
    solution: ["Deployed a knowledgeable Salesforce team", "Managed delivery tightly against the timeline"],
    outcomes: ["Project completed on time", "Some tasks finished earlier than expected"],
    metrics: [],
    testimonialId: "professional-services-cs-director",
  },
  {
    sector: "Commercial",
    slug: "consumer-goods-consistent-delivery",
    title: "A consistent delivery partner for a consumer goods sales organisation",
    industry: "Consumer Goods",
    role: "Sales Director",
    clouds: ["Sales Cloud"],
    challenge: "A consumer goods sales organisation needed a partner with deep platform experience to deliver reliably, project after project.",
    solution: ["Brought extensive Salesforce platform experience", "Worked as a long-term delivery partner"],
    outcomes: ["Successful and consistent delivery", "Described as a “solid partner”"],
    metrics: [],
    testimonialId: "consumer-goods-sales-director",
  },
  {
    sector: "Public Sector",
    slug: "state-developmental-disabilities-council-grants",
    title: "Enterprise grants management for a large state developmental disabilities council",
    industry: "State Government",
    role: "Large State Developmental Disabilities Council",
    clouds: ["Grantmaking", "Agentforce Public Sector", "Experience Cloud"],
    summary: "Enabled Analytics partnered with a state developmental disabilities council to design a Salesforce enterprise grants management solution that unified the agency's end-to-end grant lifecycle into a single platform.",
    glance: [
      { label: "Industry", value: "Public Sector / State Government" },
      { label: "Grant lifecycle", value: "RFA Planning through Closeout" },
      { label: "Business outcome", value: "End-to-end enterprise grants management with improved automation, visibility, governance, and user experience" },
    ],
    challenge: "Grant administration relied on numerous disconnected systems including Qualtrics, financial applications, shared drives, email, spreadsheets, and specialized tools. Staff frequently moved between systems to complete a single grant, creating duplicate effort, fragmented information, and limited enterprise visibility.",
    solution: [
      "Unified the complete grant lifecycle into Salesforce as a single system of record",
      "Standardized workflows, approvals, notifications, and monitoring",
      "Applicant self-service portal",
      "Automated grant monitoring tasks and milestone tracking",
      "Integrated contacts, peer review, communications, and reporting",
      "Designed to integrate financial processes while reducing disconnected tools",
    ],
    outcomes: [
      "Single source of truth across the grants lifecycle",
      "Reduced manual effort through workflow automation",
      "Improved leadership visibility",
      "Enhanced collaboration across all stakeholders",
      "Improved governance and compliance",
      "Scalable platform for future grant programs",
    ],
    services: ["Business process discovery", "Enterprise architecture", "Salesforce solution design & implementation", "Workflow automation", "Data migration", "Training and knowledge transfer"],
    metrics: [],
  },
  {
    sector: "Public Sector",
    slug: "state-emergency-communications-modernization",
    title: "Modernizing grants, vendor, and request management for a state emergency communications agency",
    industry: "Emergency Communications",
    role: "A large state emergency communications agency",
    clouds: ["Grantmaking", "Agentforce Public Sector", "Sales Cloud"],
    summary: "Enabled Analytics partnered with a state emergency communications agency to modernize a legacy Salesforce implementation supporting grants, vendor, and request management, transforming a highly custom coded environment into a scalable configurable enterprise platform.",
    glance: [
      { label: "Industry", value: "Public Sector / Emergency Communications" },
      { label: "Business focus", value: "Grants administration, vendor management, and request management" },
      { label: "Business outcome", value: "Modernized grants, vendor, and request management through a scalable Salesforce platform that improved governance, maintainability, and operational efficiency" },
    ],
    challenge: "The existing Salesforce platform had gradually become a technical representation of legacy manual processes rather than an enterprise grants management platform. Extensive customization increased technical debt, reduced maintainability, and limited the organization's ability to evolve grant administration efficiently.",
    solution: [
      "Redesigned the Salesforce data model to better reflect grants, vendors, and operational processes",
      "Standardized grants management workflows using native Salesforce capabilities",
      "Replaced code-heavy custom pages with declarative Salesforce functionality where appropriate",
      "Leveraged Flows, lookup relationships, custom actions, and lightweight components to simplify administration",
      "Conducted iterative sprint reviews to validate business alignment throughout implementation",
    ],
    outcomes: [
      "Improved alignment between Salesforce and grant administration processes",
      "Reduced technical debt and long-term maintenance effort",
      "A more scalable platform for future grant programs and operational enhancements",
      "Improved governance through a cleaner, more sustainable enterprise architecture",
      "Positioned to expand grants and vendor management capabilities using standard Salesforce functionality",
    ],
    services: ["Business process assessment", "Solution architecture and redesign", "Salesforce configuration and optimization", "Data model redesign", "Sprint-based delivery and stakeholder collaboration", "Knowledge transfer"],
    metrics: [],
  },
  {
    sector: "Public Sector",
    slug: "state-land-natural-resources-grants",
    title: "A unified grants management platform for a large state land and natural resources agency",
    industry: "State Government",
    role: "A Large State Land and Natural Resources Agency",
    clouds: ["Grantmaking", "Agentforce Public Sector", "Sales Cloud"],
    summary: "Enabled Analytics worked with an implementation partner to modernize grants administration for a large state land and natural resources agency, unifying grant and project management across multiple funding programs into a single enterprise platform.",
    glance: [
      { label: "Industry", value: "Public Sector / State Government" },
      { label: "Grant programs", value: "Environmental stewardship and natural resource protection" },
      { label: "Key integrations", value: "Agency financial data mart, SurveyMonkey" },
      { label: "Business outcome", value: "Unified enterprise grants management platform" },
    ],
    challenge: "Grants administration relied on a combination of legacy applications, independent databases, and manual spreadsheet-driven processes. These disconnected systems limited visibility, increased administrative effort, and made it difficult to manage grant programs consistently across the agency.",
    solution: [
      "Consolidated grant and project management into Salesforce",
      "Standardized grant lifecycle processes across multiple programs",
      "Provided a single system of record for grants administration",
      "Integrated the agency financial data mart to improve financial visibility and accountability",
      "Integrated SurveyMonkey Apply to synchronize funded grant application data",
    ],
    outcomes: [
      "A single source of truth for grants and project management",
      "Reduced dependence on manual administration",
      "Improved transparency throughout the grant lifecycle",
      "Strengthened financial oversight through integrated grant and financial information",
      "Enhanced governance, audit preparedness, and records retention",
      "A scalable Salesforce platform capable of supporting future program growth",
    ],
    services: ["Business process validation", "Solution architecture and functional design", "Salesforce configuration and implementation", "User Acceptance Testing (UAT)", "Role-based training and change management", "Knowledge transfer and post-production support"],
    metrics: [],
  },
  {
    sector: "Public Sector",
    slug: "texas-school-district-grants-donations",
    title: "Centralizing grants and donations for a large urban school district in Texas",
    industry: "Education",
    role: "A large urban Texas school district serving over 60,000 students",
    clouds: ["Grantmaking", "Agentforce Public Sector"],
    summary: "Enabled Analytics partnered with a large urban school district in Texas to modernize how grants and private donations were requested, reviewed, approved, and managed, centralizing them into a single enterprise platform.",
    glance: [
      { label: "Industry", value: "Public Sector / Education" },
      { label: "Client", value: "A large urban Texas school district serving over 60,000 students across over 100 campuses" },
      { label: "Business focus", value: "Grants, donations, approvals, and funding management" },
      { label: "Business outcomes", value: "Centralized funding management with improved visibility, governance, and operational efficiency" },
    ],
    challenge: "Grants and donations were managed through decentralized business processes that varied across campuses and departments. Information was maintained in spreadsheets, email, and manual workflows, making it difficult to manage funding consistently and give district leadership a comprehensive view of available resources.",
    solution: [
      "Centralized grants and donations management within Salesforce",
      "Standardized submission, review, and approval workflows",
      "Provided a single source of truth for funding, programs, and approvals",
    ],
    outcomes: [
      "A centralized system for grants and donations management",
      "Improved visibility into funding sources, approvals, and allocations",
      "Reduced reliance on manual tracking and spreadsheets",
      "Streamlined approval workflows across campuses and departments",
      "Improved governance, compliance, and reporting",
      "A scalable platform supporting future grant and donor initiatives",
    ],
    services: ["Business process discovery and validation", "Solution architecture and functional design", "Salesforce configuration and implementation", "Workflow automation", "User training and organizational adoption", "Production deployment and knowledge transfer"],
    metrics: [],
  },
  {
    // From the "Digital Transformation in the Public Sector" success story in the Salesforce Overview v1.0 deck (2026-11-02). JTC is named in that deck.
    sector: "Public Sector",
    slug: "jtc-public-sector-digital-transformation",
    title: "Digital transformation and data-driven decisions for JTC",
    industry: "Government Agency",
    role: "JTC, with KPMG",
    clouds: ["Sales Cloud", "Service Cloud", "CRM Analytics", "Managed Services"],
    summary:
      "For nearly 60 years JTC has looked after industrialists, working with them to build vibrant, innovative developments where they can grow and thrive. With KPMG, Enabled Analytics helped JTC modernize its digital infrastructure on Salesforce and drove actionable insights from legacy applications, uncovering hidden value.",
    glance: [
      { label: "Client", value: "JTC" },
      { label: "Partners", value: "KPMG and Enabled Analytics" },
      { label: "Platform", value: "Salesforce CRM, CRM Analytics and Managed Services" },
      { label: "Legacy data", value: "Microsoft Dynamics data spanning more than ten years" },
    ],
    challenge:
      "A legacy platform with over 15 years of accumulated data no longer met current digital standards. Digital-first scenarios were poorly supported, analytics and reporting were limited, standard tasks such as case routing were manual, and a heavily customized Salesforce footprint made change slow.",
    solution: [
      "Unified lead management for commercial, residential, web, email and manual inquiries, with spam filtering",
      "Omnichannel case routing across all sources with a knowledge base for faster resolution",
      "CRM Analytics dashboards for business health, asset status and internal KPIs, including cases, allocated land, leads and arrears",
      "A future-proof Product Master model in Salesforce with MAPLE Sync integration",
      "A data structure for CRM Analytics with external data integrated through Bulk API and Data Loader",
      "Migration design and impact analysis for 10+ years of Microsoft Dynamics data, with cleansing, transformation and exclusion criteria",
    ],
    outcomes: [
      "A comprehensive, near real-time view of the business",
      "Consistent case routing and faster case resolution",
      "Processes analyzed, optimized and standardized through the Review-Reduce-Reuse model",
      "Actionable insights from legacy data that uncovered hidden value",
    ],
    services: ["Lead management", "Omnichannel case routing", "CRM Analytics", "Product modelling", "Data & integration", "Data migration", "Managed services"],
    metrics: [],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}

export function caseTestimonial(c: CaseStudy): Testimonial | undefined {
  return c.testimonialId ? testimonials.find((t) => t.id === c.testimonialId) : undefined
}

export const sectors: Sector[] = ["Commercial", "Public Sector"]
export const caseStudiesBySector = (sector: Sector) => caseStudies.filter((c) => c.sector === sector)

export const caseIndustries = Array.from(new Set(caseStudies.map((c) => c.industry)))
