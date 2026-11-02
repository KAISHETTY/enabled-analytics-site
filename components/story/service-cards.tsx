"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { m, useMotionTemplate, useScroll, useSpring, useTransform, type Variants } from "framer-motion"
import { ArrowIcon } from "@/components/ea/button"
import { DynamicIcon } from "@/components/ea/icon"

export type CoreService = { slug: string; title: string; summary: string; icon: string; image?: string }

const EASE = [0.22, 1, 0.36, 1] as const

const card: Variants = {
  hidden: { opacity: 0, y: 70, rotateX: 22, scale: 0.94 },
  show: (i: number) => ({ opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 15, delay: i * 0.12, staggerChildren: 0.07, delayChildren: 0.25 + i * 0.12 } }),
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

/**
 * Core services as stops on a dotted road (like "Your journey"): the road
 * draws itself as you scroll (across the top on desktop, down the left on
 * phones), each stop lights up and its card rises in with staggered contents.
 */
export function ServiceCards({ services }: { services: CoreService[] }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 70%"] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const rest = useTransform(p, (v) => `${(1 - v) * 100}%`)
  const hClip = useMotionTemplate`inset(0 ${rest} 0 0)`
  const vClip = useMotionTemplate`inset(0 0 ${rest} 0)`

  return (
    <div ref={ref} className="relative grid gap-6 pl-10 md:grid-cols-3 md:pt-16 md:pl-0">
      {/* the road: a faint track with a bright copy revealed by scroll */}
      <div aria-hidden="true" className="absolute top-3 bottom-10 left-[15px] border-l-2 border-dashed border-brand-200 md:hidden" />
      <m.div aria-hidden="true" style={{ clipPath: vClip }} className="absolute top-3 bottom-10 left-[15px] border-l-2 border-dashed border-brand-500 md:hidden" />
      <div aria-hidden="true" className="absolute top-[22px] right-[16.66%] left-[16.66%] hidden border-t-2 border-dashed border-brand-200 md:block" />
      <m.div aria-hidden="true" style={{ clipPath: hClip }} className="absolute top-[22px] right-[16.66%] left-[16.66%] hidden border-t-2 border-dashed border-brand-500 md:block" />

      {services.map((s, i) => (
        <m.div key={s.slug} custom={i} variants={card} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }} className="relative [perspective:1000px]">
          {/* the stop on the road */}
          <m.span
            aria-hidden="true"
            variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 320, damping: 14 } } }}
            className="absolute top-9 -left-[34px] flex size-5 items-center justify-center rounded-full bg-white ring-2 ring-brand-500 md:-top-[51px] md:left-1/2 md:-ml-2.5"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-400/40 motion-reduce:animate-none" />
            <span className="size-2 rounded-full bg-brand-500" />
          </m.span>

          <m.div whileTap={{ scale: 0.98 }} className="h-full">
            <Link
              href={`/services/${s.slug}`}
              className="group/svc relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift md:p-8"
            >
              {/* light sweep on hover */}
              {s.image && (
                <m.div
                  variants={{ hidden: { opacity: 0, scale: 1.08 }, show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } } }}
                  className="relative -mx-7 -mt-7 mb-6 aspect-[16/9] overflow-hidden md:-mx-8 md:-mt-8"
                >
                  <Image src={s.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover/svc:scale-105" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                </m.div>
              )}
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-2/3 z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 group-hover/svc:translate-x-[420%]" />
              <div className="relative flex items-start justify-between">
                <m.span
                  variants={{ hidden: { opacity: 0, scale: 0.3, rotate: -25 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 13 } } }}
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover/svc:-rotate-6 group-hover/svc:bg-brand-600 group-hover/svc:text-white"
                >
                  <DynamicIcon name={s.icon} className="size-6 animate-bob motion-reduce:animate-none" />
                </m.span>
                <m.span
                  variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
                  aria-hidden="true"
                  className="font-heading text-5xl font-extrabold text-brand-100 transition-colors group-hover/svc:text-brand-200"
                >
                  {String(i + 1).padStart(2, "0")}
                </m.span>
              </div>
              <m.h3 variants={item} className="relative mt-6 text-2xl font-bold">
                {s.title}
              </m.h3>
              <m.p variants={item} className="relative mt-3 flex-1 leading-relaxed">
                {s.summary}
              </m.p>
              <m.span variants={item} className="relative mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-700">
                Learn more <ArrowIcon className="animate-nudge motion-reduce:animate-none" />
              </m.span>
              {/* progress bar fills once the card lands */}
              <m.span
                aria-hidden="true"
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: EASE, delay: 0.2 } } }}
                className="absolute inset-x-0 bottom-0 h-1 origin-left bg-gradient-to-r from-brand-400 to-brand-600"
              />
            </Link>
          </m.div>
        </m.div>
      ))}
    </div>
  )
}
