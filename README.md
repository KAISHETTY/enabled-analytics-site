# Enabled Analytics Website

Multi-page marketing site for Enabled Analytics, built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion and lucide-react. It uses a light theme only.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Checks:

```bash
npx tsc --noEmit
npm run lint
```

## Salesforce leads

Forms post to the site's own API routes, which validate with zod, drop honeypot bots, rate-limit, and then create the Lead server-side through Web-to-Lead. The visitor never sees the Org ID.

1. In Salesforce Setup, open **Web-to-Lead**, then **Edit**, and tick **Web-to-Lead Enabled**. Leave **Require reCAPTCHA Verification** off, because the site posts server-side.
2. Copy the Org ID from **Company Information** and set `SF_WEB_TO_LEAD_ORG_ID` in Netlify (Site configuration, then Environment variables), then redeploy.
3. Name, email, phone, company and Lead Source map to standard Lead fields. Everything else (the form name, subject and message, quote choices, health score and every answer, job position) goes into **Description**.
4. To test, set `SF_WEB_TO_LEAD_DEBUG_EMAIL` and Salesforce emails what it received. Remove it afterwards.

Web-to-Lead accepts up to 500 leads per day. Salesforce returns 200 even when it rejects a lead, so use the debug email when something doesn't arrive. Resume files are not uploaded; only the file name is recorded.

## Environment variables

Copy `.env.example` to `.env.local`. All variables are optional.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and JSON-LD (default `https://www.enabledanalytics.com`) |
| `SF_WEB_TO_LEAD_ORG_ID` | Salesforce Org ID. Every form (contact, quote, Org Health Check, newsletter, job application, assistant booking) creates a Lead through Web-to-Lead. See "Salesforce leads" below. |
| `SF_LEAD_SOURCE` | Lead Source value for website leads (default `Web`) |
| `SF_WEB_TO_LEAD_DEBUG_EMAIL` | Testing only: Salesforce emails a debug report for each submission |
| `FORMS_WEBHOOK_URL` | Optional extra copy of each submission as JSON (Zapier, Make, Slack). With neither this nor the Org ID set, submissions are logged on the server. |
| `NEWSLETTER_WEBHOOK_URL` | Newsletter signups (falls back to `FORMS_WEBHOOK_URL`) |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID. It loads only after the visitor accepts cookies. |
| `NEXT_PUBLIC_SF_EMBEDDED_ORG_ID` | Salesforce org ID (15/18 chars) of your Embedded Messaging deployment |
| `NEXT_PUBLIC_SF_EMBEDDED_DEPLOYMENT` | Embedded Service deployment API name (e.g. `EA_Agentforce_Web`) |
| `NEXT_PUBLIC_SF_EMBEDDED_SITE_URL` | The deployment's Experience/ESW site URL (`https://….my.site.com/ESW…`) |
| `NEXT_PUBLIC_SF_EMBEDDED_SCRT2_URL` | The SCRT2 URL (`https://….my.salesforce-scrt.com`) |

With all four Embedded Messaging variables set, the "Ask EA" assistant is replaced by your Salesforce **Agentforce Service Agent** (Messaging for In-App and Web). Without them, the built-in assistant answers from site content and books meetings through `/api/contact`.

## Editing content

- **All copy:** `content/site-content.json` (company info, services, team, testimonials, FAQs, careers, privacy).
- **Blog posts:** `content/blog/<slug>.mdx` with an `export const meta = {…}` block. Register a new post in `lib/blog.ts` **and** add its slug to `proxy.ts`.
- **Images:** `public/images/…`
- **Placeholders** that still need real content are listed in `MISSING_CONTENT.md` and render as dashed amber "Content needed" boxes.

## Project map

```
app/                 routes (each page.tsx), api/ form handlers, sitemap, robots, OG image
components/ea/       design-system components (see /styleguide)
components/forms/    contact, quote wizard, newsletter, apply
components/layout/   header, footer, search, cookie consent, floating contact
components/ui/       shadcn/ui primitives (dark variants stripped)
content/             site-content.json + MDX posts
lib/                 content accessors, schemas, nav config, analytics
proxy.ts             returns real 404s for unknown dynamic slugs
```

## Deploy to Netlify

1. In Netlify, choose **Add new site → Import an existing project → GitHub**, then pick this repository.
2. The build settings come from `netlify.toml`: `npm run build`, publish `.next`, Node 22. Netlify's Next.js runtime is applied automatically.
3. Under **Site configuration → Environment variables**, add `NEXT_PUBLIC_SITE_URL` (your Netlify or custom domain) plus any optional variables above, then redeploy.
4. Under **Domain management**, add `enabledanalytics.com` and follow the DNS steps.

## Deploy to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository. The framework preset is detected as **Next.js**, so leave the build settings at their defaults.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` (your production domain) plus any of the optional variables above.
4. Click **Deploy**.
5. Under **Settings → Domains**, add `enabledanalytics.com` and `www.enabledanalytics.com`, then update DNS at your registrar as Vercel instructs. The old Wix URLs are already 308-redirected (`next.config.ts`).
6. After launch, submit `https://www.enabledanalytics.com/sitemap.xml` in Google Search Console.

CLI alternative: `npm i -g vercel && vercel` (preview), then `vercel --prod`.
