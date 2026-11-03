import { coreServices } from "@/lib/content"

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.enabledanalytics.com").replace(/\/$/, "")

export type NavLink = { label: string; href: string; description?: string }
/** The waving-longhorn card beside each menu's links. */
export type NavFeature = { kicker: string; title: string; cta: string; href: string }
export type NavItem = { label: string; href?: string; children?: NavLink[]; feature?: NavFeature }

/** Top navigation per the 2026-11-02 homepage/menu feedback: Services | Who We Serve | Client Success | Apps & Accelerators | About. "Contact Us" is the header's primary button. */
export const mainNav: NavItem[] = [
  {
    label: "Services",
    children: [
      ...coreServices.map((s) => ({ label: s.title, href: `/services/${s.slug}`, description: s.summary })),
      { label: "Salesforce Clouds & Data", href: "/expertise", description: "Every Salesforce Cloud, Data 360 and analytics." },
      { label: "Agentforce & AI", href: "/agentforce", description: "AI agents grounded in your Salesforce data." },
      { label: "How we deliver", href: "/services#how-we-deliver", description: "Our methodology, process and Shape Cycle." },
    ],
    feature: { kicker: "Howdy, partner", title: "Let’s get Salesforce right the first time", cta: "Contact Us", href: "/contact" },
  },
  {
    label: "Who We Serve",
    children: [
      { label: "Public Sector", href: "/solutions/public-sector", description: "Grantmaking and Agentforce Public Sector for government and education." },
      { label: "Commercial", href: "/solutions/commercial", description: "Manufacturing, retail, services and financial services." },
    ],
    feature: { kicker: "Who we serve", title: "Two sectors, one standard of delivery", cta: "See Public Sector", href: "/solutions/public-sector" },
  },
  {
    label: "Client Success",
    children: [
      { label: "Clients", href: "/clients", description: "Organizations that trust Enabled Analytics." },
      { label: "Case Studies", href: "/case-studies", description: "Challenge → Solution → Result stories." },
      { label: "Client Testimonials", href: "/testimonials", description: "What our clients say about us." },
    ],
    feature: { kicker: "Client success", title: "Ready to be our next success story?", cta: "Contact Us", href: "/contact" },
  },
  {
    label: "Apps & Accelerators",
    children: [
      { label: "Discover Cloud", href: "/products", description: "Our AppExchange product: prebuilt code-quality scorecards." },
    ],
    feature: { kicker: "ISV partner", title: "Discover Cloud on AppExchange", cta: "Explore Discover Cloud", href: "/products" },
  },
  {
    label: "About",
    children: [
      { label: "Company", href: "/about", description: "Our story, history and locations." },
      { label: "Leadership", href: "/team", description: "Co-Founders and Executive Team." },
      { label: "Careers", href: "/careers", description: "No open roles at the moment." },
    ],
    feature: { kicker: "Leadership", title: "Meet the team behind Enabled Analytics", cta: "Meet our leadership", href: "/team" },
  },
]
