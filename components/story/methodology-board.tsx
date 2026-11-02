"use client"

import * as React from "react"
import { m, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

type Phase = { n: string; title: string; focus: string; sprintChips: string[]; activities: string[]; tools: string[] }
type Methodology = {
  phases: Phase[]
  roles: string[]
  loop: { feedback: string[]; ceremonies: string[] }
  milestones: string[]
  after: string
}

const EASE = [0.22, 1, 0.36, 1] as const
/** Column widths follow the slide: Pre-Game, Development, Closure. */
const WIDTHS = [2, 4, 1.6]
const TOTAL = WIDTHS.reduce((a, b) => a + b, 0)
/** Milestone positions along the axis (share of the three phase columns). */
const GATES = [0, 2 / TOTAL, 5 / TOTAL, 6 / TOTAL, 1]
const ROWS = ["Phases", "Focus", "Sprints", "Activities", "Tools", "Project roles"]

const inView = { once: true, margin: "0px 0px -12% 0px" } as const

function Gate({ label, at, progress, i }: { label: string; at: number; progress: MotionValue<number>; i: number }) {
  const lit = useTransform(progress, [Math.max(0, at - 0.04), at + 0.001], [0, 1])
  const scale = useTransform(lit, [0, 1], [0.6, 1])
  const bg = useTransform(lit, [0, 1], ["#ffffff", "#0176d3"])
  const labelOpacity = useTransform(lit, [0, 1], [0.45, 1])
  return (
    <div className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: `${at * 100}%` }}>
      <m.span style={{ scale, backgroundColor: bg }} className="block size-4 rounded-full ring-2 ring-brand-500" />
      <m.span style={{ opacity: labelOpacity }} className={cn("mt-2 max-w-[9rem] text-center text-xs leading-snug font-semibold text-ink", i === 0 && "translate-x-1/3", i === GATES.length - 1 && "-translate-x-1/3")}>
        {label}
      </m.span>
    </div>
  )
}

/**
 * The deck's Implementation Methodology slide as a living diagram: phases drop
 * in column by column, the focus and role bands sweep across, sprint chips and
 * activities cascade, the sprint loop turns under Development, and the
 * milestone axis fills with scroll, lighting each gate as it passes. Hovering a
 * phase spotlights its column. Phones get a vertical phase-by-phase version.
 */
export function MethodologyBoard({ data }: { data: Methodology }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hot, setHot] = React.useState<number | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const fill = useTransform(progress, (v) => `${v * 100}%`)
  const cols = `150px ${WIDTHS.map((w) => `${w}fr`).join(" ")} 120px`
  const dim = (c: number) => (hot !== null && hot !== c ? "opacity-40" : "opacity-100")
  const cell = (c: number) => ({ onMouseEnter: () => setHot(c), onMouseLeave: () => setHot(null) })
  const colDelay = (c: number) => 0.15 + c * 0.25

  return (
    <div ref={ref}>
      {/* ── Wide screens: the slide ── */}
      <div className="hidden lg:block">
        <div className="grid gap-x-3 gap-y-3" style={{ gridTemplateColumns: cols }}>
          {ROWS.map((label, r) => (
            <m.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.5, ease: EASE, delay: r * 0.06 }}
              style={{ gridColumn: 1, gridRow: r + 1 }}
              className={cn("flex items-center rounded-l-2xl px-4 font-semibold text-white", r === 0 ? "bg-brand-800" : r === 1 ? "bg-agent-500" : "bg-agent-500/70")}
            >
              {label}
            </m.div>
          ))}

          {data.phases.map((ph, c) => (
            <React.Fragment key={ph.title}>
              {/* Phase header */}
              <m.div
                {...cell(c)}
                initial={{ opacity: 0, y: -24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ type: "spring", stiffness: 160, damping: 18, delay: colDelay(c) }}
                style={{ gridColumn: c + 2, gridRow: 1 }}
                className={cn("flex items-center gap-3 rounded-2xl bg-brand-800 px-4 py-3 text-white shadow-soft transition-opacity duration-300", dim(c))}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white font-heading font-extrabold text-brand-800">{ph.n}</span>
                <span className="font-heading text-lg font-bold">{ph.title}</span>
              </m.div>
              {/* Focus band */}
              <m.div
                {...cell(c)}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={inView}
                transition={{ duration: 0.7, ease: EASE, delay: colDelay(c) + 0.15 }}
                style={{ gridColumn: c + 2, gridRow: 2 }}
                className={cn("origin-left rounded-2xl bg-gradient-to-r from-agent-600 to-agent-500 px-4 py-3 text-center font-heading font-bold text-white transition-opacity duration-300", dim(c))}
              >
                {ph.focus}
              </m.div>
              {/* Sprints */}
              <m.ul
                {...cell(c)}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: colDelay(c) + 0.3 } } }}
                style={{ gridColumn: c + 2, gridRow: 3 }}
                className={cn("flex flex-wrap items-center gap-2 rounded-2xl bg-agent-50 p-3 transition-opacity duration-300", dim(c))}
              >
                {ph.sprintChips.length === 0 && <li className="text-sm text-ink-subtle">Acceptance & release</li>}
                {ph.sprintChips.map((s, k) =>
                  s === "…" ? (
                    <m.li key={`dots-${k}`} variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} aria-hidden="true" className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="size-1.5 animate-pulse rounded-full bg-agent-500 motion-reduce:animate-none" style={{ animationDelay: `${d * 200}ms` }} />
                      ))}
                    </m.li>
                  ) : (
                    <m.li
                      key={s}
                      variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 320, damping: 18 } } }}
                      className={cn("rounded-xl bg-white px-3 py-1.5 text-sm font-semibold text-agent-600 shadow-soft ring-1 ring-agent-100", s.startsWith("Hardening") && "ml-auto")}
                    >
                      {s}
                    </m.li>
                  )
                )}
              </m.ul>
              {/* Activities */}
              <m.ul
                {...cell(c)}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: colDelay(c) + 0.45 } } }}
                style={{ gridColumn: c + 2, gridRow: 4 }}
                className={cn("grid content-start gap-2 rounded-2xl bg-agent-50 p-3 transition-opacity duration-300", c === 1 ? "grid-cols-3" : c === 0 ? "grid-cols-2" : "grid-cols-1", dim(c))}
              >
                {ph.activities.map((a) => (
                  <m.li
                    key={a}
                    variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
                    className="flex items-center justify-center rounded-lg bg-white px-2 py-2 text-center text-[0.8125rem] leading-snug text-ink shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {a}
                  </m.li>
                ))}
              </m.ul>
              {/* Tools */}
              <m.div
                {...cell(c)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.5, ease: EASE, delay: colDelay(c) + 0.7 }}
                style={{ gridColumn: c + 2, gridRow: 5 }}
                className={cn("rounded-2xl bg-agent-50 p-3 transition-opacity duration-300", dim(c))}
              >
                {ph.tools.length > 0 ? (
                  <ul className="space-y-1">
                    {ph.tools.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-500" /> {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-sm text-ink-subtle">—</span>
                )}
              </m.div>
            </React.Fragment>
          ))}

          {/* Project roles band across every phase */}
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
            style={{ gridColumn: "2 / 5", gridRow: 6 }}
            className="origin-left rounded-2xl bg-agent-50 px-4 py-3 text-sm font-medium text-ink"
          >
            {data.roles.join(" · ")}
          </m.div>

          {/* Rollout arrow */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: 1.1 }}
            style={{ gridColumn: 5, gridRow: "2 / 6" }}
            className="relative flex h-56 items-center self-center bg-ink pr-8 pl-3 font-heading text-sm leading-tight font-bold text-white [clip-path:polygon(0_0,62%_0,100%_50%,62%_100%,0_100%)]"
          >
            <span>{data.after}</span>
          </m.div>
        </div>

        {/* Sprint loop under Development + milestone axis */}
        <div className="grid gap-x-3" style={{ gridTemplateColumns: cols }}>
          <div style={{ gridColumn: "2 / 5" }} className="relative">
            <div className="grid" style={{ gridTemplateColumns: WIDTHS.map((w) => `${w}fr`).join(" ") }}>
              <div style={{ gridColumn: 2 }} className="flex items-center justify-center gap-6 pt-6">
                <ul className="space-y-1 text-right text-sm text-ink">
                  {data.loop.feedback.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <span aria-hidden="true" className="relative flex size-20 shrink-0 items-center justify-center rounded-full bg-agent-50 text-agent-500 ring-1 ring-agent-100">
                  <RefreshCw className="size-10 animate-spin-slow motion-reduce:animate-none" />
                </span>
                <ul className="space-y-1 text-sm text-ink">
                  {data.loop.ceremonies.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative mt-8 h-24">
              <div className="absolute inset-x-0 top-[7px] h-1.5 rounded-full bg-agent-100" />
              <m.div style={{ width: fill }} className="absolute top-[7px] left-0 h-1.5 rounded-full bg-gradient-to-r from-agent-500 to-brand-600" />
              {data.milestones.map((label, i) => (
                <Gate key={label} label={label} at={GATES[i]} progress={progress} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Phones & tablets: phase by phase ── */}
      <ol className="relative space-y-5 border-l-2 border-dashed border-agent-100 pl-7 lg:hidden">
        {data.phases.map((ph, c) => (
          <m.li
            key={ph.title}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft"
          >
            <span aria-hidden="true" className="absolute top-4 -left-[2px] h-8 w-1 rounded-r bg-agent-500" />
            <div className="flex items-center gap-3 bg-brand-800 px-5 py-3 text-white">
              <span className="flex size-8 items-center justify-center rounded-full bg-white font-heading font-extrabold text-brand-800">{ph.n}</span>
              <span className="font-heading text-lg font-bold">{ph.title}</span>
            </div>
            <p className="bg-gradient-to-r from-agent-600 to-agent-500 px-5 py-2 text-sm font-semibold text-white">{ph.focus}</p>
            <div className="space-y-4 p-5">
              {ph.sprintChips.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {ph.sprintChips
                    .filter((s) => s !== "…")
                    .map((s) => (
                      <li key={s} className="rounded-lg bg-agent-50 px-2.5 py-1 text-xs font-semibold text-agent-600">
                        {s}
                      </li>
                    ))}
                </ul>
              )}
              <ul className="flex flex-wrap gap-1.5">
                {ph.activities.map((a) => (
                  <li key={a} className="rounded-full bg-surface px-2.5 py-1 text-xs text-ink ring-1 ring-line">
                    {a}
                  </li>
                ))}
              </ul>
              {ph.tools.length > 0 && <p className="text-sm font-semibold text-brand-700">Accelerators: {ph.tools.join(", ")}</p>}
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span aria-hidden="true" className="size-2.5 rounded-full bg-brand-600" /> {data.milestones[c === 0 ? 1 : c === 1 ? 3 : 4]}
              </p>
            </div>
          </m.li>
        ))}
        <m.li initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView} transition={{ duration: 0.55, ease: EASE }} className="rounded-[1.5rem] bg-ink px-5 py-4 font-heading font-bold text-white">
          → {data.after}
        </m.li>
      </ol>
      <p className="mt-6 text-sm text-ink-subtle lg:hidden">
        <span className="font-semibold text-ink">Every sprint:</span> {[...data.loop.feedback, ...data.loop.ceremonies].join(" · ")}. <span className="font-semibold text-ink">Roles:</span> {data.roles.join(" · ")}.
      </p>
    </div>
  )
}
