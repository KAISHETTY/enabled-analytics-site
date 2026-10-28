"use client"

import * as React from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * ABSYZ "The Future Is Agentic" typed headline (GSAP TextPlugin). Cycles through
 * `words`, typing and deleting. Screen readers get the full list once.
 */
export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()
  const [index, setIndex] = React.useState(0)
  const [text, setText] = React.useState(words[0])
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    if (reduce || !inView) return
    const word = words[index]
    const done = !deleting && text === word
    const cleared = deleting && text === ""
    const delay = done ? 1800 : cleared ? 300 : deleting ? 35 : 70
    const t = setTimeout(() => {
      if (done) setDeleting(true)
      else if (cleared) {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, reduce, inView])

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block w-[0.06em] animate-caret bg-current align-[-0.08em] motion-reduce:hidden" style={{ height: "0.9em" }} />
      </span>
    </span>
  )
}
