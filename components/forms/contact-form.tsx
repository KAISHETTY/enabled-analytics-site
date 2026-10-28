"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CircleCheck, Loader2, Send } from "lucide-react"
import { contactSchema, type ContactInput } from "@/lib/schemas"
import { Button } from "@/components/ea/button"
import { ConsentCheckbox, Field, Honeypot, inputClass, postJson } from "@/components/forms/fields"
import { trackEvent } from "@/lib/analytics"

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [sent, setSent] = React.useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: defaultSubject },
    mode: "onTouched",
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await postJson("/api/contact", values)
      trackEvent("contact_submit")
      setSent(true)
      reset()
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

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-label="Contact form">
      <Honeypot {...register("website")} />
      <Field id="contact-name" label="Full name" required error={errors.name?.message}>
        {(a) => <input {...a} autoComplete="name" className={inputClass} {...register("name")} />}
      </Field>
      <Field id="contact-email" label="Work email" required error={errors.email?.message}>
        {(a) => <input {...a} type="email" autoComplete="email" className={inputClass} {...register("email")} />}
      </Field>
      <Field id="contact-phone" label="Phone" error={errors.phone?.message}>
        {(a) => <input {...a} type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />}
      </Field>
      <Field id="contact-company" label="Company" error={errors.company?.message}>
        {(a) => <input {...a} autoComplete="organization" className={inputClass} {...register("company")} />}
      </Field>
      <Field id="contact-subject" label="Subject" required error={errors.subject?.message} className="sm:col-span-2">
        {(a) => <input {...a} className={inputClass} {...register("subject")} />}
      </Field>
      <Field id="contact-message" label="Tell us about your project" required error={errors.message?.message} className="sm:col-span-2">
        {(a) => <textarea {...a} rows={5} className={inputClass} {...register("message")} />}
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
