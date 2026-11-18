import type { Metadata } from "next"
import { howWeDeliver as d } from "@/lib/offerings"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { StepRoad } from "@/components/story/step-road"
import { ChipRow, RelatedServices } from "@/components/story/offering-page"

export const metadata: Metadata = {
  title: "How We Deliver",
  description: "How Enabled Analytics delivers: one team around the business outcome, proven methods and accelerators, and engineering for long-term operation.",
  alternates: { canonical: d.href },
}

/** The connective page for all four service offerings (not a fifth offering). Replaces the old "How we work" and "Shape Cycle" blocks. */
export default function HowWeDeliverPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={d.title} lead={d.heroLead} crumbs={[{ label: "Services", href: "/services" }, { label: d.title }]} image={{ src: "/images/photos/delivery-team.webp", alt: "A delivery team reviewing progress together on a shared screen" }}>
        <Button href="/contact" size="lg">
          {d.cta} <ArrowIcon />
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading index="01" eyebrow="Overview" title={d.overviewTitle} className="mb-0 md:mb-0" />
          <Reveal className="text-lg leading-relaxed">
            <p>{d.overviewBody}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" className="overflow-hidden">
        <SectionHeading index="02" eyebrow="Our delivery approach" title="One delivery framework" lead="From business need to ongoing operation and improvement." />
        <StepRoad steps={d.framework} columns={6} />
      </Section>

      <Section>
        <SectionHeading index="03" eyebrow="Delivery principles" title="How we work with your teams" />
        <FeatureGrid items={d.principles} columns={3} />
      </Section>

      <Section tone="tint">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading index="04" eyebrow="Built in from the start" title="Quality is part of the plan" className="mb-0 md:mb-0" />
          <ChipRow items={d.builtIn} />
        </div>
      </Section>

      <Section>
        <SectionHeading index="05" eyebrow="Services" title="Applied across every offering" />
        <RelatedServices current="how-we-deliver" />
      </Section>

      <CTABanner title="Talk with our team" lead="Tell us about your project in brief and we’ll connect you to one of our specialists." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
