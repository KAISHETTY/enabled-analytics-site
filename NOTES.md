# Decisions & Notes

## Inputs
- The prompt's `[YOUR COMPANY URL]` placeholder was not filled in, so **https://www.enabledanalytics.com/** (shared earlier in the same conversation as "my company website") was used.
- Inspiration: daqconsulting.com, to-top.ch/en, absyz.com. Only layout ideas were taken (see DESIGN_ANALYSIS.md).

## Brand & design
- **Primary color `#246696`** was sampled from the logo (most common non-neutral pixel). The site CSS uses `#2B5672`, which is close. The logo blue was chosen because the logo is the brand source of truth, and it gives 6.3:1 contrast on white (AA).
- The logo's red "a" is **not** used as a UI color (one-accent rule). Amber `#FFAE16` is defined as a `highlight` token but unused (no star ratings exist on the source site).
- **Light theme only.** shadcn's generated `dark:` classes were stripped from `components/ui`, `next-themes` was uninstalled, the `dark` variant is bound to a class that is never applied, and `color-scheme: light` is set.
- The dark `contact-bg.jpg` texture from the source was not used.
- The animated GIF icons on the source site were replaced by lucide-react icons (performance + crisp at all sizes).
- Fonts: Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (index labels), all through `next/font`.

## Content editing
- Copy is verbatim except for **obvious typo/grammar fixes**: "Ur three-step" → "Our three-step", "know the product" → "knows the product", "very please to work the team" → "very pleased to work with the team", "with with", "earlier then", "less than 60% lesser costs" → "at up to 60% lower costs", "that to at" → "and at", "pre-build" → "pre-built", "Over all" → "Overall", and the duplicated clause in the About intro ("we have helped our methodologies allow…") was rewritten into one sentence with the same meaning.
- The Experience Cloud page on the source repeats Service Cloud headings ("Custom Service Cloud Implementation"). This was corrected to "Experience Cloud" in context.
- **Blog categories** were assigned by topic for the filter UI (the source only has "All Posts"). The labels are editorial, not facts.
- **FAQ questions** were written for this site. **Answers use only site copy.**
- **Projects** come from the 10 real testimonials (industry + role + quote). No client names, metrics or details were invented, and each has a "Content needed" block.
- **Engagement-model cards** (`PricingCard`) show no prices because none are published. Features come from site copy.

## Technical
- Next.js **16.4** (App Router, Turbopack, `cacheComponents: true` from the scaffold), React 19.3, Tailwind v4, shadcn/ui (radix-nova), Framer Motion 14, lucide-react 1.x.
- lucide-react 1.x has no brand icons, so LinkedIn uses an inline SVG.
- shadcn's generator now imports `cn` from the `cn` package (shadcn's own class-merge library, github.com/shadcn-ui/cn). It was verified and kept.
- All content is statically imported (JSON + MDX with `export const meta`), so every page prerenders. There is no filesystem I/O at request time.
- Portfolio/blog filtering and pagination run client-side (small data sets), which keeps pages static.
- Forms post to route handlers that validate with the same zod schema used on the client, include a honeypot, and forward to `FORMS_WEBHOOK_URL` when it is set. Otherwise they log on the server and return success.
- Analytics loads **only** after cookie consent, and only if `NEXT_PUBLIC_GA_ID` is set.
- **i18n skipped**: the source site is English-only.
- **WhatsApp** is skipped unless `NEXT_PUBLIC_WHATSAPP_NUMBER` is set (no number is published).
- The Google Maps embed uses the keyless `maps.google.com/maps?q=…&output=embed` URL and is lazy-loaded.
- Old Wix URLs are 301-redirected in `next.config.ts`.
