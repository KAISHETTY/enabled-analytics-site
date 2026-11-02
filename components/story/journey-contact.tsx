"use client"

import * as React from "react"
import { journeys } from "@/lib/schemas"
import { FanCards, type FanCard } from "@/components/story/fan-cards"
import { ContactForm } from "@/components/forms/contact-form"
import { cn } from "@/lib/utils"

const CARDS: [FanCard, FanCard] = [
  {
    kicker: "Starting fresh",
    title: "Get it right the first time",
    text: "Wouldn’t it be great to hit the bull’s eye the very first time? Start on a solid foundation instead of from scratch.",
    points: ["Integration frameworks & pre-built data models", "Data migration templates & apex utilities", "Deploy at 3X speed with our accelerators"],
    cta: "Plan my implementation",
  },
  {
    kicker: "Established org",
    title: "Get it running like new",
    text: "Technical debt, outdated workflows and undocumented changes slow every org down. Our expert “mechanics” get yours running like new.",
    points: ["Initial assessment of your org", "The Three Angles: enterprise, data, vision", "Phased lift-and-shift execution plan"],
    cta: "Get my org running like new",
  },
]

/**
 * Homepage "Your Journey & Contact": the two lead paths share one inquiry
 * form. Picking a path tags the lead with that journey and scrolls to the form.
 */
export function JourneyContact() {
  const [active, setActive] = React.useState<number>()
  const formRef = React.useRef<HTMLDivElement>(null)
  const journey = active === undefined ? undefined : journeys[active]

  const choose = (i: number) => {
    setActive(i)
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input:not([tabindex='-1'])")?.focus({ preventScroll: true }), 600)
  }

  return (
    <>
      <FanCards cards={CARDS} onSelect={choose} active={active} />
      <div ref={formRef} id="start" className="mx-auto mt-16 max-w-3xl scroll-mt-28 rounded-[2rem] border border-line bg-white p-6 shadow-lift md:mt-20 md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-extrabold md:text-3xl">Tell us about your project</h3>
          <div role="group" aria-label="Your Salesforce journey" className="flex gap-1 rounded-full bg-brand-50 p-1">
            {journeys.map((j, i) => (
              <button
                key={j}
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(active === i ? undefined : i)}
                className={cn("rounded-full px-3.5 py-1.5 text-sm font-semibold transition", active === i ? "bg-brand-600 text-white shadow-soft" : "text-brand-700 hover:bg-white")}
              >
                {j}
              </button>
            ))}
          </div>
        </div>
        <ContactForm journey={journey} idPrefix="journey" />
      </div>
    </>
  )
}
