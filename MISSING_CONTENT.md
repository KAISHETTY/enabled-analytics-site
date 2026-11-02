# Missing Content & Placeholders

Everything below needs input from Enabled Analytics before launch. Placeholders in the UI use the `<Placeholder>` component (dashed amber box labelled "Content needed"), so `grep -r "Placeholder" app components` finds every one.

## Missing from the source site
| # | Item | Where it shows | Notes |
|---|---|---|---|
| 1 | **Case-study metrics + client names** | `/case-studies/[slug]` | The 6 case studies (Challenge → Solution → Result) restate only what each published testimonial says. Add 2–3 **client-approved** numbers per story in `lib/case-studies.ts → metrics` and, with permission, the client name/logo. A "Content needed: result metrics" box shows until then. Numbers were deliberately not invented (e.g. "Lennox: 40% faster quotes" would need Lennox's approval). |
| 2 | **Testimonial author names / companies** | `/testimonials`, home carousel | Only role + industry are published, so the site shows those. |
| 3 | **Team bios and LinkedIn URLs** | `/team` | Only name, title and photo are published. |
| 4 | **Industry descriptions** | `/industries` | The source `/industry` page has Lorem Ipsum. Only the 5 industry names are real. |
| 5 | **Terms of Use** | `/terms` | No terms on the source site. Placeholder page. |
| 6 | **Job descriptions** for the 9 open roles | `/careers` | Only title + location are listed. |
| 7 | **Agentforce assistant deployment** | "Ask EA" assistant | The built-in assistant answers from site content and books meetings. To run a real Agentforce Service Agent, set the four `NEXT_PUBLIC_SF_EMBEDDED_*` variables from your Embedded Messaging deployment (see README). The site then loads Salesforce's widget instead. |
| 8 | **Social profiles** other than LinkedIn | Footer | Only LinkedIn is linked on the source site. |
| 9 | **Newsletter provider** | Footer signup, `/api/newsletter` | The source site has no newsletter. The API route validates and forwards to `NEWSLETTER_WEBHOOK_URL` if it is set. |
| 10 | **Email delivery for forms** | `/api/contact`, `/api/quote`, `/api/apply` | Leads go to Salesforce via Web-to-Lead once `SF_WEB_TO_LEAD_ORG_ID` is set (see README). Add Lead assignment/auto-response rules in the org for email notifications. |
| 11 | **Blog post authors** | `/blog/[slug]` | Wix lists the author as the username "sandeep499", so the site shows "Enabled Analytics". |
| 12 | **OG/social share image** | Metadata | Generated automatically (`opengraph-image.tsx`). Replace it with a brand-approved image if you have one. |
| 13 | **Resume upload storage** | `/careers` apply form | File upload is validated client-side, but storing the file needs a provider (S3/Blob). Currently only metadata is sent. |
| 14 | **Higher-resolution photos** | Service, careers and about images | The source images are ~420–540px wide. |
| 15 | **Data Cloud and Revenue Cloud detail pages** | `/services` | Listed on the source "Practice Areas" page with one sentence each. Revenue Cloud links to CPQ, and Data Cloud is covered by Data Analytics. |

## New content written for this site: please review before launch
| Item | Where | Notes |
|---|---|---|
| **Agentforce practice copy** | `/agentforce`, `lib/agentforce.ts` | Capabilities, 6-step process and AI Readiness Assessment deliverables are new copy. No outcome numbers are claimed. Confirm scope, duration and price model of the assessment. |
| **Agentforce demos** | `/agentforce`, home | Three scripted, clearly labelled *illustrative* conversations (Service, SDR, Field Service). Not customer data. |
| **Org Health Check** | `/health-check`, `lib/health-check.ts` | 12 questions, scoring bands and PDF wording are new. **"Expert review within 48 hours" is a service commitment** someone must own. Submissions become Salesforce Leads (score + answers in Description). |
| **Journey milestones** | About "Our history" | Founding year and Discover Cloud launch date are unknown, so only "April 2025" (Ventas merger) has a date. Add years in `lib/trust.ts`. |
| **Salesforce partner tier** | Trust strip, hero eyebrow, journey | Changed to **Summit Partner** on your instruction (2026-10-28). The Apr 2025 press release still says "Crest", so the badge has no source link. Add your Salesforce Partner/AppExchange profile URL in `lib/trust.ts` to link it. |
| **Certifications** | Home + About stats, trust strip, FAQ, map counters | Updated to **500+** on your instruction (the old site showed 200+ and 300+). |
| **New team photos** | `/team`, Executive Team | Lisa Malmanger (Sr. Principal Consultant) = the first photo you sent (dark hair, glasses), and Kim Escobar (Salesforce Principal Consultant) = the second. Swap the files in `public/images/team/` if that's reversed. |
| **Map locations** | "How we are growing" map | Lewisville (HQ), Hyderabad, Singapore (footer addresses), Dubai (site copy, no address) and Australia (press release, no city, so the pin sits at the country's centre). Add exact Dubai/Australia addresses in `lib/locations.ts`. |
| **Trust strip** | Home, Agentforce, Case Studies, Health Check | Verified from the 7 Apr 2025 PR Newswire release: Crest Consulting Partner, ISV Partner, 4.95/5 on AppExchange. **Still needed:** the Discover Cloud AppExchange listing URL, the Salesforce Partner/Trailblazer profile URL (for the certification count), Clutch/G2 profile URLs and ratings (hidden until added), and official Salesforce partner badge artwork (text badges are used now). |
| **Dreamforce feature** | Salesforce Expertise | Session "Deploy Military Planning Tactics for Salesforce Success" (Dreamforce 2026, Trailblazer Community series, 17:15) by Lisa Malmanger, as stated by you. The thumbnail is served from Salesforce+. Add Lisa's title if you want it shown. |

## Homepage & menu restructure (2026-10-30 feedback): new copy to review
| Item | Where | Notes |
|---|---|---|
| **Hero statement** | Home intro | "Enabled Analytics helps commercial and public sector organizations implement, support and scale Salesforce, with certified experts who get it right the first time." This is new copy written to the brief. |
| **Sector cards** | Home, `/solutions/*` | The Public Sector copy is condensed from the four Grantmaking case study PDFs. Commercial reuses the site's segment and industry copy. Industry descriptions are still missing (the source page was Lorem Ipsum). |
| **Core services** | Home, `/services`, `/services/implementation`, `/support`, `/staff-augmentation` | Each summary line is new. Page bodies reuse existing copy (CoE Teams, Org Assessment, engagement models, "Starting fresh"/"Established org" points). Confirm the scope of each service. |
| **Featured case studies** | Home "Client results" | Manufacturing implementation (Commercial) and State Developmental Disabilities Council (Public Sector). Swap them in `app/page.tsx → FEATURED` if others are preferred. |
| **Public Sector case studies** | `/case-studies` | Four studies from the PDFs. They have no numeric results, so the result-metrics placeholder still shows on each. |
| **Removed for now** | | Get a Quote, Free Org Health Check, Industries and blog promotion. `/get-a-quote`, `/health-check` and `/industries` redirect temporarily (pages kept in the repo). Client/project totals were removed site-wide (home, about, map, FAQ, social image). |
| **Contact form** | Contact, home journey, Agentforce, assistant | One form: name, work email, company, service interest (8 choices) and a short description. The journey path and service interests go to the Salesforce Lead's Description. |

## Menu & deck update (2026-11-02 feedback + Salesforce Overview v1.0 deck): needs your input
| Item | Where | Notes |
|---|---|---|
| **Telecom page copy** | `/solutions/telecom`, home Telecom card | The five outcomes come from the deck's Telecom column. The one-line explanations under each, and the technology list, are new copy. Please confirm. Only one telecom case study exists (Communications sales team). |
| **Accelerators** | `/accelerators` | Named from the deck: Salesforce Starter Kit, Conference Room Pilots, Integration Playbook, Data Migration Playbook, the industrialized Data Cloud framework (Thinkubator) and the Review-Reduce-Reuse model. The descriptions are new copy. Add any other accelerators ("TBD" in the feedback) to `lib/overview.ts → accelerators`. |
| **"7 detailed Agents"** | `/agentforce` | The feedback mentions seven AI agent stories. The site has three (Service, Sales Development, Field Service). Send the other four to add them. |
| **JTC case study** | `/case-studies/jtc-public-sector-digital-transformation` | Built from the deck's success story, and named because the deck names JTC and KPMG. Confirm the client has approved being named publicly. |
| **Case-study result metrics** | Every case study | The "Content needed: result metrics" box was removed from the public pages. Add approved numbers in `lib/case-studies.ts → metrics` and they appear as tiles. |
| **Client logo sectors** | `/clients` filter | Public Sector: Texas Veterans Commission, Texas HHS, Austin ISD, CareerSource Florida. Telecom: Network Connections, Skywire, Meriplex, Tessco, NEC. All others are Commercial. Edit `sector` in `content/site-content.json → clients`. The deck lists more clients (e.g. JTC, Golds Gym, Rocket Lab, Virgin Australia, City of Dallas) with no logo files yet. |
| **Deck stats not shown** | | 450+ projects and 120+ certified professionals stay off the site, per "no project or client totals". 4.96 average CSAT (deck) vs 4.95/5 AppExchange rating (site): confirm which to show. |

## Inconsistencies on the source site (please confirm the correct values)
| Item | Values found |
|---|---|
| Salesforce certifications | **200+** (home) vs **300+** (about). Each page shows its own value. |
| Projects | **150+** (home) vs **150** (about). |
| Offices | Footer: Lewisville TX · Hyderabad (Nanakramguda) · Singapore. Home benefits text: "Dallas, USA, Dubai, UAE & Hyderabad, India". Contact page: Hyderabad (Dallas Centre, Raidurg). All are shown where they appear. |
| Privacy policy | The original says "privacy practices for **Fusion** and our website; #" (template leftover), so the site uses "Enabled Analytics". Template-instruction paragraphs ("Notification of Changes" asking you to "specify how you will notify consumers", "Other Provisions as Required by Law") were removed, as were mentions of credit-card data and shipping orders. **Have legal review the policy.** |
| Home "Pioneering HR Solutions" | Lorem Ipsum on the source, so it is omitted. |
| Practice Areas, Sales Cloud blurb | Contains "What is Fusion?" (template leftover), which was removed. |
| Blog post "Choosing Between Salesforce Managed Services vs In-house Teams" | Ends after "Comprehensive Services:" with one paragraph, mid-list ("assist you with all of the following services:"). Imported as-is. The rest of the article may be missing. |
| Marketing Cloud stats | The source shows "35% Better conversions" and an "Increase in ROI" label with no number. The unnumbered stat is omitted. |
| Discover Cloud "NRF matrix" | Rendered as "NFR matrix" (non-functional requirements). Confirm. |
