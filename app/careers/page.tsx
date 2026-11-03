import type { Metadata } from "next"
import { Briefcase } from "lucide-react"
import { PageHero } from "@/components/ea/hero"
import { Section } from "@/components/ea/primitives"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at Enabled Analytics. There are no open roles at the moment.",
  alternates: { canonical: "/careers" },
}

/** Open positions are on hold until they are confirmed (2026-11-02 feedback); the earlier page is in git history. */
export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Join the most dynamic Salesforce team" crumbs={[{ label: "About", href: "/about" }, { label: "Careers" }]} />

      <Section className="pt-6 md:pt-10">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[2rem] border border-line bg-white p-10 text-center shadow-soft md:p-14">
          <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <Briefcase className="size-6" />
          </span>
          <h2 className="text-2xl font-bold md:text-3xl">No open roles right now</h2>
          <p className="text-lg leading-relaxed">We don’t have any open positions at the moment. Please check back soon.</p>
          <Button href="/about" variant="secondary">
            About Enabled Analytics <ArrowIcon />
          </Button>
        </Reveal>
      </Section>
    </>
  )
}
