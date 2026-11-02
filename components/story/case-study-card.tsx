"use client"

import Link from "next/link"
import { m } from "framer-motion"
import { cn } from "@/lib/utils"
import type { CaseStudy } from "@/lib/case-studies"
import { ArrowIcon } from "@/components/ea/button"

const STAGES = [
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "result", label: "Result" },
] as const

const EASE = [0.22, 1, 0.36, 1] as const

/** Challenge → Solution → Result card used in the horizontal case-study track and the grid. The timeline draws itself and each stage lights up in turn as the card scrolls in. */
export function CaseStudyCard({ c, index, className }: { c: CaseStudy; index?: number; className?: string }) {
  return (
    <article className={cn("group/card relative flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift", className)}>
      <div className="flex items-center justify-between">
        <span className="flex flex-wrap gap-2">
          <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", c.sector === "Public Sector" ? "bg-brand-700 text-white" : "bg-brand-600 text-white")}>{c.sector}</span>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{c.industry}</span>
        </span>
        {index !== undefined && <span className="font-heading text-5xl font-extrabold text-brand-100 transition-colors group-hover/card:text-brand-200">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-5 text-xl leading-snug font-bold">
        <Link href={`/case-studies/${c.slug}`} className="after:absolute after:inset-0 after:rounded-[inherit]">
          {c.title}
        </Link>
      </h3>
      <m.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.35, delayChildren: 0.25 } } }}
        className="relative mt-6 flex-1 space-y-4 pl-5"
      >
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-0 border-l border-dashed border-brand-100" />
        <m.span
          aria-hidden="true"
          variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.2, ease: EASE } } }}
          className="absolute top-2 bottom-2 left-0 origin-top border-l-2 border-dashed border-brand-400"
        />
        {STAGES.map((s) => (
          <m.li key={s.key} variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }} className="relative">
            <m.span
              aria-hidden="true"
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 340, damping: 14 } } }}
              className={cn("absolute top-1.5 -left-[25px] size-2.5 rounded-full ring-2 ring-brand-400", s.key === "result" ? "bg-brand-500" : "bg-white")}
            />
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-600 uppercase">{s.label}</p>
            <p className="mt-1 line-clamp-3 text-[0.9375rem] leading-relaxed">
              {s.key === "challenge" ? c.challenge : s.key === "solution" ? c.solution[0] : c.outcomes[0]}
            </p>
          </m.li>
        ))}
      </m.ol>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
        <span className="line-clamp-1 pr-3 text-sm text-ink-subtle">{c.role}</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700">
          Read story <ArrowIcon />
        </span>
      </div>
    </article>
  )
}
