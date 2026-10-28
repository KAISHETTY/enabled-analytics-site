import * as React from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/ea/reveal"

type SectionHeadingProps = {
  index?: string
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "left" | "center"
  as?: "h1" | "h2" | "h3"
  className?: string
  actions?: React.ReactNode
}

/** Mono index label + eyebrow + title + lead (DAQ-style "02 — Section"). */
export function SectionHeading({ index, eyebrow, title, lead, align = "left", as: Tag = "h2", className, actions }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-4 md:mb-16",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl",
        actions && align === "left" && "max-w-none md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("flex flex-col gap-4", align === "center" && "items-center")}>
        {(index || eyebrow) && (
          <p className="eyebrow flex items-center gap-3">
            {index && <span className="text-ink-subtle">{index}</span>}
            {index && eyebrow && <span aria-hidden="true" className="h-px w-8 bg-brand-200" />}
            {eyebrow && <span>{eyebrow}</span>}
          </p>
        )}
        <Tag className="text-[2rem] leading-[1.15] font-bold sm:text-[2.5rem] lg:text-[2.75rem]">{title}</Tag>
        {lead && <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">{lead}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-3">{actions}</div>}
    </Reveal>
  )
}
