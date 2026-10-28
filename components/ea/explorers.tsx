"use client"

import type { CaseStudy } from "@/lib/case-studies"
import type { PostSummary } from "@/lib/blog"
import { FilterableGrid } from "@/components/ea/filterable-grid"
import { PostCard } from "@/components/ea/cards"
import { CaseStudyCard } from "@/components/story/case-study-card"

export function CaseStudiesExplorer({ items, industries }: { items: CaseStudy[]; industries: string[] }) {
  return (
    <FilterableGrid
      items={items}
      categories={industries}
      label="case studies"
      searchPlaceholder="Search case studies…"
      getKey={(c) => c.slug}
      getCategory={(c) => c.industry}
      getSearchText={(c) => `${c.title} ${c.role} ${c.challenge} ${c.clouds.join(" ")}`}
      renderItem={(c, i) => <CaseStudyCard c={c} index={i} />}
    />
  )
}

export function BlogExplorer({ posts, categories }: { posts: PostSummary[]; categories: string[] }) {
  return (
    <FilterableGrid
      items={posts}
      categories={categories}
      pageSize={3}
      label="articles"
      searchPlaceholder="Search insights…"
      getKey={(p) => p.slug}
      getCategory={(p) => p.category}
      getSearchText={(p) => `${p.title} ${p.excerpt}`}
      renderItem={(p, i) => <PostCard post={p} priority={i === 0} />}
    />
  )
}
