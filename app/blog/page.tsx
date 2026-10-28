import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { postCategories, postSummaries, formatDate } from "@/lib/blog"
import { PageHero } from "@/components/ea/hero"
import { Badge, Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { BlogExplorer } from "@/components/ea/explorers"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon } from "@/components/ea/button"

export const metadata: Metadata = {
  title: "Insights",
  description: "Salesforce insights from Enabled Analytics: managed services, retail, customer retention and Marketing Cloud.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  const [featured] = postSummaries
  return (
    <>
      <PageHero eyebrow="Blog" title="Insights" lead="Ideas and guidance from our Salesforce experts." crumbs={[{ label: "Insights" }]} />

      <Section className="pt-6 md:pt-10">
        <Reveal>
          <Link href={`/blog/${featured.slug}`} className="group/card grid overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all hover:shadow-lift lg:grid-cols-2">
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto">
              <Image src={featured.cover} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover/card:scale-105" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
              <div className="flex items-center gap-3">
                <Badge>Latest</Badge>
                <span className="text-sm text-ink-subtle">{formatDate(featured.date)}</span>
              </div>
              <h2 className="text-2xl leading-tight font-bold group-hover/card:text-brand-700 md:text-3xl">{featured.title}</h2>
              <p className="text-lg leading-relaxed">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
                Read article <ArrowIcon />
              </span>
            </div>
          </Link>
        </Reveal>
      </Section>

      <Section tone="tint">
        <SectionHeading index="01" eyebrow="All posts" title="Browse insights" />
        <BlogExplorer posts={postSummaries} categories={postCategories} />
      </Section>

      <CTABanner title="Significantly accelerate your user adoption and maximize your Salesforce return on investment." primary={{ label: "Get Started", href: "/contact" }} />
    </>
  )
}
