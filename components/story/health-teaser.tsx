import Link from "next/link"
import { Check } from "lucide-react"
import { dimensions } from "@/lib/health-check"
import { ArrowIcon } from "@/components/ea/button"
import { Reveal } from "@/components/ea/reveal"
import { CloudMark } from "@/components/motion/sky-scene"

/** Lead-magnet teaser: an example score dial beside the offer. */
export function HealthTeaser() {
  const sample = [72, 58, 81, 64, 49, 37]
  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-labelledby="hc-title">
      <div aria-hidden="true" className="bg-sky absolute inset-0" />
      <div className="container-page relative">
        <div className="grid items-center gap-12 overflow-hidden rounded-[2.5rem] border border-white bg-white/80 p-8 shadow-lift backdrop-blur-xl md:p-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <CloudMark /> Free · 12 questions · instant score
            </p>
            <h2 id="hc-title" className="mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-extrabold">
              Get your free Salesforce <span className="accent-serif text-brand-600">Org Health Score</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Answer twelve quick questions across data, automation, performance, adoption, governance and AI readiness. You get your score and a PDF report instantly, and our experts follow up with a personal review within 48 hours.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {Object.values(dimensions).map((d) => (
                <li key={d.label} className="flex items-center gap-2 text-[0.9375rem]">
                  <Check aria-hidden="true" className="size-4 text-brand-600" />
                  {d.label}
                </li>
              ))}
            </ul>
            <Link href="/health-check" className="group/btn mt-9 inline-flex h-13 items-center gap-2 rounded-full bg-brand-600 px-8 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-700">
              Start the Health Check <ArrowIcon />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2rem] border border-line bg-white p-8 shadow-soft">
              <div className="flex items-center gap-6">
                <div className="relative size-36 shrink-0 rounded-full" style={{ background: "conic-gradient(var(--color-brand-600) 0 64%, var(--color-brand-50) 64% 100%)" }} aria-hidden="true">
                  <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-white">
                    <span className="font-heading text-4xl font-extrabold text-ink">64</span>
                    <span className="text-xs text-ink-subtle">/ 100</span>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">Example report</p>
                  <p className="mt-1 font-heading text-2xl font-bold text-ink">Healthy</p>
                  <p className="mt-1 text-sm">Targeted optimization will unlock more value.</p>
                </div>
              </div>
              <ul className="mt-8 space-y-3" aria-label="Example dimension scores">
                {Object.values(dimensions).map((d, i) => (
                  <li key={d.label}>
                    <div className="flex justify-between text-sm">
                      <span>{d.label}</span>
                      <span className="font-semibold text-ink">{sample[i]}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-brand-50">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400" style={{ width: `${sample[i]}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <span className="absolute -top-4 -right-3 rotate-6 rounded-full bg-highlight px-4 py-2 text-sm font-bold text-brand-800 shadow-lift">PDF report</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
