"use client"

import * as React from "react"
import Link from "next/link"
import Script from "next/script"
import { Cookie } from "lucide-react"
import { CONSENT_KEY, GA_ID, readConsent, writeConsent, type Consent } from "@/lib/analytics"
import { Button } from "@/components/ea/button"

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => e.key === CONSENT_KEY && onChange()
  window.addEventListener("ea:consent", onChange)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener("ea:consent", onChange)
    window.removeEventListener("storage", onStorage)
  }
}

/** `"unknown"` during SSR/hydration so the banner never flashes for returning visitors. */
function useConsent(): Consent | null | "unknown" {
  return React.useSyncExternalStore(subscribe, readConsent, () => "unknown")
}

/** Cookie consent banner + Google Analytics, which only loads after "Accept" and when NEXT_PUBLIC_GA_ID is set. */
export function ConsentAndAnalytics() {
  const consent = useConsent()

  return (
    <>
      {consent === "accepted" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {/* Server-rendered so it paints with the page (not as a late LCP); hidden before
          paint for returning visitors by the inline script in layout.tsx + `.cookie-banner` CSS. */}
      {(consent === null || consent === "unknown") && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="cookie-banner fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 shadow-lift sm:left-6 sm:mx-0 md:p-6"
        >
          <div className="flex gap-4">
            <span aria-hidden="true" className="hidden size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 sm:flex">
              <Cookie className="size-5" />
            </span>
            <div>
              <p className="font-heading font-bold text-ink">We value your privacy</p>
              <p className="mt-1.5 text-sm leading-relaxed">
                We won&apos;t track your information when you visit our site unless you allow it. We use one small cookie to remember your choice.{" "}
                <Link href="/privacy" className="font-medium text-brand-700 underline underline-offset-2">
                  Privacy policy
                </Link>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" onClick={() => writeConsent("accepted")}>
                  Accept
                </Button>
                <Button size="sm" variant="secondary" onClick={() => writeConsent("declined")}>
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
