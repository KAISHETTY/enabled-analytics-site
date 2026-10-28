import type { Metadata } from "next"
import Image from "next/image"
import { home, product } from "@/lib/content"
import { siteUrl } from "@/lib/site-config"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { StatsCounter } from "@/components/ea/stats-counter"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Discover Cloud",
  description: product.overview.body[0],
  alternates: { canonical: "/products" },
}

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title={product.name} lead={product.hero.lead} crumbs={[{ label: "Products" }]} image={{ src: "/images/services/data-analytics.jpg", alt: "Analytics dashboards with charts on a laptop" }}>
        <Button href="/contact" size="lg">
          Contact us <ArrowIcon />
        </Button>
        <Button href="#modules" size="lg" variant="secondary">
          See the modules
        </Button>
      </PageHero>

      <Section>
        <SectionHeading index="01" eyebrow="Why Discover Cloud" title={product.why.title} align="center" />
        <FeatureGrid items={product.why.items.map((w, i) => ({ ...w, icon: ["zap", "wallet", "users"][i] }))} columns={3} />
      </Section>

      <Section tone="tint">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHeading index="02" eyebrow="Overview" title={product.overview.title} className="mb-8 md:mb-8" />
            <Reveal>
              <Image src="/images/home/about-1.jpg" alt="Engineering team reviewing performance charts" width={306} height={399} sizes="(min-width: 1024px) 30vw, 80vw" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift ring-1 ring-line" />
            </Reveal>
          </div>
          <Reveal className="space-y-5 text-lg leading-relaxed">
            {product.overview.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section id="modules" className="scroll-mt-20">
        <SectionHeading index="03" eyebrow="Modules" title="Everything your teams need to ship top-tier code" />
        <FeatureGrid items={product.modules} variant="numbered" columns={3} />
      </Section>

      <Section tone="tint">
        <SectionHeading index="04" eyebrow="Advantages" title={product.advantages.title} lead={product.advantages.lead} />
        <FeatureGrid items={product.advantages.items.map((title) => ({ title }))} variant="check" columns={4} />
      </Section>

      <Section>
        <SectionHeading index="05" eyebrow="Results" title={product.results.title} lead={product.results.lead} align="center" />
        <StatsCounter stats={product.results.stats} />
      </Section>

      <CTABanner title={home.cta.title} primary={{ label: "Get Started", href: "/contact" }} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Salesforce",
          description: product.overview.body[0],
          publisher: { "@id": `${siteUrl}/#organization` },
        }}
      />
    </>
  )
}
