"use client"

import * as React from "react"
import { useInView } from "framer-motion"

/**
 * Holds CSS entrance animations (SplitReveal letters etc.) paused until the
 * block scrolls into view, then lets them play once.
 */
export function PlayOnView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" })
  return (
    <span ref={ref} className={`block ${inView ? "" : "play-wait"} ${className ?? ""}`}>
      {children}
    </span>
  )
}
