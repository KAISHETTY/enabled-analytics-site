"use client"

import * as React from "react"
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"
import { cn } from "@/lib/utils"

export type PinnedStep = { title: string; text?: string; visual: React.ReactNode }

/**
 * DAQ "Neural Core": the visual pins on the right while the step list on the
 * left lights up step by step with scroll, and the visual crossfades to match.
 */
export function PinnedSteps({ steps, intro, className }: { steps: PinnedStep[]; intro?: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(steps.length - 1, Math.floor(v * steps.length * 0.999))))

  if (reduce) {
    return (
      <div className={cn("container-page grid gap-8 py-20", className)}>
        {intro}
        {steps.map((s, i) => (
          <div key={s.title} className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-mono text-sm text-brand-600">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-2xl font-bold">{s.title}</h3>
              {s.text && <p className="mt-3">{s.text}</p>}
            </div>
            <div>{s.visual}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Phones/tablets: each step becomes a card whose visual zooms in as it enters. */}
      <div className={cn("container-page py-20 lg:hidden", className)}>
        {intro}
        <ol className="mt-10 space-y-6">
          {steps.map((s, i) => (
            <m.li
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-line"
            >
              <m.div
                initial={{ scale: 1.12, opacity: 0.4 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/3]"
              >
                {s.visual}
              </m.div>
              <div className="p-5">
                <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-2xl font-bold">{s.title}</h3>
                {s.text && <p className="mt-2 leading-relaxed">{s.text}</p>}
              </div>
            </m.li>
          ))}
        </ol>
      </div>

      <div ref={ref} className={cn("relative hidden lg:block", className)} style={{ height: `${steps.length * 80 + 40}vh` }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="container-page grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              {intro}
              <ol className="mt-10 space-y-2">
                {steps.map((s, i) => (
                  <li key={s.title} className="relative pl-8">
                    <span
                      aria-hidden="true"
                      className={cn("absolute top-2 left-0 h-[calc(100%-0.5rem)] w-0.5 rounded-full transition-colors duration-500", i === active ? "bg-brand-600" : "bg-line")}
                    />
                    <p className={cn("font-mono text-xs tracking-[0.14em] uppercase transition-colors duration-500", i === active ? "text-brand-600" : "text-ink-subtle")}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className={cn("text-2xl font-bold transition-all duration-500 md:text-3xl", i === active ? "text-ink" : "text-ink/30")}>{s.title}</h3>
                    <div className={cn("grid transition-all duration-500", i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <p className="overflow-hidden pt-2 pb-4 text-lg leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative hidden aspect-[4/3.4] lg:block">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={active}
                  initial={{ opacity: 0, y: 40, scale: 0.96, rotate: -1.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, y: -30, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {steps[active].visual}
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
