"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Download, Loader2, Lock, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { dimensions, questions, scoreAnswers } from "@/lib/health-check"
import { healthCheckSchema, type HealthCheckInput } from "@/lib/schemas"
import { downloadHealthReport } from "@/lib/health-report-pdf"
import { ArrowIcon, Button } from "@/components/ea/button"
import { ConsentCheckbox, Field, Honeypot, inputClass, postJson } from "@/components/forms/fields"
import { trackEvent } from "@/lib/analytics"

const toneClass = { critical: "text-destructive", fair: "text-amber-600", good: "text-brand-600", great: "text-emerald-600" } as const

function Dial({ score }: { score: number }) {
  const reduce = useReducedMotion()
  const [shown, setShown] = React.useState(reduce ? score : 0)
  React.useEffect(() => {
    if (reduce) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400)
      setShown(Math.round(score * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [score, reduce])
  return (
    <div className="relative size-48 shrink-0 rounded-full" style={{ background: `conic-gradient(var(--color-brand-600) 0 ${shown}%, var(--color-brand-50) ${shown}% 100%)` }} role="img" aria-label={`Score ${score} out of 100`}>
      <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white shadow-soft">
        <span className="font-heading text-6xl font-extrabold text-ink tabular-nums">{shown}</span>
        <span className="text-sm text-ink-subtle">out of 100</span>
      </div>
    </div>
  )
}

/** Self-assessment → details captured first → score, breakdown and PDF report unlocked. */
export function HealthCheckQuiz() {
  const [answers, setAnswers] = React.useState<Record<string, number>>({})
  const [step, setStep] = React.useState(0)
  const [unlocked, setUnlocked] = React.useState<{ name: string; company: string } | null>(null)
  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const total = questions.length
  const done = step >= total
  const result = React.useMemo(() => scoreAnswers(answers), [answers])

  const form = useForm<HealthCheckInput>({
    resolver: zodResolver(healthCheckSchema),
    defaultValues: { wantsReview: true, score: 0, answers: {} },
    mode: "onTouched",
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  const choose = (qid: string, score: number) => {
    setAnswers((a) => ({ ...a, [qid]: score }))
    setTimeout(() => {
      setStep((s) => s + 1)
      requestAnimationFrame(() => headingRef.current?.focus())
    }, 220)
  }

  // Move focus to the revealed score once the report unlocks.
  React.useEffect(() => {
    if (unlocked) headingRef.current?.focus()
  }, [unlocked])

  const onSubmit = handleSubmit(async (v) => {
    try {
      await postJson("/api/health-check", { ...v, score: result.score, answers })
      trackEvent("health_check_submit", { score: result.score })
      setUnlocked({ name: v.name, company: v.company })
      await downloadHealthReport({ result, name: v.name, company: v.company })
      toast.success("Your report is downloading. Check your inbox for our follow-up.")
    } catch (e) {
      toast.error((e as Error).message)
    }
  })

  const restart = () => {
    setAnswers({})
    setStep(0)
    setUnlocked(null)
  }

  const q = questions[Math.min(step, total - 1)]

  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift">
      {/* progress */}
      <div className="h-1.5 bg-brand-50" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-500" style={{ width: `${(Math.min(step, total) / total) * 100}%` }} />
      </div>

      <div className="p-6 md:p-12">
        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <m.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28 }}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">{dimensions[q.dimension].label}</p>
                <p className="font-mono text-xs text-ink-subtle" aria-live="polite">
                  {step + 1} / {total}
                </p>
              </div>
              <h2 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl leading-snug font-bold outline-none md:text-3xl">
                {q.text}
              </h2>
              <fieldset className="mt-8">
                <legend className="sr-only">{q.text}</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {q.options.map((o) => {
                    const selected = answers[q.id] === o.score
                    return (
                      <label
                        key={o.label}
                        className={cn(
                          "group flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100",
                          selected ? "border-brand-500 bg-brand-50" : "border-line bg-white hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
                        )}
                      >
                        <input type="radio" name={q.id} className="sr-only" checked={selected} onChange={() => choose(q.id, o.score)} />
                        <span aria-hidden="true" className={cn("flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold transition", selected ? "bg-brand-600 text-white" : "bg-surface text-ink-subtle group-hover:bg-brand-100 group-hover:text-brand-700")}>
                          {o.score + 1}
                        </span>
                        <span className="font-medium text-ink">{o.label}</span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className={cn(step === 0 && "invisible")}>
                  Back
                </Button>
                {answers[q.id] !== undefined && (
                  <Button variant="secondary" onClick={() => setStep((s) => s + 1)}>
                    Next <ArrowIcon />
                  </Button>
                )}
              </div>
            </m.div>
          ) : (
            !unlocked ? (
              /* Gate: collect details BEFORE showing the score or the report. */
              <m.div key="gate" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
                <div aria-hidden="true" className="relative mx-auto w-full max-w-xs select-none">
                  <div className="pointer-events-none blur-[6px]">
                    <div className="mx-auto size-48 rounded-full" style={{ background: "conic-gradient(var(--color-brand-600) 0 62%, var(--color-brand-50) 62% 100%)" }}>
                      <div className="flex size-full items-center justify-center p-4">
                        <div className="flex size-full items-center justify-center rounded-full bg-white font-heading text-6xl font-extrabold text-ink">??</div>
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      {[70, 45, 82, 58].map((w) => (
                        <div key={w} className="h-2.5 rounded-full bg-brand-50">
                          <div className="h-full rounded-full bg-brand-400" style={{ width: `${w}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-white text-brand-600 shadow-lift">
                    <Lock className="size-7" />
                  </span>
                </div>
                <form onSubmit={onSubmit} noValidate className="relative">
                  <Honeypot {...register("website")} />
                  <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">All 12 answered · your report is ready</p>
                  <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-3xl font-extrabold outline-none">
                    Where should we send your Org Health Report?
                  </h2>
                  <p className="mt-2 mb-6">Enter your details to unlock your score, the breakdown by area and your PDF report. Our experts follow up within 48 hours.</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="hc-name" label="Name" required error={errors.name?.message}>
                      {(a) => <input {...a} autoComplete="name" className={inputClass} {...register("name")} />}
                    </Field>
                    <Field id="hc-email" label="Work email" required error={errors.email?.message}>
                      {(a) => <input {...a} type="email" autoComplete="email" className={inputClass} {...register("email")} />}
                    </Field>
                    <Field id="hc-company" label="Company" required error={errors.company?.message} className="sm:col-span-2">
                      {(a) => <input {...a} autoComplete="organization" className={inputClass} {...register("company")} />}
                    </Field>
                  </div>
                  <label className="mt-4 flex items-center gap-3 text-sm">
                    <input type="checkbox" className="size-5 accent-brand-600" {...register("wantsReview")} />
                    Yes, I’d like a free expert review of my results
                  </label>
                  <div className="mt-3">
                    <ConsentCheckbox error={errors.consent?.message} {...register("consent")} />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Lock aria-hidden="true" />}
                      {isSubmitting ? "Unlocking…" : "Unlock my score & report"}
                    </Button>
                    <Button variant="ghost" onClick={() => setStep(total - 1)}>
                      Back
                    </Button>
                  </div>
                </form>
              </m.div>
            ) : (
              <m.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
                  <Dial score={result.score} />
                  <div>
                    <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">Your Org Health Score</p>
                    <h2 ref={headingRef} tabIndex={-1} className={cn("mt-2 text-4xl font-extrabold outline-none", toneClass[result.band.tone])}>
                      {result.band.label}
                    </h2>
                    <p className="mt-3 max-w-xl text-lg">{result.band.summary}</p>
                  </div>
                </div>

                <ul className="mt-10 grid gap-4 md:grid-cols-2">
                  {result.byDimension.map((d) => (
                    <li key={d.key} className="rounded-2xl border border-line p-5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-ink">{d.label}</span>
                        <span className="font-heading text-xl font-bold text-ink tabular-nums">{d.score}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-50">
                        <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400" style={{ width: `${d.score}%` }} />
                      </div>
                      <Link href={d.service.href} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                        {d.service.title} <ArrowIcon className="size-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col items-start gap-4 rounded-[1.75rem] bg-sky p-6 md:flex-row md:items-center md:justify-between md:p-8">
                  <div>
                    <h3 className="text-2xl font-bold">Thanks, {unlocked.name.split(" ")[0]}!</h3>
                    <p className="mt-1">Your PDF report has downloaded. Our experts will follow up within 48 hours with a personal review.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => downloadHealthReport({ result, ...unlocked })}>
                      <Download aria-hidden="true" /> Download again
                    </Button>
                    <Button variant="secondary" onClick={restart}>
                      <RotateCcw aria-hidden="true" /> Retake
                    </Button>
                  </div>
                </div>
              </m.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
