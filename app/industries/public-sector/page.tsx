import type { Metadata } from "next"
import { groupByFocusArea, publicSectorFocusAreas } from "@/lib/case-studies"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, RevealGroup, RevealItem, SwingIn } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { CaseStudyCard } from "@/components/story/case-study-card"
import { ImageBand } from "@/components/story/image-band"

export const metadata: Metadata = {
  title: "Public Sector: Modernize Government Operations on Salesforce",
  description: "Enabled Analytics helps state agencies and local governments replace legacy applications, improve existing Salesforce solutions and introduce new digital capabilities.",
  alternates: { canonical: "/industries/public-sector" },
}

// Page copy: the Public Sector landing page content supplied by Mike (EA_Public_Sector_Landing_Page_Final), carried forward per the 12 Nov 2026 handoff.
const BARRIERS = [
  { title: "Disconnected systems increase effort and delay decisions.", text: "Staff reenter information, reconcile records, and coordinate work through emails and spreadsheets." },
  { title: "Limited digital options make services harder to access.", text: "Residents, businesses, and service providers must call, submit documents, or visit an office for steps that could be completed online." },
  { title: "Administrative demands consume staff capacity.", text: "Finding information, checking requirements, preparing documents, and answering routine questions leave less time for work that requires judgment and personal attention." },
]

const PILLARS = [
  {
    title: "Accelerate modernization",
    text: "Salesforce’s preconfigured Agentforce Public Sector applications and Enabled Analytics’ prebuilt accelerators help reduce development effort and accelerate delivery. We configure and extend these foundations to fit your requirements and connect them with the systems your teams depend on.",
  },
  {
    title: "Put AI to practical use",
    text: "Agentforce AI can help people find relevant information and navigate application processes, while helping staff retrieve guidance, summarize records, and prepare responses. We identify where AI can reduce effort and improve service, with human review at key decision points.",
  },
]

const SPECIALIZATIONS = [
  { title: "Grants Management", text: "Connect applications, reviews, awards, and reporting so staff can manage the grant lifecycle with less administrative effort and clearer visibility into funding and program performance." },
  { title: "Real Estate Services", text: "Bring property-related requests, approvals, payments, renewals, and obligations into a connected process that helps teams coordinate work and keep commitments on track." },
  { title: "Digital Front Door", text: "Give residents and businesses one connected place to find services, submit requests, and check progress, with each interaction connected to the staff and systems that deliver the service." },
  { title: "Enterprise Contract Management", text: "Connect contract requests, reviews, approvals, and ongoing obligations to reduce manual handoffs and give teams clearer visibility across the contract lifecycle." },
  { title: "Regulatory Compliance & Inspections", text: "Connect regulatory reviews, inspections, findings, and corrective actions so teams can coordinate oversight, track compliance, and maintain clear records of decisions and follow-up." },
]

/** Focus areas with published proof, then "More client work". */
const GROUPS = groupByFocusArea("Public Sector", publicSectorFocusAreas)

export default function PublicSectorPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries · State and Local Government"
        title="Modernizing Government. Improving Public Services."
        lead="Transforming government operations through streamlined processes, unified systems, and more efficient service delivery."
        crumbs={[{ label: "Industries", href: "/industries" }, { label: "Public Sector" }]}
        image={{ src: "/images/photos/public-sector-dashboard.webp", alt: "Grants program team reviewing a state grant programs dashboard" }}
      >
        <Button href="/contact" size="lg">
          Talk with our team <ArrowIcon />
        </Button>
        <Button href="#public-sector-work" size="lg" variant="secondary">
          Explore case studies
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <Reveal className="mx-auto max-w-4xl space-y-5 text-center text-lg leading-relaxed md:text-xl">
          <p>
            Enabled Analytics helps state agencies and local governments replace legacy applications, improve existing Salesforce solutions, and introduce new digital capabilities. We design, implement, and support solutions that reduce administrative effort, make services easier to access, and give staff more capacity to carry out their missions.
          </p>
          <p>Whether you are addressing an immediate operational need or planning a broader modernization initiative, let’s discuss your priorities.</p>
        </Reveal>
      </Section>

      <Section tone="tint">
        <SectionHeading index="01" eyebrow="The challenge" title="Reduce the barriers to better public service" />
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {BARRIERS.map((b) => (
            <RevealItem key={b.title} className="h-full">
              <article className="flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-7 shadow-soft">
                <h3 className="text-xl leading-snug font-bold">{b.title}</h3>
                <p className="mt-4 leading-relaxed">{b.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {PILLARS.map((p, i) => (
            <SwingIn key={p.title} from={i === 0 ? "left" : "right"} className="h-full">
              <article className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-8 text-white shadow-lift md:p-10">
                <span aria-hidden="true" className="absolute -top-16 -right-16 size-56 rounded-full bg-white/10 blur-2xl" />
                <p className="relative font-mono text-xs tracking-[0.14em] text-brand-100 uppercase">{String(i + 2).padStart(2, "0")}</p>
                <h2 className="relative mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-extrabold text-white">{p.title}</h2>
                <p className="relative mt-4 text-lg leading-relaxed text-brand-50">{p.text}</p>
              </article>
            </SwingIn>
          ))}
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <ImageBand src="/images/photos/public-sector-service-center.webp" alt="Residents using self-service kiosks and an information desk in a government service center" kicker="Digital front door" caption="One connected place to find services, submit requests and check progress" />
      </Section>

      <Section tone="tint">
        <SectionHeading index="04" eyebrow="Specializations" title="Explore our public sector specializations" />
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SPECIALIZATIONS.map((s, i) => (
            <RevealItem key={s.title} className="h-full">
              <article className="flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                <span className="font-mono text-sm font-medium text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 leading-relaxed">{s.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="public-sector-work" className="scroll-mt-20">
        <SectionHeading index="05" eyebrow="Focus areas" title="Explore our public sector work" lead="Explore case studies showing how public sector teams use Salesforce to modernize operations and introduce new capabilities." />
        {GROUPS.map((g) => (
          <div key={g.title} className="mt-10 first:mt-0">
            <Reveal>
              <h3 className="mb-5 flex items-baseline gap-3 font-heading text-2xl font-bold">
                {g.title}
                <span className="font-mono text-sm font-medium text-brand-600">
                  {g.items.length} {g.items.length === 1 ? "case study" : "case studies"}
                </span>
              </h3>
            </Reveal>
            <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {g.items.map((c) => (
                <RevealItem key={c.slug} className="h-full">
                  <CaseStudyCard c={c} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </Section>

      <CTABanner eyebrow="Salesforce Summit Partner" title="Let’s discuss your priorities" lead="Whether you are addressing an immediate operational need or planning a broader modernization initiative, our team is ready to help." primary={{ label: "Talk with our team", href: "/contact" }} />
    </>
  )
}
