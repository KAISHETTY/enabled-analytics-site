import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getService, services } from "@/lib/content"
import { siteUrl } from "@/lib/site-config"
import { PageHero } from "@/components/ea/hero"
import { Section, Card } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { StatsCounter } from "@/components/ea/stats-counter"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { Timeline } from "@/components/ea/timeline"
import { ServiceCard } from "@/components/ea/cards"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { JsonLd } from "@/components/seo/json-ld"

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const s = getService(slug)
  if (!s) return {}
  return {
    title: s.title,
    description: s.tagline,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.title, description: s.tagline, images: [{ url: s.image }] },
  }
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params
  const s = getService(slug)
  if (!s) notFound()

  const related = services.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3)
  const parent = s.category === "solution" ? "Solutions" : "Practice Areas"
  let n = 0
  const idx = () => String(++n).padStart(2, "0")

  return (
    <>
      <PageHero eyebrow={parent} title={s.title} lead={s.tagline} crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]} image={{ src: s.image, alt: `${s.title} by Enabled Analytics` }}>
        <Button href={`/get-a-quote?service=${s.slug}`} size="lg">
          Get a Quote <ArrowIcon />
        </Button>
        <Button href="/contact" size="lg" variant="secondary">
          Talk to an expert
        </Button>
      </PageHero>

      {s.stats && (
        <section className="relative -mt-6 bg-white pb-4">
          <div className="container-page">
            <Reveal>
              <StatsCounter stats={s.stats} variant="inline" />
            </Reveal>
          </div>
        </section>
      )}

      {(s.overview || s.intro) && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <SectionHeading index={idx()} eyebrow="Overview" title={s.overview?.title ?? s.tagline} className="mb-0 md:mb-0" />
            <Reveal className="space-y-5 text-lg leading-relaxed">
              {[...(s.intro ?? []), ...(s.overview?.body ?? [])].map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </Reveal>
          </div>
        </Section>
      )}

      {s.features && (
        <Section tone="tint">
          <SectionHeading index={idx()} eyebrow="Features" title={s.features.title} />
          <FeatureGrid items={s.features.items.map((title) => ({ title }))} variant="check" columns={4} />
        </Section>
      )}

      {s.process && (
        <Section tone={s.features ? "white" : "tint"}>
          <SectionHeading index={idx()} eyebrow="Process" title={s.process.title} lead={s.process.lead} />
          <Timeline steps={s.process.steps} orientation="vertical" />
        </Section>
      )}

      {s.approach && (
        <Section>
          <SectionHeading index={idx()} eyebrow="How we help" title={`How Enabled Analytics delivers ${s.title}`} />
          <FeatureGrid items={s.approach} variant="numbered" columns={3} />
        </Section>
      )}

      {s.benefits && (
        <Section tone="tint">
          <SectionHeading index={idx()} eyebrow="Benefits" title={s.benefits.title} lead={s.benefits.lead} />
          {s.benefits.items.some((b) => b.text) ? (
            <FeatureGrid items={s.benefits.items} variant="numbered" columns={s.benefits.items.length === 4 ? 4 : 3} />
          ) : (
            <FeatureGrid items={s.benefits.items} variant="check" columns={3} />
          )}
        </Section>
      )}

      {s.closing && (
        <Section>
          <Reveal>
            <Card className="mx-auto max-w-4xl items-center gap-5 bg-gradient-to-br from-brand-50 to-white text-center md:p-12">
              <h2 className="text-2xl font-bold md:text-3xl">{s.closing.title}</h2>
              <p className="max-w-2xl text-lg">{s.closing.body}</p>
              <Button href="/contact">
                Contact us <ArrowIcon />
              </Button>
            </Card>
          </Reveal>
        </Section>
      )}

      <Section>
        <SectionHeading eyebrow={`More ${parent.toLowerCase()}`} title="Explore related services" />
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {related.map((r) => (
            <RevealItem key={r.slug}>
              <ServiceCard service={r} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTABanner title="Significantly accelerate your user adoption and maximize your Salesforce return on investment." primary={{ label: "Get Started", href: "/contact" }} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.tagline,
          serviceType: s.category === "practice" ? `Salesforce ${s.title} implementation` : s.title,
          provider: { "@id": `${siteUrl}/#organization` },
          url: `${siteUrl}/services/${s.slug}`,
        }}
      />
    </>
  )
}
