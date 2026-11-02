"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, domMax, LazyMotion, m } from "framer-motion"
import { cn } from "@/lib/utils"

type Logo = { name: string; logo: string; sector: string }

/**
 * Client logos (in their original colours) with sector filters: tiles reflow smoothly (layout animation)
 * as a filter changes, and each logo lifts slightly on hover.
 */
export function LogoWall({ logos, sectors }: { logos: Logo[]; sectors: string[] }) {
  const [filter, setFilter] = React.useState("All")
  const id = React.useId()
  const shown = filter === "All" ? logos : logos.filter((l) => l.sector === filter)
  const tabs = ["All", ...sectors]

  return (
    <LazyMotion features={domMax}>
      <div role="group" aria-label="Filter clients by sector" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {tabs.map((t) => {
          const count = t === "All" ? logos.length : logos.filter((l) => l.sector === t).length
          return (
            <button
              key={t}
              type="button"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
              className={cn("relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", filter === t ? "text-white" : "bg-white text-ink ring-1 ring-line hover:bg-brand-50")}
            >
              {filter === t && <m.span layoutId={`${id}-tab`} transition={{ type: "spring", stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-full bg-brand-600 shadow-glow" />}
              <span className="relative">
                {t} <span className={cn("ml-1 font-mono text-xs", filter === t ? "text-brand-100" : "text-ink-subtle")}>{count}</span>
              </span>
            </button>
          )
        })}
      </div>
      <m.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((l, i) => (
            <m.li
              key={l.name}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 26, delay: Math.min(i, 10) * 0.02 }}
              className="group/logo relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <Image src={l.logo} alt={l.name} width={220} height={110} className="max-h-full w-auto object-contain transition duration-500 group-hover/logo:scale-105" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-brand-700/90 px-2 py-1.5 text-center text-[0.6875rem] font-semibold text-white transition-transform duration-300 group-hover/logo:translate-y-0">{l.sector}</span>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </LazyMotion>
  )
}
