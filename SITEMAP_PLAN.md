# Sitemap Plan

Source site: https://www.enabledanalytics.com (Wix; 22 pages plus 4 blog posts crawled on 2026-10-27).

## New site routes

| Route | Purpose | Source pages |
|---|---|---|
| `/` | Home | `/` |
| `/about` | Story, stats, culture, the Four E's, leadership teaser | `/about-us` |
| `/team` | Co-Founders + Executive Team | `/about-us` (Leadership) |
| `/services` | All solutions + Salesforce practice areas, plus engagement models | `/practice-area` + home "Level up" section |
| `/services/[slug]` ×11 | Detail page per service | `/coe-teams`, `/coeenablement`, `/org-assessment`, `/data-analytics`, `/sales-cloud`, `/service-cloud`, `/marketing-cloud`, `/account-engagement`, `/experience-cloud`, `/cpq`, `/field-service-lightning` |
| `/products` | Discover Cloud product | `/products` |
| `/industries` | Industries served | `/industry` |
| `/projects` | Client engagements (filterable, paginated) + client logo wall | Home testimonials + "Our clients" |
| `/projects/[slug]` ×10 | Engagement detail | Home testimonials |
| `/blog` | Insights (filterable, paginated) | `/blogs` |
| `/blog/[slug]` ×4 | MDX posts | `/post/*` |
| `/testimonials` | All client testimonials | Home |
| `/faq` | FAQ + FAQPage JSON-LD | Answers taken from site copy |
| `/careers` | Culture, perks, hiring steps, open roles, apply form | `/careers`, `/apply-now` |
| `/contact` | Contact form, offices, map | `/contact` + footer |
| `/get-a-quote` | Multi-step project request | **New** (uses service list) |
| `/privacy` | Privacy policy | `/privacy-policy` |
| `/terms` | Terms of use | **New**, a placeholder awaiting legal copy |
| `/styleguide` | Component library (noindex) | n/a |
| 404 | Not found | n/a |

## Extra pages added for this business type
- **/get-a-quote**: consultancies convert through project-scoping forms.
- **/projects**: there are no case studies on the source site, so each engagement page is built from a real testimonial (industry + role + quote), with a clearly marked placeholder for challenge/solution/results.
- **/faq**: written questions answered only with site copy.
- **/terms**: legally expected; placeholder content.

## Redirects (preserve SEO from the old URLs)
`/about-us → /about`, `/blogs → /blog`, `/post/:slug → /blog/:slug`, `/practice-area → /services`, `/industry → /industries`, `/privacy-policy → /privacy`, `/apply-now → /careers#apply`, `/coeenablement → /services/coe-enablement`, `/field-service-lightning → /services/field-service`, and `/<service> → /services/<service>` for every other service page. `/home-beta` (a duplicate of home) redirects to `/`.

## Navigation
- **Header:** Solutions ▾ (4 solutions + Discover Cloud) · Practice Areas ▾ (7 clouds) · Projects · About ▾ (About, Team, Careers, Testimonials) · Insights · [Search ⌘K] · **Get a Quote** CTA
- **Footer:** Solutions · Practice Areas · Company · Resources columns + contact block + LinkedIn + newsletter
