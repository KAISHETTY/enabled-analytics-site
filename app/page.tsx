import { clients, home } from "@/lib/content"
import { homeCopy, industryLinks, offerings } from "@/lib/offerings"
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
import { FeatureGrid } from "@/components/ea/feature-grid"
import { ContactForm } from "@/components/forms/contact-form"

/** Stacked-alpha hero clip: colour on top, matte below (see components/story/hero-mascot.tsx). */
const HERO_MASCOT = { src: "/videos/longhorn-hero.mp4", srcSmall: "/videos/longhorn-hero-sm.mp4", poster: "/images/mascot/longhorn-hero-poster.webp", width: 734, height: 600, loopStart: 14.708 }

/** Proof of experience: one Commercial and one Public Sector study (approved case studies). */
const FEATURED = ["manufacturing-implementation-risk", "state-developmental-disabilities-council-grants"].map((s) => getCaseStudy(s)!)

const TONES = ["dark", "navy", "light"] as const
const INDUSTRIES: Sector[] = industryLinks.map((l, k) => ({ href: l.href, icon: l.icon, kicker: l.title, title: l.link, text: l.text, tags: [], tone: TONES[k] }))

export default function HomePage() {
  return (
    <>
      {/* ── 01 · Introduction ── */}
      <SkyScene>
        <div className="container-page relative">
          <p className="eyebrow mb-6 flex items-center gap-3 animate-in fade-in duration-700 fill-mode-both" style={{ animationDelay: "500ms" }}>
            <CloudMark /> {homeCopy.label}
          </p>
          <h1 className="max-w-[60rem] text-[clamp(2.1rem,4.2vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
            <SplitReveal
              delay={550}
              parts={[{ text: "Engineering-led solutions", className: "block" }, { text: "for critical", className: "block text-brand-600" }, { text: "business workflows.", className: "block accent-serif font-normal tracking-normal" }]}
            />
          </h1>
          <div className="mt-6 flex max-w-2xl flex-col items-start gap-5 md:mt-8 md:gap-7">
            <p className="max-w-2xl animate-in text-base leading-relaxed duration-700 fill-mode-both fade-in slide-in-from-bottom-3 sm:text-lg" style={{ animationDelay: "1300ms" }}>
              {homeCopy.lead}
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

      {/* ── 03 · Why Enabled Analytics ── */}
      <section className="relative overflow-hidden py-20 md:py-28" aria-labelledby="why-title">
        <div className="container-page">
          <SectionHeading
            index="01"
            eyebrow="Why Enabled Analytics"
            title={
              <span id="why-title">
                What makes us <span className="accent-serif text-brand-600">different</span>
              </span>
            }
          />
          <FeatureGrid items={homeCopy.differentiators} columns={4} />
        </div>
      </section>

      {/* ── 04 · What We Do ── */}
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
            eyebrow="What we do"
            title={<span id="services-title">{homeCopy.servicesTitle}</span>}
            actions={
              <Button href="/services" variant="secondary">
                Explore Our Services <ArrowIcon />
              </Button>
            }
          />
          <ServiceCards services={offerings.map((o) => ({ slug: o.slug, href: o.href, title: o.title, summary: o.summary, icon: o.icon }))} />
        </div>
      </section>

      {/* ── 05 · Industries ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50 to-white py-20 md:py-28" aria-labelledby="industries-title">
        <TrailPath className="hidden opacity-80 md:block" d="M540 0 C 500 120, 530 260, 440 360 S 250 430, 280 600 S 110 900, 60 1100" />
        <div className="container-page relative">
          <SectionHeading index="03" eyebrow="Industries" title={<span id="industries-title">{homeCopy.industriesTitle}</span>} lead={homeCopy.industriesLead} />
          <SectorCards sectors={INDUSTRIES} />
        </div>
      </section>

      {/* ── 06 · Proof of experience ── */}
      <section className="relative overflow-hidden py-20 md:py-28" aria-labelledby="results-title">
        <div className="container-page">
          <SectionHeading
            index="04"
            eyebrow="Proof of experience"
            title={
              <span id="results-title">
                Challenge → Solution → <span className="accent-serif text-brand-600">Result</span>
              </span>
            }
            actions={
              <Button href="/clients" variant="secondary">
                Client Success <ArrowIcon />
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

      {/* ── 07 · Get in touch ── */}
      <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-sky py-24 md:py-32" aria-labelledby="contact-title">
        <TrailPath className="hidden opacity-70 md:block" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            index="05"
            eyebrow="Get in touch"
            title={
              <span id="contact-title">
                Let’s talk about <span className="accent-serif text-brand-600">your workflow</span>
              </span>
            }
            lead="Tell us about your project in brief and we’ll connect you to one of our specialists."
          />
          <Reveal className="rounded-[1.75rem] border border-line bg-white p-6 shadow-lift md:p-10">
            <ContactForm idPrefix="home" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
