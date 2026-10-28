"use client"

import * as React from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Stat } from "@/lib/content"

function Counter({ value, decimals = 0, suffix = "" }: Pick<Stat, "value" | "decimals" | "suffix">) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()

  React.useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduce) {
      node.textContent = value.toFixed(decimals)
      return
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = v.toFixed(decimals)
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, decimals])

  // Server/no-JS render shows the final value so the number is never wrong.
  return (
    <span className="tabular-nums">
      <span ref={ref}>{value.toFixed(decimals)}</span>
      {suffix}
    </span>
  )
}

type StatsCounterProps = {
  stats: Stat[]
  variant?: "tiles" | "inline"
  className?: string
}

/** Animated count-up stat tiles (ABSYZ "Why customers choose us"). */
export function StatsCounter({ stats, variant = "tiles", className }: StatsCounterProps) {
  const cols = stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-4 md:gap-6",
        cols,
        variant === "inline" && "gap-0 divide-line rounded-2xl border border-line bg-white shadow-soft max-lg:[&>*:nth-child(odd)]:border-r lg:divide-x [&>*]:border-line max-lg:[&>*:nth-child(-n+2)]:border-b",
        className
      )}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className={cn(
            "flex flex-col gap-2",
            variant === "tiles" && "rounded-xl border border-line bg-white p-6 shadow-soft md:p-8",
            variant === "inline" && "p-6 md:p-8"
          )}
        >
          <dt className="order-2 text-sm leading-snug font-medium text-ink-muted md:text-base">{s.label}</dt>
          <dd className="order-1 font-heading text-4xl font-extrabold tracking-tight text-brand-600 md:text-5xl">
            <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
