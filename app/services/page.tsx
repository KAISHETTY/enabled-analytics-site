import type { Metadata } from "next"
import { engagementModels, home, practiceAreas, practiceAreasIntro, solutions } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { ServiceCard } from "@/components/ea/cards"
import { PricingCard } from "@/components/ea/pricing-card"
import { RevealGroup, RevealItem } from "@/components/ea/reveal"
import { CTABanner } from "@/components/ea/cta-banner"
import { Button, ArrowIcon } from "@/components/ea/button"

export const metadata: Metadata = {
  title: "Services: Salesforce Solutions & Practice Areas",
  description: "CoE Teams, CoE Enablement, Org Assessment and Data Analytics, plus Sales, Service, Marketing and Experience Cloud, Account Engagement, CPQ and Salesforce Field Service.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={home.offerings.lead} lead={practiceAreasIntro} crumbs={[{ label: "Services" }]}>
        <Button href="/get-a-quote" size="lg">
          Get a Quote <ArrowIcon />
        </Button>
        <Button href="/contact" size="lg" variant="secondary">
          Talk to an expert
        </Button>
      </PageHero>

      <Section>
        <SectionHeading index="01" eyebrow="Solutions" title="Solutions" lead="Wouldn’t it be great to hit the bull’s eye the very first time?" />
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {solutions.map((s, i) => (
            <RevealItem key={s.slug}>
              <ServiceCard service={s} index={i} showImage />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="tint">
        <SectionHeading index="02" eyebrow="Practice Areas" title={home.segments.title} lead={home.segments.lead} />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((s, i) => (
            <RevealItem key={s.slug}>
              <ServiceCard service={s} index={i} showImage />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading index="03" eyebrow="Engagement models" title="Flexible engagement models" lead="Leverage our engagement models that include fixed price as well as time & material." align="center" />
        <RevealGroup className="grid gap-6 pt-3 md:grid-cols-3">
          {engagementModels.map((m) => (
            <RevealItem key={m.name}>
              <PricingCard plan={m} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTABanner title={home.cta.title} primary={home.cta.button} />
    </>
  )
}
