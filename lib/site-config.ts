import { practiceAreas, solutions } from "@/lib/content"

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.enabledanalytics.com").replace(/\/$/, "")

export type NavLink = { label: string; href: string; description?: string }
export type NavItem = { label: string; href?: string; children?: NavLink[] }

export const mainNav: NavItem[] = [
  {
    label: "Solutions",
    children: [
      { label: "Agentforce Implementation", href: "/agentforce", description: "AI agents grounded in your Salesforce data, from readiness to production." },
      ...solutions.map((s) => ({ label: s.title, href: `/services/${s.slug}`, description: s.summary })),
      { label: "Discover Cloud", href: "/products", description: "Prebuilt data analytics scorecards for your Salesforce code quality." },
      { label: "Free Org Health Check", href: "/health-check", description: "12 questions, an instant score and a PDF report." },
    ],
  },
  {
    label: "Practice Areas",
    children: practiceAreas.map((s) => ({ label: s.title, href: `/services/${s.slug}`, description: s.summary })),
  },
  { label: "Agentforce", href: "/agentforce" },
  { label: "Case Studies", href: "/case-studies" },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about", description: "Our mission, culture and the Four E’s of Excellence." },
      { label: "Leadership", href: "/team", description: "Co-Founders and Executive Team." },
      { label: "Careers", href: "/careers", description: "Be a part of the most dynamic Salesforce team." },
      { label: "Testimonials", href: "/testimonials", description: "What our clients say about us." },
      { label: "Industries", href: "/industries", description: "Win effortlessly in every segment." },
    ],
  },
  { label: "Insights", href: "/blog" },
]

export const footerNav: { title: string; links: NavLink[] }[] = [
  { title: "Solutions", links: [{ label: "Agentforce", href: "/agentforce" }, ...solutions.map((s) => ({ label: s.title, href: `/services/${s.slug}` })), { label: "Discover Cloud", href: "/products" }] },
  { title: "Practice Areas", links: practiceAreas.map((s) => ({ label: s.title, href: `/services/${s.slug}` })) },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/blog" },
      { label: "Org Health Check", href: "/health-check" },
      { label: "FAQ", href: "/faq" },
      { label: "Get a Quote", href: "/get-a-quote" },
      { label: "Contact", href: "/contact" },
    ],
  },
]
