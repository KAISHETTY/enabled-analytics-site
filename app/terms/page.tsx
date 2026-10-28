import type { Metadata } from "next"
import { site } from "@/lib/content"
import { PageHero } from "@/components/ea/hero"
import { Placeholder } from "@/components/ea/primitives"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Enabled Analytics website.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" crumbs={[{ label: "Terms of Use" }]} />
      <article className="container-page mx-auto max-w-3xl pb-24">
        <Placeholder title="Content needed: terms of use">
          <p>
            The current Enabled Analytics website does not publish terms of use. Legal counsel should supply this page before launch. Until then it is excluded from search
            indexing.
          </p>
          <p className="mt-3">
            Questions in the meantime: <a href={`mailto:${site.email}`} className="font-semibold underline">{site.email}</a>
          </p>
        </Placeholder>
      </article>
    </>
  )
}
