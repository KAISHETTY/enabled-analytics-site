"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { postJson } from "@/components/forms/fields"
import { trackEvent } from "@/lib/analytics"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Footer signup. Deliberately framework-free (no react-hook-form/zod in the
 * client bundle on every page); /api/newsletter re-validates with zod.
 */
export function NewsletterForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "done">("idle")
  const [error, setError] = React.useState<string>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get("email") ?? "").trim()
    if (!EMAIL.test(email)) return setError("Please enter a valid email address")
    setError(undefined)
    setStatus("sending")
    try {
      await postJson("/api/newsletter", { email, website: String(data.get("website") ?? "") })
      trackEvent("newsletter_signup")
      form.reset()
      setStatus("done")
    } catch (err) {
      setError((err as Error).message)
      setStatus("idle")
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative" aria-label="Newsletter signup">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2 rounded-full border border-line bg-white p-1.5 shadow-soft focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-100">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={!!error}
          aria-describedby="newsletter-status"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-ink placeholder:text-ink-subtle focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {status === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          Subscribe
        </button>
      </div>
      <p id="newsletter-status" aria-live="polite" className="mt-2 min-h-5 px-4 text-sm">
        {error ? <span className="font-medium text-destructive">{error}</span> : status === "done" ? <span className="text-brand-700">Thanks for subscribing!</span> : null}
      </p>
    </form>
  )
}
