import type { Metadata } from "next"
import Link from "next/link"
import { Star } from "lucide-react"
import { product } from "@/lib/content"
import { accelerators, implementationMethodology, thinkubator } from "@/lib/overview"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { DynamicIcon } from "@/components/ea/icon"
import { CloudMark } from "@/components/motion/sky-scene"
import { SpotlightCard } from "@/components/story/spotlight-card"
import { StepRoad } from "@/components/story/step-road"

export const metadata: Metadata = {
  title: "Apps & Accelerators: Discover Cloud, Playbooks & Frameworks",
  description: "Discover Cloud on AppExchange plus the Salesforce Starter Kit, Integration and Data Migration Playbooks, Conference Room Pilots and an industrialized Data Cloud framework that speed every Enabled Analytics engagement.",
  alternates: { canonical: "/accelerators" },
}

export default function AcceleratorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Apps & Accelerators"
        title="Apps and accelerators that get you to value faster"
        lead="Our own AppExchange product plus the playbooks, kits and frameworks our teams bring to every engagement, so you start from proven foundations instead of from scratch."
        crumbs={[{ label: "Apps & Accelerators" }]}
      >
        <Button href="#accelerators" size="lg">
          Explore accelerators <ArrowIcon />
        </Button>
        <Button href="/products" size="lg" variant="secondary">
          Discover Cloud
        </Button>
      </PageHero>

      {/* ISV app */}
      <Section className="pt-4 md:pt-6">
        <Reveal>
          <Link href="/products" className="group/dc relative grid gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 p-8 text-white shadow-lift md:grid-cols-[1.4fr_1fr] md:items-center md:p-12">
            <div aria-hidden="true" className="absolute -top-24 -right-24 size-80 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover/dc:scale-125" />
            <div className="relative">
              <p className="flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-brand-100 uppercase">
                <CloudMark /> Our app · Salesforce ISV partner
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-extrabold text-white">{product.name}</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-50">{product.overview.body[0]}</p>
              <span className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-brand-700 transition group-hover/dc:-translate-y-0.5">
                Explore Discover Cloud <ArrowIcon />
              </span>
            </div>
            <div className="relative grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur">
                <p className="flex items-center gap-1 text-amber-300" aria-label="Rated 4.95 out of 5">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <Star key={k} aria-hidden="true" className="size-5 fill-current" />
                  ))}
                </p>
                <p className="mt-2 font-heading text-3xl font-extrabold text-white">4.95 / 5</p>
                <p className="text-sm text-brand-100">Verified rating on Salesforce AppExchange</p>
              </div>
              {product.modules.slice(0, 4).map((mod) => (
                <div key={mod.title} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/20">
                  <span className="font-mono text-xs text-brand-100">{mod.index}</span> {mod.title}
                </div>
              ))}
            </div>
          </Link>
        </Reveal>
      </Section>

      <Section tone="tint" id="accelerators" className="scroll-mt-20">
        <SectionHeading index="01" eyebrow="Accelerators" title="Proven assets, built into every engagement" lead="Accelerators are what AEs and clients ask us about most. These come from our implementation methodology, data practice and managed services." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accelerators.map((a, i) => (
            <SpotlightCard key={a.id} id={a.id} delay={(i % 3) * 0.08}>
              <div className="flex items-start justify-between gap-4">
                <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow transition-transform duration-300 group-hover/spot:scale-110 group-hover/spot:-rotate-6">
                  <DynamicIcon name={a.icon} className="size-6" />
                </span>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{a.kind}</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold">{a.title}</h3>
              <p className="mt-3 leading-relaxed">{a.text}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {a.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[0.9375rem]">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
                    {pt}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading index="02" eyebrow="Where they fit" title="Accelerators at every phase of delivery" lead={implementationMethodology.lead} />
        <StepRoad
          steps={implementationMethodology.phases.map((ph) => ({
            kicker: ph.focus,
            title: ph.title,
            body: (
              <>
                <p className="text-ink-subtle">{ph.sprints}</p>
                {ph.tools.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {ph.tools.map((t) => (
                      <li key={t} className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm">Validated with final user acceptance, training and an operational handover.</p>
                )}
              </>
            ),
          }))}
        />
      </Section>

      <Section tone="tint">
        <SectionHeading index="03" eyebrow="Data & AI Thinkubator" title="From big idea to enterprise scale" lead={thinkubator.lead} />
        <StepRoad columns={5} steps={thinkubator.steps.map((s) => ({ title: s.title, body: <p>{s.text}</p> }))} />
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/agentforce" variant="secondary">
            Agentforce & AI <ArrowIcon />
          </Button>
          <Button href="/services/data-analytics" variant="secondary">
            Data 360 & Analytics <ArrowIcon />
          </Button>
        </Reveal>
      </Section>

      <CTABanner title="Want these accelerators on your project?" lead="Tell us where your Salesforce org is today and we’ll show you which accelerators fit." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
