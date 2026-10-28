import type { Metadata } from "next"
import { about, team } from "@/lib/content"
import { siteUrl } from "@/lib/site-config"
import { PageHero } from "@/components/ea/hero"
import { Placeholder, Section } from "@/components/ea/primitives"
import { SectionHeading } from "@/components/ea/section-heading"
import { TeamCard } from "@/components/ea/team-card"
import { CTABanner } from "@/components/ea/cta-banner"
import { RevealGroup, RevealItem } from "@/components/ea/reveal"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the Co-Founders and Executive Team of Enabled Analytics.",
  alternates: { canonical: "/team" },
}

export default function TeamPage() {
  return (
    <>
      <PageHero eyebrow="Leadership" title="Meet the people behind Enabled Analytics" lead={about.culture.body[0]} crumbs={[{ label: "About", href: "/about" }, { label: "Leadership" }]} />

      {team.groups.map((g, gi) => (
        <Section key={g.title} tone={gi % 2 === 0 ? "white" : "tint"}>
          <SectionHeading index={String(gi + 1).padStart(2, "0")} eyebrow="Leadership" title={g.title} />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {g.members.map((m, i) => (
              <RevealItem key={m.name}>
                <TeamCard member={m} priority={gi === 0 && i < 4} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      ))}

      <Section>
        <Placeholder title="Content needed: team bios">
          Short bios and LinkedIn profile links for each leader are not published on the current website. Add them in <code>content/site-content.json → team</code>.
        </Placeholder>
      </Section>

      <CTABanner eyebrow="Careers" title="Ready to Become a Salesforce Hero?" lead="Explore the open positions..." primary={{ label: "View open roles", href: "/careers#openings" }} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": team.groups.flatMap((g) =>
            g.members.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role, image: `${siteUrl}${m.image}`, worksFor: { "@id": `${siteUrl}/#organization` } }))
          ),
        }}
      />
    </>
  )
}
