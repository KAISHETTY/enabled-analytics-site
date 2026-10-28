import type { Metadata } from "next"
import { Suspense } from "react"
import { Check } from "lucide-react"
import { home } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { QuoteWizard } from "@/components/forms/quote-wizard"
import { QuoteWizardFromParams } from "@/components/forms/quote-wizard-params"

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Request a quote for your Salesforce project. Tell us about your needs and we’ll connect you to one of our Salesforce experts.",
  alternates: { canonical: "/get-a-quote" },
}

export default function QuotePage() {
  return (
    <>
      <PageHero eyebrow="Get a Quote" title="Tell us about your project" lead="Tell us about your project in brief and we’ll connect you to one of our Salesforce experts." crumbs={[{ label: "Get a Quote" }]} />
      <Section className="pt-6 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <Suspense fallback={<QuoteWizard />}>
            <QuoteWizardFromParams />
          </Suspense>
          <aside className="h-fit rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-28">
            <h2 className="font-heading text-lg font-bold">{home.benefits.title}</h2>
            <ul className="mt-4 space-y-3">
              {home.benefits.items.map((b) => (
                <li key={b.title} className="flex items-start gap-3 text-[0.9375rem]">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  {b.title}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
    </>
  )
}
