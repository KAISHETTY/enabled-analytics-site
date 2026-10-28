"use client"

import * as React from "react"
import { m } from "framer-motion"

export const INTRO_KEY = "ea-intro-seen"

/**
 * Inline <head> script: decides before first paint whether the intro plays.
 * Returning visitors (this session) and reduced-motion users skip it. While it
 * plays, `html.intro-playing` pauses the page's entrance animations so the
 * header → title choreography starts the moment the curtain lifts (TO TOP).
 */
export const introBootScript = `try{var s=sessionStorage.getItem("${INTRO_KEY}"),r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(!s&&!r){document.documentElement.classList.add("intro-playing")}else{document.documentElement.classList.add("intro-skip")}}catch(e){document.documentElement.classList.add("intro-skip")}`

/** Server-rendered curtain; CSS hides it instantly when `html.intro-skip` is set. */
export function IntroCurtain() {
  const [lifted, setLifted] = React.useState(false)

  React.useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains("intro-playing")) return
    try {
      sessionStorage.setItem(INTRO_KEY, "1")
    } catch {}
    const t = setTimeout(() => {
      setLifted(true)
      root.classList.remove("intro-playing")
    }, 1350)
    return () => clearTimeout(t)
  }, [])

  return (
    <m.div
      aria-hidden="true"
      className="intro-curtain bg-sky fixed inset-0 z-[100] flex items-center justify-center"
      initial={false}
      animate={lifted ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{ pointerEvents: lifted ? "none" : "auto" }}
    >
      <svg viewBox="0 0 120 80" className="w-36">
        <path
          className="intro-stroke"
          d="M30 66c-13 0-22-9-22-20 0-10 8-19 19-20 2-13 13-22 27-22 9 0 17 4 22 11 4-3 9-5 15-5 13 0 23 10 23 22v1c9 2 15 9 15 17 0 9-8 16-18 16H30z"
          fill="none"
          stroke="var(--color-brand-600)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
        />
        <text x="60" y="52" textAnchor="middle" className="intro-mark fill-brand-700 font-heading text-[22px] font-extrabold">
          ea
        </text>
      </svg>
    </m.div>
  )
}
