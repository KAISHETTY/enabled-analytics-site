"use client"

import * as React from "react"
import { m, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { WeekTimeline } from "@/components/story/week-timeline"

type Bar = { from: number; to: number; text: string }
type Data = {
  benefits: { title: string; text: string }[]
  phases: { title: string; weeks: string }[]
  milestones: { week: string; title: string }[]
  lanes: { label: string; bars: Bar[] }[]
}

const EASE = [0.22, 1, 0.36, 1] as const
const WEEKS = 7
const inView = { once: true, margin: "0px 0px -12% 0px" } as const
const weekNum = (w: string) => parseInt(w.replace(/\D/g, ""), 10)
const span = (weeks: string) => {
  const [a, b = a] = weeks.split(/[–-]/).map(weekNum)
  return [a, b] as const
}

/**
 * The deck's Managed Services slide as a living swimlane: phase chevrons slide
 * in, each workstream bar grows across its weeks, a "this week" scanner sweeps
 * the grid with scroll, milestones drop into place and Service Delivery points
 * onward. Below `lg` it falls back to the simpler week timeline.
 */
export function TransitionBoard({ data }: { data: Data }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] })
  const scan = useTransform(useSpring(scrollYProgress, { stiffness: 80, damping: 22 }), (v) => `${Math.min(1, Math.max(0, v)) * 100}%`)
  const cols = `170px repeat(${WEEKS}, minmax(0, 1fr)) 110px`
  const laneRow = (i: number) => i + 3
  const lastLane = data.lanes.length + 2
  const chevron = ["from-brand-700 to-brand-600", "from-brand-600 to-brand-500", "from-brand-800 to-brand-700"]

  return (
    <div ref={ref}>
      <div className="hidden lg:block">
        <div className="grid gap-x-1.5 gap-y-2" style={{ gridTemplateColumns: cols }}>
          {/* Phase chevrons */}
          <div style={{ gridColumn: 1, gridRow: 1 }} className="flex items-center rounded-xl bg-agent-500 px-3 font-semibold text-white">
            Phase
          </div>
          {data.phases.map((p, i) => {
            const [a, b] = span(p.weeks)
            return (
              <m.div
                key={p.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.25 }}
                style={{ gridColumn: `${a + 1} / ${b + 2}`, gridRow: 1 }}
                className={cn(
                  "flex items-center justify-center bg-gradient-to-r px-6 py-3 text-center text-sm leading-tight font-bold text-white",
                  chevron[i % chevron.length],
                  i === 0 ? "[clip-path:polygon(0_0,calc(100%-18px)_0,100%_50%,calc(100%-18px)_100%,0_100%)] rounded-l-xl" : "[clip-path:polygon(0_0,calc(100%-18px)_0,100%_50%,calc(100%-18px)_100%,0_100%,18px_50%)]"
                )}
              >
                {p.title}
              </m.div>
            )
          })}

          {/* Week ruler */}
          <div style={{ gridColumn: 1, gridRow: 2 }} className="flex items-center rounded-xl bg-agent-500/70 px-3 text-sm font-semibold text-white">
            Transition timeline
          </div>
          {Array.from({ length: WEEKS }, (_, k) => (
            <div key={k} style={{ gridColumn: k + 2, gridRow: 2 }} className="py-2 text-center font-mono text-xs font-semibold tracking-[0.12em] text-brand-700">
              W{k + 1}
            </div>
          ))}

          {/* Workstream lanes */}
          {data.lanes.map((lane, i) => (
            <React.Fragment key={lane.label}>
              <m.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.07 }}
                style={{ gridColumn: 1, gridRow: laneRow(i) }}
                className="flex items-center rounded-xl bg-agent-500/70 px-3 py-2 text-sm leading-tight font-semibold text-white"
              >
                {lane.label}
              </m.div>
              <div style={{ gridColumn: `2 / ${WEEKS + 2}`, gridRow: laneRow(i) }} className="rounded-xl border border-dashed border-brand-100" />
              {lane.bars.map((b, k) => (
                <m.div
                  key={k}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={inView}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.45 + i * 0.12 + k * 0.25 }}
                  style={{ gridColumn: `${b.from + 1} / ${b.to + 2}`, gridRow: laneRow(i) }}
                  className="z-10 my-1 flex origin-left items-center bg-gradient-to-r from-brand-200 to-brand-100 py-2 pr-6 pl-3 text-[0.8125rem] leading-snug font-medium text-brand-800 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%)]"
                >
                  {b.text}
                </m.div>
              ))}
            </React.Fragment>
          ))}

          {/* "This week" scanner across the lanes */}
          <div aria-hidden="true" style={{ gridColumn: `2 / ${WEEKS + 2}`, gridRow: `2 / ${lastLane + 1}` }} className="pointer-events-none relative z-20">
            <m.span style={{ left: scan }} className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-600 via-brand-400 to-transparent shadow-[0_0_12px_rgba(1,118,211,0.6)]" />
          </div>

          {/* Service delivery arrow */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: 1.2 }}
            style={{ gridColumn: WEEKS + 2, gridRow: `3 / ${lastLane + 1}` }}
            className="flex items-center justify-center bg-ink pr-5 pl-2 text-center font-heading text-sm font-bold text-white [clip-path:polygon(0_25%,62%_25%,62%_10%,100%_50%,62%_90%,62%_75%,0_75%)]"
          >
            Service delivery
          </m.div>

          {/* Milestones */}
          <div style={{ gridColumn: 1, gridRow: lastLane + 1 }} className="flex items-center rounded-xl bg-agent-500 px-3 font-semibold text-white">
            Milestones
          </div>
          {data.milestones.map((ms, i) => {
            const w = weekNum(ms.week)
            return (
              <m.div
                key={ms.week}
                initial={{ opacity: 0, y: -16, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={inView}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.9 + i * 0.15 }}
                style={{ gridColumn: w === WEEKS ? `${w + 1} / ${w + 3}` : `${w + 1} / ${w + 2}`, gridRow: lastLane + 1 }}
                className="relative flex items-center gap-2 rounded-xl border-2 border-ink/80 bg-white px-2 py-2"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">{i + 1}</span>
                <span className="text-xs leading-tight font-semibold text-ink">{ms.title}</span>
              </m.div>
            )
          })}
        </div>

        {/* Why it works */}
        <ol className="mt-10 grid grid-cols-4 gap-4">
          {data.benefits.map((b, i) => (
            <m.li
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="rounded-2xl bg-surface p-5"
            >
              <p className="font-heading font-bold text-ink">
                <span className="mr-2 text-brand-600">{i + 1}.</span>
                {b.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed">{b.text}</p>
            </m.li>
          ))}
        </ol>
      </div>

      <div className="lg:hidden">
        <WeekTimeline phases={data.phases} milestones={data.milestones} />
        <ol className="mt-8 grid gap-3 sm:grid-cols-2">
          {data.benefits.map((b, i) => (
            <li key={b.title} className="rounded-2xl bg-surface p-5">
              <p className="font-heading font-bold text-ink">
                <span className="mr-2 text-brand-600">{i + 1}.</span>
                {b.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed">{b.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
