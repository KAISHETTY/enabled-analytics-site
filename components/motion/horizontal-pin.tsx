"use client"

import * as React from "react"
import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * DAQ "Engineered for scale": the section pins while vertical scroll drives a
 * horizontal card track, with a progress rail and numbered tabs. Below `lg`
 * (and for reduced motion) it falls back to a native horizontal scroller.
 */
export function HorizontalPin({
  children,
  labels,
  className,
  heading,
}: {
  children: React.ReactNode[]
  labels?: string[]
  className?: string
  heading?: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [distance, setDistance] = React.useState(0)
  const [active, setActive] = React.useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), { stiffness: 140, damping: 32, mass: 0.4 })
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  React.useEffect(() => {
    const measure = () => {
      const el = trackRef.current
      if (!el) return
      setDistance(Math.max(0, el.scrollWidth - el.parentElement!.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(children.length - 1, Math.floor(v * children.length))))

  const pinned = !reduce && distance > 0

  return (
    <section ref={ref} className={cn("relative", className)} style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}>
      <div className={cn(pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" : "py-20")}>
        {heading && <div className="container-page mb-10">{heading}</div>}
        <div className={cn("container-page", !pinned && "overflow-x-auto pb-4 [scrollbar-width:thin]")}>
          <m.div ref={trackRef} style={pinned ? { x } : undefined} className="flex w-max gap-6 will-change-transform">
            {children.map((c, i) => (
              <div key={i} className="w-[82vw] max-w-[440px] shrink-0 sm:w-[420px]">
                {c}
              </div>
            ))}
          </m.div>
        </div>
        {pinned && (
          <div className="container-page mt-10">
            <div className="relative h-px bg-line">
              <m.span style={{ width: bar }} className="absolute inset-y-0 left-0 bg-brand-600" />
            </div>
            {labels && (
              <ol className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs tracking-[0.12em] uppercase">
                {labels.map((l, i) => (
                  <li key={l} className={cn("transition-colors", i === active ? "text-brand-700" : "text-ink-subtle")}>
                    <span className="mr-2">{String(i + 1).padStart(2, "0")}</span>
                    {l}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
