import type { Metadata } from "next"
import Image from "next/image"
import { DynamicIcon } from "@/components/ea/icon"
import { home, industries, practiceAreas } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { IconTile, Placeholder, Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { ServiceCard } from "@/components/ea/cards"
import { CTABanner } from "@/components/ea/cta-banner"
import { RevealGroup, RevealItem } from "@/components/ea/reveal"

export const metadata: Metadata = {
  title: "Industries",
  description: "Enabled Analytics serves retail & consumer goods, financial services & banking, healthcare & pharmaceuticals, technology & IT services, and logistics & supply chain.",
  alternates: { canonical: "/industries" },
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow="Industries" title={industries.title} lead={industries.lead} crumbs={[{ label: "Industries" }]} />

      <Section>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.items.map((ind, i) => {
            return (
              <RevealItem key={ind.title}>
                <article className="group/card flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  {"image" in ind && ind.image ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={ind.image} alt="" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover transition-transform duration-500 group-hover/card:scale-105" />
                    </div>
                  ) : (
                    <div aria-hidden="true" className="bg-grid relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand-50 to-surface-warm">
                      <DynamicIcon name={ind.icon} className="size-14 text-brand-300" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <IconTile>
                        <DynamicIcon name={ind.icon} />
                      </IconTile>
                      <span className="font-mono text-sm text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h2 className="text-xl font-bold">{ind.title}</h2>
                  </div>
                </article>
              </RevealItem>
            )
          })}
        </RevealGroup>
        <Placeholder className="mt-10" title="Content needed: industry descriptions">
          The current industry page contains placeholder (Lorem Ipsum) text. Add a short description, relevant clouds and outcomes for each industry in <code>content/site-content.json → industries</code>.
        </Placeholder>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Practice Areas" title="Salesforce clouds we implement" lead={home.segments.lead} />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.slice(0, 6).map((s) => (
            <RevealItem key={s.slug}>
              <ServiceCard service={s} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTABanner title={home.cta.title} primary={home.cta.button} />
    </>
  )
}
