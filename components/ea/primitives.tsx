import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Tone = "white" | "tint" | "warm" | "brand"

const toneClass: Record<Tone, string> = {
  white: "bg-white",
  tint: "bg-surface",
  warm: "bg-surface-warm",
  brand: "bg-brand-50",
}

/** Page section with the alternating white / soft-tint rhythm. */
export function Section({
  tone = "white",
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & { tone?: Tone; containerClassName?: string }) {
  return (
    <section className={cn("section relative", toneClass[tone], className)} {...props}>
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  )
}

export function Badge({
  className,
  variant = "brand",
  ...props
}: React.ComponentProps<"span"> & { variant?: "brand" | "outline" | "neutral" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variant === "brand" && "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
        variant === "outline" && "bg-white text-ink-muted ring-1 ring-line",
        variant === "neutral" && "bg-surface text-ink-muted",
        className
      )}
      {...props}
    />
  )
}

export function Card({
  className,
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "group/card relative flex flex-col rounded-xl border border-line bg-white p-6 shadow-soft md:p-8",
        interactive && "transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift",
        className
      )}
      {...props}
    />
  )
}

/** Stretches a link over its nearest positioned parent so the whole card is clickable. */
export function CardLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none", className)}>
      {children}
    </Link>
  )
}

export function IconTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover/card:bg-brand-600 group-hover/card:text-white [&_svg]:size-6",
        className
      )}
    >
      {children}
    </span>
  )
}

/** Marks content that must be supplied by Enabled Analytics (see MISSING_CONTENT.md). */
export function Placeholder({ title = "Content needed", children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn("rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-6 text-sm text-amber-900", className)}
    >
      <p className="mb-1 font-mono text-xs font-semibold tracking-[0.14em] uppercase">{title}</p>
      <div className="text-amber-900/90">{children}</div>
    </div>
  )
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}
