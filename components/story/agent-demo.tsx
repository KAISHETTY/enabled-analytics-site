"use client"

import * as React from "react"
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion"
import { Bot, RotateCcw, Sparkles, User, Workflow } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AgentDemo } from "@/lib/agentforce"

/**
 * Illustrative Agentforce conversation: turns play in sequence once in view,
 * with a typing indicator before agent replies and visible "reasoning/action"
 * steps (topics and actions) between them. Tabs switch between use cases.
 */
export function AgentDemoPlayer({ demos, className }: { demos: AgentDemo[]; className?: string }) {
  const [tab, setTab] = React.useState(0)
  const [shown, setShown] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" })
  const reduce = useReducedMotion()
  const demo = demos[tab]

  React.useEffect(() => {
    if (reduce) return
    if (!inView || shown >= demo.turns.length) return
    const next = demo.turns[shown]
    const t = setTimeout(() => setShown((s) => s + 1), next.who === "user" ? 900 : next.who === "action" ? 700 : 1300)
    return () => clearTimeout(t)
  }, [inView, shown, demo, reduce])

  React.useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [shown, reduce])

  // Reduced motion: show the whole conversation at once.
  const visible = reduce ? demo.turns.length : shown
  // The "typing…" bubble shows while the next pending turn is the agent's.
  const typing = !reduce && inView && visible < demo.turns.length && demo.turns[visible].who === "agent"

  const select = (i: number) => {
    setTab(i)
    setShown(0)
  }

  return (
    <div ref={ref} className={cn("grid gap-6 lg:grid-cols-[0.8fr_1.2fr]", className)}>
      <div role="tablist" aria-label="Agentforce use cases" className="flex flex-col gap-3">
        {demos.map((d, i) => (
          <button
            key={d.id}
            role="tab"
            type="button"
            aria-selected={i === tab}
            aria-controls={`demo-${d.id}`}
            onClick={() => select(i)}
            className={cn(
              "group rounded-2xl border p-5 text-left transition-all",
              i === tab ? "border-agent-100 bg-white shadow-agent" : "border-transparent bg-white/50 hover:bg-white"
            )}
          >
            <span className="flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-ink">{d.name}</span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", i === tab ? "bg-agent-50 text-agent-600" : "bg-surface text-ink-subtle")}>{d.cloud}</span>
            </span>
            <span className="mt-2 block text-sm leading-relaxed">{d.summary}</span>
          </button>
        ))}
        <p className="px-1 text-xs text-ink-subtle">Illustrative demos showing how agents reason and act. Not customer data.</p>
      </div>

      <div id={`demo-${demo.id}`} role="tabpanel" className="relative overflow-hidden rounded-[1.75rem] border border-agent-100 bg-white shadow-lift">
        <div className="flex items-center justify-between border-b border-line bg-gradient-to-r from-agent-50 to-brand-50 px-5 py-3.5">
          <span className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-agent-500 text-white">
              <Sparkles className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{demo.name}</span>
              <span className="flex items-center gap-1.5 text-xs text-ink-subtle">
                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" /> Powered by Agentforce
              </span>
            </span>
          </span>
          <button type="button" onClick={() => select(tab)} className="flex size-9 items-center justify-center rounded-full text-ink-subtle transition hover:bg-white hover:text-agent-600" aria-label="Replay demo">
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        </div>
        <ol ref={listRef} aria-live="polite" className="flex h-[380px] flex-col gap-3 overflow-y-auto p-5" data-lenis-prevent>
          <AnimatePresence initial={false}>
            {demo.turns.slice(0, visible).map((t, i) => (
              <m.li
                key={`${demo.id}-${i}`}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn("flex gap-2.5", t.who === "user" && "flex-row-reverse", t.who === "action" && "justify-center")}
              >
                {t.who === "action" ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-agent-100 bg-agent-50/70 px-3 py-1.5 font-mono text-[0.6875rem] text-agent-600">
                    <Workflow className="size-3.5" aria-hidden="true" /> {t.text}
                  </span>
                ) : (
                  <>
                    <span aria-hidden="true" className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full", t.who === "user" ? "bg-brand-50 text-brand-600" : "bg-agent-50 text-agent-600")}>
                      {t.who === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                    </span>
                    <p className={cn("max-w-[80%] rounded-2xl px-4 py-2.5 text-[0.9375rem] leading-relaxed", t.who === "user" ? "rounded-tr-sm bg-brand-600 text-white" : "rounded-tl-sm bg-surface text-ink")}>
                      <span className="sr-only">{t.who === "user" ? "Customer: " : "Agent: "}</span>
                      {t.text}
                    </p>
                  </>
                )}
              </m.li>
            ))}
          </AnimatePresence>
          {typing && (
            <li className="flex gap-2.5" aria-label="Agent is typing">
              <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-agent-50 text-agent-600">
                <Bot className="size-4" />
              </span>
              <span className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-surface px-4 py-3">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="size-1.5 animate-bounce rounded-full bg-agent-500" style={{ animationDelay: `${d * 120}ms` }} />
                ))}
              </span>
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}
