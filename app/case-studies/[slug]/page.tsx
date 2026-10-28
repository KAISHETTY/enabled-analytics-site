import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CheckCircle2, Flag, Lightbulb, Trophy } from "lucide-react"
import { caseStudies, caseTestimonial, getCaseStudy } from "@/lib/case-studies"
import { siteUrl } from "@/lib/site-config"
import { PageHero } from "@/components/ea/hero"
import { Placeholder, Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { TestimonialCard } from "@/components/ea/testimonial-slider"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { JsonLd } from "@/components/seo/json-ld"

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(props: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const c = getCaseStudy(slug)
  if (!c) return {}
  return { title: c.title, description: c.challenge, alternates: { canonical: `/case-studies/${c.slug}` } }
}

export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params
  const c = getCaseStudy(slug)
  if (!c) notFound()
  const t = caseTestimonial(c)
  const related = caseStudies.filter((x) => x.slug !== c.slug).slice(0, 3)

  const chapters = [
    { icon: Flag, label: "The challenge", body: <p className="text-lg leading-relaxed">{c.challenge}</p> },
    {
      icon: Lightbulb,
      label: "Our solution",
      body: (
        <ul className="space-y-3">
          {c.solution.map((s) => (
            <li key={s} className="flex gap-3 text-lg">
              <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-600" />
              {s}
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: Trophy,
      label: "The result",
      body: (
        <>
          <ul className="space-y-3">
            {c.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-lg">
                <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-600" />
                {o}
              </li>
            ))}
          </ul>
          {c.metrics.length > 0 ? (
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {c.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl bg-brand-50 p-5">
                  <dd className="font-heading text-4xl font-extrabold text-brand-600">{m.value}</dd>
                  <dt className="mt-1 text-sm">{m.label}</dt>
                </div>
              ))}
            </dl>
          ) : (
            <Placeholder className="mt-8" title="Content needed: result metrics">
              Add 2–3 client-approved numbers (e.g. % faster quote cycle, adoption rate, hours saved) in <code>lib/case-studies.ts</code>. They render here as metric tiles.
            </Placeholder>
          )}
        </>
      ),
    },
  ]

  return (
    <>
      <PageHero eyebrow={`Case study · ${c.industry}`} title={c.title} crumbs={[{ label: "Case Studies", href: "/case-studies" }, { label: c.industry }]}>
        {c.clouds.map((cl) => (
          <span key={cl} className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-soft ring-1 ring-brand-100">
            {cl}
          </span>
        ))}
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <ol className="relative space-y-12 border-l-2 border-dashed border-brand-100 pl-10">
            {chapters.map((ch, i) => (
              <Reveal as="li" key={ch.label} className="relative">
                <span aria-hidden="true" className="absolute top-0 -left-[3.75rem] flex size-10 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow">
                  <ch.icon className="size-5" />
                </span>
                <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
                  {String(i + 1).padStart(2, "0")} · {ch.label}
                </p>
                <div className="mt-4">{ch.body}</div>
              </Reveal>
            ))}
          </ol>
          <aside className="lg:sticky lg:top-28 lg:h-fit">{t && <TestimonialCard t={t} full />}</aside>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="More stories" title="Related case studies" />
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {related.map((r, i) => (
            <RevealItem key={r.slug}>
              <CaseStudyCard c={r} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTABanner title="Facing a similar challenge?" primary={{ label: "Get a Quote", href: "/get-a-quote" }} secondary={{ label: "Free Org Health Check", href: "/health-check" }} />

      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: c.title, about: c.clouds, publisher: { "@id": `${siteUrl}/#organization` }, url: `${siteUrl}/case-studies/${c.slug}` }} />
    </>
  )
}
