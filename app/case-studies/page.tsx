import type { Metadata } from "next"
import { caseIndustries, caseStudies } from "@/lib/case-studies"
import { clients, home } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { StatsCounter } from "@/components/ea/stats-counter"
import { LogoGrid } from "@/components/ea/logo-marquee"
import { CaseStudiesExplorer } from "@/components/ea/explorers"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal } from "@/components/ea/reveal"
import { TrustStrip } from "@/components/story/trust-strip"

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Salesforce case studies from Enabled Analytics in Challenge → Solution → Result format, across communications, manufacturing, professional services and consumer goods.",
  alternates: { canonical: "/case-studies" },
}

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero eyebrow="Case Studies" title="Challenge. Solution. Result." lead="How Enabled Analytics delivers Salesforce outcomes, in our clients’ own words." crumbs={[{ label: "Case Studies" }]} />

      <Section className="pt-6 md:pt-10">
        <Reveal className="mb-10">
          <TrustStrip />
        </Reveal>
        <Reveal className="mb-16">
          <StatsCounter stats={home.stats} variant="inline" />
        </Reveal>
        <SectionHeading index="01" eyebrow="Stories" title="Browse case studies" />
        <CaseStudiesExplorer items={caseStudies} industries={caseIndustries} />
      </Section>

      <Section tone="tint">
        <SectionHeading index="02" eyebrow="Clients" title={home.clientsTitle} align="center" />
        <LogoGrid logos={clients} />
      </Section>

      <CTABanner title="Ready to be our next success story?" lead="Tell us about your project in brief and we’ll connect you to one of our Salesforce experts." primary={{ label: "Get a Quote", href: "/get-a-quote" }} secondary={{ label: "Free Org Health Check", href: "/health-check" }} />
    </>
  )
}
