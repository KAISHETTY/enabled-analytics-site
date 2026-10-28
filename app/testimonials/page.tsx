import type { Metadata } from "next"
import { home, testimonials } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { StatsCounter } from "@/components/ea/stats-counter"
import { TestimonialCard, TestimonialSlider } from "@/components/ea/testimonial-slider"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal } from "@/components/ea/reveal"

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What our clients say about Enabled Analytics, a Salesforce partner with a 4.9 CSAT score.",
  alternates: { canonical: "/testimonials" },
}

export default function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title={home.testimonialsTitle} lead="Feedback from IT, sales, marketing and customer-success leaders we have partnered with." crumbs={[{ label: "Testimonials" }]} />

      <Section className="pt-6 md:pt-10">
        <Reveal>
          <StatsCounter stats={home.stats} variant="inline" />
        </Reveal>
      </Section>

      <Section tone="tint">
        <SectionHeading index="01" eyebrow="Featured" title="Client stories" />
        <TestimonialSlider items={testimonials.slice(0, 6)} />
      </Section>

      <Section>
        <SectionHeading index="02" eyebrow="All testimonials" title="In their words" />
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {testimonials.map((t) => (
            <Reveal key={t.id}>
              <TestimonialCard t={t} full />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner title={home.cta.title} primary={home.cta.button} />
    </>
  )
}
