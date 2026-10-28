import type { Metadata } from "next"
import { about, clients, engagementModels, faqs, home, services, team, testimonials } from "@/lib/content"
import { caseStudies } from "@/lib/case-studies"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { postSummaries } from "@/lib/blog"
import { PageHero } from "@/components/ea/hero"
import { Badge, Card, Placeholder, Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { ArrowIcon, Button } from "@/components/ea/button"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { StatsCounter } from "@/components/ea/stats-counter"
import { TestimonialSlider } from "@/components/ea/testimonial-slider"
import { LogoMarquee } from "@/components/ea/logo-marquee"
import { FAQAccordion } from "@/components/ea/faq-accordion"
import { CTABanner } from "@/components/ea/cta-banner"
import { ContactForm } from "@/components/forms/contact-form"
import { QuoteWizard } from "@/components/forms/quote-wizard"
import { NewsletterForm } from "@/components/forms/newsletter-form"
import { TeamCard } from "@/components/ea/team-card"
import { PricingCard } from "@/components/ea/pricing-card"
import { Timeline } from "@/components/ea/timeline"
import { Gallery } from "@/components/ea/gallery"
import { PostCard, ServiceCard } from "@/components/ea/cards"
import { FilterBarDemo } from "./filter-demo"

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
}

const colors = [
  ["brand-50", "#EEF5FA", "bg-brand-50"],
  ["brand-100", "#D7E7F3", "bg-brand-100"],
  ["brand-200", "#AFCFE7", "bg-brand-200"],
  ["brand-400", "#4C8DBF", "bg-brand-400"],
  ["brand-600 · primary", "#246696", "bg-brand-600"],
  ["brand-700", "#1C5179", "bg-brand-700"],
  ["ink (text only)", "#0F1B26", "bg-ink"],
  ["ink-muted", "#4A5866", "bg-ink-muted"],
  ["line", "#E3E8EE", "bg-line"],
  ["surface", "#F6F9FB", "bg-surface"],
  ["surface-warm", "#FBF8F4", "bg-surface-warm"],
  ["white", "#FFFFFF", "bg-white"],
] as const

function Block({ id, title, children, tone = "white" }: { id: string; title: string; children: React.ReactNode; tone?: "white" | "tint" }) {
  return (
    <Section tone={tone} id={id} className="scroll-mt-24 py-14 md:py-16">
      <h2 className="mb-8 border-b border-line pb-3 font-mono text-sm font-medium tracking-[0.14em] text-brand-600 uppercase">{title}</h2>
      {children}
    </Section>
  )
}

export default function StyleguidePage() {
  return (
    <>
      <PageHero eyebrow="Design system" title="Styleguide" lead="Every component in the Enabled Analytics library, rendered with real content." crumbs={[{ label: "Styleguide" }]} />

      <Block id="colors" title="Color tokens">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colors.map(([name, hex, cls]) => (
            <li key={name} className="overflow-hidden rounded-xl border border-line bg-white">
              <div className={`h-20 ${cls}`} />
              <div className="p-3 text-sm">
                <p className="font-semibold text-ink">{name}</p>
                <p className="font-mono text-xs">{hex}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="type" title="Typography" tone="tint">
        <div className="space-y-4">
          <p className="eyebrow">Eyebrow · JetBrains Mono</p>
          <p className="font-heading text-6xl font-extrabold text-ink">Display · Plus Jakarta Sans</p>
          <h1 className="text-5xl font-extrabold">Heading 1</h1>
          <h2 className="text-4xl font-bold">Heading 2</h2>
          <h3 className="text-2xl font-bold">Heading 3</h3>
          <p className="max-w-2xl text-lg">Body large (Inter): {home.intro.body.slice(0, 160)}…</p>
          <p className="max-w-2xl">Body: {about.story.body[2]}</p>
        </div>
      </Block>

      <Block id="buttons" title="Buttons & badges">
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            Primary <ArrowIcon />
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>Brand</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </Block>

      <Block id="heading" title="Section heading" tone="tint">
        <SectionHeading index="01" eyebrow="Eyebrow" title={home.benefits.title} lead={home.benefits.lead} />
        <SectionHeading eyebrow="Centered" title={home.offerings.title} lead={home.offerings.lead} align="center" />
      </Block>

      <Block id="cards" title="Cards">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <h3 className="text-lg font-bold">Base card</h3>
            <p className="mt-2">{home.benefits.items[0].text}</p>
          </Card>
          <ServiceCard service={services[0]} index={0} />
          <PostCard post={postSummaries[0]} />
          <CaseStudyCard c={caseStudies[0]} index={0} />
        </div>
      </Block>

      <Block id="features" title="Feature grid (icon · numbered · check)" tone="tint">
        <FeatureGrid items={home.benefits.items.slice(0, 3)} />
        <div className="h-8" />
        <FeatureGrid items={about.fourEs.items} variant="numbered" columns={4} />
        <div className="h-8" />
        <FeatureGrid items={services[4].features!.items.slice(0, 6).map((title) => ({ title }))} variant="check" />
      </Block>

      <Block id="stats" title="Stats counter">
        <StatsCounter stats={home.stats} />
        <div className="h-6" />
        <StatsCounter stats={home.stats} variant="inline" />
      </Block>

      <Block id="testimonials" title="Testimonial slider" tone="tint">
        <TestimonialSlider items={testimonials} />
      </Block>

      <Section className="py-14">
        <h2 className="container-page mb-8 font-mono text-sm tracking-[0.14em] text-brand-600 uppercase">Logo marquee</h2>
        <LogoMarquee logos={clients} />
      </Section>

      <Block id="faq" title="FAQ accordion" tone="tint">
        <FAQAccordion items={faqs.slice(0, 4)} />
      </Block>

      <Block id="timeline" title="Timeline (horizontal · vertical)">
        <Timeline steps={home.shapeCycle.steps} />
        <div className="h-12" />
        <Timeline steps={services[1].process!.steps.slice(0, 3)} orientation="vertical" />
      </Block>

      <Block id="team" title="Team card" tone="tint">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.groups[1].members.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </Block>

      <Block id="pricing" title="Pricing / engagement card">
        <div className="grid gap-6 pt-3 md:grid-cols-3">
          {engagementModels.map((m) => (
            <PricingCard key={m.name} plan={m} />
          ))}
        </div>
      </Block>

      <Block id="gallery" title="Gallery + lightbox" tone="tint">
        <Gallery
          images={[
            { src: "/images/about/about-1.jpg", alt: "Team meeting", width: 535, height: 397 },
            { src: "/images/home/about-1.jpg", alt: "Dashboards", width: 306, height: 399 },
            { src: "/images/home/about-2.jpg", alt: "Collaboration", width: 305, height: 399 },
            { src: "/images/careers/careers-1.jpg", alt: "Handshake", width: 420, height: 229 },
            { src: "/images/careers/careers-2.jpg", alt: "Teamwork", width: 420, height: 229 },
          ]}
        />
      </Block>

      <Block id="filters" title="Filter bar + pagination">
        <FilterBarDemo />
      </Block>

      <Block id="forms" title="Forms" tone="tint">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
            <ContactForm />
          </div>
          <div className="space-y-8">
            <NewsletterForm />
            <Placeholder>Placeholder block: marks content that Enabled Analytics still needs to supply.</Placeholder>
          </div>
        </div>
        <div className="mt-10">
          <QuoteWizard />
        </div>
      </Block>

      <CTABanner title={home.cta.title} primary={home.cta.button} secondary={{ label: "Secondary", href: "/services" }} />
    </>
  )
}
