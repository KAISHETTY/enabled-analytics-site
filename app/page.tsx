import Image from "next/image"
import Link from "next/link"
import { clients, home, practiceAreas, product, services, site, testimonials } from "@/lib/content"
import { postSummaries } from "@/lib/blog"
import { agentDemos, agentforce } from "@/lib/agentforce"
import { caseStudies } from "@/lib/case-studies"
import { journey } from "@/lib/trust"
import { ArrowIcon, Button } from "@/components/ea/button"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { LogoMarquee } from "@/components/ea/logo-marquee"
import { StatsCounter } from "@/components/ea/stats-counter"
import { TestimonialSlider } from "@/components/ea/testimonial-slider"
import { PostCard } from "@/components/ea/cards"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { SkyScene, CloudSeam, CloudMark, Cloud } from "@/components/motion/sky-scene"
import { SplitReveal } from "@/components/motion/split-reveal"
import { RotatingBadge } from "@/components/motion/rotating-badge"
import { ScrollHighlight } from "@/components/motion/scroll-highlight"
import { TrailPath } from "@/components/motion/trail-path"
import { PinnedSteps } from "@/components/motion/pinned-steps"
import { HorizontalPin } from "@/components/motion/horizontal-pin"
import { Typewriter } from "@/components/motion/typewriter"
import { Parallax } from "@/components/motion/parallax"
import { TrustStrip } from "@/components/story/trust-strip"
import { FanCards } from "@/components/story/fan-cards"
import { AgentDemoPlayer } from "@/components/story/agent-demo"
import { SolutionStack } from "@/components/story/solution-stack"
import { PracticeList } from "@/components/story/practice-list"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { DreamforceFeature } from "@/components/story/dreamforce-feature"
import { HealthTeaser } from "@/components/story/health-teaser"
import { HowWeWork } from "@/components/story/how-we-work"
import { GrowthSection } from "@/components/story/growth-section"

const byslug = (s: string) => services.find((x) => x.slug === s)!

const STEP_VISUALS = [
  { img: "/images/home/advisory-services.jpg", chip: "Discovery workshop", note: "Pain points → possible solutions → perfect fit" },
  { img: "/images/home/service-offerings.jpg", chip: "Proven methodology", note: "Accelerators · CoE teams · Hybrid Agile" },
  { img: "/images/home/data-services.jpg", chip: "Measured with scorecards", note: "Revenue sources · ROI · continuous Evolution" },
]

export default function HomePage() {
  return (
    <>
      {/* ── Chapter 0 · Sky hero (TO TOP layered parallax, SplitText title) ── */}
      <SkyScene badge={<RotatingBadge href="/health-check" text="Free Org Health Check • 48 hours • " />}>
        <div className="container-page">
          <p className="eyebrow mb-6 flex items-center gap-3 animate-in fade-in duration-700 fill-mode-both" style={{ animationDelay: "500ms" }}>
            <CloudMark /> Salesforce Summit Partner
          </p>
          <h1 className="max-w-6xl text-[clamp(2.9rem,8vw,7.25rem)] leading-[0.92] font-extrabold tracking-[-0.035em]">
            <SplitReveal
              delay={550}
              parts={[{ text: "Complete Suite of", className: "block" }, { text: "Salesforce Solutions", className: "block text-brand-600" }, { text: "in One Place", className: "block accent-serif font-normal tracking-normal" }]}
            />
          </h1>
          <div className="mt-8 flex max-w-5xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl animate-in text-lg leading-relaxed duration-700 fill-mode-both fade-in slide-in-from-bottom-3 md:text-xl" style={{ animationDelay: "1300ms" }}>
              {home.hero.lead} From CoE teams and org assessments to Agentforce AI agents, we help you get Salesforce right the first time.
            </p>
            <div className="flex shrink-0 animate-in flex-wrap gap-3 duration-700 fill-mode-both fade-in" style={{ animationDelay: "1450ms" }}>
              <Button href="/health-check" size="lg">
                Get your free Org Health Score <ArrowIcon />
              </Button>
              <Button href="/agentforce" size="lg" variant="secondary">
                Explore Agentforce
              </Button>
            </div>
          </div>
        </div>
      </SkyScene>

      {/* ── Trust + logos (ABSYZ "Enduring relationships" / "Awards") ── */}
      <section className="relative z-30 -mt-28 pb-16 md:-mt-36">
        <div className="container-page">
          <Reveal>
            <TrustStrip />
          </Reveal>
        </div>
        <div className="mt-14">
          <p className="eyebrow mb-6 flex items-center justify-center gap-3">
            <CloudMark /> {home.clientsTitle}
          </p>
          <LogoMarquee logos={clients} duration={70} />
        </div>
      </section>

      {/* ── Chapter 1 · Where is your org today? (TO TOP signposts + trail) ── */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <TrailPath className="hidden opacity-70 md:block" />
        <div className="container-page relative">
          <SectionHeading
            align="center"
            index="01"
            eyebrow="Your journey"
            title={
              <>
                Where is your Salesforce org <span className="accent-serif text-brand-600">today?</span>
              </>
            }
            lead="Whether you're dealing with a well-established Salesforce org or starting fresh, our CoE teams offer invaluable guidance and support from day one."
          />
          <FanCards
            cards={[
              {
                kicker: "Starting fresh",
                title: "Get it right the first time",
                text: "Wouldn’t it be great to hit the bull’s eye the very first time? Start on a solid foundation instead of from scratch.",
                points: ["Integration frameworks & pre-built data models", "Data migration templates & apex utilities", "Deploy at 3X speed with our accelerators"],
                href: "/get-a-quote",
                cta: "Plan my implementation",
              },
              {
                kicker: "Established org",
                title: "Get it running like new",
                text: "Technical debt, outdated workflows and undocumented changes slow every org down. Our expert “mechanics” get yours running like new.",
                points: ["Initial assessment & quick health check", "The Three Angles: enterprise, data, vision", "Phased lift-and-shift execution plan"],
                href: "/health-check",
                cta: "Check my org’s health",
              },
            ]}
          />
        </div>
      </section>

      {/* ── Chapter 2 · Manifesto (DAQ scroll-highlight) ── */}
      <section className="relative bg-white pb-24 md:pb-36">
        <div className="container-page">
          <p className="eyebrow mb-8 flex items-center gap-3">
            <span className="text-ink-subtle">02</span>
            <span className="h-px w-8 bg-brand-200" aria-hidden="true" />
            {home.intro.title}
          </p>
          <ScrollHighlight text="Boost productivity, deliver *personalized* experiences, enhance revenue and do so much more. Armed with top-drawer Salesforce professionals, we provide outstanding solutions for every Salesforce Cloud, and you can *measure* your success with our pre-built scorecards." />
          <Reveal className="mt-16">
            <StatsCounter stats={home.stats} variant="inline" />
          </Reveal>
        </div>
      </section>

      {/* ── How we work: pinned road journey (CoE Enablement process from the site) ── */}
      <section className="relative bg-white" aria-label="How we work">
        <HowWeWork
          title={
            <>
              Flexible process, <span className="accent-serif text-brand-600">tailored for your success</span>
            </>
          }
          lead={byslug("coe-enablement").process!.lead}
          steps={byslug("coe-enablement").process!.steps}
        />
      </section>

      {/* ── Chapter 3 · Agentforce (ABSYZ "The Future Is Agentic") ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-agent-50/60 to-white py-24 md:py-36" aria-labelledby="agentic-title">
        <div aria-hidden="true" className="absolute top-20 -left-40 size-[520px] rounded-full bg-agent-100/50 blur-3xl" />
        <div aria-hidden="true" className="absolute right-[-10%] bottom-10 size-[460px] rounded-full bg-brand-100/60 blur-3xl" />
        <div className="container-page relative">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal className="max-w-3xl">
              <p className="eyebrow flex items-center gap-3 text-agent-600">
                <CloudMark tone="agent" /> 03 · {agentforce.eyebrow}
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
              <Button href="/agentforce#readiness" variant="secondary">
                AI Readiness Assessment
              </Button>
            </Reveal>
          </div>
          <AgentDemoPlayer demos={agentDemos} />
        </div>
      </section>

      {/* ── Chapter 4 · Solutions (TO TOP stacking cards) ── */}
      <section className="relative bg-white pt-24 md:pt-36">
        <div className="container-page">
          <SectionHeading
            index="04"
            eyebrow="Solutions"
            title={
              <>
                {home.segments.title.split(" With ")[0]} <span className="accent-serif text-brand-600">with the right teams</span>
              </>
            }
            lead={home.segments.lead}
          />
          <SolutionStack
            cards={[
              { index: "01", kicker: "Centre of Excellence", title: byslug("coe-teams").title, text: byslug("coe-teams").summary, tags: ["Solution architects", "Technical architects", "Design architects"], href: "/services/coe-teams", image: byslug("coe-teams").image },
              { index: "02", kicker: "Think tanks", title: byslug("coe-enablement").title, text: byslug("coe-enablement").summary, tags: ["Evaluation", "Prioritization", "Maturity", "Seamless exit"], href: "/services/coe-enablement", image: "/images/services/coe-maturity.jpg" },
              { index: "03", kicker: "Health check", title: byslug("org-assessment").title, text: byslug("org-assessment").summary, tags: ["Technical debt", "Data volumes", "Execution plan"], href: "/services/org-assessment", image: byslug("org-assessment").image },
              { index: "04", kicker: "Data Cloud", title: byslug("data-analytics").title, text: byslug("data-analytics").summary, tags: ["Real-time analytics", "Harmonized data", "Forecasts"], href: "/services/data-analytics", image: byslug("data-analytics").image },
              { index: "05", kicker: "AI agents", title: "Agentforce", text: "Autonomous AI agents grounded in Data Cloud, built and governed by our CoE, from readiness assessment to production.", tags: ["Use-case discovery", "Trust layer", "Testing", "Adoption"], href: "/agentforce", image: "/images/services/data-cloud.jpg", agent: true },
            ]}
          />
        </div>
      </section>

      {/* ── Chapter 5 · Shape Cycle (DAQ pinned steps) ── */}
      <section className="relative bg-surface" aria-label={home.shapeCycle.title}>
        <CloudSeam fill="white" flip className="absolute top-0" />
        <PinnedSteps
          intro={
            <>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-ink-subtle">05</span> <span className="h-px w-8 bg-brand-200" aria-hidden="true" /> Our process
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

      {/* ── Chapter 6 · Practice areas (hover list) ── */}
      <Section>
        <SectionHeading
          index="06"
          eyebrow="Practice areas"
          title={
            <>
              Every Salesforce Cloud, <span className="accent-serif text-brand-600">one partner</span>
            </>
          }
          lead="Enabled Analytics leverages a dedicated team of in-house experts to ensure extensive and specialized support across our diverse customer base."
          actions={
            <Button href="/services" variant="secondary">
              All services <ArrowIcon />
            </Button>
          }
        />
        <PracticeList items={practiceAreas} />
      </Section>

      {/* ── Chapter 7 · Journey (ABSYZ timeline on DAQ horizontal pin) ── */}
      <div className="relative bg-sky">
        <CloudSeam fill="white" flip className="absolute top-0" />
        <HorizontalPin
          labels={journey.map((j) => j.tag)}
          heading={
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow flex items-center gap-3">
                  <CloudMark /> 07 · Our journey
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
            <article key={j.title} className="relative flex h-[400px] flex-col rounded-[2rem] border border-white bg-white/85 p-8 shadow-lift backdrop-blur">
              <span className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">{j.tag}</span>
              <span aria-hidden="true" className="mt-6 font-heading text-[5.5rem] leading-none font-extrabold text-brand-100">
                {j.when ?? String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-auto text-2xl font-bold">{j.title}</h3>
              <p className="mt-3 leading-relaxed">{j.text}</p>
              {j.when && <span className="absolute top-8 right-8 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">{j.when}</span>}
            </article>
          ))}
        </HorizontalPin>
      </div>

      {/* ── How we are growing (ABSYZ world map, rebuilt) ── */}
      <GrowthSection />

      {/* ── Chapter 8 · Case studies ── */}
      <Section className="pt-24">
        <SectionHeading
          index="08"
          eyebrow="Case studies"
          title={
            <>
              Challenge → Solution → <span className="accent-serif text-brand-600">Result</span>
            </>
          }
          lead="Real engagements, in our clients’ own words."
          actions={
            <Button href="/case-studies" variant="secondary">
              All case studies <ArrowIcon />
            </Button>
          }
        />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((c, i) => (
            <RevealItem key={c.slug}>
              <CaseStudyCard c={c} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── Chapter 9 · Dreamforce ── */}
      <DreamforceFeature />

      {/* ── Chapter 10 · Discover Cloud product ── */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
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
              <CloudMark /> 10 · Our product
            </p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] font-extrabold">
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

      {/* ── Chapter 11 · Lead magnet ── */}
      <HealthTeaser />

      {/* ── Chapter 12 · Testimonials ── */}
      <Section tone="white">
        <SectionHeading index="12" eyebrow="Testimonials" title={home.testimonialsTitle} actions={<Button href="/testimonials" variant="secondary">Read all <ArrowIcon /></Button>} />
        <TestimonialSlider items={testimonials} />
      </Section>

      {/* ── Insights ── */}
      <Section tone="tint">
        <SectionHeading index="13" eyebrow="Insights" title="From the Enabled Analytics blog" actions={<Button href="/blog" variant="secondary">All insights <ArrowIcon /></Button>} />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {postSummaries.slice(0, 3).map((p) => (
            <RevealItem key={p.slug}>
              <PostCard post={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── Finale (TO TOP "Ready for the journey together?") ── */}
      <section className="bg-sky relative overflow-hidden pt-28 pb-40 text-center md:pt-36 md:pb-52">
        <CloudSeam fill="var(--color-surface)" flip className="absolute top-0" />
        <Parallax speed={0.35} className="pointer-events-none absolute inset-x-0 bottom-0 h-full">
          <Cloud className="absolute bottom-10 left-[-5%] w-[38vw]" />
          <Cloud className="absolute right-[-8%] bottom-20 w-[42vw]" />
          <Cloud className="absolute bottom-[-4rem] left-[30%] w-[34vw]" />
        </Parallax>
        <div className="container-page relative">
          <p className="eyebrow flex items-center justify-center gap-3">
            <CloudMark /> Ready for the journey together?
          </p>
          <h2 className="mx-auto mt-6 max-w-5xl text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
            Accelerate adoption. <span className="accent-serif text-brand-600">Maximize</span> your Salesforce ROI.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg">Tell us about your project in brief and we’ll connect you to one of our Salesforce experts.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/get-a-quote" size="lg">
              Start your project <ArrowIcon />
            </Button>
            <Button href={`tel:${site.phoneHref}`} size="lg" variant="secondary">
              Call {site.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
