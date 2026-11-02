import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getService, practiceAreas, practiceAreasIntro, product, solutions } from "@/lib/content"
import { agentDemos, agentforce } from "@/lib/agentforce"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { ServiceCard } from "@/components/ea/cards"
import { StatsCounter } from "@/components/ea/stats-counter"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { CloudMark } from "@/components/motion/sky-scene"
import { Typewriter } from "@/components/motion/typewriter"
import { Parallax } from "@/components/motion/parallax"
import { AgentDemoPlayer } from "@/components/story/agent-demo"
import { PracticeList } from "@/components/story/practice-list"
import { DreamforceFeature } from "@/components/story/dreamforce-feature"
import { CloudGrid } from "@/components/story/cloud-grid"
import { cloudGroups } from "@/lib/overview"

export const metadata: Metadata = {
  title: "Salesforce Expertise: Clouds, Agentforce & Data 360",
  description: "Every Salesforce Cloud, Agentforce AI agents, Data 360 and analytics, CoE advisory and our Discover Cloud product, delivered by Enabled Analytics.",
  alternates: { canonical: "/expertise" },
}

const data360 = getService("data-analytics")!
const advisory = solutions.filter((s) => s.slug !== "data-analytics")

export default function ExpertisePage() {
  return (
    <>
      <PageHero eyebrow="Services · Salesforce Clouds & Data" title="Every Salesforce Cloud, AI and data capability" lead={practiceAreasIntro} crumbs={[{ label: "Services", href: "/services" }, { label: "Salesforce Clouds & Data" }]}>
        <Button href="/contact" size="lg">
          Contact Us <ArrowIcon />
        </Button>
      </PageHero>

      {/* Salesforce clouds */}
      <Section className="pt-6 md:pt-10">
        <SectionHeading index="01" eyebrow="Salesforce clouds" title="Every Salesforce Cloud, one partner" />
        <PracticeList items={practiceAreas} />
        <h3 className="mt-16 mb-6 text-center font-heading text-2xl font-bold md:text-3xl">Our full cloud expertise</h3>
        <CloudGrid groups={cloudGroups} />
      </Section>

      {/* Agentforce & AI */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-agent-50/60 to-white py-24 md:py-32" aria-labelledby="agentic-title">
        <div aria-hidden="true" className="absolute top-20 -left-40 size-[520px] rounded-full bg-agent-100/50 blur-3xl" />
        <div aria-hidden="true" className="absolute right-[-10%] bottom-10 size-[460px] rounded-full bg-brand-100/60 blur-3xl" />
        <div className="container-page relative">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal className="max-w-3xl">
              <p className="eyebrow flex items-center gap-3 text-agent-600">
                <CloudMark tone="agent" /> 02 · Agentforce & AI
              </p>
              <h2 id="agentic-title" className="mt-5 text-[clamp(2.4rem,5.5vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
                The future is <Typewriter words={["agentic.", "autonomous.", "grounded in your data.", "here."]} className="accent-serif font-normal text-agent-500" />
              </h2>
              <p className="mt-6 text-lg leading-relaxed">{agentforce.lead}</p>
            </Reveal>
            <Reveal delay={0.1} className="flex shrink-0 flex-wrap gap-3">
              <Link href="/agentforce" className="group/btn inline-flex h-12 items-center gap-2 rounded-full bg-agent-500 px-6 font-semibold text-white shadow-agent transition hover:-translate-y-0.5 hover:bg-agent-600">
                Agentforce practice <ArrowIcon />
              </Link>
            </Reveal>
          </div>
          <AgentDemoPlayer demos={agentDemos} />
        </div>
      </section>

      {/* Data 360 & analytics */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Image src={data360.image} alt="Salesforce data analytics dashboards" width={640} height={420} sizes="(min-width: 1024px) 45vw, 100vw" className="w-full rounded-2xl object-cover shadow-lift ring-1 ring-line" />
          </Reveal>
          <div>
            <SectionHeading index="03" eyebrow="Data 360 & analytics" title={data360.tagline} className="mb-6 md:mb-8" />
            <Reveal className="space-y-6 text-lg leading-relaxed">
              <p>{data360.summary}</p>
              <Button href={`/services/${data360.slug}`} variant="secondary">
                Data 360 & Analytics <ArrowIcon />
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Public Sector & Grantmaking */}
      <Section tone="tint" aria-labelledby="public-title">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-8 text-white shadow-lift md:p-12">
          <div aria-hidden="true" className="absolute -top-20 -right-20 size-72 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.14em] text-brand-100 uppercase">04 · Public Sector & Grantmaking</p>
              <h2 id="public-title" className="mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-extrabold text-white">
                Enterprise grants management for government and education
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-50">
                Salesforce Grantmaking and Agentforce Public Sector for state agencies, councils and school districts: applicant portals, automated monitoring, integrations and a single system of record from planning through closeout.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {["Grantmaking", "Agentforce Public Sector", "Experience Cloud"].map((t) => (
                  <li key={t} className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/25">
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/solutions/public-sector" className="group/btn inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-50">
                Explore Public Sector <ArrowIcon />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* CoE advisory */}
      <Section>
        <SectionHeading index="05" eyebrow="Advisory & CoE" title="Centre of Excellence teams and org assessments" />
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {advisory.map((s, i) => (
            <RevealItem key={s.slug}>
              <ServiceCard service={s} index={i} showImage />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Discover Cloud product */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32" aria-labelledby="product-title">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Parallax speed={0.18} className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-square max-w-[78vw] sm:max-w-lg">
              <div aria-hidden="true" className="absolute inset-[8%] animate-spin-slow rounded-full border-2 border-dashed border-brand-200 motion-reduce:animate-none" />
              <div className="absolute inset-[18%] overflow-hidden rounded-full shadow-lift ring-8 ring-white">
                <Image src="/images/services/data-analytics.jpg" alt="Performance dashboards with charts on a laptop" fill sizes="30vw" className="object-cover" />
              </div>
              {product.modules.map((mod, i) => {
                const angle = (i / product.modules.length) * Math.PI * 2 - Math.PI / 2
                return (
                  <span
                    key={mod.title}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[0.6875rem] font-semibold whitespace-nowrap text-ink shadow-lift ring-1 ring-line sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                    style={{ left: `${50 + Math.cos(angle) * 46}%`, top: `${50 + Math.sin(angle) * 46}%` }}
                  >
                    <span className="font-mono text-xs text-brand-600">{mod.index}</span> {mod.title}
                  </span>
                )
              })}
            </div>
          </Parallax>
          <Reveal className="order-1 lg:order-2">
            <p className="eyebrow flex items-center gap-3">
              <CloudMark /> 06 · Our product
            </p>
            <h2 id="product-title" className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] font-extrabold">
              Discover Cloud: <span className="accent-serif text-brand-600">prebuilt scorecards</span> for top-tier code
            </h2>
            <p className="mt-5 text-lg leading-relaxed">{product.overview.body[0]}</p>
            <StatsCounter stats={product.results.stats.slice(0, 2)} className="mt-8 lg:grid-cols-2" />
            <Button href="/products" size="lg" className="mt-8">
              Explore Discover Cloud <ArrowIcon />
            </Button>
          </Reveal>
        </div>
      </section>

      <DreamforceFeature />

      <CTABanner title="Not sure which Salesforce capability you need?" lead="Tell us about your goals and we’ll connect you to the right Salesforce expert." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
