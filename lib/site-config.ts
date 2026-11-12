import { howWeDeliver, industryLinks, offerings } from "@/lib/offerings"

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.enabledanalytics.com").replace(/\/$/, "")

export type NavLink = { label: string; href: string; description?: string }
/** The waving-longhorn card beside each menu's links. */
export type NavFeature = { kicker: string; title: string; cta?: string; href?: string }
export type NavItem = { label: string; href?: string; children?: NavLink[]; feature?: NavFeature }

/** Top navigation per the 12 Nov 2026 handoff: Services | Industries | Apps & Accelerators | Client Success | About. "Contact Us" is the header's primary button. */
export const mainNav: NavItem[] = [
  {
    label: "Services",
    children: [
      ...offerings.map((o) => ({ label: o.title, href: o.href, description: o.summary })),
      { label: howWeDeliver.title, href: howWeDeliver.href, description: "One delivery model across every service." },
    ],
    feature: { kicker: "Services", title: "Engineering-led services from idea through ongoing operations", cta: "All services", href: "/services" },
  },
  {
    label: "Industries",
    children: [
      ...industryLinks.map((l) => ({ label: l.title, href: l.href, description: l.text })),
    ],
    feature: { kicker: "Industries", title: "Industry expertise that strengthens delivery", cta: "Explore Our Industries", href: "/industries" },
  },
  {
    label: "Apps & Accelerators",
    children: [
      { label: "Discover Cloud", href: "/products", description: "Our AppExchange product: prebuilt code-quality scorecards." },
    ],
    feature: { kicker: "ISV partner", title: "Discover Cloud on AppExchange", cta: "Explore Discover Cloud", href: "/products" },
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
    label: "About",
    children: [
      { label: "Company", href: "/about", description: "Our story, history and locations." },
      { label: "Leadership", href: "/team", description: "Co-Founders and Executive Team." },
      { label: "Careers", href: "/careers", description: "No open roles at the moment." },
    ],
    feature: { kicker: "Leadership", title: "Meet the team behind Enabled Analytics", cta: "Meet our leadership", href: "/team" },
  },
]
