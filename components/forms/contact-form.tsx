"use client"

import * as React from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Check, CircleCheck, Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { contactSchema, serviceInterests, type ContactInput, type Journey } from "@/lib/schemas"
import { Button } from "@/components/ea/button"
import { ConsentCheckbox, Field, Honeypot, inputClass, postJson } from "@/components/forms/fields"
import { trackEvent } from "@/lib/analytics"

type Service = (typeof serviceInterests)[number]

/**
 * The single inquiry form, used on Contact Us and by both homepage journey
 * paths. `journey` records which path the visitor came from on the lead.
 */
export function ContactForm({ journey, defaultServices = [], idPrefix = "contact" }: { journey?: Journey; defaultServices?: Service[]; idPrefix?: string }) {
  const [sent, setSent] = React.useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { services: defaultServices, journey },
    mode: "onTouched",
  })
  const picked = useWatch({ control, name: "services" }) ?? []

  React.useEffect(() => {
    setValue("journey", journey)
  }, [journey, setValue])

  const toggle = (s: Service) => {
    const next = picked.includes(s) ? picked.filter((x) => x !== s) : [...picked, s]
    setValue("services", next, { shouldValidate: true })
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      await postJson("/api/contact", values)
      trackEvent("contact_submit", { journey: values.journey ?? "none", services: values.services.length })
      setSent(true)
      reset({ services: defaultServices, journey })
      toast.success("Thanks! We’ll connect you to one of our Salesforce experts.")
    } catch (e) {
      toast.error((e as Error).message)
    }
  })

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-10 text-center">
        <CircleCheck aria-hidden="true" className="size-12 text-brand-600" />
        <h3 className="text-2xl font-bold">Message sent</h3>
        <p>Thank you for reaching out. One of our Salesforce experts will get back to you shortly.</p>
        <Button variant="secondary" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    )
  }

  const id = (k: string) => `${idPrefix}-${k}`
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-label="Contact form">
      <Honeypot {...register("website")} />
      <Field id={id("name")} label="Full name" required error={errors.name?.message}>
        {(a) => <input {...a} autoComplete="name" className={inputClass} {...register("name")} />}
      </Field>
      <Field id={id("email")} label="Work email" required error={errors.email?.message}>
        {(a) => <input {...a} type="email" autoComplete="email" className={inputClass} {...register("email")} />}
      </Field>
      <Field id={id("company")} label="Company" required error={errors.company?.message} className="sm:col-span-2">
        {(a) => <input {...a} autoComplete="organization" className={inputClass} {...register("company")} />}
      </Field>

      <fieldset className="sm:col-span-2" aria-describedby={errors.services ? id("services-error") : undefined}>
        <legend className="mb-3 text-sm font-semibold text-ink">
          Service interest
          <span className="text-destructive" aria-hidden="true">
            {" "}
            *
          </span>
          <span className="ml-2 font-normal text-ink-subtle">Choose all that apply</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {serviceInterests.map((s) => {
            const on = picked.includes(s)
            return (
              <label
                key={s}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100",
                  on ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-white text-ink hover:border-brand-300 hover:text-brand-700"
                )}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(s)} />
                {on && <Check aria-hidden="true" className="size-3.5" />}
                {s}
              </label>
            )
          })}
        </div>
        {errors.services && (
          <p id={id("services-error")} role="alert" className="mt-2 text-sm font-medium text-destructive">
            {errors.services.message}
          </p>
        )}
      </fieldset>

      <Field id={id("message")} label="Short description" required error={errors.message?.message} className="sm:col-span-2">
        {(a) => <textarea {...a} rows={4} placeholder="What would you like to achieve with Salesforce?" className={inputClass} {...register("message")} />}
      </Field>
      <div className="sm:col-span-2">
        <ConsentCheckbox error={errors.consent?.message} {...register("consent")} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  )
}
