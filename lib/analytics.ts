/** Analytics is opt-in: only active when NEXT_PUBLIC_GA_ID is set AND the visitor accepted cookies. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ""
export const CONSENT_KEY = "ea-cookie-consent"
export type Consent = "accepted" | "declined"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === "accepted" || v === "declined" ? v : null
  } catch {
    return null
  }
}

export function writeConsent(value: Consent) {
  document.documentElement.dataset.consent = value
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* storage unavailable (private mode); the banner will simply show again */
  }
  window.dispatchEvent(new CustomEvent("ea:consent", { detail: value }))
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !window.gtag) return
  window.gtag("event", name, params)
}
