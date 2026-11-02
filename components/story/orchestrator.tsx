"use client"

import Image from "next/image"
import { m } from "framer-motion"
import { cn } from "@/lib/utils"
import { DynamicIcon } from "@/components/ea/icon"

type Item = { title: string; text: string; icon: string }

const EASE = [0.22, 1, 0.36, 1] as const
/** Icon disc colours from the deck slide, top to bottom on each side. */
const TONES = ["bg-[#8b1d5c]", "bg-[#1f6db3]", "bg-[#8cbf26]"]
const inView = { once: true, margin: "0px 0px -10% 0px" } as const

function Strength({ it, i, side }: { it: Item; i: number; side: "left" | "right" }) {
  const left = side === "left"
  const row = i % 3
  return (
    <m.li
      initial={{ opacity: 0, x: left ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, ease: EASE, delay: 0.5 + row * 0.15 }}
      className={cn("group/o relative flex items-center gap-4", left && "lg:flex-row-reverse lg:text-right", row === 1 && (left ? "lg:-mr-10" : "lg:-ml-10"))}
    >
      {/* dotted connector running into the rings */}
      <m.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={inView}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 + row * 0.15 }}
        className={cn("absolute top-1/2 hidden h-px w-24 border-t-2 border-dotted border-brand-300 lg:block", left ? "-right-24 origin-left" : "-left-24 origin-right")}
      />
      <m.span
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={inView}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.7 + row * 0.15 }}
        aria-hidden="true"
        className={cn("relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full text-white shadow-lift ring-4 ring-white transition-transform duration-300 group-hover/o:scale-110", TONES[row])}
      >
        <DynamicIcon name={it.icon} className="size-7" />
      </m.span>
      <span>
        <span className="block font-heading text-xl font-extrabold text-ink">{it.title}</span>
        <span className="mt-1 block leading-relaxed">{it.text}</span>
      </span>
    </m.li>
  )
}

/**
 * The deck's "Technology Orchestrator" slide: the EA mark at the centre of
 * counter-rotating cyan and navy arcs inside a dashed orbit, with the six
 * strengths on coloured discs connected into the rings by dotted lines.
 */
export function Orchestrator({ items }: { items: Item[] }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px_1fr] lg:gap-8">
      <m.div
        initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={inView}
        transition={{ type: "spring", stiffness: 60, damping: 14 }}
        className="relative mx-auto aspect-square w-[min(78vw,320px)] lg:order-2 lg:w-full"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible">
          {/* outer orbit */}
          <circle cx="200" cy="200" r="196" fill="none" stroke="var(--color-brand-100)" strokeWidth="2" />
          <g className="origin-center animate-spin-slow [animation-duration:60s] motion-reduce:animate-none" style={{ transformBox: "fill-box" }}>
            <circle cx="200" cy="200" r="196" fill="none" stroke="var(--color-brand-700)" strokeWidth="3" strokeDasharray="120 1112" strokeLinecap="round" />
            <circle cx="200" cy="200" r="196" fill="none" stroke="#38c6f4" strokeWidth="3" strokeDasharray="90 1142" strokeDashoffset="-616" strokeLinecap="round" />
          </g>
          {/* cyan arcs, counter-rotating */}
          <g className="origin-center animate-spin-slow [animation-direction:reverse] [animation-duration:28s] motion-reduce:animate-none" style={{ transformBox: "fill-box" }}>
            <circle cx="200" cy="200" r="168" fill="none" stroke="#38c6f4" strokeWidth="14" strokeDasharray="210 318" strokeLinecap="round" />
          </g>
          {/* navy segments */}
          <g className="origin-center animate-spin-slow [animation-duration:20s] motion-reduce:animate-none" style={{ transformBox: "fill-box" }}>
            <circle cx="200" cy="200" r="142" fill="none" stroke="var(--color-brand-800)" strokeWidth="20" strokeDasharray="70 153" />
          </g>
          {/* dashed inner orbit */}
          <circle cx="200" cy="200" r="122" fill="none" stroke="var(--color-brand-800)" strokeWidth="2" strokeDasharray="5 7" />
        </svg>
        <div className="absolute inset-[22%] flex items-center justify-center rounded-full bg-white shadow-lift ring-[6px] ring-[#38c6f4]/40">
          <Image src="/images/brand/logo.png" alt="" width={1248} height={276} className="w-[82%]" />
        </div>
        <span className="absolute inset-[22%] animate-ping rounded-full bg-brand-300/15 [animation-duration:3s] motion-reduce:animate-none" />
      </m.div>
      <ul className="space-y-10 lg:order-1">
        {items.slice(0, 3).map((it, i) => (
          <Strength key={it.title} it={it} i={i} side="left" />
        ))}
      </ul>
      <ul className="space-y-10 lg:order-3">
        {items.slice(3).map((it, i) => (
          <Strength key={it.title} it={it} i={i} side="right" />
        ))}
      </ul>
    </div>
  )
}
