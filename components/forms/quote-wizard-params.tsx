"use client"

import { useSearchParams } from "next/navigation"
import { services } from "@/lib/content"
import { QuoteWizard } from "@/components/forms/quote-wizard"

/** Reads `?service=<slug>` (from service pages) and preselects it. */
export function QuoteWizardFromParams() {
  const slug = useSearchParams().get("service") ?? undefined
  const valid = services.some((s) => s.slug === slug) ? slug : undefined
  return <QuoteWizard key={valid ?? "none"} preselect={valid} />
}
