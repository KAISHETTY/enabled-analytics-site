import type { Metadata } from "next"
import Image from "next/image"
import { coreServices, engagementModels, getService, home } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { ServiceCard } from "@/components/ea/cards"
import { PricingCard } from "@/components/ea/pricing-card"
import { Reveal, RevealGroup, RevealItem, SwingIn } from "@/components/ea/reveal"
import { CTABanner } from "@/components/ea/cta-banner"
import { Button, ArrowIcon } from "@/components/ea/button"
import { CloudSeam } from "@/components/motion/sky-scene"
import { PinnedSteps } from "@/components/motion/pinned-steps"
import { HowWeWork } from "@/components/story/how-we-work"
import { PillarExplorer } from "@/components/story/pillar-explorer"
import { servicePillars, successFactors } from "@/lib/overview"

export const metadata: Metadata = {
  title: "Services: Implementation, Support & Staff Augmentation",
  description: "Salesforce Implementation, Support and Staff Augmentation from Enabled Analytics, delivered through our six-step process and three-step Shape Cycle.",
  alternates: { canonical: "/services" },
}

const coe = getService("coe-enablement")!

const STEP_VISUALS = [
  { img: "/images/home/advisory-services.jpg", chip: "Discovery workshop", note: "Pain points → possible solutions → perfect fit" },
  { img: "/images/home/service-offerings.jpg", chip: "Proven methodology", note: "Accelerators · CoE teams · Hybrid Agile" },
  { img: "/images/home/data-services.jpg", chip: "Measured with scorecards", note: "Revenue sources · ROI · continuous Evolution" },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Implementation, Support & Staff Augmentation" lead={home.offerings.lead} crumbs={[{ label: "Services" }]}>
        <Button href="/contact" size="lg">
          Contact Us <ArrowIcon />
        </Button>
        <Button href="#how-we-deliver" size="lg" variant="secondary">
          How we deliver
        </Button>
      </PageHero>

      <Section>
        <SectionHeading index="01" eyebrow="Core services" title="Everything you need, from one partner" />
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {coreServices.map((s, i) => (
            <RevealItem key={s.slug}>
              <ServiceCard service={s} index={i} showImage />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="tint">
        <SectionHeading
          index="02"
          eyebrow="Comprehensive services"
          title={
            <>
              End-to-end, at <span className="accent-serif text-brand-600">every stage</span> of your Salesforce journey
            </>
          }
          lead="As a premier Salesforce partner we deliver bespoke, end-to-end solutions across five practices."
        />
        <PillarExplorer pillars={servicePillars} />
      </Section>

      {/* How we deliver: the six-step process and the Shape Cycle, consolidated on one tab. */}
      <div id="how-we-deliver" className="scroll-mt-20">
        <section className="relative bg-white" aria-label="How we work">
          <HowWeWork
            title={
              <>
                Flexible process, <span className="accent-serif text-brand-600">tailored for your success</span>
              </>
            }
            lead={coe.process!.lead}
            steps={coe.process!.steps}
          />
        </section>

        <section className="relative bg-surface" aria-label={home.shapeCycle.title}>
          <CloudSeam fill="white" flip className="absolute top-0" />
          <PinnedSteps
            intro={
              <>
                <p className="eyebrow flex items-center gap-3">
                  <span className="text-ink-subtle">03</span> <span className="h-px w-8 bg-brand-200" aria-hidden="true" /> Our process
                </p>
                <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] font-extrabold">
                  Streamline your operations with our <span className="accent-serif text-brand-600">Shape Cycle</span>
                </h2>
                <p className="mt-4 text-lg">{home.shapeCycle.lead}</p>
              </>
            }
            steps={home.shapeCycle.steps.map((s, i) => ({
              title: s.title,
              text: s.text,
              visual: (
                <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] shadow-lift ring-1 ring-line">
                  <Image src={STEP_VISUALS[i].img} alt="" fill sizes="45vw" className="object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-800/60 via-brand-800/10 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/90 p-5 backdrop-blur">
                    <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
                      {String(i + 1).padStart(2, "0")} · {STEP_VISUALS[i].chip}
                    </p>
                    <p className="mt-1 font-heading text-xl font-bold text-ink">{STEP_VISUALS[i].note}</p>
                  </div>
                  <span aria-hidden="true" className="absolute top-6 right-8 font-heading text-[9rem] leading-none font-extrabold text-white/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ),
            }))}
          />
        </section>
      </div>

      <Section>
        <SectionHeading index="04" eyebrow="Key success factors" title="What we’ve learned makes Salesforce succeed" lead="Leverage our expertise, processes, assets and tools." />
        <div className="grid gap-6 lg:grid-cols-3">
          {successFactors.map((f, i) => {
            const body = (
              <article className="h-full overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft">
                <h3 className="bg-gradient-to-r from-brand-700 to-brand-500 px-7 py-4 text-lg font-bold text-white">{f.title}</h3>
                <ul className="divide-y divide-line">
                  {f.items.map((it, k) => (
                    <li key={it.title} className="flex gap-4 p-7">
                      <span aria-hidden="true" className="font-heading text-3xl leading-none font-extrabold text-brand-100">
                        {String(i * 2 + k + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-heading text-lg font-bold text-ink">{it.title}</span>
                        <span className="mt-1.5 block leading-relaxed">{it.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            )
            return i === 1 ? (
              <Reveal key={f.title} delay={0.1} className="h-full">
                {body}
              </Reveal>
            ) : (
              <SwingIn key={f.title} from={i === 0 ? "left" : "right"} delay={i * 0.1} className="h-full">
                {body}
              </SwingIn>
            )
          })}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading index="05" eyebrow="Engagement models" title="Flexible engagement models" lead="Leverage our engagement models that include fixed price as well as time & material." align="center" />
        <RevealGroup className="grid gap-6 pt-3 md:grid-cols-3">
          {engagementModels.map((m) => (
            <RevealItem key={m.name}>
              <PricingCard plan={m} ctaHref="/contact" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTABanner title={home.cta.title} primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
