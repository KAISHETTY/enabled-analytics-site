"use client"

import * as React from "react"
import Lenis from "lenis"

/**
 * Lenis smooth scrolling (TO TOP / DAQ): the same expo ease as TO TOP at a
 * shorter duration. Effect-only (renders nothing), so the React tree is
 * identical on server and client. Skipped for reduced motion and touch/coarse
 * pointers, where native scrolling feels better.
 */
export function SmoothScroll() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
      anchors: { offset: -96 },
    })
    return () => lenis.destroy()
  }, [])
  return null
}
