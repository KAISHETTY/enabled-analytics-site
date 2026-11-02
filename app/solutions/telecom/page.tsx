import type { Metadata } from "next"
import { BadgeDollarSign, FileSignature, Gauge, Settings2, UserRound } from "lucide-react"
import { clients } from "@/lib/content"
import { caseStudies } from "@/lib/case-studies"
import { implementationMethodology } from "@/lib/overview"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { LogoGrid } from "@/components/ea/logo-marquee"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem, SwingIn } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { StepRoad } from "@/components/story/step-road"

export const metadata: Metadata = {
  title: "Telecom: Salesforce for Communications Providers",
  description: "Customer 360, smart pricing, quotation lifecycle management and faster time to market for telecom and communications providers on Salesforce Communications Cloud and Revenue Cloud.",
  alternates: { canonical: "/solutions/telecom" },
}

// The five outcomes on the "Telecom" column of the Salesforce Overview deck.
const OUTCOMES = [
  { icon: UserRound, title: "Customer 360", text: "One view of every customer across sales, service, orders and billing, so every team works from the same picture." },
  { icon: Gauge, title: "Reduced time to market", text: "Launch and change offers quickly with a product catalog your teams can manage without long release cycles." },
  { icon: BadgeDollarSign, title: "Smart pricing strategy", text: "Consistent, rules-driven pricing and discounting across products, bundles and channels." },
  { icon: FileSignature, title: "Enhanced quotation lifecycle", text: "From configuration and quote through approval, contract and order, with fewer errors and faster turnaround." },
  { icon: Settings2, title: "IT autonomy for product changes", text: "Business-managed product modifications so IT can focus on the platform, not every catalog update." },
]

const TECHNOLOGY = ["Communications Cloud", "Revenue Cloud", "Salesforce Billing", "Contract Lifecycle Management", "Sales Cloud", "Service Cloud", "Field Service", "B2B Commerce", "CRM Analytics", "MuleSoft", "Agentforce"]

const telecomClients = clients.filter((c) => c.sector === "Telecom")
const studies = caseStudies.filter((c) => c.industry === "Communications")

export default function TelecomPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Serve · Telecom"
        title="Salesforce for telecom and communications providers"
        lead="Customer 360, smart pricing and quotation lifecycle management that shorten time to market and give your teams autonomy over product change."
        crumbs={[{ label: "Who We Serve" }, { label: "Telecom" }]}
      >
        <Button href="/contact" size="lg">
          Contact Us <ArrowIcon />
        </Button>
        <Button href="#how-we-deliver" size="lg" variant="secondary">
          How we deliver
        </Button>
      </PageHero>

      <Section className="pt-4 md:pt-6">
        <p className="eyebrow mb-6 text-center">Trusted by communications providers</p>
        <LogoGrid logos={telecomClients} />
      </Section>

      <Section tone="tint">
        <SectionHeading index="01" eyebrow="Outcomes" title="What we deliver for telecom" lead="Built on Salesforce Communications and Revenue Cloud, with industry patterns we bring to every engagement." />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((o, i) => (
            <RevealItem key={o.title} className={i === 0 ? "lg:row-span-2" : undefined}>
              <article className={i === 0 ? "group/o relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 p-8 text-white shadow-lift" : "group/o h-full rounded-[1.5rem] border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"}>
                <span aria-hidden="true" className={i === 0 ? "flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30" : "flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover/o:bg-brand-600 group-hover/o:text-white"}>
                  <o.icon className={i === 0 ? "size-7 animate-bob motion-reduce:animate-none" : "size-6"} />
                </span>
                <div>
                  <h3 className={i === 0 ? "mt-10 text-3xl font-extrabold text-white" : "mt-5 text-xl font-bold"}>{o.title}</h3>
                  <p className={i === 0 ? "mt-3 text-lg leading-relaxed text-brand-50" : "mt-2 leading-relaxed"}>{o.text}</p>
                </div>
                {i === 0 && <span aria-hidden="true" className="absolute -right-16 -bottom-16 size-64 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover/o:scale-125" />}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading index="02" eyebrow="Technology" title="The Salesforce stack for communications" align="center" />
        <Reveal>
          <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2.5">
            {TECHNOLOGY.map((t) => (
              <li key={t} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-soft ring-1 ring-brand-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="tint" id="how-we-deliver" className="scroll-mt-20">
        <SectionHeading index="03" eyebrow="How we deliver" title="Implementation methodology" lead={implementationMethodology.lead} />
        <StepRoad
          steps={implementationMethodology.phases.map((ph) => ({
            kicker: ph.focus,
            title: ph.title,
            body: (
              <>
                <p className="text-ink-subtle">{ph.sprints}</p>
                <p className="mt-3 font-semibold text-ink">Milestone: {ph.milestone}</p>
              </>
            ),
          }))}
        />
      </Section>

      {studies.length > 0 && (
        <Section>
          <SectionHeading index="04" eyebrow="Client success" title="Telecom case study" />
          <div className="grid gap-6 md:grid-cols-2">
            {studies.map((c, i) => (
              <SwingIn key={c.slug} from={i % 2 === 0 ? "left" : "right"} className="h-full">
                <CaseStudyCard c={c} />
              </SwingIn>
            ))}
          </div>
        </Section>
      )}

      <CTABanner title="Ready to quote faster and know every customer?" lead="Tell us about your network, products and pricing and we’ll connect you to our telecom team." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
