"use client"

import * as React from "react"
import Image from "next/image"
import { m, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type RoadStep = { title: string; text?: string; image?: string }

function Milestone({ step, index, icon: Icon, reached }: { step: RoadStep; index: number; icon: LucideIcon; reached: boolean }) {
  return (
    <li className="relative pl-16">
      {/* node on the road */}
      <m.span
        aria-hidden="true"
        animate={{ scale: reached ? 1 : 0.8, backgroundColor: reached ? "var(--color-brand-600)" : "#ffffff", borderColor: reached ? "var(--color-brand-600)" : "var(--color-brand-200)" }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="absolute top-1 left-0 z-10 flex size-12 items-center justify-center rounded-full border-[3px] shadow-soft"
      >
        <Icon className={cn("size-5 transition-colors duration-300", reached ? "text-white" : "text-brand-300")} />
      </m.span>
      <m.article
        initial={{ opacity: 0, x: 48, rotate: 2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: "0px 0px -18% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft"
      >
        {step.image && (
          <m.div initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="relative aspect-[16/8]">
            <Image src={step.image} alt="" fill sizes="90vw" className="object-cover" />
          </m.div>
        )}
        <div className="p-5">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-600 uppercase">Step {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 text-xl font-extrabold">{step.title}</h3>
          {step.text && <p className="mt-2 text-[0.9375rem] leading-relaxed">{step.text}</p>}
        </div>
      </m.article>
    </li>
  )
}

/**
 * Phone version of the "How we work" road: a vertical road on the left draws
 * itself with scroll, a glowing traveller rides it, milestones light up as it
 * passes them, and each step card slides in with its photo zooming to rest.
 */
export function MobileRoad({ steps, icons }: { steps: RoadStep[]; icons: LucideIcon[] }) {
  const ref = React.useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })
  const travellerTop = useTransform(progress, [0, 1], ["0%", "100%"])
  const [reached, setReached] = React.useState(-1)
  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(v < 0.01 ? -1 : Math.min(steps.length - 1, Math.floor(v * steps.length))))

  return (
    <ol ref={ref} className="relative space-y-8">
      {/* road: soft base + drawn gradient line */}
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[22px] w-1.5 rounded-full bg-brand-50" />
      <m.span aria-hidden="true" style={{ scaleY: progress }} className="absolute top-2 bottom-2 left-[22px] w-1.5 origin-top rounded-full bg-gradient-to-b from-brand-500 to-agent-500" />
      <m.span aria-hidden="true" style={{ top: travellerTop }} className="absolute left-[25px] z-20 -translate-x-1/2 -translate-y-1/2">
        <span className="block size-5 rounded-full border-[3px] border-agent-500 bg-white shadow-[0_0_0_8px_rgba(27,150,255,0.25)]" />
      </m.span>
      {steps.map((s, i) => (
        <Milestone key={s.title} step={s} index={i} icon={icons[i % icons.length]} reached={i <= reached} />
      ))}
    </ol>
  )
}
