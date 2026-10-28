"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const SearchDialog = dynamic(() => import("@/components/layout/search-dialog"), { ssr: false })

const OPEN_EVENT = "ea:open-search"

export function openSearch() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

/** Header search trigger (⌘K / Ctrl+K still opens search; no hint is shown). */
export function SearchButton({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search the site"
      aria-keyshortcuts="Control+K Meta+K"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white/80 text-sm text-ink-subtle transition hover:border-brand-200 hover:text-brand-700",
        compact ? "size-10 justify-center" : "h-10 px-3.5",
        className
      )}
    >
      <Search className="size-4" aria-hidden="true" />
      {!compact && (
        <>
          <span className="hidden xl:inline">Search</span>
        </>
      )}
    </button>
  )
}

/** Listens for ⌘K / Ctrl+K and the header button; loads the search panel on first use. */
export function SearchLauncher() {
  const [open, setOpen] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    const show = () => {
      setLoaded(true)
      setOpen(true)
    }
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setLoaded(true)
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_EVENT, show)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_EVENT, show)
    }
  }, [])

  return loaded ? <SearchDialog open={open} onOpenChange={setOpen} /> : null
}
