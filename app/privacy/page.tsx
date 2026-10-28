import type { Metadata } from "next"
import { privacy } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Enabled Analytics collects, uses, shares and protects your information.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title={privacy.title} lead={`Effective Date: ${privacy.effectiveDate}`} crumbs={[{ label: "Privacy Policy" }]} />
      <article className="container-page mx-auto max-w-3xl pb-24">
        <div className="prose-ea">
          {privacy.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4">
                  {p}
                </p>
              ))}
              {"list" in s && s.list && (
                <ul className="mt-4">
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </>
  )
}
