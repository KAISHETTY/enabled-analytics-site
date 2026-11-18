import * as React from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { howWeDeliver, offerings, type Offering } from "@/lib/offerings"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { CTABanner } from "@/components/ea/cta-banner"
import { DynamicIcon } from "@/components/ea/icon"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { StepRoad } from "@/components/story/step-road"

/** Pill row used for "Why EA", "When it helps" and similar short lists. */
export function ChipRow({ items }: { items: string[] }) {
  return (
    <RevealGroup as="ul" className="flex flex-wrap gap-3">
      {items.map((t) => (
        <RevealItem as="li" key={t} className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-semibold text-ink shadow-soft ring-1 ring-line">
          <Check aria-hidden="true" className="size-4 text-brand-600" strokeWidth={3} />
          {t}
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

/** The other service offerings plus How We Deliver, for the "Related services" block. */
export function RelatedServices({ current }: { current?: string }) {
  const items = [...offerings.filter((o) => o.slug !== current).map((o) => ({ href: o.href, title: o.title, text: o.summary, icon: o.icon })), ...(current === "how-we-deliver" ? [] : [{ href: howWeDeliver.href, title: howWeDeliver.title, text: howWeDeliver.heroLead, icon: "route" }])]
  return (
    <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <RevealItem key={s.href} className="h-full">
          <Link href={s.href} className="group/rel flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
            <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover/rel:bg-brand-600 group-hover/rel:text-white">
              <DynamicIcon name={s.icon} className="size-5" />
            </span>
            <span className="mt-4 font-heading text-lg leading-snug font-bold text-ink">{s.title}</span>
            <span className="mt-2 flex-1 text-[0.9375rem] leading-relaxed">{s.text}</span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
              Learn more <ArrowIcon />
            </span>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

/**
 * One service-offering page from the 12 Nov 2026 handoff: top section, overview, process,
 * capability cards and contact ("Why EA" and "Related services" removed per the 11.17 feedback).
 * `children` renders extra content (e.g. the illustrative agent demos) before the contact banner.
 */
export function OfferingPage({ o, children }: { o: Offering; children?: React.ReactNode }) {
  const cols = Math.min(Math.max(o.process.length, 3), 6) as 3 | 4 | 5 | 6
  let n = 0
  const idx = () => String(++n).padStart(2, "0")

  return (
    <>
      <PageHero eyebrow="Services" title={o.title} lead={o.heroLead} crumbs={[{ label: "Services", href: "/services" }, { label: o.title }]} image={{ src: o.image, alt: o.title }}>
        <Button href="/contact" size="lg">
          {o.cta} <ArrowIcon />
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading index={idx()} eyebrow="Overview" title={o.overviewTitle} className="mb-0 md:mb-0" />
          <Reveal className="text-lg leading-relaxed">
            <p>{o.overviewBody}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" className="overflow-hidden">
        <SectionHeading index={idx()} eyebrow="Process" title={o.processTitle} lead={o.processText} />
        <StepRoad steps={o.process} columns={cols} />
      </Section>

      <Section>
        <SectionHeading index={idx()} eyebrow="Capabilities" title={o.capabilitiesTitle} />
        <FeatureGrid items={o.capabilities} columns={o.capabilities.length === 4 ? 4 : 3} />
      </Section>

      {o.extra && (
        <Section tone="tint">
          <SectionHeading index={idx()} eyebrow={o.extra.title} title={o.extra.title} lead={o.extra.note} />
          <ChipRow items={o.extra.items} />
        </Section>
      )}

      {o.rows?.map((r) => (
        <Section key={r.title} className="pb-0 md:pb-0">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading index={idx()} eyebrow={r.title} title={r.title} className="mb-0 md:mb-0" />
            <ChipRow items={r.items} />
          </div>
        </Section>
      ))}

      {children}

      <CTABanner title={o.ctaHeading} lead="Tell us about your project in brief and we’ll connect you to one of our specialists." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
