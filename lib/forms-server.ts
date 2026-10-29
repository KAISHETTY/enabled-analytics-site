import "server-only"
import { NextResponse } from "next/server"
import type { z } from "zod"
import { createLead, salesforceEnabled } from "@/lib/salesforce-lead"

/** Best-effort per-instance rate limit (5 requests / minute / IP). Use a shared store in production at scale. */
const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

/**
 * Creates a Salesforce Lead (when SF_WEB_TO_LEAD_ORG_ID is set) and forwards
 * the submission to FORMS_WEBHOOK_URL (Zapier, Make, Slack…) when that is set.
 * With neither, it logs so local development works without credentials.
 */
async function deliver(kind: string, data: Record<string, unknown>, webhook = process.env.FORMS_WEBHOOK_URL) {
  const payload = { kind, submittedAt: new Date().toISOString(), data }
  if (!webhook && !salesforceEnabled()) {
    console.info(`[forms] ${kind} submission (set SF_WEB_TO_LEAD_ORG_ID or FORMS_WEBHOOK_URL to deliver):`, JSON.stringify(payload))
    return
  }
  const jobs: Promise<void>[] = []
  if (salesforceEnabled()) jobs.push(createLead(kind, data))
  if (webhook)
    jobs.push(
      fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then((res) => {
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
      })
    )
  await Promise.all(jobs)
}

export async function handleForm<S extends z.ZodType>(req: Request, kind: string, schema: S, webhook?: string) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a minute." }, { status: 429 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", issues: parsed.error.issues }, { status: 422 })
  }

  const { website, ...data } = parsed.data as Record<string, unknown>
  // Honeypot filled: pretend success so bots learn nothing.
  if (website) return NextResponse.json({ ok: true })

  try {
    await deliver(kind, data, webhook)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(`[forms] ${kind} delivery failed`, err)
    return NextResponse.json({ ok: false, error: "We couldn’t send your message. Please email info@enabledanalytics.com." }, { status: 502 })
  }
}
