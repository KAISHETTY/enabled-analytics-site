import Image from "next/image"
import { cn } from "@/lib/utils"
import { RevealGroup, RevealItem } from "@/components/ea/reveal"

export type TimelineStep = { title: string; text?: string; image?: string }

/**
 * Numbered process. `horizontal` lays steps out as connected columns (Shape Cycle,
 * hiring steps); `vertical` alternates a rail with optional images (CoE process).
 */
export function Timeline({ steps, orientation = "horizontal", className }: { steps: TimelineStep[]; orientation?: "horizontal" | "vertical"; className?: string }) {
  if (orientation === "horizontal") {
    const cols = steps.length === 3 ? "lg:grid-cols-3" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
    return (
      <RevealGroup as="ol" className={cn("relative grid gap-6 md:grid-cols-2", cols, className)}>
        {steps.map((s, i) => (
          <RevealItem as="li" key={s.title} className="relative">
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute top-7 left-16 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-brand-300 to-brand-100 lg:block" />
            )}
            <div className="relative flex h-full flex-col gap-4 rounded-xl border border-line bg-white p-6 shadow-soft md:p-7">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-600 font-mono text-lg font-semibold text-white shadow-glow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-bold">{s.title}</h3>
              {s.text && <p className="leading-relaxed">{s.text}</p>}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    )
  }

  return (
    <RevealGroup as="ol" className={cn("relative space-y-6 md:space-y-10", className)}>
      <span aria-hidden="true" className="absolute top-4 bottom-4 left-7 w-px bg-gradient-to-b from-brand-300 via-brand-200 to-transparent md:left-1/2" />
      {steps.map((s, i) => (
        <RevealItem as="li" key={s.title} className="relative grid gap-6 pl-20 md:grid-cols-2 md:gap-16 md:pl-0">
          <span className="absolute top-0 left-0 z-10 flex size-14 items-center justify-center rounded-2xl bg-brand-600 font-mono text-lg font-semibold text-white shadow-glow ring-8 ring-white md:left-1/2 md:-translate-x-1/2">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className={cn("rounded-xl border border-line bg-white p-6 shadow-soft md:p-8", i % 2 === 1 ? "md:order-2" : "md:text-right")}>
            <h3 className="text-xl font-bold">{s.title}</h3>
            {s.text && <p className="mt-3 leading-relaxed">{s.text}</p>}
          </div>
          {s.image ? (
            <div className={cn("hidden md:block", i % 2 === 1 && "md:order-1")}>
              <Image src={s.image} alt="" width={420} height={229} sizes="40vw" className="aspect-[16/9] w-full rounded-xl object-cover shadow-soft ring-1 ring-line" />
            </div>
          ) : (
            <div aria-hidden="true" className="hidden md:block" />
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
