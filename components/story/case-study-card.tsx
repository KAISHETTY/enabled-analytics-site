import Link from "next/link"
import { cn } from "@/lib/utils"
import type { CaseStudy } from "@/lib/case-studies"
import { ArrowIcon } from "@/components/ea/button"

const STAGES = [
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "result", label: "Result" },
] as const

/** Challenge → Solution → Result card used in the horizontal case-study track and the grid. */
export function CaseStudyCard({ c, index, className }: { c: CaseStudy; index?: number; className?: string }) {
  return (
    <article className={cn("group/card relative flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift", className)}>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{c.industry}</span>
        {index !== undefined && <span className="font-heading text-5xl font-extrabold text-brand-100 transition-colors group-hover/card:text-brand-200">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-5 text-xl leading-snug font-bold">
        <Link href={`/case-studies/${c.slug}`} className="after:absolute after:inset-0 after:rounded-[inherit]">
          {c.title}
        </Link>
      </h3>
      <ol className="mt-6 flex-1 space-y-4 border-l border-dashed border-brand-200 pl-5">
        {STAGES.map((s) => (
          <li key={s.key} className="relative">
            <span aria-hidden="true" className="absolute top-1.5 -left-[25px] size-2.5 rounded-full bg-white ring-2 ring-brand-400" />
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-600 uppercase">{s.label}</p>
            <p className="mt-1 line-clamp-3 text-[0.9375rem] leading-relaxed">
              {s.key === "challenge" ? c.challenge : s.key === "solution" ? c.solution[0] : c.outcomes[0]}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
        <span className="text-sm text-ink-subtle">{c.role}</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Read story <ArrowIcon />
        </span>
      </div>
    </article>
  )
}
