"use client"

import * as React from "react"
import { Accordion as A } from "radix-ui"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export type FaqItem = { q: string; a: string }

/** Single-open accordion; pair with `faqJsonLd()` on the page for rich results. */
export function FAQAccordion({ items, className, defaultOpen = 0 }: { items: FaqItem[]; className?: string; defaultOpen?: number | null }) {
  return (
    <A.Root
      type="single"
      collapsible
      defaultValue={defaultOpen === null ? undefined : `item-${defaultOpen}`}
      className={cn("flex flex-col gap-3", className)}
    >
      {items.map((f, i) => (
        <A.Item
          key={f.q}
          value={`item-${i}`}
          className="overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-colors data-[state=open]:border-brand-200"
        >
          <A.Header asChild>
            <h3>
              <A.Trigger className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-heading text-lg font-semibold text-ink transition-colors hover:text-brand-700 focus-visible:-outline-offset-2">
                {f.q}
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-brand-600 group-data-[state=open]:text-white"
                >
                  <Plus className="size-4" />
                </span>
              </A.Trigger>
            </h3>
          </A.Header>
          <A.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="px-6 pb-6 leading-relaxed text-ink-muted">{f.a}</p>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  )
}
