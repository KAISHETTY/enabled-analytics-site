import type { Metadata } from "next"
import { agentDemos } from "@/lib/agentforce"
import { getOffering } from "@/lib/offerings"
import { siteUrl } from "@/lib/site-config"
import { SectionHeading } from "@/components/ea/section-heading"
import { AgentDemoPlayer } from "@/components/story/agent-demo"
import { OfferingPage } from "@/components/story/offering-page"
import { JsonLd } from "@/components/seo/json-ld"

const o = getOffering("agentforce")

export const metadata: Metadata = {
  title: o.title,
  description: o.metaDescription,
  alternates: { canonical: o.href },
  openGraph: { title: o.title, description: o.metaDescription, images: [{ url: o.image }] },
  keywords: ["Agentforce partner", "Agentforce implementation", "Salesforce AI agents", "Applied AI", "Data 360"],
}

/** Agentforce & Applied AI: the Services offering page (12 Nov 2026 handoff). The demos are labelled as illustrative, not client work. */
export default function AgentforcePage() {
  return (
    <>
      <OfferingPage o={o}>
        <section id="demos" className="relative overflow-hidden bg-gradient-to-b from-white via-agent-50/60 to-white py-20 md:py-28" aria-labelledby="demos-title">
          <div className="container-page relative">
            <SectionHeading
              eyebrow="Illustrative examples"
              title={<span id="demos-title">See how an agent could work</span>}
              lead="Illustrative demonstrations of agents reasoning over data, calling actions and handing off to people. These are examples, not completed client work."
            />
            <AgentDemoPlayer demos={agentDemos} />
          </div>
        </section>
      </OfferingPage>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: o.title,
          description: o.metaDescription,
          provider: { "@type": "Organization", name: "Enabled Analytics", url: siteUrl },
          url: `${siteUrl}${o.href}`,
        }}
      />
    </>
  )
}
