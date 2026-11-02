import Image from "next/image"
import Link from "next/link"
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react"
import { site } from "@/lib/content"
import { LinkedInIcon } from "@/components/ea/primitives"

/** Footer reduced to contact details only (2026-10-30 feedback). */
export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[auto_1fr] md:gap-16 md:py-16">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label={`${site.name} home`} className="w-fit">
            <Image src="/images/brand/logo.png" alt={site.name} width={1248} height={276} sizes="200px" className="h-9 w-auto" />
          </Link>
          <ul className="space-y-3 text-[0.9375rem]">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 font-medium text-ink transition-colors hover:text-brand-700">
                <Mail aria-hidden="true" className="size-4 text-brand-600" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2.5 font-medium text-ink transition-colors hover:text-brand-700">
                <Phone aria-hidden="true" className="size-4 text-brand-600" />
                {site.phone}
              </a>
            </li>
          </ul>
          <div className="flex gap-2">
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

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Office addresses">
          {site.offices.map((o) => (
            <li key={o.label} className="flex gap-2.5">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span>
                <span className="block font-semibold text-ink">{o.label}</span>
                <address className="block text-sm leading-relaxed not-italic">{o.address}</address>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line bg-white">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-sm text-ink-subtle sm:flex-row">
          <p>© 2026 {site.copyright}</p>
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
