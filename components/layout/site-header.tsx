"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog as D, NavigationMenu as NM } from "radix-ui"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { mainNav, type NavItem } from "@/lib/site-config"
import { site } from "@/lib/content"
import { ArrowIcon, Button } from "@/components/ea/button"
import { SearchButton } from "@/components/layout/search"

function isActive(pathname: string, item: NavItem) {
  if (item.href) return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  return item.children?.some((c) => pathname.startsWith(c.href)) ?? false
}

/** Highlight card inside each mega menu: Agentforce, or the Org Health Check lead magnet. */
function FeaturePanel({ agent }: { agent: boolean }) {
  return (
    <NM.Link asChild>
      <Link
        href={agent ? "/agentforce" : "/health-check"}
        className={cn(
          "group/fp relative flex flex-col justify-end overflow-hidden rounded-2xl p-5 text-white",
          agent ? "bg-gradient-to-br from-brand-600 via-brand-500 to-agent-500" : "bg-gradient-to-br from-brand-500 to-brand-700"
        )}
      >
        <span aria-hidden="true" className="absolute -top-8 -right-8 size-32 rounded-full bg-white/15 blur-xl transition-transform duration-700 group-hover/fp:scale-150" />
        <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-white/80 uppercase">{agent ? "New · Agentforce" : "Free · 12 questions"}</span>
        <span className="mt-2 font-heading text-xl leading-tight font-bold">{agent ? "Put AI agents to work in your org" : "Get your Org Health Score"}</span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
          {agent ? "Explore the practice" : "Start the check"} <ArrowIcon />
        </span>
      </Link>
    </NM.Link>
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
          const wide = item.children.length > 5
          return (
            <NM.Item key={item.label}>
              <NM.Trigger className={cn(base, "group")}>
                {item.label}
                <ChevronDown aria-hidden="true" className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NM.Trigger>
              <NM.Content className="absolute top-full left-0 mt-3 data-[motion=from-end]:animate-in data-[motion=from-end]:fade-in data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-1">
                <div className={cn("grid rounded-[1.5rem] border border-line bg-white/95 p-3 shadow-lift backdrop-blur-xl", wide ? "w-[880px] grid-cols-[1fr_260px] gap-3" : "w-[640px] grid-cols-[1fr_220px] gap-3")}>
                  <div>
                  <p className="eyebrow px-3 pt-2 pb-3">{item.label}</p>
                  <ul className={cn("grid gap-1", wide && "grid-cols-2")}>
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <NM.Link asChild active={pathname === c.href}>
                          <Link href={c.href} className="group/nl block rounded-xl p-3 transition-colors hover:bg-brand-50 focus-visible:bg-brand-50 data-[active]:bg-brand-50">
                            <span className="flex items-center gap-1.5 font-semibold text-ink group-hover/nl:text-brand-700">
                              {c.label}
                              <ArrowIcon className="size-3.5 opacity-0 transition-all group-hover/nl:translate-x-0.5 group-hover/nl:opacity-100" />
                            </span>
                            {c.description && <span className="mt-1 line-clamp-2 block text-sm leading-snug text-ink-subtle">{c.description}</span>}
                          </Link>
                        </NM.Link>
                      </li>
                    ))}
                  </ul>
                  </div>
                  <FeaturePanel agent={item.label !== "Company"} />
                </div>
              </NM.Content>
            </NM.Item>
          )
        })}
      </NM.List>
    </NM.Root>
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
                          <li key={c.href}>
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
              <li>
                <Link href="/contact" className="flex h-12 items-center rounded-xl px-3 text-lg font-semibold text-ink hover:bg-brand-50">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-3 border-t border-line p-5" onClick={() => setOpen(false)}>
            <Button href="/get-a-quote" size="lg">
              Get a Quote
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
          <Button href="/get-a-quote" size="sm" className="hidden h-10 px-5 md:inline-flex">
            Get a Quote
            <ArrowIcon />
          </Button>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  )
}
