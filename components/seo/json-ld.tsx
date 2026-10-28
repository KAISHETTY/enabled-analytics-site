import { faqs, site } from "@/lib/content"
import { siteUrl } from "@/lib/site-config"

/** Renders structured data; `<` is escaped to prevent script injection. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/images/brand/logo.png`,
    description: site.description,
    email: site.email,
    telephone: `+1 ${site.phone}`,
    sameAs: site.socials.map((s) => s.url),
    address: {
      "@type": "PostalAddress",
      streetAddress: "209 State Highway 121 Bypass, Suite # 36",
      addressLocality: "Lewisville",
      addressRegion: "TX",
      postalCode: "75067",
      addressCountry: "US",
    },
    contactPoint: [{ "@type": "ContactPoint", telephone: `+1 ${site.phone}`, email: site.email, contactType: "sales" }],
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    publisher: { "@id": `${siteUrl}/#organization` },
  }
}

export function faqJsonLd(items: { q: string; a: string }[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}
