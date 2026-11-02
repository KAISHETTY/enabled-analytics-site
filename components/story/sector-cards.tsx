"use client"

import * as React from "react"
import Link from "next/link"
import { Building2, Landmark, RadioTower } from "lucide-react"
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowIcon } from "@/components/ea/button"
import { Cloud } from "@/components/motion/sky-scene"

export type Sector = { href: string; icon: "landmark" | "radio" | "building"; kicker: string; title: string; text: string; tags: string[]; tone: "dark" | "navy" | "light" }

const ICONS = { landmark: Landmark, radio: RadioTower, building: Building2 }
const EASE = [0.22, 1, 0.36, 1] as const

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

/** One sector card: swings in from its side (the middle one rises from below), staggers its contents, and tilts toward the pointer with a moving shine. */
function SectorCard({ s, index, count }: { s: Sector; index: number; count: number }) {
  const reduce = useReducedMotion()
  const dark = s.tone !== "light"
  // -1 = from the left, 0 = from below, 1 = from the right
  const side = count === 3 ? index - 1 : index === 0 ? -1 : 1
  const Icon = ICONS[s.icon]
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 160, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 160, damping: 18 })
  const shine = useMotionTemplate`radial-gradient(420px circle at ${useTransform(px, (v) => `${v * 100}%`)} ${useTransform(py, (v) => `${v * 100}%`)}, ${dark ? "rgba(255,255,255,0.22)" : "rgba(1,118,211,0.10)"}, transparent 60%)`

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <m.div
      initial={{ opacity: 0, x: side * 90, rotate: side * 6, y: side === 0 ? 90 : 40 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ type: "spring", stiffness: 90, damping: 16, delay: index * 0.15 }}
      className={cn("h-full [perspective:1200px]", count === 3 && index === 2 && "md:col-span-2 lg:col-span-1")}
    >
      <m.div style={reduce ? undefined : { rotateX: rx, rotateY: ry }} whileTap={{ scale: 0.98 }} className="h-full [transform-style:preserve-3d]">
        <Link
          href={s.href}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className={cn(
            "group/sector relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 shadow-lift transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(3,45,96,0.35)] md:p-10",
            s.tone === "dark" ? "bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white" : s.tone === "navy" ? "bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 text-white" : "border border-line bg-white"
          )}
        >
          {/* pointer-following shine */}
          <m.span aria-hidden="true" style={{ background: shine }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/sector:opacity-100" />
          {/* a cloud drifting across the card */}
          <Cloud className={cn("pointer-events-none absolute top-6 -right-10 w-40 animate-drift-card motion-reduce:animate-none", dark ? "opacity-20" : "opacity-60")} />
          <span aria-hidden="true" className={cn("absolute -bottom-24 -left-24 size-72 rounded-full blur-3xl transition-transform duration-700 group-hover/sector:scale-125", dark ? "bg-white/10" : "bg-brand-100/60")} />

          <m.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -15% 0px" }} transition={{ staggerChildren: 0.08, delayChildren: 0.35 + index * 0.15 }} className="relative flex flex-1 flex-col">
            <m.span
              variants={{ hidden: { opacity: 0, scale: 0.4, rotate: -20 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 14 } } }}
              aria-hidden="true"
              className={cn("flex size-14 items-center justify-center rounded-2xl ring-1", dark ? "bg-white/15 text-white ring-white/30" : "bg-brand-50 text-brand-600 ring-brand-100")}
            >
              <Icon className="size-7 animate-bob motion-reduce:animate-none" />
            </m.span>
            <m.p variants={item} className={cn("mt-8 font-mono text-xs tracking-[0.14em] uppercase", dark ? "text-brand-100" : "text-brand-600")}>
              {String(index + 1).padStart(2, "0")} · {s.kicker}
            </m.p>
            <m.h3 variants={item} className={cn("mt-3 text-[1.75rem] leading-tight font-extrabold", count < 3 && "md:text-4xl", dark && "text-white")}>
              {s.title}
            </m.h3>
            <m.p variants={item} className={cn("mt-4 leading-relaxed", count < 3 && "text-lg", dark && "text-brand-50")}>
              {s.text}
            </m.p>
            <m.ul variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} className="mt-6 flex flex-1 flex-wrap content-start gap-2">
              {s.tags.map((t) => (
                <m.li
                  key={t}
                  variants={{ hidden: { opacity: 0, y: -14, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } } }}
                  className={cn("rounded-full px-3 py-1 text-sm font-medium transition-colors", dark ? "bg-white/15 text-white ring-1 ring-white/25 group-hover/sector:bg-white/20" : "bg-brand-50 text-brand-700 group-hover/sector:bg-brand-100")}
                >
                  {t}
                </m.li>
              ))}
            </m.ul>
            <m.span variants={item} className={cn("mt-8 inline-flex items-center gap-2 font-semibold", dark ? "text-white" : "text-brand-700")}>
              Explore {s.kicker}
              <ArrowIcon className="animate-nudge motion-reduce:animate-none" />
            </m.span>
          </m.div>
        </Link>
      </m.div>
    </m.div>
  )
}

export function SectorCards({ sectors }: { sectors: Sector[] }) {
  return (
    <div className={cn("relative grid gap-6", sectors.length === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-2 lg:gap-8")}>
      {sectors.map((s, i) => (
        <SectorCard key={s.href} s={s} index={i} count={sectors.length} />
      ))}
    </div>
  )
}
