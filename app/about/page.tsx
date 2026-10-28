import type { Metadata } from "next"
import Image from "next/image"
import { about, careers, home, site, team } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { StatsCounter } from "@/components/ea/stats-counter"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { TeamCard } from "@/components/ea/team-card"
import { Gallery } from "@/components/ea/gallery"
import { CTABanner } from "@/components/ea/cta-banner"
import { GrowthSection } from "@/components/story/growth-section"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"

export const metadata: Metadata = {
  title: "About Us",
  description: "With a mission of helping businesses thrive by harnessing the power of Salesforce, and a vision of delivering world-class services and implementations, Enabled Analytics was formed.",
  alternates: { canonical: "/about" },
}

const galleryImages = [
  { src: about.culture.image, alt: "Recognising excellence at Enabled Analytics", width: 536, height: 332 },
  { src: about.story.image, alt: "Enabled Analytics team meeting", width: 535, height: 397 },
  { src: home.intro.images[0], alt: "Consultants reviewing analytics dashboards", width: 306, height: 399 },
  { src: home.intro.images[1], alt: "Colleagues collaborating on a project", width: 305, height: 399 },
  { src: careers.images[0], alt: "Partners shaking hands after a successful engagement", width: 420, height: 229 },
  { src: careers.images[1], alt: "Enabled Analytics team at work", width: 420, height: 229 },
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

      <Section>
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
              <Button href="/careers" variant="secondary">
                Join the team <ArrowIcon />
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="tint">
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
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.groups[0].members.map((m) => (
            <RevealItem key={m.name}>
              <TeamCard member={m} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <GrowthSection />

      <Section>
        <SectionHeading index="05" eyebrow="Life at EA" title="Inside Enabled Analytics" />
        <Gallery images={galleryImages} />
      </Section>

      <CTABanner title={home.cta.title} primary={home.cta.button} secondary={{ label: "Explore services", href: "/services" }} />
    </>
  )
}
