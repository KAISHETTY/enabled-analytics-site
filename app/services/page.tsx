import type { Metadata } from "next"
import Link from "next/link"
import { howWeDeliver, offerings, servicesOverview as v } from "@/lib/offerings"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { ServiceCards } from "@/components/story/service-cards"
import { ChipRow } from "@/components/story/offering-page"

export const metadata: Metadata = {
  title: "Services",
  description: "Implementation & Transformation, Managed Support & Optimization, Forward-Deployed Engineering, and Agentforce & Applied AI from Enabled Analytics.",
  alternates: { canonical: "/services" },
}

/** Services overview per the 12 Nov 2026 handoff: four offerings plus a separate How We Deliver link (not a fifth offering). */
export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={v.heroTitle} lead={v.heroLead} crumbs={[{ label: "Services" }]}>
        <Button href="/contact" size="lg">
          Contact Us <ArrowIcon />
        </Button>
        <Button href={howWeDeliver.href} size="lg" variant="secondary">
          See How We Deliver
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <SectionHeading index="01" eyebrow="Our services" title={v.coreTitle} />
        <ServiceCards services={offerings.map((o) => ({ slug: o.slug, href: o.href, title: o.title, summary: o.overviewText, icon: o.icon, image: o.image }))} />
      </Section>

      <Section tone="tint">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading index="02" eyebrow="How we work together" title={v.crossTitle} className="mb-0 md:mb-0" />
          <Reveal className="space-y-6 text-lg leading-relaxed">
            <p>{v.crossBody}</p>
            <ChipRow items={v.crossChips} />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal className="flex flex-col gap-6 rounded-[2rem] border border-line bg-gradient-to-br from-brand-50 to-white p-8 shadow-soft md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-2xl">
            <p className="eyebrow">03 · Our approach</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-extrabold">One connected delivery model</h2>
            <p className="mt-3 text-lg leading-relaxed">{howWeDeliver.heroLead}</p>
            <p className="mt-3 leading-relaxed">
              Looking for a specific Salesforce Cloud or Data 360?{" "}
              <Link href="/expertise" className="font-semibold text-brand-700 underline underline-offset-4">
                See Salesforce Clouds & Data
              </Link>
              .
            </p>
          </div>
          <Button href={howWeDeliver.href} size="lg" className="shrink-0">
            See How We Deliver <ArrowIcon />
          </Button>
        </Reveal>
      </Section>

      <CTABanner title="Talk with us" lead="Tell us about your project in brief and we’ll connect you to one of our specialists." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
