import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { DynamicIcon } from "@/components/ea/icon"
import { Card, IconTile } from "@/components/ea/primitives"
import { RevealGroup, RevealItem } from "@/components/ea/reveal"

export type Feature = { title: string; text?: string; icon?: string; index?: string }

const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const

/**
 * Grid of feature cards. `variant="numbered"` shows mono indices (DAQ/TO TOP),
 * `variant="icon"` shows an icon tile, `variant="check"` is a compact checklist.
 */
export function FeatureGrid({
  items,
  columns = 3,
  variant = "icon",
  className,
}: {
  items: Feature[]
  columns?: 2 | 3 | 4
  variant?: "icon" | "numbered" | "check"
  className?: string
}) {
  if (variant === "check") {
    return (
      <RevealGroup as="ul" className={cn("grid gap-3 sm:grid-cols-2", columns >= 3 && "lg:grid-cols-3", columns === 4 && "xl:grid-cols-4", className)}>
        {items.map((f) => (
          <RevealItem as="li" key={f.title} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 shadow-soft">
            <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span>
              <span className="block font-semibold text-ink">{f.title}</span>
              {f.text && <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{f.text}</span>}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    )
  }

  return (
    <RevealGroup className={cn("grid gap-5 md:gap-6", colClass[columns], className)}>
      {items.map((f, i) => {
        return (
          <RevealItem key={f.title}>
            <Card interactive className="h-full gap-4">
              {variant === "numbered" ? (
                <span className="font-mono text-sm font-medium text-brand-600">{f.index ?? String(i + 1).padStart(2, "0")}</span>
              ) : (
                f.icon && (
                  <IconTile>
                    <DynamicIcon name={f.icon} />
                  </IconTile>
                )
              )}
              <h3 className="text-xl font-bold">{f.title}</h3>
              {f.text && <p className="leading-relaxed">{f.text}</p>}
            </Card>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
