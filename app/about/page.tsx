import type { Metadata } from "next"
import Image from "next/image"
import { about, home, site, team } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { StatsCounter } from "@/components/ea/stats-counter"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { TeamCard } from "@/components/ea/team-card"
import { CTABanner } from "@/components/ea/cta-banner"
import { GrowthSection } from "@/components/story/growth-section"
import { HorizontalPin } from "@/components/motion/horizontal-pin"
import { CloudMark, CloudSeam } from "@/components/motion/sky-scene"
import { journey } from "@/lib/trust"
import { differentiators, orchestrator, overview } from "@/lib/overview"
import { Orchestrator } from "@/components/story/orchestrator"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"

export const metadata: Metadata = {
  title: "About Us",
  description: "With a mission of helping businesses thrive by harnessing the power of Salesforce, and a vision of delivering world-class services and implementations, Enabled Analytics was formed.",
  alternates: { canonical: "/about" },
}

/** Life at EA photo wall: a landscape pair and two portraits (grid spans match each photo's shape). */
const LIFE = [
  { src: "/images/life/team-outing.webp", alt: "Enabled Analytics team members at a team outing", caption: "Team outing", span: "col-span-2" },
  { src: "/images/life/team-workshop.webp", alt: "Team members listening to a presentation in a working session", caption: "Working sessions", span: "row-span-2", focus: "object-[50%_80%]" },
  { src: "/images/life/team-get-together.webp", alt: "Enabled Analytics colleagues together in a meeting room", caption: "Together in person", span: "row-span-2", focus: "object-[50%_85%]" },
  { src: "/images/life/india-office-celebration.webp", alt: "The India team celebrating together at the office", caption: "Celebrations at our India office", span: "col-span-2" },
]

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title={about.story.title} lead={about.story.body[0]} crumbs={[{ label: "About Us" }]} image={{ src: about.story.image, alt: "Enabled Analytics team in a strategy meeting" }} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading index="01" eyebrow="Who we are" title="A hub of talented Salesforce experts" className="mb-0 md:mb-0" />
          <Reveal className="space-y-5 text-lg leading-relaxed">
            {about.story.body.slice(1).map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <p>{site.globalPresence}</p>
          </Reveal>
        </div>
        <Reveal className="mt-14">
          <StatsCounter stats={about.stats} variant="inline" />
        </Reveal>
      </Section>

      <Section tone="tint">
        <SectionHeading index="02" eyebrow="Our approach" title={about.fourEs.title} lead={about.fourEs.lead} align="center" />
        <FeatureGrid items={about.fourEs.items} variant="numbered" columns={4} />
        <Reveal className="mx-auto mt-12 max-w-3xl text-center text-lg leading-relaxed">
          <p>{about.fourEs.closing}</p>
        </Reveal>
      </Section>

      {/* From the Salesforce Overview deck: "Technology Orchestrator" and "Key Differentiators". */}
      <Section className="overflow-hidden">
        <SectionHeading
          eyebrow="Why Enabled Analytics"
          title={
            <>
              Your <span className="accent-serif text-brand-600">{orchestrator.title.toLowerCase()}</span>
            </>
          }
          lead={orchestrator.lead}
          align="center"
        />
        <Orchestrator items={orchestrator.items} />
        <Reveal className="mx-auto mt-14 max-w-3xl text-center text-lg leading-relaxed">
          <p>{overview.focus}</p>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <RevealItem key={d.title}>
              <article className="group/d h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <p className="font-mono text-xs tracking-[0.14em] text-brand-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-lg font-bold">{d.title}</h3>
                {d.points.length > 0 && <p className="mt-2 text-[0.9375rem] leading-relaxed">{d.points.join(" · ")}</p>}
                <span aria-hidden="true" className="mt-4 block h-0.5 w-10 bg-brand-500 transition-all duration-500 group-hover/d:w-full" />
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="tint">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <Image src={about.culture.image} alt="Hand holding a glowing award badge, representing excellence" width={536} height={332} sizes="(min-width: 1024px) 45vw, 100vw" className="w-full rounded-2xl object-cover shadow-lift ring-1 ring-line" />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading index="03" eyebrow="Culture" title={about.culture.title} className="mb-6 md:mb-8" />
            <Reveal className="space-y-5 text-lg leading-relaxed">
              {about.culture.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          index="04"
          eyebrow="Leadership"
          title={team.groups[0].title}
          actions={
            <Button href="/team" variant="secondary">
              Meet the leadership <ArrowIcon />
            </Button>
          }
        />
        <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {team.groups[0].members.map((m) => (
            <RevealItem key={m.name}>
              <TeamCard member={m} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* History: the company timeline, moved here from the homepage. */}
      <div id="history" className="relative scroll-mt-20 bg-sky">
        <CloudSeam fill="white" flip className="absolute top-0" />
        <HorizontalPin
          labels={journey.map((j) => j.tag)}
          heading={
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow flex items-center gap-3">
                  <CloudMark /> 05 · Our history
                </p>
                <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-extrabold">
                  From one mission to <span className="accent-serif text-brand-600">four regions</span>
                </h2>
              </div>
              <p className="max-w-sm text-lg">Keep scrolling: our story moves sideways.</p>
            </div>
          }
        >
          {journey.map((j, i) => (
            <article key={j.title} className="relative flex h-[340px] flex-col rounded-[2rem] border border-white bg-white/85 p-6 shadow-lift backdrop-blur sm:h-[400px] sm:p-8">
              <span className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">{j.tag}</span>
              <span aria-hidden="true" className="mt-4 font-heading text-[clamp(3rem,15vw,5.5rem)] leading-none font-extrabold whitespace-nowrap text-brand-100 sm:mt-6">
                {j.when?.split(" ").pop() ?? String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-auto text-xl font-bold sm:text-2xl">{j.title}</h3>
              <p className="mt-3 line-clamp-4 leading-relaxed">{j.text}</p>
              {j.when && <span className="absolute top-6 right-6 rounded-full sm:top-8 sm:right-8 bg-brand-600 px-3 py-1 text-xs font-semibold text-white">{j.when}</span>}
            </article>
          ))}
        </HorizontalPin>
      </div>

      <div id="locations" className="scroll-mt-20">
        <GrowthSection />
      </div>

      <Section>
        <SectionHeading index="06" eyebrow="Life at EA" title="Inside Enabled Analytics" lead="One team across the USA and India, working, learning and celebrating together." />
        <RevealGroup className="grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-5 lg:auto-rows-[260px] lg:grid-cols-4">
          {LIFE.map((p) => (
            <RevealItem key={p.src} className={`group/photo relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-line ${p.span}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className={`object-cover transition-transform duration-700 group-hover/photo:scale-105 ${"focus" in p ? p.focus : ""}`} />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-800/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur sm:bottom-4 sm:left-4 sm:text-sm">{p.caption}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTABanner title={home.cta.title} primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "Explore services", href: "/services" }} />
    </>
  )
}
