"use client"

import * as React from "react"
import { m } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Card whose border and surface light up under the pointer (a radial glow that
 * follows the cursor via CSS variables). Rises in on scroll; on touch it simply
 * shows the resting state.
 */
export function SpotlightCard({ children, className, id, delay = 0 }: { children: React.ReactNode; className?: string; id?: string; delay?: number }) {
  const ref = React.useRef<HTMLElement>(null)
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty("--sx", `${e.clientX - r.left}px`)
    ref.current.style.setProperty("--sy", `${e.clientY - r.top}px`)
  }
  return (
    <m.article
      ref={ref}
      id={id}
      onPointerMove={onMove}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay }}
      className={cn(
        "group/spot relative scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift md:p-8",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 before:[background:radial-gradient(380px_circle_at_var(--sx,50%)_var(--sy,0%),rgba(1,118,211,0.12),transparent_65%)] hover:before:opacity-100",
        className
      )}
    >
      <div className="relative">{children}</div>
    </m.article>
  )
}
