import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowIcon, Button } from "@/components/ea/button"
import { Reveal } from "@/components/ea/reveal"

type CTA = { label: string; href: string }

/** Rounded, softly tinted closing call-to-action panel (light, never dark). */
export function CTABanner({
  eyebrow = "Let’s build",
  title,
  lead,
  primary = { label: "Get Started", href: "/contact" },
  secondary,
  className,
}: {
  eyebrow?: string
  title: string
  lead?: string
  primary?: CTA
  secondary?: CTA
  className?: string
}) {
  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-surface-warm px-6 py-14 text-center shadow-soft sm:px-12 md:py-20">
          <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
          <div aria-hidden="true" className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 className="text-3xl leading-tight font-extrabold sm:text-4xl lg:text-[2.75rem]">{title}</h2>
            {lead && <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">{lead}</p>}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href={primary.href} size="lg">
                {primary.label}
                <ArrowIcon />
              </Button>
              {secondary && (
                <Button href={secondary.href} size="lg" variant="secondary">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
