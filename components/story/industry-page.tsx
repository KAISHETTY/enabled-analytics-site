import { Check } from "lucide-react"
import type { CaseStudy } from "@/lib/case-studies"
import type { Industry } from "@/lib/overview"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { DynamicIcon } from "@/components/ea/icon"
import { LogoGrid } from "@/components/ea/logo-marquee"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { CaseStudyCard } from "@/components/story/case-study-card"

/**
 * Lean industry landing page (2026-11-03 feedback: list Public Sector, Telecom and
 * Manufacturing separately and add content as it's built out). Shows only
 * existing material: the deck's industry points, matching case studies and
 * client logos. Sections without content are left out.
 */
export function IndustryPage({ industry, title, lead, image, studies, logos = [] }: { industry: Industry; title: string; lead: string; image?: { src: string; alt: string }; studies: CaseStudy[]; logos?: { name: string; logo: string }[] }) {
  let n = 0
  const idx = () => String(++n).padStart(2, "0")

  return (
    <>
      <PageHero eyebrow={`Who We Serve · ${industry.title}`} title={title} lead={lead} crumbs={[{ label: "Who We Serve" }, { label: industry.title }]} image={image}>
        <Button href="/contact" size="lg">
          Contact Us <ArrowIcon />
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-7 shadow-soft md:p-12">
          <span aria-hidden="true" className="absolute -top-24 -right-24 size-64 rounded-full bg-brand-50" />
          <div className="relative flex items-center gap-4">
            <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow">
              <DynamicIcon name={industry.icon} className="size-7" />
            </span>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-ink-subtle">{idx()}</span> <span className="h-px w-8 bg-brand-200" aria-hidden="true" /> What we deliver
            </p>
          </div>
          <ul className="relative mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {industry.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-lg">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-600" />
                {pt}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {studies.length > 0 && (
        <Section tone="tint">
          <SectionHeading index={idx()} eyebrow="Client success" title={`${industry.title} case studies`} />
          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((c) => (
              <RevealItem key={c.slug}>
                <CaseStudyCard c={c} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {logos.length > 0 && (
        <Section>
          <SectionHeading index={idx()} eyebrow="Our clients" title={`${industry.title} clients`} align="center" />
          <LogoGrid logos={logos} />
        </Section>
      )}

      <CTABanner title={`Let’s talk about your ${industry.title.toLowerCase()} Salesforce program`} lead="Tell us about your project in brief and we’ll connect you to one of our Salesforce experts." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
