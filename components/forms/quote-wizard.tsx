"use client"

import * as React from "react"
import { useForm, type FieldPath } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"
import { Check, CircleCheck, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { services } from "@/lib/content"
import { quoteSchema, type QuoteInput } from "@/lib/schemas"
import { ArrowIcon, Button } from "@/components/ea/button"
import { ConsentCheckbox, Field, Honeypot, inputClass, postJson } from "@/components/forms/fields"
import { trackEvent } from "@/lib/analytics"

const STEPS: { title: string; fields: FieldPath<QuoteInput>[] }[] = [
  { title: "Services", fields: ["services"] },
  { title: "Project", fields: ["orgStatus", "engagement", "timeline", "details"] },
  { title: "Contact", fields: ["name", "email", "phone", "company", "consent"] },
  { title: "Review", fields: [] },
]

const ORG_OPTIONS = [
  { value: "new", label: "Starting fresh", hint: "No Salesforce org yet" },
  { value: "existing", label: "Existing org", hint: "Well-established or needs a tune-up" },
  { value: "unsure", label: "Not sure", hint: "Let’s discuss" },
] as const
const ENGAGEMENT_OPTIONS = [
  { value: "fixed-price", label: "Fixed price" },
  { value: "time-material", label: "Time & material" },
  { value: "hire-experts", label: "Hire our experts" },
  { value: "unsure", label: "Not sure yet" },
] as const
const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "3-6-months", label: "In 3–6 months" },
  { value: "exploring", label: "Just exploring" },
] as const

function labelOf<T extends { value: string; label: string }>(opts: readonly T[], v?: string) {
  return opts.find((o) => o.value === v)?.label ?? "—"
}

function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  error,
}: {
  legend: string
  name: string
  options: readonly { value: T; label: string; hint?: string }[]
  value?: T
  onChange: (v: T) => void
  error?: string
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-3 text-sm font-semibold text-ink">
        {legend} <span className="text-destructive" aria-hidden="true">*</span>
      </legend>
      <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const checked = value === o.value
          return (
            <label
              key={o.value}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border bg-white p-4 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100",
                checked ? "border-brand-400 bg-brand-50/60" : "border-line hover:border-brand-200"
              )}
            >
              <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChange(o.value)} className="mt-1 size-4 accent-brand-600" />
              <span>
                <span className="block font-medium text-ink">{o.label}</span>
                {o.hint && <span className="block text-sm text-ink-subtle">{o.hint}</span>}
              </span>
            </label>
          )
        })}
      </div>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </fieldset>
  )
}

/** Four-step project/quote request with per-step validation and a review screen. */
export function QuoteWizard({ preselect }: { preselect?: string }) {
  const [step, setStep] = React.useState(0)
  const [done, setDone] = React.useState(false)
  const headingRef = React.useRef<HTMLHeadingElement>(null)

  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { services: preselect ? [preselect] : [], details: "" },
    mode: "onTouched",
  })
  const { register, watch, setValue, trigger, handleSubmit, formState } = form
  const { errors, isSubmitting } = formState
  const values = watch()

  const move = async (delta: number) => {
    if (delta > 0) {
      const ok = await trigger(STEPS[step].fields)
      if (!ok) return
    }
    setStep((s) => Math.min(Math.max(s + delta, 0), STEPS.length - 1))
    requestAnimationFrame(() => headingRef.current?.focus())
  }

  const toggleService = (slug: string) => {
    const set = new Set(values.services ?? [])
    if (set.has(slug)) set.delete(slug)
    else set.add(slug)
    setValue("services", Array.from(set), { shouldValidate: true })
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await postJson("/api/quote", data)
      trackEvent("quote_submit", { services: data.services.length })
      setDone(true)
    } catch (e) {
      toast.error((e as Error).message)
    }
  })

  if (done) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-10 text-center md:p-14">
        <CircleCheck aria-hidden="true" className="size-14 text-brand-600" />
        <h2 className="text-3xl font-bold">Request received</h2>
        <p className="max-w-lg">Thank you! We’ll review your project details and connect you to one of our Salesforce experts.</p>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-soft md:p-10">
      {/* Progress */}
      <ol className="mb-10 grid grid-cols-4 gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-2" aria-current={i === step ? "step" : undefined}>
            <span className={cn("h-1.5 rounded-full transition-colors duration-500", i <= step ? "bg-brand-600" : "bg-brand-100")} />
            <span className={cn("text-xs font-medium sm:text-sm", i === step ? "text-brand-700" : "text-ink-subtle")}>
              <span className="font-mono">{String(i + 1).padStart(2, "0")}</span> <span className="max-sm:sr-only">{s.title}</span>
            </span>
          </li>
        ))}
      </ol>

      <form onSubmit={onSubmit} noValidate className="relative">
        <Honeypot {...register("website")} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6"
          >
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none md:text-3xl">
              {["Which services are you interested in?", "Tell us about your project", "How can we reach you?", "Review your request"][step]}
            </h2>

            {step === 0 && (
              <fieldset aria-describedby={errors.services ? "services-error" : undefined}>
                <legend className="sr-only">Services</legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((s) => {
                    const checked = values.services?.includes(s.slug)
                    return (
                      <label
                        key={s.slug}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100",
                          checked ? "border-brand-400 bg-brand-50/60" : "border-line bg-white hover:border-brand-200"
                        )}
                      >
                        <input type="checkbox" className="sr-only" checked={!!checked} onChange={() => toggleService(s.slug)} />
                        <span
                          aria-hidden="true"
                          className={cn("flex size-5 shrink-0 items-center justify-center rounded-md border transition", checked ? "border-brand-600 bg-brand-600 text-white" : "border-input bg-white")}
                        >
                          {checked && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        <span className="font-medium text-ink">{s.title}</span>
                      </label>
                    )
                  })}
                </div>
                {errors.services && (
                  <p id="services-error" role="alert" className="mt-3 text-sm font-medium text-destructive">
                    {errors.services.message}
                  </p>
                )}
              </fieldset>
            )}

            {step === 1 && (
              <>
                <ChoiceGroup legend="Your Salesforce org" name="orgStatus" options={ORG_OPTIONS} value={values.orgStatus} onChange={(v) => setValue("orgStatus", v, { shouldValidate: true })} error={errors.orgStatus?.message} />
                <ChoiceGroup legend="Preferred engagement model" name="engagement" options={ENGAGEMENT_OPTIONS} value={values.engagement} onChange={(v) => setValue("engagement", v, { shouldValidate: true })} error={errors.engagement?.message} />
                <ChoiceGroup legend="Timeline" name="timeline" options={TIMELINE_OPTIONS} value={values.timeline} onChange={(v) => setValue("timeline", v, { shouldValidate: true })} error={errors.timeline?.message} />
                <Field id="quote-details" label="Project details" hint="Pain points, goals, systems involved — anything that helps." error={errors.details?.message}>
                  {(a) => <textarea {...a} rows={4} className={inputClass} {...register("details")} />}
                </Field>
              </>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="quote-name" label="Full name" required error={errors.name?.message}>
                  {(a) => <input {...a} autoComplete="name" className={inputClass} {...register("name")} />}
                </Field>
                <Field id="quote-email" label="Work email" required error={errors.email?.message}>
                  {(a) => <input {...a} type="email" autoComplete="email" className={inputClass} {...register("email")} />}
                </Field>
                <Field id="quote-phone" label="Phone" error={errors.phone?.message}>
                  {(a) => <input {...a} type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />}
                </Field>
                <Field id="quote-company" label="Company" required error={errors.company?.message}>
                  {(a) => <input {...a} autoComplete="organization" className={inputClass} {...register("company")} />}
                </Field>
                <div className="sm:col-span-2">
                  <ConsentCheckbox error={errors.consent?.message} {...register("consent")} />
                </div>
              </div>
            )}

            {step === 3 && (
              <dl className="grid gap-4 rounded-xl bg-surface p-6 sm:grid-cols-2">
                {[
                  ["Services", (values.services ?? []).map((s) => services.find((x) => x.slug === s)?.title).join(", ")],
                  ["Salesforce org", labelOf(ORG_OPTIONS, values.orgStatus)],
                  ["Engagement model", labelOf(ENGAGEMENT_OPTIONS, values.engagement)],
                  ["Timeline", labelOf(TIMELINE_OPTIONS, values.timeline)],
                  ["Name", values.name],
                  ["Email", values.email],
                  ["Company", values.company],
                  ["Phone", values.phone || "—"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">{k}</dt>
                    <dd className="mt-1 font-medium break-words text-ink">{v || "—"}</dd>
                  </div>
                ))}
                {values.details && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">Details</dt>
                    <dd className="mt-1 whitespace-pre-line text-ink">{values.details}</dd>
                  </div>
                )}
              </dl>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
          <Button variant="ghost" onClick={() => move(-1)} disabled={step === 0} className={cn(step === 0 && "invisible")}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => move(1)}>
              Continue
              <ArrowIcon />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
              {isSubmitting ? "Submitting…" : "Submit request"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
