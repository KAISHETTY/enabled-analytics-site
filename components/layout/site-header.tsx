"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog as D, NavigationMenu as NM } from "radix-ui"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { mainNav, type NavFeature, type NavItem } from "@/lib/site-config"
import { site } from "@/lib/content"
import { ArrowIcon, Button } from "@/components/ea/button"
import { SearchButton } from "@/components/layout/search"
import { Cloud } from "@/components/motion/sky-scene"
import { HeroMascot } from "@/components/story/hero-mascot"

function isActive(pathname: string, item: NavItem) {
  if (item.href) return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  return item.children?.some((c) => pathname.startsWith(c.href)) ?? false
}

/** Stacked-alpha longhorn clip; menus start straight in his waving loop. */
const MASCOT = { src: "/videos/longhorn-hero.mp4", srcSmall: "/videos/longhorn-hero-sm.mp4", poster: "/images/mascot/longhorn-hero-poster.webp", width: 734, height: 600, loopStart: 14.708 }

const DEFAULT_FEATURE: NavFeature = { kicker: "Contact Us", title: "Talk to a Salesforce expert", cta: "Get in touch", href: "/contact" }

/** The longhorn waving his flag from a cloud, straight into his loop. */
function WavingLonghorn({ className }: { className?: string }) {
  return (
    <HeroMascot
      src={MASCOT.src}
      srcSmall={MASCOT.srcSmall}
      poster={MASCOT.poster}
      width={MASCOT.width}
      height={MASCOT.height}
      loopStart={MASCOT.loopStart}
      startAt={MASCOT.loopStart}
      waitForIntro={false}
      foreground={
        <div aria-hidden="true" className="absolute -bottom-[6%] left-[6%] w-[88%] origin-bottom scale-y-[0.32]">
          <Cloud className="w-full" />
        </div>
      }
      className={className}
    />
  )
}

/** Sky card beside each mega menu: the longhorn waves his flag from a cloud above the menu's call to action. */
function FeaturePanel({ feature }: { feature: NavFeature }) {
  const cls = "group/fp relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-brand-100 via-brand-50 to-white p-5 ring-1 ring-brand-100"
  const body = (
    <>
      <Cloud className="absolute top-3 -right-6 w-24 opacity-90 transition-transform duration-[2s] group-hover/fp:-translate-x-3" />
      <Cloud className="absolute top-16 -left-8 w-20 opacity-70 transition-transform duration-[2s] group-hover/fp:translate-x-3" />
      <span className="relative font-mono text-[0.6875rem] tracking-[0.14em] text-brand-600 uppercase">{feature.kicker}</span>
      <span className="relative mt-2 font-heading text-xl leading-tight font-bold text-ink">{feature.title}</span>
      {feature.cta && (
        <span className="relative mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          {feature.cta} <ArrowIcon className="transition-transform group-hover/fp:translate-x-0.5" />
        </span>
      )}
      <WavingLonghorn className="relative -mx-2 mt-auto -mb-3" />
    </>
  )
  // Without an `href` the card is just the message and the waving longhorn.
  return feature.href ? (
    <NM.Link asChild>
      <Link href={feature.href} className={cls}>
        {body}
      </Link>
    </NM.Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <NM.Root className="relative hidden lg:block" delayDuration={80}>
      <NM.List className="nav-stagger flex items-center gap-1">
        {mainNav.map((item) => {
          const active = isActive(pathname, item)
          const base = cn(
            "inline-flex h-10 items-center gap-1 rounded-full px-3 text-[0.9rem] font-medium whitespace-nowrap transition-colors xl:px-4 hover:bg-brand-50 hover:text-brand-700 data-[state=open]:bg-brand-50 data-[state=open]:text-brand-700",
            active ? "text-brand-700" : "text-ink"
          )
          if (!item.children) {
            return (
              <NM.Item key={item.label}>
                <NM.Link asChild active={active}>
                  <Link href={item.href!} className={base} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </Link>
                </NM.Link>
              </NM.Item>
            )
          }
          const wide = item.children.length > 6
          const feature = item.feature ?? DEFAULT_FEATURE
          return (
            <NM.Item key={item.label}>
              <NM.Trigger className={cn(base, "group")}>
                {item.label}
                <ChevronDown aria-hidden="true" className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NM.Trigger>
              <NM.Content className="absolute top-full left-1/2 mt-3 -translate-x-1/2 data-[motion=from-end]:animate-in data-[motion=from-end]:fade-in data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-1">
                <div className={cn("grid gap-3 rounded-[1.5rem] border border-line bg-white p-3 shadow-lift", wide ? "w-[760px] grid-cols-[1fr_250px]" : "w-[540px] grid-cols-[1fr_240px]")}>
                  <div>
                    <p className="eyebrow px-3 pt-2 pb-2">{item.label}</p>
                    <ul className={cn("grid gap-0.5", wide && "grid-cols-2")}>
                      {item.children.map((c) => (
                        <li key={c.href + c.label}>
                          <NM.Link asChild active={pathname === c.href}>
                            <Link href={c.href} className="group/nl flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:bg-brand-50 data-[active]:bg-brand-50 data-[active]:text-brand-700">
                              {c.label}
                              <ArrowIcon className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover/nl:translate-x-0 group-hover/nl:opacity-100" />
                            </Link>
                          </NM.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <FeaturePanel feature={feature} />
                </div>
              </NM.Content>
            </NM.Item>
          )
        })}
      </NM.List>
    </NM.Root>
  )
}

/** Phone menu's sky card: the longhorn waves beside the open section's call to action. */
function MobileFeature({ feature }: { feature: NavFeature }) {
  const Card = feature.href ? Link : "div"
  return (
    <Card href={feature.href ?? ""} className="relative mx-1 mt-4 flex items-end gap-2 overflow-hidden rounded-2xl bg-gradient-to-b from-brand-100 via-brand-50 to-white p-4 pb-0 ring-1 ring-brand-100">
      <Cloud className="absolute top-2 -right-4 w-20 animate-drift-card opacity-90 motion-reduce:animate-none" />
      <span key={feature.title} className="relative flex-1 animate-in pb-5 duration-500 fade-in slide-in-from-left-2">
        <span className="block font-mono text-[0.6875rem] tracking-[0.14em] text-brand-600 uppercase">{feature.kicker}</span>
        <span className="mt-1.5 block font-heading text-lg leading-tight font-bold text-ink">{feature.title}</span>
        {feature.cta && (
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
            {feature.cta} <ArrowIcon className="animate-nudge motion-reduce:animate-none" />
          </span>
        )}
      </span>
      <WavingLonghorn className="-mr-2 w-[46%] shrink-0" />
    </Card>
  )
}

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = React.useState(false)
  const [expanded, setExpanded] = React.useState<string | null>(null)

  return (
    <D.Root open={open} onOpenChange={setOpen}>
      <D.Trigger asChild>
        <button type="button" aria-label="Open menu" className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden">
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </D.Trigger>
      <D.Portal>
        <D.Overlay className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in lg:hidden" />
        <D.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-lift data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right lg:hidden">
          <div className="flex h-18 items-center justify-between border-b border-line px-5">
            <D.Title className="sr-only">Main menu</D.Title>
            <D.Description className="sr-only">Site navigation</D.Description>
            <Image src="/images/brand/logo.png" alt={site.name} width={160} height={36} className="h-8 w-auto" />
            <D.Close aria-label="Close menu" className="inline-flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <X className="size-5" aria-hidden="true" />
            </D.Close>
          </div>
          <nav
            aria-label="Mobile"
            className="flex-1 overflow-y-auto px-3 py-4"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setOpen(false)
            }}
          >
            <ul className="flex flex-col">
              <li>
                <Link href="/" className="flex h-12 items-center rounded-xl px-3 text-lg font-semibold text-ink hover:bg-brand-50">
                  Home
                </Link>
              </li>
              {mainNav.map((item) =>
                item.children ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                      className="flex h-12 w-full items-center justify-between rounded-xl px-3 text-lg font-semibold text-ink hover:bg-brand-50"
                    >
                      {item.label}
                      <ChevronDown aria-hidden="true" className={cn("size-5 transition-transform", expanded === item.label && "rotate-180")} />
                    </button>
                    {expanded === item.label && (
                      <ul className="mb-2 ml-3 border-l border-brand-100 pl-3">
                        {item.children.map((c) => (
                          <li key={c.href + c.label}>
                            <Link href={c.href} aria-current={pathname === c.href ? "page" : undefined} className="flex min-h-11 items-center rounded-lg px-3 text-ink-muted hover:bg-brand-50 hover:text-brand-700 aria-[current=page]:text-brand-700">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link href={item.href!} aria-current={isActive(pathname, item) ? "page" : undefined} className="flex h-12 items-center rounded-xl px-3 text-lg font-semibold text-ink hover:bg-brand-50 aria-[current=page]:text-brand-700">
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <MobileFeature feature={mainNav.find((i) => i.label === expanded)?.feature ?? DEFAULT_FEATURE} />
          </nav>
          <div className="flex flex-col gap-3 border-t border-line p-5" onClick={() => setOpen(false)}>
            <Button href="/contact" size="lg">
              Contact Us
              <ArrowIcon />
            </Button>
            <Button href={`tel:${site.phoneHref}`} variant="secondary" size="lg">
              <Phone aria-hidden="true" />
              {site.phone}
            </Button>
          </div>
        </D.Content>
      </D.Portal>
    </D.Root>
  )
}

/** Sticky header: transparent over the hero, frosted white once the page scrolls. */
export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)

  const [hidden, setHidden] = React.useState(false)

  React.useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      // ABSYZ sticky_hide_on_scroll: tuck away while reading down, return on scroll up.
      setHidden(y > 480 && y > last + 4 ? true : y < last - 4 ? false : (h) => h)
      last = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "border-b border-white/60 bg-white/75 shadow-soft backdrop-blur-xl" : "bg-transparent",
        hidden && "-translate-y-full"
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4 md:h-20">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0 animate-in rounded-lg duration-700 fade-in fill-mode-both">
          <Image src="/images/brand/logo.png" alt={site.name} width={1248} height={276} priority sizes="200px" className="h-8 w-auto md:h-9" />
        </Link>
        <DesktopNav pathname={pathname} />
        <div className="nav-stagger flex items-center gap-2">
          <SearchButton className="hidden sm:inline-flex" />
          <SearchButton compact className="sm:hidden" />
          <Button href="/contact" size="sm" className="hidden h-10 px-5 md:inline-flex">
            Contact Us
            <ArrowIcon />
          </Button>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  )
}
