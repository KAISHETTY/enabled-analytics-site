import type { Metadata } from "next"
import { groupByFocusArea, publicSectorFocusAreas } from "@/lib/case-studies"
import { clients, home, testimonials } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { LogoGrid } from "@/components/ea/logo-marquee"
import { TestimonialSlider } from "@/components/ea/testimonial-slider"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { TrustStrip } from "@/components/story/trust-strip"
import { CaseStudyCard } from "@/components/story/case-study-card"

export const metadata: Metadata = {
  title: "Case Studies: Public Sector, Telecom & Commercial",
  description: "Enabled Analytics client results: Public Sector and Commercial Salesforce case studies in Challenge → Solution → Result format, client testimonials and logos.",
  alternates: { canonical: "/case-studies" },
}

const groups = [
  { id: "public-sector", sector: "Public Sector" as const, title: "Public Sector", lead: "State and local government, organized by focus area." },
  { id: "commercial", sector: "Commercial" as const, title: "Commercial", lead: "Real engagements, in our clients’ own words." },
]

export default function ClientResultsPage() {
  return (
    <>
      <PageHero eyebrow="Client Success · Case Studies" title="Challenge. Solution. Result." lead="How Enabled Analytics delivers Salesforce outcomes for Public Sector, Telecom and Commercial clients." crumbs={[{ label: "Client Success", href: "/clients" }, { label: "Case Studies" }]}>
        {groups.map((g) => (
          <Button key={g.id} href={`#${g.id}`} size="lg" variant={g.id === "public-sector" ? "primary" : "secondary"}>
            {g.title} <ArrowIcon />
          </Button>
        ))}
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <Reveal>
          <TrustStrip credibility />
        </Reveal>
      </Section>

      {groups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 === 0 ? "tint" : "white"} className="scroll-mt-20">
          <SectionHeading index={String(i + 1).padStart(2, "0")} eyebrow="Case studies" title={g.title} lead={g.lead} />
          {groupByFocusArea(g.sector, g.sector === "Public Sector" ? publicSectorFocusAreas : []).map((area, _k, all) => (
            <div key={area.title} className="mt-10 first:mt-0">
              <h3 hidden={all.length === 1} className="mb-5 flex items-baseline gap-3 font-heading text-xl font-bold md:text-2xl">
                {area.title}
                <span className="font-mono text-sm font-medium text-brand-600">{area.items.length}</span>
              </h3>
              <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {area.items.map((c) => (
                  <RevealItem key={c.slug}>
                    <CaseStudyCard c={c} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </Section>
      ))}

      <Section tone="tint">
        <SectionHeading
          index="03"
          eyebrow="Testimonials"
          title={home.testimonialsTitle}
          actions={
            <Button href="/testimonials" variant="secondary">
              Read all <ArrowIcon />
            </Button>
          }
        />
        <TestimonialSlider items={testimonials} />
      </Section>

      <Section id="clients" className="scroll-mt-20">
        <SectionHeading index="04" eyebrow="Clients" title={home.clientsTitle} align="center" />
        <LogoGrid logos={clients} />
      </Section>

      <CTABanner title="Ready to be our next success story?" lead="Tell us about your project in brief and we’ll connect you to one of our Salesforce experts." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
