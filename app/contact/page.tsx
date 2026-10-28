import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"
import { contact, site } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { LinkedInIcon, Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { ContactForm } from "@/components/forms/contact-form"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon, Button } from "@/components/ea/button"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Tell us about your project in brief and we’ll connect you to one of our Salesforce experts. Call 214 402 3125 or email info@enabledanalytics.com.",
  alternates: { canonical: "/contact" },
}

const mapQuery = encodeURIComponent(site.offices[0].address)

export default function ContactPage() {
  const rows = [
    { icon: Mail, label: "Mail Us", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Call Us", value: site.phone, href: `tel:${site.phoneHref}` },
  ]
  return (
    <>
      <PageHero eyebrow={contact.getInTouch} title={contact.hero.title} lead={contact.hero.lead} crumbs={[{ label: "Contact" }]} />

      <Section className="pt-6 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {rows.map((r) => (
                <a key={r.label} href={r.href} className="group/card flex items-center gap-4 rounded-xl border border-line bg-white p-5 shadow-soft transition hover:border-brand-200 hover:shadow-lift">
                  <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover/card:bg-brand-600 group-hover/card:text-white">
                    <r.icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-ink-subtle">{r.label}</span>
                    <span className="block font-heading text-base font-bold [overflow-wrap:anywhere] text-ink sm:text-lg">{r.value}</span>
                  </span>
                </a>
              ))}
            </Reveal>
            <Reveal className="rounded-xl border border-line bg-surface p-6">
              <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold">
                <MapPin aria-hidden="true" className="size-5 text-brand-600" /> Locate Us
              </h2>
              <ul className="space-y-4">
                {site.offices.map((o) => (
                  <li key={o.label}>
                    <p className="font-semibold text-ink">{o.label}</p>
                    <address className="text-[0.9375rem] not-italic">{o.address}</address>
                  </li>
                ))}
                <li>
                  <p className="font-semibold text-ink">Hyderabad, India (contact page address)</p>
                  <address className="text-[0.9375rem] not-italic">{site.contactPageAddress}</address>
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-3 border-t border-line pt-5">
                <span className="text-sm text-ink-subtle">Follow us</span>
                <a href={site.socials[0].url} target="_blank" rel="noopener noreferrer" aria-label="Enabled Analytics on LinkedIn" className="flex size-10 items-center justify-center rounded-full border border-line bg-white text-brand-700 hover:bg-brand-600 hover:text-white">
                  <LinkedInIcon className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal className="rounded-2xl border border-line bg-white p-6 shadow-soft md:p-10">
            <SectionHeading title={contact.formTitle} as="h2" className="mb-8 md:mb-8 [&_h2]:text-3xl [&_h2]:sm:text-3xl [&_h2]:lg:text-3xl" />
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" className="pt-0 md:pt-0">
        <Reveal className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
          <iframe
            title={`Map of ${site.offices[0].label} office`}
            src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[360px] w-full md:h-[440px]"
          />
        </Reveal>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm">{site.offices[0].address}</p>
          <Button href="/get-a-quote" variant="secondary">
            Prefer a guided form? Get a Quote <ArrowIcon />
          </Button>
        </div>
      </Section>
    </>
  )
}
