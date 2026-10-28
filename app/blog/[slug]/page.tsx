import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { CalendarDays, Clock } from "lucide-react"
import { getPost, postSummaries, formatDate } from "@/lib/blog"
import { site } from "@/lib/content"
import { siteUrl } from "@/lib/site-config"
import { Breadcrumbs } from "@/components/ea/breadcrumbs"
import { HeroBackdrop } from "@/components/ea/hero"
import { Badge, Section } from "@/components/ea/primitives"
import { PostCard } from "@/components/ea/cards"
import { CTABanner } from "@/components/ea/cta-banner"
import { SectionHeading } from "@/components/ea/section-heading"
import { JsonLd } from "@/components/seo/json-ld"

export function generateStaticParams() {
  return postSummaries.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const p = getPost(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date, images: [{ url: p.cover }] },
  }
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params
  const post = getPost(slug)
  if (!post) notFound()
  const { Content } = post
  const related = postSummaries.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 to-white pt-32 pb-12 md:pt-40">
        <HeroBackdrop />
        <div className="container-page relative mx-auto max-w-3xl">
          <Breadcrumbs items={[{ label: "Insights", href: "/blog" }, { label: post.title }]} className="mb-6" />
          <Badge>{post.category}</Badge>
          <h1 className="mt-5 text-4xl leading-[1.1] font-extrabold md:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-ink-subtle">
            <span className="font-medium text-ink">{post.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="size-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden="true" className="size-4" />
              {post.readingMinutes} min read
            </span>
          </div>
        </div>
      </section>

      <div className="container-page mx-auto max-w-4xl">
        <Image src={post.cover} alt="" width={1200} height={675} priority sizes="(min-width: 1024px) 896px, 100vw" className="aspect-[16/9] w-full rounded-2xl object-cover shadow-lift ring-1 ring-line" />
      </div>

      <article className="container-page mx-auto max-w-3xl py-14 md:py-20">
        <div className="prose-ea">
          <Content />
        </div>
      </article>

      <Section tone="tint">
        <SectionHeading eyebrow="Keep reading" title="Related Posts" />
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      <CTABanner title="Talk to our certified Salesforce consultants" lead="Tell us about your project in brief and we’ll connect you to one of our Salesforce experts." primary={{ label: "Contact us", href: "/contact" }} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          image: `${siteUrl}${post.cover}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@id": `${siteUrl}/#organization` },
          mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
        }}
      />
    </>
  )
}
