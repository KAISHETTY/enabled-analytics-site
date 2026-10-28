"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, m } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Service } from "@/lib/content"
import { ArrowIcon } from "@/components/ea/button"

/**
 * Editorial list of practice areas: hovering or focusing a row slides its
 * summary open, and a preview image floats beside the list (TO TOP's stacked
 * rows plus a hover image reveal).
 */
export function PracticeList({ items, className }: { items: Service[]; className?: string }) {
  const [active, setActive] = React.useState(0)
  return (
    <div className={cn("grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14", className)}>
      <ul className="border-t border-line" onMouseLeave={() => undefined}>
        {items.map((s, i) => {
          const on = i === active
          return (
            <li key={s.slug} className="border-b border-line" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
              <Link href={`/services/${s.slug}`} className="group/row grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 md:py-6">
                <span className={cn("font-mono text-sm transition-colors", on ? "text-brand-600" : "text-ink-subtle")}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={cn("block font-heading text-2xl font-bold tracking-tight transition-all duration-500 md:text-[2rem]", on ? "translate-x-2 text-brand-700" : "text-ink")}>{s.title}</span>
                  <span className={cn("grid transition-all duration-500", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <span className="overflow-hidden">
                      <span className="block max-w-xl pt-2 pl-2 leading-relaxed">{s.summary}</span>
                    </span>
                  </span>
                </span>
                <span className={cn("flex size-11 items-center justify-center rounded-full border transition-all duration-300", on ? "border-brand-600 bg-brand-600 text-white" : "border-line text-ink")}>
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="relative hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-50 shadow-lift">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div key={items[active].slug} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
              <Image src={items[active].image} alt="" fill sizes="30vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-800/50 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 font-heading text-2xl font-bold text-white">{items[active].title}</p>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
