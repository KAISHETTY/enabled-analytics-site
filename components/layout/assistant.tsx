"use client"

import * as React from "react"
import Link from "next/link"
import Script from "next/script"
import { AnimatePresence, m } from "framer-motion"
import { Bot, CalendarCheck, Loader2, Mail, Phone, Send, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SearchEntry } from "@/lib/search-index"
import { postJson } from "@/components/forms/fields"
import { trackEvent } from "@/lib/analytics"

/**
 * Salesforce Embedded Messaging (Agentforce) takes over when these are set;
 * otherwise the built-in assistant answers from the site's own content.
 */
const SF = {
  orgId: process.env.NEXT_PUBLIC_SF_EMBEDDED_ORG_ID,
  deployment: process.env.NEXT_PUBLIC_SF_EMBEDDED_DEPLOYMENT,
  siteUrl: process.env.NEXT_PUBLIC_SF_EMBEDDED_SITE_URL,
  scrt2Url: process.env.NEXT_PUBLIC_SF_EMBEDDED_SCRT2_URL,
}
const AGENTFORCE_ENABLED = !!(SF.orgId && SF.deployment && SF.siteUrl && SF.scrt2Url)

const PHONE = "214 402 3125"
const EMAIL = "info@enabledanalytics.com"

type Msg = { id: number; from: "bot" | "user"; text: string; links?: { label: string; href: string }[]; booking?: boolean }

const CHIPS = ["What is Agentforce?", "Free Org Health Check", "Your services", "Book a meeting", "Talk to a human"]

const INTENTS: { test: RegExp; reply: Omit<Msg, "id" | "from"> }[] = [
  {
    test: /agent|ai\b|artificial|agentic|bot/i,
    reply: {
      text: "We design, ground and launch Agentforce AI agents across sales, service and field operations, starting with an AI Readiness Assessment of your data, processes and security.",
      links: [
        { label: "Agentforce practice", href: "/agentforce" },
        { label: "AI Readiness Assessment", href: "/agentforce#readiness" },
      ],
    },
  },
  {
    test: /health|assess|audit|score|slow|technical debt/i,
    reply: {
      text: "Take our free Org Health Check: 12 quick questions, an instant score and a PDF report, with an expert review within 48 hours.",
      links: [
        { label: "Start the Health Check", href: "/health-check" },
        { label: "Org Assessment service", href: "/services/org-assessment" },
      ],
    },
  },
  {
    test: /meet|book|call me|demo|schedule|appointment/i,
    reply: { text: "Happy to set that up. Share a few details and our team will confirm a time.", booking: true },
  },
  {
    test: /human|person|someone|contact|phone|email|talk/i,
    reply: { text: `You can reach our team at ${EMAIL} or ${PHONE}, or book a meeting right here.`, links: [{ label: "Contact page", href: "/contact" }], booking: true },
  },
  {
    test: /price|cost|pricing|quote|budget|rate/i,
    reply: {
      text: "Our engagement models include fixed price as well as time & material, or you can hire our experts. Tell us about your project for a tailored quote.",
      links: [{ label: "Get a Quote", href: "/get-a-quote" }],
    },
  },
  {
    test: /service|offer|do you do|help with|cloud/i,
    reply: {
      text: "We cover CoE Teams, CoE Enablement, Org Assessment, Data Analytics and Agentforce, plus Sales, Service, Marketing and Experience Cloud, Account Engagement, CPQ and Field Service.",
      links: [{ label: "All services", href: "/services" }],
    },
  },
]

function retrieve(q: string, index: SearchEntry[]) {
  const terms = q.toLowerCase().split(/\W+/).filter((t) => t.length > 2)
  if (!terms.length) return []
  return index
    .map((e) => {
      const hay = `${e.title} ${e.text}`.toLowerCase()
      const title = e.title.toLowerCase()
      const score = terms.reduce((s, t) => s + (title.includes(t) ? 3 : 0) + (hay.includes(t) ? 1 : 0), 0)
      return { e, score }
    })
    .filter((x) => x.score > 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.e)
}

function BookingForm({ onDone }: { onDone: () => void }) {
  const [state, setState] = React.useState<"idle" | "sending" | "sent">("idle")
  const [error, setError] = React.useState<string>()
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get("name") ?? "").trim()
    const email = String(f.get("email") ?? "").trim()
    const when = String(f.get("when") ?? "")
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setError("Please add your name and a valid email.")
    setError(undefined)
    setState("sending")
    try {
      await postJson("/api/contact", { name, email, subject: "Meeting request (EA Assistant)", message: `Preferred time: ${when || "flexible"}. Sent from the website assistant.`, consent: true })
      trackEvent("assistant_meeting_request")
      setState("sent")
      onDone()
    } catch (err) {
      setError((err as Error).message)
      setState("idle")
    }
  }
  if (state === "sent") return null
  return (
    <form onSubmit={submit} className="mt-2 space-y-2 rounded-2xl border border-line bg-white p-3">
      <input name="name" aria-label="Your name" placeholder="Your name" autoComplete="name" className="h-10 w-full rounded-xl border border-input px-3 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none" />
      <input name="email" type="email" aria-label="Work email" placeholder="Work email" autoComplete="email" className="h-10 w-full rounded-xl border border-input px-3 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none" />
      <select name="when" aria-label="Preferred time" className="h-10 w-full rounded-xl border border-input bg-white px-3 text-sm focus:border-brand-400 focus:outline-none">
        <option value="">Preferred time (optional)</option>
        <option>This week, morning (US Central)</option>
        <option>This week, afternoon (US Central)</option>
        <option>Next week</option>
        <option>India Standard Time</option>
        <option>Singapore Time</option>
      </select>
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
      <p className="text-[0.6875rem] leading-snug text-ink-subtle">
        By sending you agree to our <Link href="/privacy" className="underline">privacy policy</Link>.
      </p>
      <button type="submit" disabled={state === "sending"} className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
        {state === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <CalendarCheck className="size-4" aria-hidden="true" />}
        Request meeting
      </button>
    </form>
  )
}

function LocalAssistant() {
  const [open, setOpen] = React.useState(false)
  const [msgs, setMsgs] = React.useState<Msg[]>([
    { id: 0, from: "bot", text: "Hi there! I’m the Enabled Analytics assistant. Ask me about Agentforce, our Salesforce services, or book a meeting." },
  ])
  const [input, setInput] = React.useState("")
  const [typing, setTyping] = React.useState(false)
  const index = React.useRef<SearchEntry[] | null>(null)
  const listRef = React.useRef<HTMLOListElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const nextId = React.useRef(1)

  React.useEffect(() => {
    if (!open || index.current) return
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((d: SearchEntry[]) => (index.current = d))
      .catch(() => (index.current = []))
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [msgs, typing])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const ask = (text: string) => {
    const q = text.trim()
    if (!q) return
    setMsgs((m) => [...m, { id: nextId.current++, from: "user", text: q }])
    setInput("")
    setTyping(true)
    trackEvent("assistant_question")
    setTimeout(() => {
      const intent = INTENTS.find((i) => i.test.test(q))
      let reply: Omit<Msg, "id" | "from">
      if (intent) reply = intent.reply
      else {
        const hits = retrieve(q, index.current ?? [])
        reply = hits.length
          ? { text: "Here’s what I found on our site:", links: hits.map((h) => ({ label: h.title, href: h.href })) }
          : { text: `I’m not sure about that one, but our team will be. Email ${EMAIL}, call ${PHONE}, or book a meeting.`, booking: true }
      }
      setTyping(false)
      setMsgs((m) => [...m, { id: nextId.current++, from: "bot", ...reply }])
    }, 650)
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {open && (
          <m.div
            role="dialog"
            aria-label="Enabled Analytics assistant"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(620px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-lift"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-brand-600 to-agent-500 px-5 py-4 text-white">
              <span className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-white/20">
                  <Sparkles className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold">EA Assistant</span>
                  <span className="flex items-center gap-1.5 text-xs text-white/85">
                    <span className="size-1.5 rounded-full bg-emerald-300" aria-hidden="true" /> Online · answers instantly
                  </span>
                </span>
              </span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="flex size-9 items-center justify-center rounded-full hover:bg-white/15">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <ol ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-surface p-4" data-lenis-prevent>
              {msgs.map((msg) => (
                <li key={msg.id} className={cn("flex gap-2", msg.from === "user" && "flex-row-reverse")}>
                  {msg.from === "bot" && (
                    <span aria-hidden="true" className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-agent-50 text-agent-600">
                      <Bot className="size-4" />
                    </span>
                  )}
                  <div className={cn("max-w-[85%]", msg.from === "user" && "text-right")}>
                    <p className={cn("inline-block rounded-2xl px-3.5 py-2.5 text-left text-sm leading-relaxed", msg.from === "user" ? "rounded-tr-sm bg-brand-600 text-white" : "rounded-tl-sm bg-white text-ink shadow-soft")}>{msg.text}</p>
                    {msg.links && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.links.map((l) => (
                          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-50">
                            {l.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                    {msg.booking && <BookingForm onDone={() => setMsgs((m) => [...m, { id: nextId.current++, from: "bot", text: "Thanks! Your request is in. Our team will email you to confirm a time." }])} />}
                  </div>
                </li>
              ))}
              {typing && (
                <li className="flex gap-2" aria-label="Assistant is typing">
                  <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-agent-50 text-agent-600">
                    <Bot className="size-4" />
                  </span>
                  <span className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-soft">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="size-1.5 animate-bounce rounded-full bg-agent-500" style={{ animationDelay: `${d * 120}ms` }} />
                    ))}
                  </span>
                </li>
              )}
            </ol>

            <div className="border-t border-line bg-white p-3">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
                {CHIPS.map((c) => (
                  <button key={c} type="button" onClick={() => ask(c)} className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink hover:border-brand-300 hover:text-brand-700">
                    {c}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  ask(input)
                }}
                className="flex items-center gap-2"
              >
                <label htmlFor="assistant-input" className="sr-only">
                  Ask a question
                </label>
                <input ref={inputRef} id="assistant-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Salesforce, Agentforce…" className="h-11 flex-1 rounded-full border border-input px-4 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none" />
                <button type="submit" aria-label="Send" className="flex size-11 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700">
                  <Send className="size-4" aria-hidden="true" />
                </button>
              </form>
              <div className="mt-2 flex justify-center gap-4 text-[0.6875rem] text-ink-subtle">
                <a href="tel:+12144023125" className="flex items-center gap-1 hover:text-brand-700">
                  <Phone className="size-3" aria-hidden="true" /> {PHONE}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-1 hover:text-brand-700">
                  <Mail className="size-3" aria-hidden="true" /> Email us
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open the Enabled Analytics assistant"}
        className="group relative flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-agent-500 pr-5 pl-4 font-semibold text-white shadow-agent transition hover:-translate-y-0.5"
      >
        {!open && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-brand-400/30 [animation-duration:2.4s] motion-reduce:hidden" />}
        {open ? <X className="relative size-5" aria-hidden="true" /> : <Sparkles className="relative size-5" aria-hidden="true" />}
        <span className="relative">{open ? "Close" : "Ask EA"}</span>
      </button>
    </div>
  )
}

/** Loads Salesforce Embedded Messaging (an Agentforce Service Agent deployment). */
function AgentforceMessaging() {
  return (
    <Script
      id="sf-embedded-messaging"
      src={`${SF.siteUrl}/assets/js/bootstrap.min.js`}
      strategy="lazyOnload"
      onLoad={() => {
        const w = window as unknown as { embeddedservice_bootstrap?: { settings: { language: string }; init: (...a: unknown[]) => void } }
        try {
          w.embeddedservice_bootstrap!.settings.language = "en_US"
          w.embeddedservice_bootstrap!.init(SF.orgId, SF.deployment, SF.siteUrl, { scrt2URL: SF.scrt2Url })
        } catch (e) {
          console.error("Embedded Messaging failed to load", e)
        }
      }}
    />
  )
}

export function Assistant() {
  return AGENTFORCE_ENABLED ? <AgentforceMessaging /> : <LocalAssistant />
}
