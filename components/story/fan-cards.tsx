"use client"

import * as React from "react"
import Link from "next/link"
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowIcon } from "@/components/ea/button"

export type FanCard = { kicker: string; title: string; text: string; points: string[]; href: string; cta: string }

/**
 * TO TOP's "Why are you here?" signpost cards: two tilted cards start stacked
 * in the middle and fan out to their places as the section scrolls in.
 */
export function FanCards({ cards, className }: { cards: [FanCard, FanCard]; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  // Fan out only when the cards sit side by side (md+); stacked cards stay put.
  const wide = React.useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 768px)")
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  )
  const prefersReduced = useReducedMotion()
  const reduce = prefersReduced || !wide
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 55%"] })
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 24 })
  const leftX = useTransform(p, [0, 1], ["22%", "0%"])
  const rightX = useTransform(p, [0, 1], ["-22%", "0%"])
  const leftR = useTransform(p, [0, 1], [8, -3])
  const rightR = useTransform(p, [0, 1], [-10, 3])
  const y = useTransform(p, [0, 1], [60, 0])

  return (
    <div ref={ref} className={cn("relative grid gap-6 md:grid-cols-2 md:gap-10", className)}>
      {cards.map((c, i) => (
        <m.article
          key={c.title}
          style={reduce ? undefined : { x: i === 0 ? leftX : rightX, rotate: i === 0 ? leftR : rightR, y }}
          // Phones: each card swings in from its own side as it enters the screen.
          {...(!wide && !prefersReduced
            ? {
                initial: { opacity: 0, x: i === 0 ? -70 : 70, rotate: i === 0 ? -7 : 7 },
                whileInView: { opacity: 1, x: 0, rotate: i === 0 ? -1.5 : 1.5 },
                viewport: { once: true, margin: "0px 0px -12% 0px" },
                transition: { type: "spring", stiffness: 120, damping: 18 },
              }
            : {})}
          className={cn(
            "group/card relative flex flex-col rounded-[2rem] p-8 shadow-lift md:p-10",
            i === 0 ? "bg-white ring-1 ring-line" : "bg-gradient-to-br from-brand-600 to-brand-700 text-white"
          )}
        >
          <p className={cn("font-mono text-xs tracking-[0.14em] uppercase", i === 0 ? "text-brand-600" : "text-brand-100")}>
            {String(i + 1).padStart(2, "0")} · {c.kicker}
          </p>
          <h3 className={cn("mt-4 text-3xl font-extrabold md:text-4xl", i === 1 && "text-white")}>{c.title}</h3>
          <p className={cn("mt-4 text-lg leading-relaxed", i === 1 && "text-brand-50")}>{c.text}</p>
          <ul className="mt-6 flex-1 space-y-2.5">
            {c.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span aria-hidden="true" className={cn("mt-2 size-1.5 shrink-0 rounded-full", i === 0 ? "bg-brand-500" : "bg-white")} />
                <span className={cn(i === 1 && "text-white")}>{pt}</span>
              </li>
            ))}
          </ul>
          <Link
            href={c.href}
            className={cn(
              "group/btn mt-8 inline-flex h-12 items-center gap-2 self-start rounded-full px-6 font-semibold transition hover:-translate-y-0.5",
              i === 0 ? "bg-brand-600 text-white shadow-glow hover:bg-brand-700" : "bg-white text-brand-700 hover:bg-brand-50"
            )}
          >
            {c.cta} <ArrowIcon />
          </Link>
        </m.article>
      ))}
    </div>
  )
}
