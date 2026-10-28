"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Dialog as D } from "radix-ui"
import { ArrowUpRight, Search } from "lucide-react"
import type { SearchEntry } from "@/lib/search-index"

/**
 * Cmd/Ctrl+K search panel. Loaded lazily by `SearchLauncher` on first open, and
 * fetches its index from /search-index.json so no page ships it up front.
 */
export default function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [index, setIndex] = React.useState<SearchEntry[]>([])
  const router = useRouter()
  const setOpen = onOpenChange

  React.useEffect(() => {
    let cancelled = false
    fetch("/search-index.json")
      .then((r) => r.json() as Promise<SearchEntry[]>)
      .then((data) => !cancelled && setIndex(data))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const groups = React.useMemo(() => {
    const map = new Map<string, SearchEntry[]>()
    for (const e of index) map.set(e.group, [...(map.get(e.group) ?? []), e])
    return Array.from(map.entries())
  }, [index])

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <D.Root open={open} onOpenChange={setOpen}>
      <D.Portal>
        <D.Overlay className="fixed inset-0 z-[60] bg-ink/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <D.Content className="fixed top-[12vh] left-1/2 z-[60] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-white shadow-lift data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95">
          <D.Title className="sr-only">Search Enabled Analytics</D.Title>
          <D.Description className="sr-only">Type to search pages, services, insights, people and FAQs.</D.Description>
          <Command label="Site search" className="flex flex-col" loop>
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="size-5 text-brand-600" aria-hidden="true" />
              <Command.Input autoFocus placeholder="Search services, insights, people…" className="h-14 flex-1 bg-transparent text-base text-ink placeholder:text-ink-subtle focus:outline-none" />
              <kbd className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.6875rem] text-ink-subtle">Esc</kbd>
            </div>
            <Command.List className="max-h-[60vh] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="py-10 text-center text-sm text-ink-subtle">No results found.</Command.Empty>
              {groups.map(([group, entries]) => (
                <Command.Group
                  key={group}
                  heading={group}
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.6875rem] [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-ink-subtle [&_[cmdk-group-heading]]:uppercase"
                >
                  {entries.map((e) => (
                    <Command.Item
                      key={`${e.href}-${e.title}`}
                      value={`${e.title} ${e.text} ${group}`}
                      onSelect={() => go(e.href)}
                      className="group flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-ink data-[selected=true]:bg-brand-50 data-[selected=true]:text-brand-800"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{e.title}</span>
                        <span className="block truncate text-sm text-ink-subtle">{e.text}</span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 opacity-0 group-data-[selected=true]:opacity-100" aria-hidden="true" />
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </D.Content>
      </D.Portal>
    </D.Root>
  )
}
