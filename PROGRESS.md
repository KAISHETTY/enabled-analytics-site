# Progress

| Phase | Status | Notes |
|---|---|---|
| 1. Research inspiration sites | ✅ Done | Raw HTML/CSS downloaded to `.research/`, outcome in `DESIGN_ANALYSIS.md` |
| 2. Extract company content | ✅ Done | 22 pages + 4 posts crawled, `content/site-content.json`, 4 MDX posts, 68 images in `public/images/`, `SITEMAP_PLAN.md`, `MISSING_CONTENT.md` |
| 3. Scaffold & design system | ✅ Done | Next.js 16.4 + Tailwind v4 tokens, shadcn/ui (light-only), global header/footer, component library, `/styleguide` |
| 4. Pages | ✅ Done | 21 page routes, 55 prerendered URLs (11 services, 10 projects, 4 posts) |
| 5. Features | ✅ Done | See table below |
| 6. QA & polish | ✅ Done | See QA log |

## Phase 5 features
| Feature | Status | Where |
|---|---|---|
| Contact form (react-hook-form + zod) + API route | ✅ | `components/forms/contact-form.tsx`, `app/api/contact` |
| Multi-step quote wizard | ✅ | `/get-a-quote` (preselects a service via `?service=`) |
| ⌘K / Ctrl+K site search | ✅ | `components/layout/search-dialog.tsx` (pages, services, posts, projects, people, FAQ) |
| Filterable + paginated portfolio & blog | ✅ | `components/ea/filterable-grid.tsx` (filter chips, search, pagination) |
| Animated stat counters | ✅ | `StatsCounter` (count-up on view, static under reduced motion) |
| Testimonial carousel | ✅ | Embla, autoplay that pauses on hover/interaction, dots + arrows |
| Image lightbox | ✅ | `Gallery` (About page), keyboard ←/→/Esc |
| FAQ + FAQPage JSON-LD | ✅ | `/faq` |
| Newsletter signup | ✅ | Footer → `/api/newsletter` (webhook) |
| Floating call/email (+WhatsApp) | ✅ | WhatsApp only when `NEXT_PUBLIC_WHATSAPP_NUMBER` is set (no number published) |
| Google Maps embed | ✅ | `/contact`, lazy-loaded, keyless |
| MDX blog | ✅ | `content/blog/*.mdx` with `export const meta` |
| Cookie consent | ✅ | Accept/Decline, stored in localStorage |
| Analytics via env | ✅ | GA4 loads only after consent and only if `NEXT_PUBLIC_GA_ID` is set |
| Job application form | ✅ (extra) | `/careers#apply` → `/api/apply` |
| i18n | ⏭️ Skipped | Source site is English-only |

## QA log (Phase 6)
- `tsc --noEmit`: 0 errors. `eslint`: 0 errors (2 informational React Compiler notices about react-hook-form `watch`). `next build`: success, 55 pages.
- Every route returns 200. Unknown `/services/*`, `/projects/*`, `/blog/*` slugs return a real **404** through `proxy.ts`. Old Wix URLs return 308 to their new routes.
- Form APIs: valid payloads → `{"ok":true}`, invalid → 422 with zod issues, honeypot → silent success, rate limit 5/min/IP.
- Dark-mode audit: no `dark:` variants, no `prefers-color-scheme`, no dark section backgrounds (only hover states, translucent overlays and styleguide swatches use dark tokens).
- Visual QA with headless Chrome (`scripts/shoot.sh`). Fixed the hero headline wrap at 1280px and the email address breaking mid-word at 768px. Headless Chrome clamps windows to about 490px wide, so "mobile" screenshots are about 490px, and Lighthouse mobile (412px emulation) covers small screens.
- Performance fixes: the cookie banner was the mobile LCP element (painted late after hydration), so it is now server-rendered and hidden pre-paint for returning visitors. Search is lazy-loaded with its index at `/search-index.json`. The newsletter form no longer ships zod/react-hook-form on every page. The toast host is lazy. Reveal animations use `LazyMotion` + `m`. The hero image entrance animation was removed.
- Accessibility fixes: carousel dots now have 24px tap targets, and the decorative footer wordmark is SVG.

### Lighthouse (local production build, this machine: CPU benchmark ≈ 660–820)
| Page | Desktop Perf / A11y / BP / SEO | Mobile Perf / A11y / BP / SEO |
|---|---|---|
| `/` | 98 / 100 / 100 / 100 | 61 / 100 / 100 / 100 |
| `/about` | 95 / 100 / 100 / 100 | n/a |
| `/services` | 98 / 100 / 100 / 100 | n/a |
| `/services/coe-enablement` | 97 / 100 / 100 / 100 | n/a |
| `/services/sales-cloud` | 99 / 97\* / 100 / 100 | 61 / 100 / 100 / 100 |
| `/products` | 99 / 100 / 100 / 100 | n/a |
| `/projects` | 99 / 100 / 100 / 100 | n/a |
| `/blog` | 97 / 100 / 100 / 100 | n/a |
| `/blog/7-reasons-…` | 98 / 100 / 100 / 100 | n/a |
| `/blog/try-salesforce-…` | n/a | 67 / 100 / 100 / 100 |
| `/faq` | 99 / 100 / 100 / 100 | n/a |
| `/careers` | 98 / 100 / 100 / 100 | n/a |
| `/contact` | 91 / 100 / 100 / 100 | 55 / 100† / 100 / 100 |
| `/get-a-quote` | 97 / 100 / 100 / 100 | n/a |

\* measured before the a11y fixes. † the 97 in the last mobile report came from a stale report file; the live page has the fixed markup.

**Open item: mobile Performance is below the 90 target locally.** Lighthouse's mobile preset applies 4× CPU throttling on top of this already-slow machine (benchmark ≈ 700 vs. ≈ 1500+ on typical dev hardware), which leaves LCP at about 5s and TBT at about 600–900ms, mostly React hydration plus Framer Motion. Re-measure on the deployed Vercel URL with PageSpeed Insights. If it is still under 90, the next lever is replacing the Framer-based scroll reveals with CSS + IntersectionObserver (the brief asked for Framer, so this was not done unasked).

## Phase 7: Motion & storytelling redesign (2026-10-28)
- **Research:** Playwright studied TO TOP, ABSYZ and DAQ (frame sequences, live `getAnimations()`, hover frames, inline GSAP source). Findings are in `MOTION_STUDY.md`.
- **Re-theme:** Salesforce sky palette (brand blue `#0176D3`, navy ink `#032D60`, a violet accent reserved for Agentforce) plus an Instrument Serif italic accent. Still light theme only.
- **Motion library (`components/motion/`):** Lenis smooth scroll, a server-rendered intro curtain that pauses entrance animations until it lifts, letter-split title reveal, the layered sky hero (scroll-scrubbed parallax like TO TOP's mountains), rotating badge, scroll-drawn trail path, DAQ word highlight, sticky stacking cards, pinned step story, horizontal pinned journey, typewriter, cursor-follow play button, scroll zoom, cloud seams and marks. All of it respects reduced motion.
- **Home:** rebuilt as a 13-chapter story.
- **New pages:** `/agentforce` (practice + AI Readiness Assessment + 3 animated use-case demos), `/health-check` (12-question quiz → animated score → email-gated PDF report → `/api/health-check`), `/case-studies` (+6 detail pages, Challenge → Solution → Result). `/projects` now 308-redirects to `/case-studies`.
- **Site-wide:** "Ask EA" assistant (quick-reply chips, answers from the site index, in-chat meeting booking, Agentforce Embedded Messaging hand-off by env), trust strip (verified via PR Newswire), Dreamforce 2026 feature, a header that hides on scroll-down, and mega menus with feature cards.
- **QA:** tsc 0 errors, eslint 0 errors, build OK. Playwright interactive run: quiz → score 50 → PDF downloaded (valid PDF, rendered), assistant 7 messages, 0 console/page errors, 0px horizontal overflow at 390px. Visual frames were reviewed at 1440 and 390 and fixed: mega-menu overflow, cloud layering over hero text, mobile fan cards, rotating badge text overlap, intro ordering, and nav wrapping.
