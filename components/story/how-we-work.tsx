"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { ClipboardCheck, Handshake, ListOrdered, LogOut, Rocket, TrendingUp, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Timeline } from "@/components/ea/timeline"
import { CloudMark } from "@/components/motion/sky-scene"
import { MobileRoad } from "@/components/story/mobile-road"

export type WorkStep = { title: string; text?: string; image?: string }

const ICONS: LucideIcon[] = [ClipboardCheck, Handshake, ListOrdered, Rocket, TrendingUp, LogOut]
const VB_W = 1200
const VB_H = 300

function roadThrough(points: { x: number; y: number }[]) {
  return points.reduce((d, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`
    const prev = points[i - 1]
    const dx = (p.x - prev.x) / 2
    return `${d} C${prev.x + dx},${prev.y} ${p.x - dx},${p.y} ${p.x},${p.y}`
  }, "")
}

/**
 * "How we work": a pinned scroll journey. The road draws itself, a glowing
 * traveller rides along it, each milestone lights up as it is reached, and the
 * step card swaps (text + photo). Falls back to a static timeline on small
 * screens and for reduced motion.
 */
export function HowWeWork({ title, lead, steps }: { title: React.ReactNode; lead?: string; steps: WorkStep[] }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const pathRef = React.useRef<SVGPathElement>(null)
  const travellerRef = React.useRef<SVGGElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  })

  const n = steps.length
  const points = steps.map((_, i) => ({
    x: 90 + (i * (VB_W - 180)) / (n - 1),
    y: i % 2 === 0 ? 210 : 90,
  }))
  const d = roadThrough(points)

  useMotionValueEvent(progress, "change", (v) => {
    const path = pathRef.current
    const t = travellerRef.current
    if (path && t) {
      const pt = path.getPointAtLength(path.getTotalLength() * Math.min(1, Math.max(0, v)))
      t.setAttribute("transform", `translate(${pt.x} ${pt.y})`)
    }
    const r = Math.min(n - 1, Math.floor(v * (n - 1) + 0.08))
    setActive(r)
  })

  const header = (
    <div className="container-page">
      <p className="eyebrow flex items-center gap-3">
        <CloudMark /> How we work
      </p>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] font-extrabold">{title}</h2>
        {lead && <p className="max-w-md text-lg">{lead}</p>}
      </div>
    </div>
  )

  // Tighter version for the pinned desktop scene so heading + road + card always fit one screen.
  const pinnedHeader = (
    <div className="container-page shrink-0">
      <p className="eyebrow flex items-center gap-3">
        <CloudMark /> How we work
      </p>
      <div className="mt-3 flex items-end justify-between gap-10">
        <h2 className="max-w-3xl text-[clamp(1.75rem,2.9vw,2.85rem)] leading-[1.04] font-extrabold">{title}</h2>
        {lead && <p className="max-w-md text-[0.9375rem] leading-relaxed">{lead}</p>}
      </div>
    </div>
  )

  // Phones/tablets get their own animated vertical road (not a static list).
  const fallback = (
    <div className="py-20 lg:hidden">
      {header}
      <div className="container-page mt-10">
        <MobileRoad steps={steps} icons={ICONS} />
      </div>
    </div>
  )

  if (reduce)
    return (
      <div className="py-20">
        {header}
        <div className="container-page mt-12">
          <Timeline steps={steps} orientation="vertical" />
        </div>
      </div>
    )

  const step = steps[active]
  const Icon = ICONS[active % ICONS.length]

  return (
    <>
      {fallback}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${n * 70 + 60}vh` }}>
        {/* Full-height flex scene: header and card keep their size, the road takes what is left. */}
        <div className="sticky top-0 flex h-[100svh] flex-col gap-4 overflow-hidden pt-24 pb-6 xl:gap-6 xl:pt-28 xl:pb-8">
          {pinnedHeader}

          {/* the road */}
          <div className="container-page flex min-h-0 flex-1 items-center">
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" className="h-full max-h-[340px] w-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="road-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="var(--color-brand-500)" />
                  <stop offset="1" stopColor="var(--color-agent-500)" />
                </linearGradient>
                <radialGradient id="traveller-glow">
                  <stop offset="0" stopColor="white" />
                  <stop offset="0.35" stopColor="var(--color-brand-400)" />
                  <stop offset="1" stopColor="var(--color-brand-400)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* base road */}
              <path d={d} fill="none" stroke="var(--color-brand-50)" strokeWidth="22" strokeLinecap="round" />
              <path d={d} fill="none" stroke="var(--color-brand-100)" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
              {/* drawn progress */}
              <m.path ref={pathRef} d={d} fill="none" stroke="url(#road-grad)" strokeWidth="6" strokeLinecap="round" style={{ pathLength: progress }} />
              {/* milestones */}
              {points.map((p, i) => {
                const on = i <= active
                const StepIcon = ICONS[i % ICONS.length]
                return (
                  <g key={i} transform={`translate(${p.x} ${p.y})`}>
                    <m.circle
                      r="30"
                      initial={false}
                      animate={{
                        scale: i === active ? 1.15 : 1,
                        fill: on ? "var(--color-brand-600)" : "#ffffff",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                      stroke={on ? "var(--color-brand-600)" : "var(--color-brand-200)"}
                      strokeWidth="3"
                    />
                    <foreignObject x="-12" y="-12" width="24" height="24">
                      <StepIcon className={cn("size-6 transition-colors duration-300", on ? "text-white" : "text-brand-300")} />
                    </foreignObject>
                    <text
                      y={i % 2 === 0 ? 62 : -46}
                      textAnchor="middle"
                      className={cn("font-heading text-[19px] font-bold transition-all duration-500", on ? "fill-ink" : "fill-ink-subtle/50")}
                    >
                      {steps[i].title}
                    </text>
                    <text y={i % 2 === 0 ? 84 : -68} textAnchor="middle" className="fill-brand-500 font-mono text-[12px] tracking-[0.14em]">
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </g>
                )
              })}
              {/* traveller */}
              <g ref={travellerRef} transform={`translate(${points[0].x} ${points[0].y})`}>
                <circle r="26" fill="url(#traveller-glow)" opacity="0.9">
                  <animate attributeName="r" values="20;30;20" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle r="7" fill="white" stroke="var(--color-agent-500)" strokeWidth="3" />
              </g>
            </svg>
          </div>

          {/* active step card */}
          <div className="container-page shrink-0">
            <div className="relative grid grid-cols-[1fr_260px] items-center gap-8 overflow-hidden rounded-[1.75rem] border border-line bg-white/90 p-5 shadow-lift backdrop-blur xl:p-6">
              {/* Re-keyed on each step: a fresh entrance, no exit to wait on while scrolling fast. */}
              <m.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="flex gap-6">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-agent-500 text-white shadow-glow">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
                    Step {String(active + 1).padStart(2, "0")} of {String(n).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">{step.title}</h3>
                  <p className="mt-1.5 max-w-2xl leading-relaxed">{step.text}</p>
                </div>
              </m.div>
              <div className="relative h-32 overflow-hidden rounded-2xl">
                <AnimatePresence mode="popLayout" initial={false}>
                  {step.image && (
                    <m.div
                      key={step.image}
                      initial={{ opacity: 0, scale: 1.12 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <Image src={step.image} alt="" fill sizes="260px" className="object-cover" />
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
