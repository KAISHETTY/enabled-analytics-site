import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { ArrowIcon, Button } from "@/components/ea/button"

export type Plan = {
  name: string
  description: string
  features: string[]
  featured?: boolean
  /** Optional; Enabled Analytics publishes no prices, so the CTA asks for a quote. */
  price?: string
}

/** Engagement-model / pricing card. Without `price` it shows a quote CTA. */
export function PricingCard({ plan, ctaHref = "/get-a-quote" }: { plan: Plan; ctaHref?: string }) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        plan.featured ? "border-brand-300 ring-4 ring-brand-50" : "border-line"
      )}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-glow">
          Most flexible
        </span>
      )}
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="mt-3 leading-relaxed">{plan.description}</p>
      <p className="mt-6 font-heading text-2xl font-extrabold text-ink">{plan.price ?? "Custom quote"}</p>
      <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button href={ctaHref} variant={plan.featured ? "primary" : "secondary"} className="mt-8 w-full">
        Request a quote
        <ArrowIcon />
      </Button>
    </article>
  )
}
