"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"

/** Chip-style single-select filter (FilterBar). */
export function FilterBar({ options, value, onChange, label }: { options: string[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {["All", ...options].map((o) => {
        const active = value === o
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm font-medium transition",
              active ? "border-brand-600 bg-brand-600 text-white shadow-glow" : "border-line bg-white text-ink hover:border-brand-200 hover:text-brand-700"
            )}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Previous page" className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-brand-200 hover:text-brand-700 disabled:opacity-40">
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          aria-label={`Page ${p}`}
          className={cn("size-11 rounded-full text-sm font-semibold transition", p === page ? "bg-brand-600 text-white shadow-glow" : "border border-line bg-white text-ink hover:border-brand-200")}
        >
          {p}
        </button>
      ))}
      <button type="button" onClick={() => onChange(page + 1)} disabled={page === pages} aria-label="Next page" className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-brand-200 hover:text-brand-700 disabled:opacity-40">
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </nav>
  )
}

type Props<T> = {
  items: T[]
  getCategory: (item: T) => string
  getSearchText: (item: T) => string
  getKey: (item: T) => string
  renderItem: (item: T, index: number) => React.ReactNode
  categories: string[]
  pageSize?: number
  label: string
  searchPlaceholder?: string
  gridClassName?: string
}

/** Client-side filter + search + pagination over a small, statically rendered list. */
export function FilterableGrid<T>({ items, getCategory, getSearchText, getKey, renderItem, categories, pageSize = 6, label, searchPlaceholder = "Search…", gridClassName }: Props<T>) {
  const [category, setCategory] = React.useState("All")
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)
  const topRef = React.useRef<HTMLDivElement>(null)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((i) => (category === "All" || getCategory(i) === category) && (!q || getSearchText(i).toLowerCase().includes(q)))
  }, [items, category, query, getCategory, getSearchText])

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize)

  const changePage = (p: number) => {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <FilterBar options={categories} value={category} onChange={(v) => (setCategory(v), setPage(1))} label={`Filter ${label}`} />
        <label className="relative block lg:w-72">
          <span className="sr-only">Search {label}</span>
          <Search aria-hidden="true" className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => (setQuery(e.target.value), setPage(1))}
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-full border border-line bg-white pr-4 pl-10 text-sm text-ink shadow-soft focus:border-brand-300 focus:ring-4 focus:ring-brand-100 focus:outline-none"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} {label} found
      </p>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line bg-white p-12 text-center">No {label} match your filters.</p>
      ) : (
        <ul className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", gridClassName)}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item, i) => (
              <motion.li key={getKey(item)} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}>
                {renderItem(item, i)}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      <Pagination page={current} pages={pages} onChange={changePage} />
    </div>
  )
}
