import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteUrl } from "@/lib/site-config"
import { JsonLd } from "@/components/seo/json-ld"

export type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items]
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("flex", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subtle">
          {all.map((c, i) => {
            const last = i === all.length - 1
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                {c.href && !last ? (
                  <Link href={c.href} className="rounded transition-colors hover:text-brand-700">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={cn(last && "font-medium text-ink")}>
                    {c.label}
                  </span>
                )}
                {!last && <ChevronRight aria-hidden="true" className="size-3.5 text-ink-subtle/60" />}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: `${siteUrl}${c.href}` } : {}),
          })),
        }}
      />
    </>
  )
}
