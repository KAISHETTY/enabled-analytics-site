import Image from "next/image"
import { locations } from "@/lib/locations"
import { GlobalPresence } from "@/components/story/global-presence"
import { StatsCounter } from "@/components/ea/stats-counter"
import { RevealGroup, RevealItem, Reveal } from "@/components/ea/reveal"
import { CloudMark } from "@/components/motion/sky-scene"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PlayOnView } from "@/components/motion/play-on-view"

/** "How we are growing": animated world map + flag cards + growth counters. */
export function GrowthSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-mid to-white py-24 md:py-32" aria-labelledby="growth-title">
      <div aria-hidden="true" className="absolute top-1/3 left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="container-page relative">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="eyebrow flex items-center justify-center gap-3">
            <CloudMark /> How we are growing
          </p>
          <h2 id="growth-title" className="mt-5 text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-extrabold tracking-[-0.03em]">
            <PlayOnView>
              <SplitReveal by="word" parts={[{ text: "Five countries." }, { text: "One Salesforce team.", className: "block accent-serif font-normal tracking-normal text-brand-600" }]} />
            </PlayOnView>
          </h2>
          <Reveal>
            <p className="mt-6 text-lg">From our Lewisville, Texas headquarters we deliver Salesforce solutions across the USA, India, the UAE, Singapore and Australia. Hover a pin to explore.</p>
          </Reveal>
        </div>

        <GlobalPresence />

        <RevealGroup as="ul" className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" stagger={0.1}>
          {locations.map((l) => (
            <RevealItem as="li" key={l.id}>
              <div className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-white/90 p-4 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="relative shrink-0 overflow-hidden rounded-lg ring-1 ring-black/5 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                  <Image src={l.flag} alt={`${l.country} flag`} width={44} height={33} className="h-[33px] w-11 object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-heading font-bold text-ink">{l.city}</span>
                  <span className="block text-xs text-ink-subtle">
                    {l.kind === "HQ" ? "Headquarters" : l.kind === "Office" ? l.country : "Delivery region"}
                  </span>
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10">
          <StatsCounter
            variant="inline"
            stats={[
              { value: 5, label: "Countries we operate in" },
              { value: 100, suffix: "+", label: "Global Clients" },
              { value: 500, suffix: "+", label: "Salesforce Certifications" },
              { value: 4.9, decimals: 1, label: "CSAT Score" },
            ]}
          />
        </Reveal>
      </div>
    </section>
  )
}
