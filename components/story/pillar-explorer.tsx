"use client"

import * as React from "react"
import { AnimatePresence, domMax, LazyMotion, m } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { DynamicIcon } from "@/components/ea/icon"

export type Pillar = { title: string; icon: string; items: string[] }

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Service pillars as tabs: a sliding highlight marks the active pillar and its
 * capabilities cascade in. Phones get a horizontally scrolling tab row.
 */
export function PillarExplorer({ pillars }: { pillars: Pillar[] }) {
  const [active, setActive] = React.useState(0)
  const id = React.useId()
  const p = pillars[active]

  return (
    // domMax adds layout animation (the sliding highlight) for this component only.
    <LazyMotion features={domMax}>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-10">
        <div role="tablist" aria-label="Service pillars" aria-orientation="vertical" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
          {pillars.map((x, i) => (
            <button
              key={x.title}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${id}-panel`}
              onClick={() => setActive(i)}
              className={cn(
                "relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold whitespace-nowrap transition-colors lg:px-5 lg:py-4 lg:whitespace-normal",
                active === i ? "text-white" : "bg-white text-ink ring-1 ring-line hover:bg-brand-50",
              )}
            >
              {active === i && (
                <m.span layoutId={`${id}-pill`} transition={{ type: "spring", stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 shadow-glow" />
              )}
              <span className={cn("relative flex size-9 shrink-0 items-center justify-center rounded-xl", active === i ? "bg-white/15" : "bg-brand-50 text-brand-600")}>
                <DynamicIcon name={x.icon} className="size-5" />
              </span>
              <span className="relative">{x.title}</span>
            </button>
          ))}
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-line bg-white p-6 shadow-soft md:p-10">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={p.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }} className="relative">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
                    {String(active + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">{p.title}</h3>
                </div>
                <m.span
                  initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 14 }}
                  aria-hidden="true"
                  className="hidden size-16 shrink-0 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 sm:flex"
                >
                  <DynamicIcon name={p.icon} className="size-8" />
                </m.span>
              </div>
              <m.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                  },
                }}
                className="mt-8 grid gap-3 sm:grid-cols-2"
              >
                {p.items.map((it) => (
                  <m.li
                    key={it}
                    variants={{
                      hidden: { opacity: 0, x: -14, scale: 0.97 },
                      show: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 260,
                          damping: 22,
                        },
                      },
                    }}
                    className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3 font-medium text-ink"
                  >
                    <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check className="size-3.5" />
                    </span>
                    {it}
                  </m.li>
                ))}
              </m.ul>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  )
}
