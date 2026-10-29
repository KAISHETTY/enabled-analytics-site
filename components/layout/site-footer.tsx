import Image from "next/image"
import Link from "next/link"
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react"
import { site } from "@/lib/content"
import { footerNav } from "@/lib/site-config"
import { LinkedInIcon } from "@/components/ea/primitives"
import { NewsletterForm } from "@/components/forms/newsletter-form"

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <div className="container-page relative pt-16 md:pt-20">
        {/* Top: brand + newsletter */}
        <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="max-w-md">
            <Image src="/images/brand/logo.png" alt={site.name} width={1248} height={276} sizes="220px" className="h-10 w-auto" />
            <p className="mt-5 leading-relaxed">{site.description}</p>
          </div>
          <div>
            <p className="mb-3 font-heading text-lg font-bold text-ink">Get Salesforce insights in your inbox</p>
            <NewsletterForm />
          </div>
        </div>

        {/* Link columns + contact */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-[repeat(4,1fr)_1.4fr]">
          {footerNav.map((col, i) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-4 flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] text-ink-subtle uppercase">
                <span className="text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[0.9375rem] text-ink-muted transition-colors hover:text-brand-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 lg:col-span-1">
            <p className="mb-4 flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] text-ink-subtle uppercase">
              <span className="text-brand-600">05</span>Reach Out
            </p>
            <ul className="space-y-3 text-[0.9375rem]">
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-ink transition-colors hover:text-brand-700">
                  <Mail aria-hidden="true" className="size-4 text-brand-600" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2.5 text-ink transition-colors hover:text-brand-700">
                  <Phone aria-hidden="true" className="size-4 text-brand-600" />
                  {site.phone}
                </a>
              </li>
              {site.offices.map((o) => (
                <li key={o.label} className="flex gap-2.5">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  <span>
                    <span className="block font-medium text-ink">{o.label}</span>
                    <span className="block text-sm leading-relaxed">{o.address}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s.platform}`}
                  className="flex size-10 items-center justify-center rounded-full border border-line bg-white text-brand-700 transition hover:border-brand-300 hover:bg-brand-600 hover:text-white"
                >
                  <LinkedInIcon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Oversized wordmark (DAQ-style), tinted, purely decorative */}
        <svg aria-hidden="true" focusable="false" viewBox="0 0 1200 150" className="pointer-events-none -mb-1 block w-full select-none">
          <text x="0" y="132" textLength="1200" lengthAdjust="spacingAndGlyphs" className="fill-brand-100/80 font-heading text-[160px] font-extrabold">
            Enabled Analytics
          </text>
        </svg>
      </div>

      <div className="relative border-t border-line bg-white">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-sm text-ink-subtle sm:flex-row">
          <p>
            © 2026 {site.copyright}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-brand-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-700">
              Terms
            </Link>
            <a href="#top" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-ink transition hover:border-brand-200 hover:text-brand-700">
              Top <ArrowUp aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
