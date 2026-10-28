import type { Metadata } from "next"
import Image from "next/image"
import { Briefcase, MapPin } from "lucide-react"
import { about, careers } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Placeholder, Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { Timeline } from "@/components/ea/timeline"
import { ApplyForm } from "@/components/forms/apply-form"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon } from "@/components/ea/button"

export const metadata: Metadata = {
  title: "Careers",
  description: "Be a part of the most dynamic Salesforce team. Explore open positions at Enabled Analytics in Hyderabad, India.",
  alternates: { canonical: "/careers" },
}

export default function CareersPage() {
  const jobs = careers.openings.jobs
  return (
    <>
      <PageHero eyebrow={careers.hero.title} title={careers.hero.lead} lead={careers.intro[0]} crumbs={[{ label: "Careers" }]} image={{ src: careers.images[1], alt: "Enabled Analytics colleagues collaborating" }} />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Image src={careers.images[0]} alt="Two colleagues shaking hands in a bright office" width={420} height={229} sizes="(min-width: 1024px) 45vw, 100vw" className="w-full rounded-2xl object-cover shadow-lift ring-1 ring-line" />
          </Reveal>
          <div>
            <SectionHeading index="01" eyebrow="Culture" title={about.culture.title} className="mb-6 md:mb-8" />
            <Reveal className="space-y-5 text-lg leading-relaxed">
              <p>{careers.intro[1]}</p>
              {about.culture.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading index="02" eyebrow="Perks" title={careers.perks.title} align="center" />
        <FeatureGrid items={careers.perks.items} columns={3} />
      </Section>

      <Section>
        <SectionHeading index="03" eyebrow="Life at EA" title={careers.life.title} align="center" />
        <FeatureGrid items={careers.life.items} columns={4} />
      </Section>

      <Section tone="tint">
        <SectionHeading index="04" eyebrow="Hiring process" title={careers.hiring.title} />
        <Timeline steps={careers.hiring.steps} />
      </Section>

      <Section id="openings" className="scroll-mt-20">
        <SectionHeading index="05" eyebrow="Open positions" title={careers.openings.title} lead={careers.openings.lead} />
        <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <RevealItem as="li" key={j.title}>
              <a href="#apply" className="group/card flex h-full items-center justify-between gap-4 rounded-xl border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift">
                <span className="flex items-start gap-4">
                  <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Briefcase className="size-5" />
                  </span>
                  <span>
                    <span className="block font-heading font-bold text-ink">{j.title}</span>
                    <span className="mt-1 flex items-center gap-1 text-sm text-ink-subtle">
                      <MapPin aria-hidden="true" className="size-3.5" />
                      {j.location}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-brand-700">
                  Apply Now <ArrowIcon className="inline" />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
        <Placeholder className="mt-8" title="Content needed: job descriptions">
          Responsibilities, requirements and experience levels for each role are not published on the current website.
        </Placeholder>
      </Section>

      <Section id="apply" tone="tint" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading index="06" eyebrow="Apply Now" title={careers.apply.title} lead="If you are someone who loves to learn, experiment, take risks, solve problems and explore new opportunities, we would love to have you on this journey." />
          <Reveal className="rounded-2xl border border-line bg-white p-6 shadow-soft md:p-10">
            <ApplyForm positions={jobs.map((j) => j.title)} />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
