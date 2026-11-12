import type { Metadata } from "next"
import { industriesLanding as l, industryLinks } from "@/lib/offerings"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { SectorCards } from "@/components/story/sector-cards"
import { ChipRow } from "@/components/story/offering-page"

export const metadata: Metadata = {
  title: "Industries: Public Sector, Telecommunications & Commercial",
  description: "Enabled Analytics combines specialist engineering with practical industry knowledge for Public Sector, Telecommunications and Commercial organizations.",
  alternates: { canonical: "/industries" },
}

const TONES = ["dark", "navy", "light"] as const

export default function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow="Industries" title={l.heroTitle} lead={l.heroLead} crumbs={[{ label: "Industries" }]}>
        <Button href="#industries" size="lg">
          Explore Our Industries <ArrowIcon />
        </Button>
      </PageHero>

      <Section id="industries" className="scroll-mt-20 pt-6 md:pt-10">
        <SectionHeading index="01" eyebrow="Industries we serve" title="Choose your industry" />
        <SectorCards sectors={industryLinks.map((i, k) => ({ href: i.href, icon: i.icon, kicker: i.title, title: i.link, text: i.text, tags: [], tone: TONES[k] }))} />
      </Section>

      <Section tone="tint">
        <SectionHeading index="02" eyebrow="Why context matters" title="Industry knowledge that shapes the solution" />
        <FeatureGrid items={l.why} columns={4} />
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading index="03" eyebrow="Our approach" title="Understand your reality. Engineer for your business." className="mb-0 md:mb-0" />
          <Reveal>
            <ChipRow items={["Understand your operating reality", "Engineer for your business"]} />
          </Reveal>
        </div>
      </Section>

      <CTABanner title="Let’s connect" lead="Tell us about your organization and we’ll connect you to one of our industry specialists." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
