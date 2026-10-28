import type { Metadata } from "next"
import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { agentDemos, agentforce } from "@/lib/agentforce"
import { siteUrl } from "@/lib/site-config"
import { Breadcrumbs } from "@/components/ea/breadcrumbs"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { FeatureGrid } from "@/components/ea/feature-grid"
import { Timeline } from "@/components/ea/timeline"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { ContactForm } from "@/components/forms/contact-form"
import { AgentDemoPlayer } from "@/components/story/agent-demo"
import { TrustStrip } from "@/components/story/trust-strip"
import { SplitReveal } from "@/components/motion/split-reveal"
import { Typewriter } from "@/components/motion/typewriter"
import { ScrollHighlight } from "@/components/motion/scroll-highlight"
import { CloudMark, Cloud } from "@/components/motion/sky-scene"
import { RotatingBadge } from "@/components/motion/rotating-badge"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Agentforce Implementation Partner",
  description: "Enabled Analytics designs, grounds and launches Salesforce Agentforce AI agents, with an AI Readiness Assessment, Data Cloud grounding and CoE-led rollout.",
  alternates: { canonical: "/agentforce" },
  keywords: ["Agentforce partner", "Agentforce implementation", "Salesforce AI agents", "AI readiness assessment", "Data Cloud"],
}

export default function AgentforcePage() {
  return (
    <>
      {/* Hero: agentic gradient sky */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-agent-50 via-brand-50 to-white pt-36 pb-24 md:pt-44 md:pb-32">
        <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
        <div aria-hidden="true" className="absolute top-24 -right-32 size-[560px] rounded-full bg-agent-100/70 blur-3xl" />
        <Cloud className="absolute bottom-10 -left-10 w-[36vw] opacity-80" />
        <Cloud className="absolute right-[10%] bottom-0 w-[26vw] opacity-70" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: "Agentforce" }]} className="mb-8" />
          <p className="eyebrow flex items-center gap-3 text-agent-600">
            <CloudMark tone="agent" /> {agentforce.eyebrow}
          </p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">
            <SplitReveal delay={150} parts={[{ text: agentforce.headline[0], className: "block" }, { text: agentforce.headline[1], className: "block accent-serif font-normal tracking-normal text-agent-500" }]} />
          </h1>
          <p className="mt-8 max-w-2xl animate-in text-xl leading-relaxed duration-700 fill-mode-both fade-in slide-in-from-bottom-2" style={{ animationDelay: "900ms" }}>
            {agentforce.lead}
          </p>
          <div className="mt-10 flex animate-in flex-wrap gap-3 duration-700 fill-mode-both fade-in" style={{ animationDelay: "1050ms" }}>
            <a href="#readiness" className="group/btn inline-flex h-13 items-center gap-2 rounded-full bg-agent-500 px-8 text-base font-semibold text-white shadow-agent transition hover:-translate-y-0.5 hover:bg-agent-600">
              Book an AI Readiness Assessment <ArrowIcon />
            </a>
            <a href="#demos" className="inline-flex h-13 items-center gap-2 rounded-full border border-line bg-white px-8 text-base font-semibold text-ink shadow-soft transition hover:-translate-y-0.5">
              <Sparkles aria-hidden="true" className="size-4 text-agent-500" /> See agents in action
            </a>
          </div>
          <div className="absolute right-6 bottom-0 hidden lg:block">
            <RotatingBadge href="#readiness" text="AI Readiness • Agentforce • AI Readiness • Agentforce • " tone="agent" />
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10">
        <div className="container-page">
          <Reveal>
            <TrustStrip />
          </Reveal>
        </div>
      </section>

      {/* Why now: DAQ manifesto */}
      <Section>
        <p className="eyebrow mb-8 flex items-center gap-3 text-agent-600">
          <span className="text-ink-subtle">01</span> <span className="h-px w-8 bg-agent-100" aria-hidden="true" /> {agentforce.why.title}
        </p>
        <ScrollHighlight text="Agents are only as good as the *data*, processes and *guardrails* underneath them. The same CoE teams, accelerators and Data Cloud practice that power our implementations now prepare your org for agents and put them to work *safely*." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {agentforce.why.body.map((p) => (
            <Reveal key={p.slice(0, 20)}>
              <p className="text-lg leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Demos */}
      <section id="demos" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-white via-agent-50/60 to-white py-24 md:py-32">
        <div className="container-page">
          <SectionHeading
            index="02"
            eyebrow="Use cases"
            title={
              <>
                Agents that <Typewriter words={["resolve cases.", "qualify leads.", "reschedule visits."]} className="accent-serif font-normal text-agent-500" />
              </>
            }
            lead="Three illustrative demos of how Agentforce agents reason over your data, call actions and hand off to people."
          />
          <AgentDemoPlayer demos={agentDemos} />
        </div>
      </section>

      {/* Capabilities */}
      <Section>
        <SectionHeading index="03" eyebrow="What we deliver" title="Everything an agent needs to succeed" align="center" />
        <FeatureGrid items={agentforce.capabilities} columns={3} />
      </Section>

      {/* Process */}
      <Section tone="tint">
        <SectionHeading index="04" eyebrow="How we work" title={<>From readiness to <span className="accent-serif text-agent-500">production</span></>} />
        <Timeline steps={agentforce.process} orientation="vertical" />
      </Section>

      {/* AI Readiness Assessment offer */}
      <section id="readiness" className="relative scroll-mt-20 py-24 md:py-32">
        <div className="container-page">
          <div className="grid gap-10 overflow-hidden rounded-[2.5rem] border border-agent-100 bg-gradient-to-br from-agent-50 via-white to-brand-50 p-8 shadow-lift md:p-14 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-agent-600">
                <CloudMark tone="agent" /> 05 · The offer
              </p>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-extrabold">{agentforce.readiness.title}</h2>
              <p className="mt-4 text-lg">{agentforce.readiness.lead}</p>
              <ul className="mt-8 space-y-3">
                {agentforce.readiness.deliverables.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-agent-500 text-white">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm">
                Want a quick baseline first?{" "}
                <Link href="/health-check" className="font-semibold text-agent-600 underline underline-offset-2">
                  Take the free Org Health Check
                </Link>
                . It includes an AI-readiness score.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[2rem] border border-white bg-white p-6 shadow-soft md:p-8">
              <h3 className="mb-6 text-2xl font-bold">Book your assessment</h3>
              <ContactForm defaultSubject="AI Readiness Assessment" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="container-page flex flex-wrap items-center justify-between gap-6 rounded-[2rem] border border-line bg-surface p-8 md:p-10">
          <p className="font-heading text-2xl font-bold text-ink">Prefer to talk it through with a person?</p>
          <Button href="/contact" size="lg">
            Talk to an Agentforce expert <ArrowIcon />
          </Button>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Agentforce Implementation",
          serviceType: "Salesforce Agentforce implementation and AI readiness assessment",
          provider: { "@id": `${siteUrl}/#organization` },
          url: `${siteUrl}/agentforce`,
          description: agentforce.lead,
        }}
      />
    </>
  )
}
