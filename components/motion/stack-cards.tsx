"use client"

import * as React from "react"
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

function StackItem({ children, index, total, progress, top }: { children: React.ReactNode; index: number; total: number; progress: MotionValue<number>; top: number }) {
  const reduce = useReducedMotion()
  // Once later cards slide over this one, shrink it and dim it slightly.
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.04])
  const filter = useTransform(progress, [start, Math.min(1, start + 0.35)], ["brightness(1)", index === total - 1 ? "brightness(1)" : "brightness(0.96)"])
  return (
    <div className="sticky" style={{ top: top + index * 28 }}>
      <m.div style={reduce ? undefined : { scale, filter }} className="origin-top will-change-transform">
        {children}
      </m.div>
    </div>
  )
}

/**
 * TO TOP's sticky stacking cards: each card pins under the header and the next
 * card slides over it while the previous scales back.
 */
export function StackCards({ items, className, top = 110 }: { items: React.ReactNode[]; className?: string; top?: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  return (
    <div ref={ref} className={cn("relative flex flex-col gap-[14vh] pb-[6vh]", className)}>
      {items.map((child, i) => (
        <StackItem key={i} index={i} total={items.length} progress={scrollYProgress} top={top}>
          {child}
        </StackItem>
      ))}
    </div>
  )
}
