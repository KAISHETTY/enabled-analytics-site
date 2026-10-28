import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const inputClass =
  "block w-full rounded-xl border border-input bg-white px-4 py-3 text-[0.9375rem] text-ink shadow-xs transition placeholder:text-ink-subtle/80 hover:border-brand-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 focus:outline-none aria-invalid:border-destructive aria-invalid:ring-destructive/10"

type FieldProps = {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; "aria-required"?: boolean }) => React.ReactNode
}

/** Label + control + hint/error, wired with aria attributes. */
export function Field({ id, label, error, hint, required, className, children }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": describedBy, "aria-required": required || undefined })}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

/** Visually hidden honeypot input; bots fill it, humans never see it. */
export function Honeypot(props: React.ComponentProps<"input">) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  )
}

export function ConsentCheckbox({ error, ...props }: React.ComponentProps<"input"> & { error?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-start gap-3 text-sm text-ink-muted">
        <input
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? "consent-error" : undefined}
          className="mt-0.5 size-5 shrink-0 rounded-md border-input accent-brand-600"
          {...props}
        />
        <span>
          I agree to the{" "}
          <Link href="/privacy" className="font-medium text-brand-700 underline underline-offset-2">
            privacy policy
          </Link>{" "}
          and to being contacted about my enquiry.
        </span>
      </label>
      {error && (
        <p id="consent-error" role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export async function postJson(url: string, body: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
  if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong. Please try again.")
  return data
}
