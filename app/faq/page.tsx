import type { Metadata } from "next"
import { Mail, Phone } from "lucide-react"
import { faqs, site } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Card, Section } from "@/components/ea/primitives"
import { FAQAccordion } from "@/components/ea/faq-accordion"
import { ArrowIcon, Button } from "@/components/ea/button"
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Enabled Analytics, our Salesforce services, engagement models, CoE teams and Discover Cloud.",
  alternates: { canonical: "/faq" },
}

export default function FaqPage() {
  const groups = Array.from(new Set(faqs.map((f) => f.category)))
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" lead="Everything you need to know about working with Enabled Analytics." crumbs={[{ label: "FAQ" }]} />

      <Section className="pt-6 md:pt-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="space-y-12">
            {groups.map((g, i) => (
              <div key={g}>
                <h2 className="eyebrow mb-5 flex items-center gap-3">
                  <span className="text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                  {g}
                </h2>
                <FAQAccordion items={faqs.filter((f) => f.category === g)} defaultOpen={i === 0 ? 0 : null} />
              </div>
            ))}
          </div>
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <Card className="gap-4 bg-gradient-to-br from-brand-50 to-white">
              <h2 className="text-xl font-bold">Still have questions?</h2>
              <p>Tell us about your project in brief and we’ll connect you to one of our Salesforce experts.</p>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 font-medium text-ink hover:text-brand-700">
                <Mail aria-hidden="true" className="size-4 text-brand-600" />
                {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2 font-medium text-ink hover:text-brand-700">
                <Phone aria-hidden="true" className="size-4 text-brand-600" />
                {site.phone}
              </a>
              <Button href="/contact" className="mt-2">
                Contact us <ArrowIcon />
              </Button>
            </Card>
          </aside>
        </div>
      </Section>

      <JsonLd data={faqJsonLd()} />
    </>
  )
}
