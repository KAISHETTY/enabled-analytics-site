import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Breadcrumbs, type Crumb } from "@/components/ea/breadcrumbs"

/** Soft brand-tinted backdrop: fine grid + two blurred light washes. Never dark. */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 -right-32 size-[520px] rounded-full bg-brand-100/70 blur-3xl" />
      <div className="absolute -bottom-48 -left-40 size-[460px] rounded-full bg-surface-warm blur-3xl" />
    </div>
  )
}

/**
 * Splits a headline into lines that rise in one after another (CSS only, so it
 * paints before hydration and respects prefers-reduced-motion via globals.css).
 */
export function LineReveal({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <span
            className="block animate-in fill-mode-both duration-700 ease-out slide-in-from-bottom-[60%] fade-in"
            style={{ animationDelay: `${120 + i * 110}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  )
}

type PageHeroProps = {
  eyebrow?: string
  title: string
  lead?: React.ReactNode
  crumbs?: Crumb[]
  image?: { src: string; alt: string }
  children?: React.ReactNode
  align?: "left" | "center"
}

/** Compact inner-page hero with breadcrumbs (variant: "page" / "split" when an image is passed). */
export function PageHero({ eyebrow, title, lead, crumbs, image, children, align = "left" }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 to-white pt-32 pb-16 md:pt-40 md:pb-24">
      <HeroBackdrop />
      <div className={cn("container-page relative", image && "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]")}>
        <div className={cn(align === "center" && !image && "mx-auto max-w-3xl text-center")}>
          {crumbs && <Breadcrumbs items={crumbs} className={cn("mb-6", align === "center" && !image && "justify-center")} />}
          {eyebrow && <p className="eyebrow mb-4 animate-in fade-in duration-500 fill-mode-both">{eyebrow}</p>}
          <h1 className="text-[2.5rem] leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.5rem]">
            <LineReveal lines={[title]} />
          </h1>
          {lead && (
            <div
              className={cn(
                "mt-6 max-w-2xl animate-in text-lg leading-relaxed text-ink-muted duration-700 fill-mode-both fade-in slide-in-from-bottom-2 md:text-xl",
                align === "center" && !image && "mx-auto"
              )}
              style={{ animationDelay: "250ms" }}
            >
              {lead}
            </div>
          )}
          {children && (
            <div className={cn("mt-8 flex flex-wrap gap-3", align === "center" && !image && "justify-center")}>{children}</div>
          )}
        </div>
        {image && (
          <div className="relative">
            <div className="absolute -inset-3 rotate-2 rounded-2xl bg-brand-100/60" aria-hidden="true" />
            <Image
              src={image.src}
              alt={image.alt}
              width={720}
              height={480}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="relative aspect-[3/2] w-full rounded-2xl object-cover shadow-lift ring-1 ring-line"
            />
          </div>
        )}
      </div>
    </section>
  )
}
