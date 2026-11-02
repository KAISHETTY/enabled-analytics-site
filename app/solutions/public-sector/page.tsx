import type { Metadata } from "next"
import { Cable, ClipboardCheck, FileStack, GraduationCap, Landmark, LayoutDashboard, RadioTower, Trees, Users, Workflow } from "lucide-react"
import { caseStudiesBySector } from "@/lib/case-studies"
import { getIndustry } from "@/lib/overview"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { ImageBand } from "@/components/story/image-band"

export const metadata: Metadata = {
  title: "Public Sector: Salesforce Grantmaking & Agentforce Public Sector",
  description: "Enterprise grants management on Salesforce for state agencies, councils and school districts: Grantmaking, Agentforce Public Sector and Experience Cloud, from planning through closeout.",
  alternates: { canonical: "/solutions/public-sector" },
}

const studies = caseStudiesBySector("Public Sector")

// Every capability below is drawn from Enabled Analytics' Public Sector case studies (lib/case-studies.ts).
const CAPABILITIES = [
  { icon: FileStack, title: "End-to-end grant lifecycle", text: "From RFA planning and applications through monitoring, continuation and closeout, in a single system of record." },
  { icon: Users, title: "Applicant self-service portals", text: "Experience Cloud portals that let applicants and grantees work with your agency directly." },
  { icon: Workflow, title: "Workflow automation", text: "Standardized approvals, notifications, monitoring tasks and milestone tracking." },
  { icon: ClipboardCheck, title: "Grants, vendor & request management", text: "Grants, vendors and requests aligned in one Salesforce data model." },
  { icon: Cable, title: "Integrations", text: "Agency financial data marts, SurveyMonkey Apply and Okta Single Sign-On connected to Salesforce." },
  { icon: LayoutDashboard, title: "Modernization", text: "Code-heavy custom pages replaced with declarative, maintainable Salesforce configuration." },
]

const AUDIENCES = [
  { icon: Landmark, title: "State agencies & councils" },
  { icon: RadioTower, title: "Emergency communications" },
  { icon: Trees, title: "Land & natural resources" },
  { icon: GraduationCap, title: "School districts" },
]

/** Public Sector column of the Salesforce Overview deck. */
const SOLUTIONS = getIndustry("public-sector").points
const TECHNOLOGIES = Array.from(new Set(studies.flatMap((c) => c.clouds)))
const DELIVERY = ["Business process discovery and validation", "Solution architecture and functional design", "Salesforce configuration and implementation", "Workflow automation", "Data migration", "User Acceptance Testing (UAT)", "Role-based training and change management", "Knowledge transfer and post-production support"]

export default function PublicSectorPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Serve · Public Sector"
        title="Salesforce for the public sector"
        lead="Enterprise grants management on Salesforce Grantmaking and Agentforce Public Sector for state agencies, councils and school districts, with improved automation, visibility and governance."
        crumbs={[{ label: "Who We Serve" }, { label: "Public Sector" }]}
        image={{ src: "/images/photos/public-sector-dashboard.webp", alt: "Grants program team reviewing a state grant programs dashboard" }}
      >
        <Button href="/contact" size="lg">
          Contact Us <ArrowIcon />
        </Button>
        <Button href="#case-studies" size="lg" variant="secondary">
          See our results
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Who we serve">
            {AUDIENCES.map((a) => (
              <li key={a.title} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-soft">
                <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <a.icon className="size-5" />
                </span>
                <span className="font-heading font-bold text-ink">{a.title}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section className="pt-0 md:pt-0">
        <ImageBand src="/images/photos/public-sector-service-center.webp" alt="Residents using self-service kiosks and an information desk in a government service center" kicker="Self-service portals" caption="Online applications, case management and service, in one place" />
      </Section>

      <Section tone="tint">
        <SectionHeading index="01" eyebrow="What we deliver" title="One platform for the whole grant lifecycle" lead="We consolidate fragmented systems, spreadsheets and email into a scalable Salesforce foundation that internal staff can administer." />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <RevealItem key={c.title}>
              <article className="h-full rounded-[1.5rem] border border-line bg-white p-7 shadow-soft">
                <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <c.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
                <p className="mt-2 leading-relaxed">{c.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading index="02" eyebrow="Technology" title="Salesforce for government and education" className="mb-6 md:mb-8" />
            <Reveal>
              <p className="mb-4 leading-relaxed">{SOLUTIONS.join(" · ")}</p>
              <ul className="flex flex-wrap gap-2">
                {TECHNOLOGIES.map((t) => (
                  <li key={t} className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <SectionHeading index="03" eyebrow="How we deliver" title="EA delivery services" className="mb-6 md:mb-8" />
            <Reveal>
              <ul className="grid gap-3 sm:grid-cols-2">
                {DELIVERY.map((d) => (
                  <li key={d} className="flex gap-3 rounded-xl bg-surface px-4 py-3">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="tint" id="case-studies">
        <SectionHeading index="04" eyebrow="Client success" title="Public Sector case studies" />
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {studies.map((c) => (
            <RevealItem key={c.slug}>
              <CaseStudyCard c={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTABanner title="Modernize your grants and programs on Salesforce" lead="Tell us about your agency or district and we’ll connect you to our Public Sector team." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
