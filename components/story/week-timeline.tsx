"use client"

import * as React from "react"
import { m, useScroll, useSpring, useTransform } from "framer-motion"
import { Flag } from "lucide-react"
import { cn } from "@/lib/utils"

type Phase = { title: string; weeks: string }
type Milestone = { week: string; title: string }

const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7"]
const EASE = [0.22, 1, 0.36, 1] as const
const weekIndex = (w: string) => WEEKS.indexOf(w)
const span = (weeks: string) => {
  const [a, b = a] = weeks.split(/[–-]/)
  return [weekIndex(a), weekIndex(b)] as const
}

/**
 * The seven-week transition into support ownership: phase bands grow across
 * the week grid, a progress rail fills with scroll and milestones drop onto
 * their week. Phones read it as a vertical checklist.
 */
export function WeekTimeline({ phases, milestones }: { phases: Phase[]; milestones: Milestone[] }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "center 45%"] })
  const fill = useTransform(useSpring(scrollYProgress, { stiffness: 80, damping: 22 }), [0, 1], ["0%", "100%"])
  const tones = ["from-brand-300 to-brand-400", "from-brand-400 to-brand-600", "from-brand-600 to-brand-800"]

  return (
    <div ref={ref}>
      {/* Wide screens: week grid */}
      <div className="hidden rounded-[2rem] border border-line bg-white p-8 shadow-soft md:block">
        <div className="grid grid-cols-7 gap-2">
          {phases.map((p, i) => {
            const [a, b] = span(p.weeks)
            return (
              <m.div
                key={p.title}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.25 }}
                style={{ gridColumn: `${a + 1} / ${b + 2}` }}
                className={cn("origin-left rounded-xl bg-gradient-to-r px-4 py-3 text-sm font-semibold text-white shadow-soft", tones[i % tones.length])}
              >
                {p.title}
                <span className="ml-2 font-mono text-xs opacity-80">{p.weeks}</span>
              </m.div>
            )
          })}
        </div>

        <div className="relative mt-8">
          <div className="h-1.5 rounded-full bg-brand-50" />
          <m.div style={{ width: fill }} className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-400 to-brand-700" />
          <div className="absolute inset-0 grid grid-cols-7">
            {WEEKS.map((w) => (
              <span key={w} className="relative">
                <span className="absolute top-1/2 left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-brand-400" />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center">
          {WEEKS.map((w, i) => {
            const ms = milestones.find((x) => x.week === w)
            return (
              <div key={w} className="flex flex-col items-center">
                <span className="font-mono text-xs tracking-[0.12em] text-ink-subtle">{w}</span>
                {ms && (
                  <m.div
                    initial={{ opacity: 0, y: -18, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.4 + i * 0.12 }}
                    className="mt-3 flex flex-col items-center gap-2"
                  >
                    <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow">
                      <Flag className="size-4" />
                    </span>
                    <span className="text-sm leading-snug font-semibold text-ink">{ms.title}</span>
                  </m.div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Phones: vertical checklist */}
      <ol className="relative space-y-4 border-l-2 border-dashed border-brand-200 pl-7 md:hidden">
        {milestones.map((ms, i) => {
          const phase = phases.find((p) => {
            const [a, b] = span(p.weeks)
            const k = weekIndex(ms.week)
            return k >= a && k <= b
          })
          return (
            <m.li
              key={ms.week}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
              className="relative rounded-2xl border border-line bg-white p-4 shadow-soft"
            >
              <span aria-hidden="true" className="absolute top-4 -left-[42px] flex size-7 items-center justify-center rounded-full bg-brand-600 text-white ring-4 ring-white">
                <Flag className="size-3.5" />
              </span>
              <p className="font-mono text-xs tracking-[0.12em] text-brand-600">
                {ms.week} · {phase?.title}
              </p>
              <p className="mt-1 font-semibold text-ink">{ms.title}</p>
            </m.li>
          )
        })}
      </ol>
    </div>
  )
}
