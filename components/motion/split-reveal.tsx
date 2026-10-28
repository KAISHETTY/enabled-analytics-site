import * as React from "react"
import { cn } from "@/lib/utils"

type Part = { text: string; className?: string }

/**
 * Letter-by-letter (or word) rise out of a mask, like TO TOP's SplitText titles.
 * CSS only, so it paints before hydration; reduced motion shows it instantly.
 * Each word stays unbreakable so lines wrap naturally. Screen readers get the
 * plain sentence as visually hidden text.
 */
export function SplitReveal({
  parts,
  by = "letter",
  delay = 0,
  stagger,
  className,
  as: Tag = "span",
}: {
  parts: Part[]
  by?: "letter" | "word"
  delay?: number
  stagger?: number
  className?: string
  as?: "span" | "h1" | "h2" | "p"
}) {
  const step = stagger ?? (by === "letter" ? 22 : 70)
  let i = 0
  const label = parts.map((p) => p.text).join(" ")
  return (
    <Tag className={cn("block", className)}>
      <span className="sr-only">{label}</span>
      {parts.map((part, pi) => (
        <span key={pi} aria-hidden="true" className={part.className}>
          {part.text.split(" ").map((word, wi, arr) => (
            <span key={wi} className="inline-block overflow-hidden pb-[0.12em] align-bottom whitespace-nowrap">
              {(by === "letter" ? Array.from(word) : [word]).map((ch, ci) => {
                const d = delay + i++ * step
                return (
                  <span key={ci} className="split-piece inline-block" style={{ animationDelay: `${d}ms` }}>
                    {ch}
                  </span>
                )
              })}
              {wi < arr.length - 1 || pi < parts.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
