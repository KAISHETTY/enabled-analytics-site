import Link from "next/link"
import { ArrowUpRight, Award, BadgeCheck, Star, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { trustItems, type TrustItem } from "@/lib/trust"

const icon = { partner: BadgeCheck, rating: Star, certs: Users, review: Award } as const

function Item({ item }: { item: TrustItem }) {
  const Icon = icon[item.kind]
  const body = (
    <>
      <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-soft ring-1 ring-brand-100">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.6875rem] tracking-[0.14em] text-ink-subtle uppercase">{item.label}</span>
        <span className="block font-heading text-[1.0625rem] leading-tight font-bold text-ink">{item.value}</span>
        <span className="block text-xs text-ink-subtle">{item.detail}</span>
        {item.cta && <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover/t:underline">{item.cta}</span>}
      </span>
      {item.href && <ArrowUpRight aria-hidden="true" className="ml-auto size-4 shrink-0 text-brand-500 opacity-50 transition group-hover/t:opacity-100" />}
    </>
  )
  const cls = "group/t flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-white/70"
  if (!item.href) return <li className={cls}>{body}</li>
  const external = item.href.startsWith("http")
  return (
    <li>
      {external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {body}
          <span className="sr-only">(opens source in a new tab)</span>
        </a>
      ) : (
        <Link href={item.href} className={cls}>
          {body}
        </Link>
      )}
    </li>
  )
}

/**
 * ABSYZ "Awards & Recognitions" as a verifiable trust strip. Only items backed
 * by a public source render; Clutch/G2 slots appear once verified in lib/trust.ts.
 * `credibility` limits it to the homepage set: Summit Partner, certifications and verified satisfaction.
 */
export function TrustStrip({ credibility, className }: { credibility?: boolean; className?: string }) {
  const items = trustItems.filter((t) => t.verified && (!credibility || t.credibility))
  return (
    <div className={cn("rounded-[1.75rem] border border-white/70 bg-white/60 p-2 shadow-soft backdrop-blur-xl", className)}>
      <ul className={cn("grid gap-1 sm:grid-cols-2", items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
        {items.map((t) => (
          <Item key={t.value} item={t} />
        ))}
      </ul>
    </div>
  )
}
