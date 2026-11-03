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
    { title: "Services", href: "/services", group: "Pages", text: "Implementation, Support and Staff Augmentation, how we deliver, engagement models" },
    { title: "Public Sector", href: "/solutions/public-sector", group: "Pages", text: "Grantmaking and Agentforce Public Sector for state agencies, councils and school districts" },
    { title: "Commercial", href: "/solutions/commercial", group: "Pages", text: "Manufacturing, retail, services, financial and insurance services, healthcare, technology, logistics" },
    { title: "Telecom", href: "/solutions/telecom", group: "Pages", text: "Salesforce for telecom and communications providers" },
    { title: "Manufacturing", href: "/solutions/manufacturing", group: "Pages", text: "Salesforce for manufacturers, ERP integration, pricing and quoting" },
    { title: "Clients", href: "/clients", group: "Pages", text: "Public Sector, Telecom and Commercial clients" },
    { title: "Salesforce Clouds & Data", href: "/expertise", group: "Pages", text: "Every Salesforce cloud, Data 360, CoE advisory, Discover Cloud" },
    { title: "Discover Cloud", href: "/products", group: "Pages", text: product.overview.body[0] },
    { title: "Agentforce Implementation", href: "/agentforce", group: "Pages", text: agentforce.lead },
    { title: "AI Readiness Assessment", href: "/agentforce#readiness", group: "Pages", text: agentforce.readiness.lead },
    { title: "Case Studies", href: "/case-studies", group: "Pages", text: "Public Sector, Telecom and Commercial case studies" },
    { title: "Testimonials", href: "/testimonials", group: "Pages", text: "What our clients say about us" },
    { title: "FAQ", href: "/faq", group: "Pages", text: "Frequently asked questions" },
    { title: "Careers", href: "/careers", group: "Pages", text: "No open roles at the moment" },
    { title: "Contact", href: "/contact", group: "Pages", text: "Email, phone, offices, contact form" },
  ]
  return [
    ...pages,
    ...services.map((s) => ({
      title: s.title,
      href: `/services/${s.slug}`,
      group: "Services",
      text: [s.summary, ...(s.features?.items ?? [])].join(" "),
    })),
    ...postSummaries.map((p) => ({ title: p.title, href: `/blog/${p.slug}`, group: "Insights", text: p.excerpt })),
    ...caseStudies.map((c) => ({ title: c.title, href: `/case-studies/${c.slug}`, group: "Case Studies", text: `${c.sector} · ${c.industry} · ${c.challenge}` })),
    ...allTeamMembers.map((m) => ({ title: m.name, href: "/team", group: "People", text: m.role })),
    ...faqs.map((f) => ({ title: f.q, href: "/faq", group: "FAQ", text: f.a })),
  ]
}
