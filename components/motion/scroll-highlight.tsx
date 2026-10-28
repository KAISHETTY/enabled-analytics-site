"use client"

import * as React from "react"
import { m, useScroll, useTransform, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

function Word({ children, progress, range, emphasis }: { children: string; progress: MotionValue<number>; range: [number, number]; emphasis: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <m.span style={{ opacity }} className={cn("inline", emphasis && "accent-serif text-brand-600")}>
      {children}{" "}
    </m.span>
  )
}

/**
 * DAQ-style manifesto: words go from faint to full ink as the block scrolls
 * through the viewport. Words wrapped in *asterisks* get the serif accent.
 */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] })
  const words = text.split(" ")
  return (
    <p ref={ref} className={cn("font-heading text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.18] font-bold tracking-tight text-ink", className)}>
      <span className="sr-only">{text.replaceAll("*", "")}</span>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const emphasis = w.startsWith("*")
          const start = i / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} emphasis={emphasis}>
              {w.replaceAll("*", "")}
            </Word>
          )
        })}
      </span>
    </p>
  )
}
