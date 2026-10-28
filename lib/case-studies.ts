import { testimonials, type Testimonial } from "@/lib/content"

/**
 * Case studies in Challenge → Solution → Result form.
 *
 * Built ONLY from the client testimonials published on enabledanalytics.com:
 * the challenge and solution restate what each client described, and the result
 * is the client's own words. Clients are anonymous (industry + role) because the
 * source does not name them. `metrics` stays empty until Enabled Analytics
 * supplies approved numbers; the UI shows a clearly marked slot instead of
 * inventing figures (see MISSING_CONTENT.md).
 */
export type Metric = { value: string; label: string }

export type CaseStudy = {
  slug: string
  title: string
  industry: string
  role: string
  clouds: string[]
  challenge: string
  solution: string[]
  outcomes: string[]
  metrics: Metric[]
  testimonialId: string
}

export const caseStudies: CaseStudy[] = [
  {
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
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}

export function caseTestimonial(c: CaseStudy): Testimonial | undefined {
  return testimonials.find((t) => t.id === c.testimonialId)
}

export const caseIndustries = Array.from(new Set(caseStudies.map((c) => c.industry)))
