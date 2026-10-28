import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowIcon } from "@/components/ea/button"
import { StackCards } from "@/components/motion/stack-cards"

export type StackCard = { index: string; kicker: string; title: string; text: string; tags: string[]; href: string; image: string; agent?: boolean }

/** TO TOP "Strategy / Cultural development / Guidance" stacking cards, in Salesforce colours. */
export function SolutionStack({ cards }: { cards: StackCard[] }) {
  return (
    <StackCards
      items={cards.map((c) => (
        <article
          key={c.title}
          className={cn(
            "group/card relative grid min-h-[460px] overflow-hidden rounded-[2.25rem] border shadow-lift md:grid-cols-[1.1fr_0.9fr]",
            c.agent ? "border-agent-100 bg-gradient-to-br from-agent-50 via-white to-brand-50" : "border-line bg-white"
          )}
        >
          <div className="relative z-10 flex flex-col p-8 md:p-12">
            <div className="flex items-center gap-3">
              <span className={cn("font-mono text-xs tracking-[0.14em] uppercase", c.agent ? "text-agent-600" : "text-brand-600")}>{c.kicker}</span>
            </div>
            <h3 className="mt-4 text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] font-extrabold">{c.title}</h3>
            <p className="mt-5 max-w-lg text-lg leading-relaxed">{c.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <li key={t} className={cn("rounded-full px-3 py-1 text-xs font-medium ring-1", c.agent ? "bg-white text-agent-600 ring-agent-100" : "bg-surface text-ink-muted ring-line")}>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href={c.href}
              className={cn(
                "group/btn mt-auto inline-flex h-12 items-center gap-2 self-start rounded-full px-6 pt-0 font-semibold text-white transition hover:-translate-y-0.5",
                c.agent ? "mt-10 bg-agent-500 shadow-agent hover:bg-agent-600" : "mt-10 bg-brand-600 shadow-glow hover:bg-brand-700"
              )}
            >
              Explore {c.title} <ArrowIcon />
            </Link>
          </div>
          <div className="relative min-h-60 md:min-h-full">
            <Image src={c.image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover/card:scale-105" />
            <span aria-hidden="true" className="absolute top-4 right-6 font-heading text-[8rem] leading-none font-extrabold text-white/80 mix-blend-overlay md:text-[11rem]">
              {c.index}
            </span>
          </div>
        </article>
      ))}
    />
  )
}
