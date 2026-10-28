"use client"

import * as React from "react"
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/** Moves its child by `speed` × section height while the section scrolls past (smoothed like scrub:1.2). */
export function Parallax({ children, speed = 0.2, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const raw = useTransform(scrollYProgress, [0, 1], [`${-speed * 50}%`, `${speed * 50}%`])
  return (
    <div ref={ref} className={cn("relative", className)}>
      <m.div style={reduce ? undefined : { y: raw }} className="h-full w-full will-change-transform">
        {children}
      </m.div>
    </div>
  )
}

/** ABSYZ motion-effect: image scales 1 → `to` as it scrolls through the viewport. */
export function ScrollZoom({ children, to = 1.18, className }: { children: React.ReactNode; to?: number; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, to]), { stiffness: 120, damping: 30 })
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <m.div style={reduce ? undefined : { scale }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  )
}
