"use client"

import * as React from "react"
import Image from "next/image"
import { m, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Location } from "@/lib/locations"

export type MapPin = Location & { x: number; y: number }

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Epic world map: land sweeps in as a dotted Salesforce-blue field, the map
 * tilts flat as it scrolls in, pins drop one by one with pulse rings, and
 * flight arcs draw out from Lewisville HQ with glowing "planes" travelling
 * along them. Pins are buttons: hover/focus reveals a flag card.
 */
export function GlobalMap({ width, height, landPath, graticule, pins, arcs }: { width: number; height: number; landPath: string; graticule: string; pins: MapPin[]; arcs: { id: string; d: string }[] }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState<string | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const tilt = useSpring(useTransform(scrollYProgress, [0, 1], [24, 0]), { stiffness: 90, damping: 22 })
  const lift = useSpring(useTransform(scrollYProgress, [0, 1], [60, 0]), { stiffness: 90, damping: 22 })
  const play = inView || !!reduce
  const id = React.useId().replace(/:/g, "")

  return (
    <div ref={ref} className="relative [perspective:1600px]">
      <m.div style={reduce ? undefined : { rotateX: tilt, y: lift }} className="relative origin-bottom will-change-transform">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full overflow-visible" role="img" aria-label="World map of Enabled Analytics locations">
          <defs>
            <pattern id={`dots-${id}`} width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.55" fill="var(--color-brand-500)" />
            </pattern>
            <linearGradient id={`fade-${id}`} x1="0" x2="1">
              <stop offset="0" stopColor="var(--color-brand-400)" />
              <stop offset="1" stopColor="var(--color-agent-500)" />
            </linearGradient>
            <radialGradient id={`glow-${id}`}>
              <stop offset="0" stopColor="white" stopOpacity="1" />
              <stop offset="0.4" stopColor="var(--color-brand-400)" stopOpacity="0.9" />
              <stop offset="1" stopColor="var(--color-brand-400)" stopOpacity="0" />
            </radialGradient>
            <clipPath id={`sweep-${id}`}>
              <m.rect x="0" y="-60" height={height + 120} initial={{ width: reduce ? width : 0 }} animate={{ width: play ? width : 0 }} transition={{ duration: 1.6, ease: EASE }} />
            </clipPath>
          </defs>

          {/* graticule + dotted land, revealed by a left→right sweep */}
          <g clipPath={`url(#sweep-${id})`}>
            <path d={graticule} fill="none" stroke="var(--color-brand-100)" strokeWidth="0.6" />
            <path d={landPath} fill="var(--color-brand-50)" />
            <path d={landPath} fill={`url(#dots-${id})`} opacity="0.85" />
            <path d={landPath} fill="none" stroke="var(--color-brand-200)" strokeWidth="0.6" />
          </g>

          {/* flight arcs from HQ */}
          {arcs.map((a, i) => (
            <g key={a.id}>
              <m.path
                id={`arc-${id}-${a.id}`}
                d={a.d}
                fill="none"
                stroke={`url(#fade-${id})`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1 0"
                initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
                animate={play ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 1.3 + i * 0.25, duration: 1.4, ease: EASE }}
              />
              {!reduce && play && (
                <circle r="5" fill={`url(#glow-${id})`}>
                  <animateMotion dur={`${3.2 + i * 0.5}s`} begin={`${2.6 + i * 0.3}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#arc-${id}-${a.id}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}

          {/* pins */}
          {pins.map((p, i) => (
            <m.g
              key={p.id}
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -40 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + i * 0.18, type: "spring", stiffness: 260, damping: 14 }}
            >
              {!reduce && (
                <circle cx={p.x} cy={p.y} r="6" fill="none" stroke={p.kind === "HQ" ? "var(--color-agent-500)" : "var(--color-brand-500)"} strokeWidth="2">
                  <animate attributeName="r" values="6;22" dur="2.2s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="2.2s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={p.x} cy={p.y} r={p.kind === "HQ" ? 8 : 6} fill={p.kind === "HQ" ? "var(--color-agent-500)" : "var(--color-brand-600)"} stroke="white" strokeWidth="3" />
            </m.g>
          ))}
        </svg>

        {/* accessible hit targets + flag cards, positioned in % over the SVG */}
        {pins.map((p, i) => {
          const open = active === p.id
          const right = p.x / width > 0.72
          return (
            <div key={p.id} className="absolute" style={{ left: `${(p.x / width) * 100}%`, top: `${(p.y / height) * 100}%` }}>
              <button
                type="button"
                aria-label={`${p.city}, ${p.country}: ${p.kind}`}
                aria-expanded={open}
                onMouseEnter={() => setActive(p.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(open ? null : p.id)}
                className="absolute size-9 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-offset-2"
              />
              {/* always-on mini label (desktop) */}
              <m.span
                aria-hidden="true"
                initial={{ opacity: 0, y: 6 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 + i * 0.18, duration: 0.5 }}
                className={cn(
                  "pointer-events-none absolute top-3 hidden items-center gap-1.5 rounded-full bg-white/95 py-1 pr-2.5 pl-1 text-xs font-semibold whitespace-nowrap text-ink shadow-soft ring-1 ring-line md:flex",
                  right ? "right-2" : "left-2",
                  open && "opacity-0!"
                )}
              >
                <Image src={p.flag} alt="" width={20} height={15} className="h-[15px] w-5 rounded-[3px] object-cover ring-1 ring-black/5" />
                {p.city}
              </m.span>
              {/* hover / focus card */}
              <span
                role="tooltip"
                className={cn(
                  "pointer-events-none absolute bottom-6 z-20 w-64 rounded-2xl border border-line bg-white p-4 text-left shadow-lift transition-all duration-300",
                  right ? "right-0" : "-left-6",
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Image src={p.flag} alt={`${p.country} flag`} width={36} height={27} className="h-[27px] w-9 rounded-md object-cover ring-1 ring-black/5" />
                  <span>
                    <span className="block font-heading font-bold text-ink">{p.city}</span>
                    <span className="block text-xs text-ink-subtle">{p.country}</span>
                  </span>
                  <span className={cn("ml-auto rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold", p.kind === "HQ" ? "bg-agent-50 text-agent-600" : "bg-brand-50 text-brand-700")}>{p.kind}</span>
                </span>
                <span className="mt-2.5 block text-xs leading-relaxed text-ink-muted">{p.detail}</span>
              </span>
            </div>
          )
        })}
      </m.div>
    </div>
  )
}
