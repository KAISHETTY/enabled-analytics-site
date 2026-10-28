"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CircleCheck, Loader2, Upload } from "lucide-react"
import { applySchema, type ApplyInput } from "@/lib/schemas"
import { Button } from "@/components/ea/button"
import { ConsentCheckbox, Field, Honeypot, inputClass, postJson } from "@/components/forms/fields"

const MAX_MB = 5
const ACCEPT = ".pdf,.doc,.docx"

export function ApplyForm({ positions }: { positions: string[] }) {
  const [done, setDone] = React.useState(false)
  const [fileError, setFileError] = React.useState<string>()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ApplyInput>({ resolver: zodResolver(applySchema), mode: "onTouched", defaultValues: { position: "" } })
  const resumeName = watch("resumeName")

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    setFileError(undefined)
    if (!f) return setValue("resumeName", undefined)
    if (f.size > MAX_MB * 1024 * 1024) {
      setFileError(`File must be under ${MAX_MB} MB`)
      e.target.value = ""
      return
    }
    setValue("resumeName", f.name)
  }

  const onSubmit = handleSubmit(async (v) => {
    try {
      await postJson("/api/apply", v)
      setDone(true)
    } catch (e) {
      toast.error((e as Error).message)
    }
  })

  if (done) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-10 text-center">
        <CircleCheck aria-hidden="true" className="size-12 text-brand-600" />
        <h3 className="text-2xl font-bold">Application received</h3>
        <p>Thanks for your interest in becoming an Enabler. Our team will be in touch.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-label="Job application form">
      <Honeypot {...register("website")} />
      <Field id="apply-name" label="Full name" required error={errors.name?.message}>
        {(a) => <input {...a} autoComplete="name" className={inputClass} {...register("name")} />}
      </Field>
      <Field id="apply-email" label="Email" required error={errors.email?.message}>
        {(a) => <input {...a} type="email" autoComplete="email" className={inputClass} {...register("email")} />}
      </Field>
      <Field id="apply-phone" label="Phone" error={errors.phone?.message}>
        {(a) => <input {...a} type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />}
      </Field>
      <Field id="apply-position" label="Position" required error={errors.position?.message}>
        {(a) => (
          <select {...a} className={inputClass} {...register("position")}>
            <option value="">Select a position…</option>
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="apply-linkedin" label="LinkedIn profile" error={errors.linkedin?.message} className="sm:col-span-2">
        {(a) => <input {...a} type="url" placeholder="https://www.linkedin.com/in/…" className={inputClass} {...register("linkedin")} />}
      </Field>
      <Field id="apply-resume" label="Resume" hint={`PDF or Word, up to ${MAX_MB} MB`} error={fileError} className="sm:col-span-2">
        {(a) => (
          <label
            htmlFor={a.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-brand-200 bg-brand-50/40 px-4 py-4 text-sm transition hover:border-brand-400 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100"
          >
            <Upload aria-hidden="true" className="size-5 text-brand-600" />
            <span className="text-ink">{resumeName ?? "Please upload your file"}</span>
            <input {...a} type="file" accept={ACCEPT} onChange={onFile} className="sr-only" />
          </label>
        )}
      </Field>
      <Field id="apply-message" label="Anything else?" error={errors.message?.message} className="sm:col-span-2">
        {(a) => <textarea {...a} rows={4} className={inputClass} {...register("message")} />}
      </Field>
      <div className="sm:col-span-2">
        <ConsentCheckbox error={errors.consent?.message} {...register("consent")} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
          {isSubmitting ? "Submitting…" : "Submit application"}
        </Button>
      </div>
    </form>
  )
}
