import "server-only"
import { dimensions, questions } from "@/lib/health-check"

/**
 * Salesforce Web-to-Lead. Every website form becomes a Lead: standard fields
 * are mapped directly and the rest of the submission goes into Description so
 * nothing is lost without needing custom fields in the org.
 */
const ENDPOINT = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"

const formLabels: Record<string, string> = {
  contact: "Contact form",
  quote: "Quote request",
  "org-health-check": "Org Health Check",
  newsletter: "Newsletter signup",
  "job-application": "Job application",
}

function splitName(full: unknown) {
  const parts = String(full ?? "").trim().split(/\s+/).filter(Boolean)
  if (parts.length < 2) return { first_name: "", last_name: parts[0] ?? "" }
  return { first_name: parts.slice(0, -1).join(" "), last_name: parts.at(-1)! }
}

const str = (v: unknown) => (v === undefined || v === null || v === "" ? undefined : String(v))
const lines = (rows: [string, unknown][]) =>
  rows
    .filter(([, v]) => str(Array.isArray(v) ? v.join(", ") : v))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n")

function healthCheckSummary(answers: Record<string, number>) {
  return questions
    .filter((q) => answers[q.id] !== undefined)
    .map((q) => `- [${dimensions[q.dimension].label}] ${q.text} → ${q.options.find((o) => o.score === answers[q.id])?.label ?? answers[q.id]}`)
    .join("\n")
}

function describe(kind: string, d: Record<string, unknown>) {
  switch (kind) {
    case "contact":
      return lines([["Subject", d.subject]]) + `\n\n${d.message ?? ""}`
    case "quote":
      return lines([
        ["Services", d.services],
        ["Salesforce org", d.orgStatus],
        ["Engagement model", d.engagement],
        ["Timeline", d.timeline],
        ["Details", d.details],
      ])
    case "org-health-check":
      return (
        lines([
          ["Health score", `${d.score}/100`],
          ["Wants expert review", d.wantsReview ? "Yes" : "No"],
        ]) + `\n\nAnswers:\n${healthCheckSummary((d.answers ?? {}) as Record<string, number>)}`
      )
    case "job-application":
      return lines([
        ["Position", d.position],
        ["LinkedIn", d.linkedin],
        ["Resume file (not attached)", d.resumeName],
        ["Message", d.message],
      ])
    default:
      return ""
  }
}

export function leadFields(kind: string, d: Record<string, unknown>) {
  const label = formLabels[kind] ?? kind
  const { first_name, last_name } = splitName(d.name)
  // Last Name and Company are required on Lead; use Salesforce's own placeholder when a form doesn't ask.
  const fields: Record<string, string | undefined> = {
    first_name,
    last_name: last_name || "[not provided]",
    email: str(d.email),
    phone: str(d.phone),
    company: str(d.company) ?? "[not provided]",
    lead_source: process.env.SF_LEAD_SOURCE || "Web",
    description: `Website: ${label}\n${describe(kind, d)}`.trim().slice(0, 32000),
  }
  if (kind === "job-application") fields.title = str(d.position)
  return fields
}

export const salesforceEnabled = () => !!process.env.SF_WEB_TO_LEAD_ORG_ID

export async function createLead(kind: string, data: Record<string, unknown>) {
  const oid = process.env.SF_WEB_TO_LEAD_ORG_ID!
  const body = new URLSearchParams({ oid })
  for (const [k, v] of Object.entries(leadFields(kind, data))) if (v) body.set(k, v)
  if (process.env.SF_WEB_TO_LEAD_DEBUG_EMAIL) {
    body.set("debug", "1")
    body.set("debugEmail", process.env.SF_WEB_TO_LEAD_DEBUG_EMAIL)
  }
  // Salesforce answers 200 even for rejected leads; only transport errors are detectable here.
  const res = await fetch(`${ENDPOINT}&orgId=${encodeURIComponent(oid)}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    redirect: "manual",
  })
  if (res.status >= 400) throw new Error(`Web-to-Lead responded ${res.status}`)
}
