"use client"

import * as React from "react"
import { m, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * TO TOP's hiking trail: a dashed path that winds down through a chapter and
 * draws itself as you scroll. Dashes are made with a mask over a solid stroke
 * so pathLength animation keeps the dash look.
 */
export function TrailPath({ className, d = "M120 0 C 40 140, 420 220, 300 380 S 60 620, 240 760 S 520 960, 300 1100" }: { className?: string; d?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] })
  const length = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  const id = React.useId().replace(/:/g, "")
  return (
    <div ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <svg viewBox="0 0 560 1100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <mask id={`trail-${id}`}>
            <path d={d} fill="none" stroke="white" strokeWidth="6" strokeDasharray="2 14" strokeLinecap="round" />
          </mask>
        </defs>
        <path d={d} fill="none" stroke="var(--color-brand-100)" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
        <m.path d={d} fill="none" stroke="var(--color-brand-500)" strokeWidth="6" mask={`url(#trail-${id})`} style={{ pathLength: reduce ? 1 : length }} />
      </svg>
    </div>
  )
}
