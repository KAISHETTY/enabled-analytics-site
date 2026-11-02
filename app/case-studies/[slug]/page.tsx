import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CheckCircle2, Compass, Flag, Lightbulb, Trophy } from "lucide-react"
import { caseStudies, caseTestimonial, getCaseStudy } from "@/lib/case-studies"
import { siteUrl } from "@/lib/site-config"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { TestimonialCard } from "@/components/ea/testimonial-slider"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { JsonLd } from "@/components/seo/json-ld"

/** Hero photo by story type: grants programs, the JTC agency story, or commercial teams. */
function heroPhoto(c: { slug: string; sector: string }) {
  if (c.slug.startsWith("jtc-")) return { src: "/images/photos/public-sector-service-center.webp", alt: "A modern government service center with self-service kiosks" }
  if (c.sector === "Public Sector") return { src: "/images/photos/grants-admin.webp", alt: "A grants administrator working through applications beside shelves of grant records" }
  return { src: "/images/photos/commercial-office.webp", alt: "Teams collaborating around analytics dashboards in a modern office" }
}

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
  const others = caseStudies.filter((x) => x.slug !== c.slug)
  const related = [...others.filter((x) => x.sector === c.sector), ...others.filter((x) => x.sector !== c.sector)].slice(0, 3)

  const chapters = [
    ...(c.summary ? [{ icon: Compass, label: "Executive summary", body: <p className="text-lg leading-relaxed">{c.summary}</p> }] : []),
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
          {/* Approved metrics render as tiles; studies without them (see MISSING_CONTENT.md) show none. */}
          {c.metrics.length > 0 && (
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {c.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl bg-brand-50 p-5">
                  <dd className="font-heading text-4xl font-extrabold text-brand-600">{m.value}</dd>
                  <dt className="mt-1 text-sm">{m.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </>
      ),
    },
  ]

  return (
    <>
      <PageHero eyebrow={`${c.sector} · ${c.industry}`} title={c.title} image={heroPhoto(c)} crumbs={[{ label: "Case Studies", href: "/case-studies" }, { label: c.sector, href: `/case-studies#${c.sector === "Public Sector" ? "public-sector" : "commercial"}` }, { label: c.industry }]}>
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
          <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            {c.glance && (
              <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-soft">
                <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">At a glance</p>
                <dl className="mt-4 space-y-4">
                  {!c.glance.some((g) => g.label === "Client") && (
                    <div>
                      <dt className="text-xs font-semibold text-ink-subtle uppercase">Client</dt>
                      <dd className="mt-0.5 font-medium text-ink">{c.role}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs font-semibold text-ink-subtle uppercase">Salesforce technology</dt>
                    <dd className="mt-0.5 font-medium text-ink">{c.clouds.join(", ")}</dd>
                  </div>
                  {c.glance.map((g) => (
                    <div key={g.label}>
                      <dt className="text-xs font-semibold text-ink-subtle uppercase">{g.label}</dt>
                      <dd className="mt-0.5 font-medium text-ink">{g.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {c.services && (
              <div className="rounded-[1.5rem] bg-surface p-6">
                <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">EA delivery services</p>
                <ul className="mt-4 space-y-2">
                  {c.services.map((d) => (
                    <li key={d} className="flex gap-2.5">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {t && <TestimonialCard t={t} full />}
          </aside>
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

      <CTABanner title="Facing a similar challenge?" primary={{ label: "Contact Us", href: "/contact" }} />

      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: c.title, about: c.clouds, publisher: { "@id": `${siteUrl}/#organization` }, url: `${siteUrl}/case-studies/${c.slug}` }} />
    </>
  )
}
