import type { Metadata } from "next"
import Link from "next/link"
import { clients } from "@/lib/content"
import { overview } from "@/lib/overview"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { CTABanner } from "@/components/ea/cta-banner"
import { Reveal, SwingIn } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"
import { TrustStrip } from "@/components/story/trust-strip"
import { LogoWall } from "@/components/story/logo-wall"

export const metadata: Metadata = {
  title: "Clients: Public Sector, Telecom & Commercial",
  description: "Organizations across the public sector, telecom and commercial industries trust Enabled Analytics, a Salesforce Summit Consulting Partner and ISV partner, with their Salesforce programs.",
  alternates: { canonical: "/clients" },
}

/** Client Success has three pages: Clients (this page), Case Studies and Client Testimonials (11.17 feedback). */
const PAGES = [
  { href: "/case-studies", kicker: "Case Studies", title: "Challenge → Solution → Result", text: "Public Sector, Telecommunications and Commercial case studies, organized by focus area.", cta: "View case studies" },
  { href: "/testimonials", kicker: "Client Testimonials", title: "In our clients’ words", text: "Feedback from IT, sales, marketing and customer-success leaders we have partnered with.", cta: "Read testimonials" },
]

export default function ClientsPage() {
  return (
    <>
      <PageHero eyebrow="Client Success" title="Trusted by organizations that can’t afford to get it wrong" lead={overview.positioning} crumbs={[{ label: "Client Success" }, { label: "Clients" }]} image={{ src: "/images/photos/client-call.webp", alt: "A consultant on a video call with a client team" }}>
        <Button href="/case-studies" size="lg">
          Case Studies <ArrowIcon />
        </Button>
        <Button href="/testimonials" size="lg" variant="secondary">
          Client Testimonials
        </Button>
      </PageHero>

      <Section className="pt-6 md:pt-10">
        <Reveal>
          <TrustStrip credibility />
        </Reveal>
      </Section>

      <Section tone="tint">
        <SectionHeading index="01" eyebrow="Our clients" title="Public Sector, Telecommunications and Commercial clients" lead="From state agencies and school districts to communications providers, manufacturers and financial firms." align="center" />
        <LogoWall logos={clients} sectors={["Public Sector", "Telecom", "Commercial"]} />
      </Section>

      <Section>
        <SectionHeading index="02" eyebrow="Client Success" title="Explore our client success" align="center" />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {PAGES.map((p, i) => (
            <SwingIn key={p.href} from={i === 0 ? "left" : "right"} className="h-full">
              <Link href={p.href} className="group/cs flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                <span className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">{p.kicker}</span>
                <h3 className="mt-3 text-2xl font-bold">{p.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed">{p.text}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-700">
                  {p.cta} <ArrowIcon />
                </span>
              </Link>
            </SwingIn>
          ))}
        </div>
      </Section>

      <CTABanner title="Ready to be our next success story?" lead="Tell us about your project in brief and we’ll connect you to one of our Salesforce experts." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  )
}
