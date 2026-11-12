import type { Metadata } from "next"
import { clients } from "@/lib/content"
import { caseStudies } from "@/lib/case-studies"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { LogoGrid } from "@/components/ea/logo-marquee"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { CaseStudyCard } from "@/components/story/case-study-card"

export const metadata: Metadata = {
  title: "Telecommunications: Salesforce Communications Cloud",
  description: "Enabled Analytics helps telecommunications providers modernize legacy systems, simplify complex sales and order management, and deliver connected customer experiences.",
  alternates: { canonical: "/industries/telecommunications" },
}

// Copy carried forward from the Telecommunications page drafted on the current website, per the 12 Nov 2026 handoff.
// Pending Sandeep's pre-launch review: product names and any team-experience figures must be validated before publication.
const WHERE = [
  { title: "Communications Cloud", icon: "radio" },
  { title: "Industry CPQ + EPC", icon: "calculator" },
  { title: "Order management", icon: "route" },
  { title: "OmniStudio + AI", icon: "sparkles" },
]

const WHY = [
  { title: "Industry specialists", icon: "users" },
  { title: "Architecture depth", icon: "layers" },
  { title: "Reusable assets", icon: "recycle" },
  { title: "Connected delivery", icon: "cable" },
]

const STUDIES = caseStudies.filter((c) => c.industry === "Communications")
const LOGOS = clients.filter((c) => c.sector === "Telecom")

export default function TelecommunicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries · Telecommunications"
        title="Telecom transformation built around real operations."
        lead="Experience across complex sales, product, order and service workflows."
        crumbs={[{ label: "Industries", href: "/industries" }, { label: "Telecommunications" }]}
        image={{ src: "/images/photos/telecom-team.webp", alt: "A consultant presenting a CRM dashboard to a telecom team beside a network coverage map" }}
      >
        <Button href="/contact" size="lg">
          Contact Us <ArrowIcon />
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading index="01" eyebrow="Overview" title="Modernizing telecommunications with Salesforce" className="mb-0 md:mb-0" />
          <Reveal className="space-y-5 text-lg leading-relaxed">
            <p>Enabled Analytics helps telecommunications providers modernize legacy systems, simplify complex sales and order management processes, and deliver connected customer experiences.</p>
            <p>With nearly two decades of individual industry expertise and hands-on experience delivering enterprise Salesforce transformations, our team brings the technical capabilities and telecommunications knowledge needed to address complex business challenges.</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading index="02" eyebrow="Where we work" title="Across the telecom value chain" />
        <FeatureGrid items={WHERE} columns={4} />
      </Section>

      <Section>
        <SectionHeading index="03" eyebrow="Experience" title="Telecom client success" />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STUDIES.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <CaseStudyCard c={c} />
            </RevealItem>
          ))}
        </RevealGroup>
        {LOGOS.length > 0 && (
          <div className="mt-14">
            <p className="eyebrow mb-6 text-center">Telecommunications clients</p>
            <LogoGrid logos={LOGOS} />
          </div>
        )}
      </Section>

      <Section tone="tint">
        <SectionHeading index="04" eyebrow="Why EA for telecom" title="Why telecom teams work with us" />
        <FeatureGrid items={WHY} columns={4} />
      </Section>

      <CTABanner title="Discuss your needs" lead="Tell us about your telecom program and we’ll connect you to one of our specialists." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
