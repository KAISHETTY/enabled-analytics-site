import Image from "next/image"
import { CalendarDays, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { DynamicIcon } from "@/components/ea/icon"
import type { Service } from "@/lib/content"
import type { PostSummary } from "@/lib/blog"
import { formatDate } from "@/lib/format"
import { ArrowIcon } from "@/components/ea/button"
import { Badge, CardLink, IconTile } from "@/components/ea/primitives"

/** Numbered capability card with tags (DAQ) on a light card (TO TOP radii). */
export function ServiceCard({ service, index, className, showImage = false }: { service: Service; index?: number; className?: string; showImage?: boolean }) {
  const tags = service.features?.items.slice(0, 3) ?? service.benefits?.items.slice(0, 3).map((b) => b.title) ?? []
  return (
    <article className={cn("group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift", className)}>
      {showImage && (
        <div className="relative aspect-[16/9] overflow-hidden bg-surface">
          <Image src={service.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" className="object-cover transition-transform duration-500 group-hover/card:scale-105" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex items-start justify-between">
          <IconTile>
            <DynamicIcon name={service.icon} />
          </IconTile>
          {index !== undefined && <span className="font-mono text-sm text-ink-subtle">{String(index + 1).padStart(2, "0")}</span>}
        </div>
        <h3 className="text-xl font-bold">
          <CardLink href={`/services/${service.slug}`}>{service.title}</CardLink>
        </h3>
        <p className="flex-1 leading-relaxed">{service.summary}</p>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Highlights">
            {tags.map((t) => (
              <li key={t}>
                <Badge variant="outline" className="font-normal">
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Explore <ArrowIcon />
        </span>
      </div>
    </article>
  )
}

export function PostCard({ post, className, priority = false }: { post: PostSummary; className?: string; priority?: boolean }) {
  return (
    <article className={cn("group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="relative aspect-[16/9] overflow-hidden bg-surface">
        <Image src={post.cover} alt="" fill priority={priority} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" className="object-cover transition-transform duration-500 group-hover/card:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Badge className="self-start">{post.category}</Badge>
        <h3 className="text-xl leading-snug font-bold">
          <CardLink href={`/blog/${post.slug}`} className="transition-colors group-hover/card:text-brand-700">
            {post.title}
          </CardLink>
        </h3>
        <p className="line-clamp-3 flex-1 text-[0.9375rem] leading-relaxed">{post.excerpt}</p>
        <div className="mt-2 flex items-center gap-4 text-sm text-ink-subtle">
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
    </article>
  )
}
