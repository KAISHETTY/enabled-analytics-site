import type { Metadata } from "next"
import { Clock, FileText, ShieldCheck } from "lucide-react"
import { dimensions } from "@/lib/health-check"
import { Breadcrumbs } from "@/components/ea/breadcrumbs"
import { Section } from "@/components/ea/primitives"
import { HealthCheckQuiz } from "@/components/forms/health-check-quiz"
import { SplitReveal } from "@/components/motion/split-reveal"
import { CloudMark, Cloud } from "@/components/motion/sky-scene"
import { TrustStrip } from "@/components/story/trust-strip"

export const metadata: Metadata = {
  title: "Free Salesforce Org Health Check",
  description: "Get a free Salesforce Org Health Score: 12 questions across data, automation, performance, adoption, governance and AI readiness, with an instant PDF report and an expert review within 48 hours.",
  alternates: { canonical: "/health-check" },
}

export default function HealthCheckPage() {
  return (
    <>
      <section className="bg-sky relative isolate overflow-hidden pt-36 pb-16 md:pt-44">
        <Cloud className="absolute top-28 -left-16 w-[28vw] opacity-80" />
        <Cloud className="absolute top-40 -right-10 w-[22vw] opacity-70" />
        <div className="container-page relative text-center">
          <Breadcrumbs items={[{ label: "Org Health Check" }]} className="mb-8 justify-center" />
          <p className="eyebrow flex items-center justify-center gap-3">
            <CloudMark /> Free · No login · 3 minutes
          </p>
          <h1 className="mx-auto mt-6 max-w-5xl text-[clamp(2.6rem,6.5vw,5.75rem)] leading-[0.96] font-extrabold tracking-[-0.03em]">
            <SplitReveal delay={150} parts={[{ text: "Get your free Salesforce", className: "block" }, { text: "Org Health Score", className: "block accent-serif font-normal tracking-normal text-brand-600" }]} />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl">
            Over time, even the best Salesforce implementations encounter technical debt, outdated workflows and undocumented changes. Find out where yours stands.
          </p>
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3 text-sm">
            {[
              { icon: Clock, t: "Instant score" },
              { icon: FileText, t: "PDF report" },
              { icon: ShieldCheck, t: "Expert review within 48 hours" },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 font-medium text-ink shadow-soft backdrop-blur">
                <x.icon aria-hidden="true" className="size-4 text-brand-600" /> {x.t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section className="pt-4 md:pt-6">
        <div className="mx-auto max-w-4xl">
          <HealthCheckQuiz />
          <p className="mt-6 text-center text-sm text-ink-subtle">
            Covers {Object.values(dimensions).map((d) => d.label.toLowerCase()).join(", ")}. A self-assessment indicator, not an audit.
          </p>
        </div>
        <div className="mt-16">
          <TrustStrip />
        </div>
      </Section>
    </>
  )
}
