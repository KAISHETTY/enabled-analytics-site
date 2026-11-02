import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"
import { home, industries, practiceAreas, testimonials } from "@/lib/content"
import { caseStudiesBySector } from "@/lib/case-studies"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { ServiceCard } from "@/components/ea/cards"
import { DynamicIcon } from "@/components/ea/icon"
import { TestimonialSlider } from "@/components/ea/testimonial-slider"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem, SwingIn } from "@/components/ea/reveal"
import { industryExpertise } from "@/lib/overview"
import { ArrowIcon, Button } from "@/components/ea/button"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { ImageBand } from "@/components/story/image-band"

export const metadata: Metadata = {
  title: "Commercial: Salesforce for Every Segment",
  description: "Salesforce implementation, support and staff augmentation for retail & consumer goods, financial services, healthcare, technology and logistics organizations.",
  alternates: { canonical: "/solutions/commercial" },
}

const COMMERCIAL = industryExpertise.filter((i) => !["telecom", "public-sector"].includes(i.slug))
/** Industries from the original site not covered by the deck's four commercial verticals. */
const ALSO = ["Healthcare & Pharmaceuticals", "Technology & IT Services", "Logistics & Supply Chain"]

export default function CommercialPage() {
  return (
    <>
      <PageHero eyebrow="Who We Serve · Commercial" title={industries.title} lead={industries.lead} crumbs={[{ label: "Who We Serve" }, { label: "Commercial" }]} image={{ src: "/images/photos/commercial-boardroom.webp", alt: "Leadership team reviewing sales and service performance dashboards" }}>
        <Button href="/contact" size="lg">
          Contact Us <ArrowIcon />
        </Button>
        <Button href="#case-studies" size="lg" variant="secondary">
          See our results
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <SectionHeading index="01" eyebrow="Industries" title="Industry expertise, built in" lead="Salesforce solutions designed for the unique needs of each industry, so we adapt quickly to market change and your evolving requirements." />
        <div className="grid gap-6 md:grid-cols-2">
          {COMMERCIAL.map((ind, i) => (
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
        <Reveal className="mt-8 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">Also serving</span>
          {ALSO.map((t) => (
            <span key={t} className="rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line">
              {t}
            </span>
          ))}
          <Link href="/solutions/telecom" className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-100 hover:bg-brand-100">
            Telecom →
          </Link>
        </Reveal>
      </Section>

      <Section className="pt-0 md:pt-0">
        <ImageBand src="/images/photos/commercial-office.webp" alt="Teams collaborating around analytics dashboards in a modern open-plan office" kicker="Commercial" caption="Sales, service and analytics that move every team forward" />
      </Section>

      <Section tone="tint">
        <SectionHeading
          index="02"
          eyebrow="Salesforce clouds"
          title="Every Salesforce Cloud, one partner"
          lead={home.segments.lead}
          actions={
            <Button href="/expertise" variant="secondary">
              All expertise <ArrowIcon />
            </Button>
          }
        />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.slice(0, 6).map((s) => (
            <RevealItem key={s.slug}>
              <ServiceCard service={s} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="case-studies">
        <SectionHeading index="03" eyebrow="Client success" title="Commercial case studies" />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudiesBySector("Commercial").map((c) => (
            <RevealItem key={c.slug}>
              <CaseStudyCard c={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="white" className="pt-0 md:pt-0">
        <SectionHeading index="04" eyebrow="Testimonials" title={home.testimonialsTitle} />
        <TestimonialSlider items={testimonials} />
      </Section>

      <CTABanner title={home.cta.title} primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
