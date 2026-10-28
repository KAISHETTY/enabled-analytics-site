import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google"
import { site } from "@/lib/content"
import { siteUrl } from "@/lib/site-config"
import { CONSENT_KEY } from "@/lib/analytics"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { SearchLauncher } from "@/components/layout/search"
import { Assistant } from "@/components/layout/assistant"
import { ConsentAndAnalytics } from "@/components/layout/consent-and-analytics"
import { MotionProvider } from "@/components/ea/reveal"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { IntroCurtain, introBootScript } from "@/components/motion/intro-curtain"
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/json-ld"
import { LazyToaster } from "@/components/layout/lazy-toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
  display: "swap",
})
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["500"],
  display: "swap",
})
const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Salesforce Consulting & Implementation Partner`,
    template: `%s | ${site.name}`,
  },
  description:
    "Enabled Analytics is a Salesforce partner offering CoE teams, org assessments, data analytics and implementations across Sales, Service, Marketing and Experience Cloud, CPQ and Field Service.",
  applicationName: site.name,
  keywords: [
    "Salesforce partner",
    "Salesforce consulting",
    "Salesforce implementation",
    "Sales Cloud",
    "Service Cloud",
    "Marketing Cloud",
    "CPQ",
    "Field Service",
    "Data Cloud",
    "Center of Excellence",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: siteUrl,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#cfe9fe",
  colorScheme: "light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Hides the cookie banner before first paint when a choice was already made. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var c=localStorage.getItem("${CONSENT_KEY}");if(c)document.documentElement.dataset.consent=c}catch(e){}`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col" id="top">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-glow transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll />
          <>
            <IntroCurtain />
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <Assistant />
            <ConsentAndAnalytics />
            <SearchLauncher />
          </>
        </MotionProvider>
        <LazyToaster position="top-center" richColors />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  )
}
