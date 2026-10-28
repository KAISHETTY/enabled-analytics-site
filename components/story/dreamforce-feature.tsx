import Image from "next/image"
import { Clock, Mic } from "lucide-react"
import { dreamforce } from "@/lib/trust"
import { CursorPlay } from "@/components/motion/cursor-play"
import { CloudMark } from "@/components/motion/sky-scene"
import { Reveal } from "@/components/ea/reveal"
import { ArrowIcon } from "@/components/ea/button"

/** "Featured at Dreamforce" video preview with TO TOP's cursor-follow play disc. */
export function DreamforceFeature() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32" aria-labelledby="df-title">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-sky-mid to-white" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <CloudMark /> As seen at {dreamforce.event}
          </p>
          <h2 id="df-title" className="mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-extrabold">
            {dreamforce.title.split(" for ")[0]} <span className="accent-serif text-brand-600">for Salesforce success</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed">{dreamforce.description}</p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mic aria-hidden="true" className="size-4 text-brand-600" />
              <dt className="sr-only">Speaker</dt>
              <dd className="font-semibold text-ink">{dreamforce.speaker}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Clock aria-hidden="true" className="size-4 text-brand-600" />
              <dt className="sr-only">Duration</dt>
              <dd>{dreamforce.duration}</dd>
            </div>
            <div>
              <dt className="sr-only">Series</dt>
              <dd className="text-ink-subtle">{dreamforce.series}</dd>
            </div>
          </dl>
          <a href={dreamforce.url} target="_blank" rel="noopener noreferrer" className="group/btn mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-brand-600 px-7 font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-700">
            Watch on Salesforce+ <ArrowIcon />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <a href={dreamforce.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch “${dreamforce.title}” by ${dreamforce.speaker} on Salesforce+ (opens in a new tab)`} className="block rounded-[2rem] focus-visible:outline-offset-8">
            <CursorPlay label="Watch" className="aspect-video rounded-[2rem] bg-brand-50 shadow-lift ring-1 ring-brand-100">
              <Image src={dreamforce.image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-transform duration-700 group-hover/play:scale-[1.03]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-800/35 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 font-mono text-xs font-semibold tracking-[0.12em] text-brand-700 uppercase backdrop-blur">
                {dreamforce.event} · {dreamforce.duration}
              </span>
            </CursorPlay>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
