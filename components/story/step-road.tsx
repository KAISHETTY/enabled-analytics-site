"use client"

import * as React from "react"
import { m, useMotionTemplate, useScroll, useSpring, useTransform, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

export type RoadStep = { kicker?: string; title: string; body?: React.ReactNode }

const EASE = [0.22, 1, 0.36, 1] as const

const card: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: 18, scale: 0.95 },
  show: (i: number) => ({ opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 85, damping: 16, delay: i * 0.1, staggerChildren: 0.06, delayChildren: 0.2 + i * 0.1 } }),
}
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const COLS = { 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4", 5: "md:grid-cols-3 lg:grid-cols-5" } as const

/**
 * Numbered steps on a dotted road (the homepage "Core services" pattern): the
 * road draws itself with scroll, across the top on wide screens and down the
 * left on phones, and each stop lights up as its card rises in.
 */
export function StepRoad({ steps, columns = 3, className }: { steps: RoadStep[]; columns?: 3 | 4 | 5; className?: string }) {
  const ref = React.useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 70%"] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const rest = useTransform(p, (v) => `${(1 - v) * 100}%`)
  const hClip = useMotionTemplate`inset(0 ${rest} 0 0)`
  const vClip = useMotionTemplate`inset(0 0 ${rest} 0)`
  // the horizontal road runs between the first and last stop centres
  const edge = `${50 / columns}%`
  const wide = columns === 3 ? "md" : "lg"

  return (
    <ol ref={ref} className={cn("relative grid gap-6 pl-10", COLS[columns], wide === "md" ? "md:pt-16 md:pl-0" : "lg:pt-16 lg:pl-0", className)}>
      <li aria-hidden="true" className={cn("absolute top-3 bottom-10 left-[15px] border-l-2 border-dashed border-brand-200", wide === "md" ? "md:hidden" : "lg:hidden")} />
      <m.li aria-hidden="true" style={{ clipPath: vClip }} className={cn("absolute top-3 bottom-10 left-[15px] border-l-2 border-dashed border-brand-500", wide === "md" ? "md:hidden" : "lg:hidden")} />
      <li aria-hidden="true" style={{ left: edge, right: edge }} className={cn("absolute top-[22px] hidden border-t-2 border-dashed border-brand-200", wide === "md" ? "md:block" : "lg:block")} />
      <m.li aria-hidden="true" style={{ left: edge, right: edge, clipPath: hClip }} className={cn("absolute top-[22px] hidden border-t-2 border-dashed border-brand-500", wide === "md" ? "md:block" : "lg:block")} />

      {steps.map((s, i) => (
        <m.li key={s.title} custom={i} variants={card} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }} className="relative [perspective:1000px]">
          <m.span
            aria-hidden="true"
            variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 320, damping: 14 } } }}
            className={cn(
              "absolute top-8 -left-[38px] flex size-7 items-center justify-center rounded-full bg-brand-600 font-mono text-[0.6875rem] font-semibold text-white shadow-glow ring-4 ring-white",
              wide === "md" ? "md:-top-[55px] md:left-1/2 md:-ml-3.5" : "lg:-top-[55px] lg:left-1/2 lg:-ml-3.5"
            )}
          >
            {i + 1}
          </m.span>
          <div className="group/step relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
            {s.kicker && (
              <m.p variants={item} className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-600 uppercase">
                {s.kicker}
              </m.p>
            )}
            <m.h3 variants={item} className={cn("text-xl leading-snug font-bold", s.kicker && "mt-2")}>
              {s.title}
            </m.h3>
            {s.body && (
              <m.div variants={item} className="mt-3 flex-1 text-[0.9375rem] leading-relaxed">
                {s.body}
              </m.div>
            )}
            <m.span
              aria-hidden="true"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: EASE, delay: 0.2 } } }}
              className="absolute inset-x-0 bottom-0 h-1 origin-left bg-gradient-to-r from-brand-400 to-brand-600"
            />
          </div>
        </m.li>
      ))}
    </ol>
  )
}
