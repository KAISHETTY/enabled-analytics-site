import type { Metadata } from "next"
import { caseStudies } from "@/lib/case-studies"
import { getIndustry } from "@/lib/overview"
import { IndustryPage } from "@/components/story/industry-page"

export const metadata: Metadata = {
  title: "Manufacturing: Salesforce for Manufacturers",
  description: "Salesforce implementation, support and staff augmentation for manufacturers, from Enabled Analytics.",
  alternates: { canonical: "/solutions/manufacturing" },
}

export default function ManufacturingPage() {
  return (
    <IndustryPage
      industry={getIndustry("manufacturing")}
      title="Salesforce for manufacturers"
      lead="Enabled Analytics helps manufacturers implement, support and scale Salesforce, with certified experts who get it right the first time."
      image={{ src: "/images/photos/manufacturing-team.webp", alt: "A consultant reviewing a Salesforce workflow on a tablet with a manufacturing team beside the production floor" }}
      studies={caseStudies.filter((c) => c.industry === "Manufacturing")}
    />
  )
}
