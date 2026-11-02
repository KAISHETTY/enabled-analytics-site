import { clients, coreServices, home } from "@/lib/content"
import { industryExpertise } from "@/lib/overview"
import { getCaseStudy } from "@/lib/case-studies"
import { ArrowIcon, Button } from "@/components/ea/button"
import { SectionHeading } from "@/components/ea/section-heading"
import { LogoMarquee } from "@/components/ea/logo-marquee"
import { Reveal, SwingIn } from "@/components/ea/reveal"
import { SkyScene, CloudMark, Cloud } from "@/components/motion/sky-scene"
import { SplitReveal } from "@/components/motion/split-reveal"
import { TrailPath } from "@/components/motion/trail-path"
import { TrustStrip } from "@/components/story/trust-strip"
import { SectorCards, type Sector } from "@/components/story/sector-cards"
import { ServiceCards } from "@/components/story/service-cards"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { HeroMascot } from "@/components/story/hero-mascot"
import { JourneyContact } from "@/components/story/journey-contact"

/** Stacked-alpha hero clip: colour on top, matte below (see components/story/hero-mascot.tsx). */
const HERO_MASCOT = { src: "/videos/longhorn-hero.mp4", srcSmall: "/videos/longhorn-hero-sm.mp4", poster: "/images/mascot/longhorn-hero-poster.webp", width: 734, height: 600, loopStart: 14.708 }

/** Featured client results: one Commercial and one Public Sector study. */
const COMMERCIAL_INDUSTRIES = industryExpertise.filter((i) => !["telecom", "public-sector"].includes(i.slug)).map((i) => i.title)

const FEATURED = ["manufacturing-implementation-risk", "state-developmental-disabilities-council-grants"].map((s) => getCaseStudy(s)!)

/** Public Sector and Telecom come first so both are visible immediately (2026-11-02 feedback). */
const SECTORS: Sector[] = [
  {
    href: "/solutions/public-sector",
    icon: "landmark",
    kicker: "Public Sector",
    title: "Grants, programs and services for government",
    text: "Grantmaking and Agentforce Public Sector for state agencies, councils and school districts, from applications through monitoring and closeout.",
    tags: ["Grants management", "Self-service portals", "Case management"],
    tone: "dark",
  },
  {
    href: "/solutions/telecom",
    icon: "radio",
    kicker: "Telecom",
    title: "Faster quotes and a 360° view of every customer",
    text: "Customer 360, smart pricing and quotation lifecycle management on Communications and Revenue Cloud, with IT autonomy over product changes.",
    tags: ["Customer 360", "Smart pricing", "Quote lifecycle"],
    tone: "navy",
  },
  {
    href: "/solutions/commercial",
    icon: "building",
    kicker: "Commercial",
    title: "Win effortlessly in every segment",
    text: home.segments.lead,
    tags: COMMERCIAL_INDUSTRIES,
    tone: "light",
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── 01 · Introduction ── */}
      <SkyScene>
        <div className="container-page relative">
          <p className="eyebrow mb-6 flex items-center gap-3 animate-in fade-in duration-700 fill-mode-both" style={{ animationDelay: "500ms" }}>
            <CloudMark /> Salesforce Summit Partner
          </p>
          <h1 className="max-w-6xl text-[clamp(2.5rem,8vw,7.25rem)] leading-[0.92] font-extrabold tracking-[-0.035em]">
            <SplitReveal
              delay={550}
              parts={[{ text: "Complete Suite of", className: "block" }, { text: "Salesforce Solutions", className: "block text-brand-600" }, { text: "in One Place", className: "block accent-serif font-normal tracking-normal" }]}
            />
          </h1>
          <div className="mt-6 flex max-w-2xl flex-col items-start gap-5 md:mt-8 md:gap-7">
            <p className="max-w-xl animate-in text-base leading-relaxed duration-700 fill-mode-both fade-in slide-in-from-bottom-3 sm:text-lg md:text-xl" style={{ animationDelay: "1300ms" }}>
              Enabled Analytics helps commercial and public sector organizations implement, support and scale Salesforce, with certified experts who get it right the first time.
            </p>
            {/* Phones: the longhorn stands beside the button so he is on the first screen. Desktop: he stands to the right of the headline. */}
            <div className="flex w-full items-end justify-between gap-2 lg:block">
              <div className="mb-4 shrink-0 animate-in duration-700 fill-mode-both fade-in lg:mb-0" style={{ animationDelay: "1450ms" }}>
                <Button href="/contact" size="lg">
                  Contact Us <ArrowIcon />
                </Button>
              </div>
              {/* Longhorn plants the summit flag, then idles proudly. */}
              <HeroMascot
                src={HERO_MASCOT.src}
                srcSmall={HERO_MASCOT.srcSmall}
                poster={HERO_MASCOT.poster}
                width={HERO_MASCOT.width}
                height={HERO_MASCOT.height}
                loopStart={HERO_MASCOT.loopStart}
                foreground={
                  <div aria-hidden="true" className="absolute -bottom-[5%] left-[8%] w-[84%] origin-bottom scale-y-[0.3]">
                    <Cloud className="w-full drop-shadow-[0_-6px_18px_rgba(1,118,211,0.12)]" />
                  </div>
                }
                className="-mr-3 w-[52%] max-w-[300px] sm:w-[44%] lg:!absolute lg:right-[5%] lg:-bottom-4 lg:mr-0 lg:h-[min(40vh,420px)] lg:w-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </SkyScene>

      {/* ── 02 · Credibility ── */}
      <section className="relative z-30 -mt-24 md:-mt-36" aria-label="Credibility">
        <div className="container-page">
          <Reveal>
            <TrustStrip credibility />
          </Reveal>
        </div>
      </section>

      {/* ── 03 · Public Sector, Telecom & Commercial ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50 to-white py-20 md:py-28" aria-labelledby="sectors-title">
        {/* two cloud layers drifting at different speeds */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 h-40">
          <div className="flex w-[200%] animate-drift opacity-80 motion-reduce:animate-none">
            {[0, 1].map((k) => (
              <div key={k} className="relative h-40 w-1/2">
                <Cloud className="absolute top-0 left-[8%] w-44" opacity={0.9} />
                <Cloud className="absolute top-16 left-[46%] w-28" opacity={0.7} />
                <Cloud className="absolute top-4 left-[78%] w-36" opacity={0.85} />
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-6 h-48">
          <div className="flex w-[200%] animate-drift opacity-90 [animation-direction:reverse] [animation-duration:90s] motion-reduce:animate-none">
            {[0, 1].map((k) => (
              <div key={k} className="relative h-48 w-1/2">
                <Cloud className="absolute bottom-0 left-[2%] w-64" />
                <Cloud className="absolute bottom-10 left-[40%] w-40" opacity={0.8} />
                <Cloud className="absolute bottom-2 left-[70%] w-56" opacity={0.95} />
              </div>
            ))}
          </div>
        </div>
        {/* dotted road that draws itself as you scroll, weaving between the heading and the cards */}
        <TrailPath className="hidden opacity-80 md:block" d="M540 0 C 500 120, 530 260, 440 360 S 250 430, 280 600 S 110 900, 60 1100" />
        <div className="container-page relative">
          <SectionHeading
            index="01"
            eyebrow="Who we serve"
            title={
              <span id="sectors-title">
                Built for <span className="accent-serif text-brand-600">your sector</span>
              </span>
            }
            lead="Three teams, one standard of delivery. Choose where you work and see how we help."
          />
          <SectorCards sectors={SECTORS} />
        </div>
      </section>

      {/* ── 04 · Core Services ── */}
      <section className="relative overflow-hidden bg-surface py-20 md:py-28" aria-labelledby="services-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 h-32">
          <div className="flex w-[200%] animate-drift opacity-70 [animation-duration:80s] motion-reduce:animate-none">
            {[0, 1].map((k) => (
              <div key={k} className="relative h-32 w-1/2">
                <Cloud className="absolute top-2 left-[60%] w-36" opacity={0.8} />
                <Cloud className="absolute top-12 left-[88%] w-24" opacity={0.6} />
              </div>
            ))}
          </div>
        </div>
        <div className="container-page relative">
          <SectionHeading
            index="02"
            eyebrow="Core services"
            title={
              <span id="services-title">
                Everything you need, <span className="accent-serif text-brand-600">from one partner</span>
              </span>
            }
            actions={
              <Button href="/services" variant="secondary">
                Services in detail <ArrowIcon />
              </Button>
            }
          />
          <ServiceCards services={coreServices} />
        </div>
      </section>

      {/* ── 05 · Client Success ── */}
      <section className="relative overflow-hidden py-20 md:py-28" aria-labelledby="results-title">
        <div className="container-page">
          <SectionHeading
            index="03"
            eyebrow="Client success"
            title={
              <span id="results-title">
                Challenge → Solution → <span className="accent-serif text-brand-600">Result</span>
              </span>
            }
            actions={
              <Button href="/case-studies" variant="secondary">
                All case studies <ArrowIcon />
              </Button>
            }
          />
        </div>
        <div className="mb-12">
          <p className="eyebrow mb-6 flex items-center justify-center gap-3">
            <CloudMark /> {home.clientsTitle}
          </p>
          <LogoMarquee logos={clients} duration={70} />
        </div>
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            {FEATURED.map((c, i) => (
              <SwingIn key={c.slug} from={i === 0 ? "left" : "right"} delay={i * 0.12} className="h-full">
                <CaseStudyCard c={c} />
              </SwingIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 · Your Journey & Contact ── */}
      <section className="relative overflow-hidden bg-sky py-24 md:py-32" aria-labelledby="journey-title">
        <TrailPath className="hidden opacity-70 md:block" />
        <div className="container-page relative">
          <SectionHeading
            align="center"
            index="04"
            eyebrow="Your journey"
            title={
              <span id="journey-title">
                Where is your Salesforce org <span className="accent-serif text-brand-600">today?</span>
              </span>
            }
            lead="Whether you're dealing with a well-established Salesforce org or starting fresh, our CoE teams offer invaluable guidance and support from day one."
          />
          <JourneyContact />
        </div>
      </section>
    </>
  )
}
