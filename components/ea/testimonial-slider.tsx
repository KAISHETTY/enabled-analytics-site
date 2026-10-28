"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/lib/content"

export function TestimonialCard({ t, className, full = false }: { t: Testimonial; className?: string; full?: boolean }) {
  const paragraphs = full ? t.quote : [t.quote[0]]
  return (
    <figure className={cn("flex h-full flex-col rounded-xl border border-line bg-white p-7 shadow-soft md:p-8", className)}>
      <Quote aria-hidden="true" className="mb-5 size-9 fill-brand-100 text-brand-200" />
      <blockquote className="flex-1 space-y-3 text-[1.0625rem] leading-relaxed text-ink">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className={cn(!full && "line-clamp-6")}>
            “{p}”
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full bg-brand-50 font-heading text-sm font-bold text-brand-700 ring-1 ring-brand-100">
          {t.role
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 3)}
        </span>
        <span>
          <span className="block font-semibold text-ink">{t.role}</span>
          <span className="block text-sm text-ink-subtle">{t.industry}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/** Auto-playing, swipeable testimonial carousel with keyboard-accessible controls. */
export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [autoplay] = React.useState(() => Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true }))
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay])
  const [selected, setSelected] = React.useState(0)
  const [snaps, setSnaps] = React.useState<number[]>([])

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    const onInit = () => setSnaps(api.scrollSnapList())
    onInit()
    onSelect()
    api.on("select", onSelect).on("reInit", onInit).on("reInit", onSelect)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) autoplay.stop()
    return () => {
      api.off("select", onSelect).off("reInit", onInit)
    }
  }, [api, autoplay])

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Client testimonials" className="relative">
      <div ref={viewportRef} className="-mx-3 overflow-hidden px-3 py-2">
        <div className="flex touch-pan-y gap-6">
          {items.map((t, i) => (
            <div
              key={t.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              className="min-w-0 shrink-0 basis-full md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-0.5" role="tablist" aria-label="Choose testimonial">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className="group flex h-6 min-w-6 items-center justify-center"
            >
              <span aria-hidden="true" className={cn("h-2 rounded-full transition-all", i === selected ? "w-8 bg-brand-600" : "w-2 bg-brand-200 group-hover:bg-brand-300")} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => api?.scrollPrev()}
            className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition hover:border-brand-200 hover:text-brand-700"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => api?.scrollNext()}
            className="flex size-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow transition hover:bg-brand-700"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
