import type { Metadata } from "next"
import { Check } from "lucide-react"
import { testimonials } from "@/lib/content"
import { caseStudiesBySector } from "@/lib/case-studies"
import { industryExpertise } from "@/lib/overview"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { DynamicIcon } from "@/components/ea/icon"
import { TestimonialSlider } from "@/components/ea/testimonial-slider"
import { CTABanner } from "@/components/ea/cta-banner"
import { RevealGroup, RevealItem, SwingIn } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { ImageBand } from "@/components/story/image-band"
import { ChipRow } from "@/components/story/offering-page"

export const metadata: Metadata = {
  title: "Commercial: Connected Customer and Business Operations",
  description: "Enabled Analytics modernizes sales, service, data and enterprise processes for manufacturing, retail, services and financial services organizations on Salesforce.",
  alternates: { canonical: "/industries/commercial" },
}

const WORKFLOWS = [
  { title: "Sales", icon: "trending" },
  { title: "Customer service", icon: "headset" },
  { title: "Data + integration", icon: "cable" },
  { title: "Operations", icon: "layers" },
]

/** The deck's commercial verticals (Telecom and Public Sector have their own Industries pages). */
const VERTICALS = industryExpertise.filter((i) => !["telecom", "public-sector"].includes(i.slug))
const STUDIES = caseStudiesBySector("Commercial").filter((c) => c.industry !== "Communications")

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries · Commercial"
        title="Connected customer and business operations."
        lead="Modernize sales, service, data and enterprise processes with practical engineering."
        crumbs={[{ label: "Industries", href: "/industries" }, { label: "Commercial" }]}
        image={{ src: "/images/photos/commercial-boardroom.webp", alt: "Leadership team reviewing sales and service performance dashboards" }}
      >
        <Button href="/contact" size="lg">
          Contact Us <ArrowIcon />
        </Button>
        <Button href="#customer-proof" size="lg" variant="secondary">
          See customer proof
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <SectionHeading index="01" eyebrow="Workflows we support" title="Built around how your business runs" />
        <FeatureGrid items={WORKFLOWS} columns={4} />
      </Section>

      <Section tone="tint">
        <SectionHeading index="02" eyebrow="Industry experience" title="Commercial industries we work in" />
        <div className="grid gap-6 md:grid-cols-2">
          {VERTICALS.map((ind, i) => (
            <SwingIn key={ind.slug} from={i % 2 === 0 ? "left" : "right"} delay={(i % 2) * 0.08} className="h-full">
              <article className="group/ind relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift md:p-8">
                <span aria-hidden="true" className="absolute -top-20 -right-20 size-56 rounded-full bg-brand-50 transition-transform duration-700 group-hover/ind:scale-150" />
                <div className="relative flex items-center gap-4">
                  <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow transition-transform duration-300 group-hover/ind:-rotate-6">
                    <DynamicIcon name={ind.icon} className="size-7" />
                  </span>
                  <h3 className="text-2xl font-extrabold">{ind.title}</h3>
                </div>
                <ul className="relative mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {ind.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-[0.9375rem]">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </SwingIn>
          ))}
        </div>
      </Section>

      <Section className="pb-0 md:pb-0">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading index="03" eyebrow="How we deliver value" title="Engineered to last" className="mb-0 md:mb-0" />
          <ChipRow items={["Connected systems", "Practical automation", "Scalable design", "Long-term support"]} />
        </div>
      </Section>

      <Section>
        <ImageBand src="/images/photos/commercial-office.webp" alt="Teams collaborating around analytics dashboards in a modern open-plan office" kicker="Commercial" caption="Sales, service and data working as one" />
      </Section>

      <Section id="customer-proof" tone="tint" className="scroll-mt-20">
        <SectionHeading index="04" eyebrow="Customer proof" title="Commercial case studies" />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STUDIES.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <CaseStudyCard c={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading index="05" eyebrow="Testimonials" title="What our clients say" />
        <TestimonialSlider items={testimonials} />
      </Section>

      <CTABanner title="Start a conversation" lead="Tell us about your project in brief and we’ll connect you to one of our specialists." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
