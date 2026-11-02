import type { Metadata } from "next"
import { clients, home, testimonials } from "@/lib/content"
import { getCaseStudy } from "@/lib/case-studies"
import { overview } from "@/lib/overview"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { TestimonialSlider } from "@/components/ea/testimonial-slider"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, SwingIn } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { TrustStrip } from "@/components/story/trust-strip"
import { LogoWall } from "@/components/story/logo-wall"
import { CaseStudyCard } from "@/components/story/case-study-card"

export const metadata: Metadata = {
  title: "Clients: Public Sector, Telecom & Commercial",
  description: "Organizations across the public sector, telecom and commercial industries trust Enabled Analytics, a Salesforce Summit Consulting Partner and ISV partner, with their Salesforce programs.",
  alternates: { canonical: "/clients" },
}

/** One story per sector. */
const FEATURED = ["jtc-public-sector-digital-transformation", "communications-sales-ecosystem", "manufacturing-implementation-risk"].map((s) => getCaseStudy(s)!)

export default function ClientsPage() {
  return (
    <>
      <PageHero eyebrow="Client Success" title="Trusted by organizations that can’t afford to get it wrong" lead={overview.positioning} crumbs={[{ label: "Client Success" }]} image={{ src: "/images/photos/client-call.webp", alt: "A consultant on a video call with a client team" }}>
        <Button href="/case-studies" size="lg">
          Case studies <ArrowIcon />
        </Button>
        <Button href="/testimonials" size="lg" variant="secondary">
          Client testimonials
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <Reveal>
          <TrustStrip credibility />
        </Reveal>
      </Section>

      <Section tone="tint">
        <SectionHeading index="01" eyebrow="Our clients" title="Public Sector, Telecom and Commercial clients" lead="From state agencies and school districts to communications providers, manufacturers and financial firms." align="center" />
        <LogoWall logos={clients} sectors={["Public Sector", "Telecom", "Commercial"]} />
      </Section>

      <Section>
        <SectionHeading
          index="02"
          eyebrow="Case studies"
          title="Challenge → Solution → Result"
          actions={
            <Button href="/case-studies" variant="secondary">
              All case studies <ArrowIcon />
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((c, i) => (
            <SwingIn key={c.slug} from={i % 2 === 0 ? "left" : "right"} delay={i * 0.1} className="h-full">
              <CaseStudyCard c={c} />
            </SwingIn>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          index="03"
          eyebrow="Client testimonials"
          title={home.testimonialsTitle}
          actions={
            <Button href="/testimonials" variant="secondary">
              Read all <ArrowIcon />
            </Button>
          }
        />
        <TestimonialSlider items={testimonials} />
      </Section>

      <CTABanner title="Ready to be our next success story?" lead="Tell us about your project in brief and we’ll connect you to one of our Salesforce experts." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
