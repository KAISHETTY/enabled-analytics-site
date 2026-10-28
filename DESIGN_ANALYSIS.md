# Design Analysis

The inspiration sites were researched on 2026-10-27 by downloading their raw HTML and CSS (`.research/`), scanning the CSS for font-family, color, radius and shadow usage, and summarizing each page's section structure.
They are used for **layout, rhythm and component ideas only**. No text, images, logos or code were copied.

---

## 1. DAQ Consulting (daqconsulting.com)

| Aspect | Observation |
|---|---|
| Stack | Next.js + Tailwind (`_next/static` chunks, `--tw-*` vars) |
| Section order | Slim nav → typographic hero → numbered manifesto (1–4) → numbered process (01–04) + interactive architecture diagram → capability cards grid (index "02") → closing CTA band → footer |
| Navigation | Slim bar: wordmark left, 4 text links, a filled "Start Project" pill right, plus a skip-to-content link |
| Hero | **Type-only**: a huge multi-line display headline with a split-line reveal, a short sub-line and one button. No photos |
| Typography | Inter for UI and display, plus a monospace font (`--mono`) for small labels, indices and tags (9–13px, uppercase, tracked) |
| Color | Near-black on warm off-white (`#f4f3ee`, `#f8f8f7`, `#f0f0eb`), neutral greys, almost no hue |
| Radius / shadow | Mostly square (0–4px), pills for tags (9999px), deep soft shadows on floating panels |
| Cards | Numbered index ("01"), title, a short line, a row of pill tech tags, an "Explore →" link, the whole card clickable, and an asymmetric grid |
| Footer | Brand block + oversized wordmark, numbered link groups ("01 Services", "02 Company"), and a bottom bar with Privacy/Terms + "Top" |
| Motion | Line-by-line text reveal, scroll-linked word highlight, hover-inspector on diagram nodes, pulse dots |
| Notable | Section index labels (mono "02 —"), engineering-grade precision, generous whitespace |

## 2. TO TOP (to-top.ch/en)

| Aspect | Observation |
|---|---|
| Stack | Webflow |
| Section order | Nav → hero + photo strip → logo strip → "Why are you here?" (two numbered panels) → transitional CTA → 4 numbered concern cards → 5 numbered service cards → testimonials → team portraits + 4 feature columns → 3 resource cards → large CTA banner → contact (3 contact rows + form) → footer |
| Navigation | Logo left, links with **grouped dropdowns that have small icons**, a language toggle, and a contact pill right |
| Hero | Stacked bold multi-line headline, short tagline, **pill CTA**, a horizontal strip of landscape photos |
| Typography | Montserrat (UI/body) + a display serif (Bonvivant) for headings + a script accent font |
| Color | Deep green `#0d352e`/`#28524d`, sand `#e5d5a3`, **warm off-whites `#fbf6f2` / `#faf5f1` / `#f9f0e6`**, amber `#efb300` for buttons |
| Radius / shadow | **Large radii**: 30px (1.875rem) cards, 20px panels, 50px/1000px pills. Colored glow shadow on the CTA (`0 10px 20px amber/40%`) and soft warm drop shadows |
| Cards | Numbered (01–04) illustrated cards with a heading, a question line and "Learn more", fully clickable with a lift on hover |
| Testimonials | Large typographic quote marks + name/role, slider |
| Contact | Three icon rows (email / phone / booking) beside a form with success/error states |
| Footer | Logo + tagline, socials, nav columns, legal bar |
| Notable | Warm, human feel; numbered storytelling; decorative line-art dividers |

## 3. ABSYZ (absyz.com)

| Aspect | Observation |
|---|---|
| Stack | WordPress + Elementor |
| Section order | Sticky nav with mega menus → hero banner (rotating taglines) → client logo marquee ("Enduring Relationships") → awards block → 3 offering cards → "Why customers choose us": 6 animated stat tiles → testimonial carousel → insights/blog 3-up cards → white-paper promo banner → footer |
| Navigation | **Mega menu**: Services (3 grouped columns), Technologies (≈12 Salesforce clouds), Industries (6), Insights. Contact CTA at the far right |
| Hero | Wide banner, bold headline + rotating tagline lines |
| Typography | System sans stack, slate scale (`#1e293b`, `#334155`, `#94a3b8`, `#cbd5e1`) |
| Color | White + very light grey (`#f9fafb`), Salesforce-style blue (`#0195ff`, `#046bd2`) |
| Radius / shadow | Small radii (2–4px), flat with subtle borders |
| Stats | 6-tile grid, **count-up from 0** on scroll |
| Testimonials | Card carousel: round avatar, name, title + company, quote |
| Blog | 3-column cards: thumbnail, title, date, excerpt, "Read More →" |
| Footer | Contact block (email, phone, socials) + 4 link columns (Services, Technologies, Useful Links, Resources) + Contact button + scroll-to-top |
| Notable | **Closest business match**: it's a Salesforce partner whose information architecture (clouds, industries, stats, CSAT) maps directly onto Enabled Analytics |

---

## 4. Merged summary: what we borrow from where

| Element | Source | Adaptation |
|---|---|---|
| Information architecture, mega menu (Services / Salesforce clouds), stat tiles, logo marquee, testimonial cards, blog cards, 4-column footer | ABSYZ | Restyled with our tokens; mega menu becomes a 2-panel dropdown |
| Typographic hero, mono section-index labels ("01 —"), numbered capability cards with pill tags, oversized footer wordmark, "Top" control, line-reveal headline | DAQ | **Re-skinned light**: DAQ's dark panels become white cards on a soft-tint background |
| Large radii, pill buttons, warm off-white section tints, colored glow shadow on primary CTA, numbered process steps, contact rows beside form, big quote-mark testimonials | TO TOP | Glow uses the brand blue instead of amber; no photo-landscape theme |
| Brand color | enabledanalytics.com | `#246696`, the logo blue (the site CSS uses the close `#2B5672`). The amber `#FFAE16` is kept as a reserved token, never used as a second UI accent |

**Page rhythm (home):** Hero (white + subtle grid/gradient) → logo marquee (tint) → solutions cards (white) → Salesforce clouds grid (tint) → stats (white) → process/timeline (tint) → Discover Cloud product feature (white) → testimonials (tint) → insights/blog (white) → CTA banner (soft brand tint) → footer (off-white).

**Light-theme rule:** DAQ's and TO TOP's dark heroes and footers are explicitly **not** adopted. Every surface is white, off-white or a soft brand tint.

---

## 5. Unified design system

### Color tokens (CSS vars in `globals.css`, exposed to Tailwind)

| Token | Value | Use |
|---|---|---|
| `--background` | `#FFFFFF` | Page |
| `--surface` | `#F7F9FB` | Soft-tint sections (cool off-white) |
| `--surface-warm` | `#FBF8F4` | Occasional warm tint (TO TOP feel) |
| `--brand-50` | `#EEF5FA` | Tint backgrounds, badges |
| `--brand-100` | `#D7E7F3` | Borders on tinted elements |
| `--brand-200` | `#AFCFE7` | |
| `--brand-500` | `#2F78AD` | Hover, focus ring |
| `--brand-600` | `#246696` | **Primary**, sampled from the logo (buttons, links, accents) |
| `--brand-700` | `#1C5179` | Pressed, text-on-tint |
| `--ink` | `#0F1B26` | Headings (text only, never a background) |
| `--ink-muted` | `#4A5866` | Body text (AA on white and surface) |
| `--ink-subtle` | `#6B7785` | Captions (AA for ≥14px on white) |
| `--line` | `#E3E8EE` | Borders/dividers |
| `--highlight` | `#FFAE16` | Reserved (not used: no ratings on the source) |

### Typography (Google Fonts via `next/font`)
- **Display/headings:** *Plus Jakarta Sans* (600/700/800). Geometric and confident, bridging Inter (DAQ) and Montserrat (TO TOP).
- **Body/UI:** *Inter* (400/500/600).
- **Labels/indices:** *JetBrains Mono* (500), uppercase, `tracking-[0.14em]`, 12px (DAQ's mono index labels).
- Scale (fluid with `clamp`): display 3–4.75rem, h1 2.5–3.5rem, h2 2–2.75rem, h3 1.25–1.5rem, body 1–1.0625rem, small 0.875rem. Line-height 1.1 for display, 1.65 for body.

### Spacing & grid
- 4px base (Tailwind default). Section padding `py-20 md:py-28`. Container `max-w-7xl px-4 sm:px-6 lg:px-8` (16px gutter on phones).
- Grids: 12-column; cards 1 → 2 (md) → 3 (lg); stats 2 → 3 → 6.

### Radius
- `--radius-sm` 10px (inputs, badges), `--radius` 16px (small cards), `--radius-lg` 24px (cards, panels), `--radius-xl` 32px (feature panels, CTA banner), pills `9999px` (buttons, tags).

### Shadows
- `shadow-soft`: `0 1px 2px rgb(15 27 38 / .04), 0 4px 16px rgb(15 27 38 / .05)`
- `shadow-lift` (hover): `0 12px 32px -8px rgb(15 27 38 / .12)`
- `shadow-glow` (primary CTA): `0 10px 24px -6px rgb(43 86 114 / .40)`

### Motion
- Framer Motion `Reveal` (fade + 16px rise, 0.5s, ease `[0.22,1,0.36,1]`, staggered children), a line-split hero headline, count-up stats on view, an infinite logo marquee (CSS), and card hover lift (-4px) with an arrow nudge.
- `prefers-reduced-motion`: every animation is disabled, the marquee stops, and counters jump to their final value.

### Component list
Button (primary / secondary / ghost / link, sm/md/lg, pill), Card, Badge, SectionHeading (mono index + eyebrow + title + lead), Hero (variants: `home` typographic, `page` compact with breadcrumb, `split` with image), FeatureGrid, StatsCounter, TestimonialSlider, LogoMarquee, FAQAccordion, CTABanner, ContactForm, QuoteWizard, TeamCard, PricingCard, Timeline, Gallery + Lightbox, SearchDialog (⌘K), NewsletterForm, CookieBanner, FloatingContact, Breadcrumbs, Pagination, FilterBar.
