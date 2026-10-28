import data from "@/content/site-content.json"

export type Stat = { value: number; suffix?: string; decimals?: number; label: string }
export type TitledText = { title: string; text?: string }

export type Service = {
  slug: string
  category: "solution" | "practice"
  title: string
  icon: string
  tagline: string
  summary: string
  image: string
  intro?: string[]
  stats?: Stat[]
  overview?: { title: string; body: string[] }
  features?: { title: string; items: string[] }
  process?: { title: string; lead?: string; steps: (TitledText & { image?: string })[] }
  approach?: { title: string; text: string }[]
  benefits?: { title: string; lead?: string; items: TitledText[] }
  closing?: { title: string; body: string }
}

export type Testimonial = {
  id: string
  role: string
  industry: string
  quote: string[]
}

export type TeamMember = { name: string; role: string; image: string }

export const site = data.company
export const announcements = data.announcements
export const home = data.home
export const about = data.about
export const team = data.team
export const product = data.product
export const practiceAreasIntro = data.practiceAreasIntro
export const industries = data.industries
export const clients = data.clients
export const careers = data.careers
export const contact = data.contact
export const engagementModels = data.engagementModels.items
export const faqs = data.faqs.items
export const privacy = data.legal.privacy

export const services = data.services as Service[]
export const solutions = services.filter((s) => s.category === "solution")
export const practiceAreas = services.filter((s) => s.category === "practice")
export const testimonials = data.testimonials as Testimonial[]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}

export const allTeamMembers: TeamMember[] = team.groups.flatMap((g) => g.members)
