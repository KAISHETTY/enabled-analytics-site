import type { Metadata } from "next"
import { clients } from "@/lib/content"
import { caseStudies } from "@/lib/case-studies"
import { getIndustry } from "@/lib/overview"
import { IndustryPage } from "@/components/story/industry-page"

export const metadata: Metadata = {
  title: "Telecom: Salesforce for Communications Providers",
  description: "Salesforce implementation, support and staff augmentation for telecom and communications providers, from Enabled Analytics.",
  alternates: { canonical: "/solutions/telecom" },
}

export default function TelecomPage() {
  return (
    <IndustryPage
      industry={getIndustry("telecom")}
      title="Salesforce for telecom and communications providers"
      lead="Enabled Analytics helps communications providers implement, support and scale Salesforce, with certified experts who get it right the first time."
      image={{ src: "/images/photos/telecom-team.webp", alt: "A consultant presenting a CRM dashboard to a telecom team beside a network coverage map" }}
      studies={caseStudies.filter((c) => c.industry === "Communications")}
      logos={clients.filter((c) => c.sector === "Telecom")}
    />
  )
}
