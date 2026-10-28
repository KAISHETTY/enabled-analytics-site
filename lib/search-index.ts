import { allTeamMembers, faqs, product, services } from "@/lib/content"
import { caseStudies } from "@/lib/case-studies"
import { agentforce } from "@/lib/agentforce"
import { postSummaries } from "@/lib/blog"

export type SearchEntry = { title: string; href: string; group: string; text: string }

/** Built on the server and passed to the client search dialog as plain data. */
export function buildSearchIndex(): SearchEntry[] {
  const pages: SearchEntry[] = [
    { title: "Home", href: "/", group: "Pages", text: "Complete Suite of Salesforce Solutions in One Place" },
    { title: "About Us", href: "/about", group: "Pages", text: "Mission, culture, Four E’s of Excellence" },
    { title: "Leadership", href: "/team", group: "Pages", text: "Co-Founders and Executive Team" },
    { title: "Services", href: "/services", group: "Pages", text: "Solutions and Salesforce practice areas, engagement models" },
    { title: "Discover Cloud", href: "/products", group: "Pages", text: product.overview.body[0] },
    { title: "Industries", href: "/industries", group: "Pages", text: "Retail, financial services, healthcare, technology, logistics" },
    { title: "Agentforce Implementation", href: "/agentforce", group: "Pages", text: agentforce.lead },
    { title: "AI Readiness Assessment", href: "/agentforce#readiness", group: "Pages", text: agentforce.readiness.lead },
    { title: "Free Org Health Check", href: "/health-check", group: "Pages", text: "Get your Salesforce Org Health Score with a PDF report" },
    { title: "Case Studies", href: "/case-studies", group: "Pages", text: "Challenge, solution and result stories" },
    { title: "Insights", href: "/blog", group: "Pages", text: "Blog posts about Salesforce" },
    { title: "Testimonials", href: "/testimonials", group: "Pages", text: "What our clients say about us" },
    { title: "FAQ", href: "/faq", group: "Pages", text: "Frequently asked questions" },
    { title: "Careers", href: "/careers", group: "Pages", text: "Open positions in Hyderabad, perks, hiring process" },
    { title: "Contact", href: "/contact", group: "Pages", text: "Email, phone, offices, contact form" },
    { title: "Get a Quote", href: "/get-a-quote", group: "Pages", text: "Request a project quote" },
  ]
  return [
    ...pages,
    ...services.map((s) => ({
      title: s.title,
      href: `/services/${s.slug}`,
      group: s.category === "solution" ? "Solutions" : "Practice Areas",
      text: [s.summary, ...(s.features?.items ?? [])].join(" "),
    })),
    ...postSummaries.map((p) => ({ title: p.title, href: `/blog/${p.slug}`, group: "Insights", text: p.excerpt })),
    ...caseStudies.map((c) => ({ title: c.title, href: `/case-studies/${c.slug}`, group: "Case Studies", text: `${c.industry} · ${c.challenge}` })),
    ...allTeamMembers.map((m) => ({ title: m.name, href: "/team", group: "People", text: m.role })),
    ...faqs.map((f) => ({ title: f.q, href: "/faq", group: "FAQ", text: f.a })),
  ]
}
