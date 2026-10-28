import type { ComponentType } from "react"
import * as managedServices from "@/content/blog/choosing-between-salesforce-managed-services-vs-in-house-teams.mdx"
import * as retail from "@/content/blog/salesforce-for-retail-drive-customer-experience-loyalty.mdx"
import * as retention from "@/content/blog/try-salesforce-for-customer-retention.mdx"
import * as marketingCloud from "@/content/blog/7-reasons-to-choose-salesforce-marketing-cloud.mdx"

export type PostMeta = {
  title: string
  date: string
  author: string
  category: string
  cover: string
  excerpt: string
  source: string
}

export type Post = PostMeta & { slug: string; readingMinutes: number; Content: ComponentType }

type MdxModule = { default: ComponentType; meta: PostMeta; wordCount?: number }

// When adding a post, also add its slug to the allow-list in proxy.ts.

const modules: Record<string, MdxModule> = {
  "choosing-between-salesforce-managed-services-vs-in-house-teams": managedServices,
  "salesforce-for-retail-drive-customer-experience-loyalty": retail,
  "try-salesforce-for-customer-retention": retention,
  "7-reasons-to-choose-salesforce-marketing-cloud": marketingCloud,
}

// Reading time from each post's word count at ~220 words per minute.
const readingMinutes: Record<string, number> = {
  "choosing-between-salesforce-managed-services-vs-in-house-teams": 4,
  "salesforce-for-retail-drive-customer-experience-loyalty": 3,
  "try-salesforce-for-customer-retention": 6,
  "7-reasons-to-choose-salesforce-marketing-cloud": 5,
}

export const posts: Post[] = Object.entries(modules)
  .map(([slug, mod]) => ({ ...mod.meta, slug, readingMinutes: readingMinutes[slug] ?? 3, Content: mod.default }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))

export type PostSummary = Omit<Post, "Content">

export const postSummaries: PostSummary[] = posts.map(({ slug, title, date, author, category, cover, excerpt, source, readingMinutes }) => ({
  slug,
  title,
  date,
  author,
  category,
  cover,
  excerpt,
  source,
  readingMinutes,
}))

export const postCategories = Array.from(new Set(posts.map((p) => p.category)))

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export { formatDate } from "@/lib/format"
