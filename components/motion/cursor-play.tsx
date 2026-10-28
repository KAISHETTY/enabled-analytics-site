"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * TO TOP's cursor-follow play button: inside the area, a round "Play" disc
 * eases toward the pointer (lerp 0.1); it rests in the centre otherwise.
 */
export function CursorPlay({ children, label = "Play", className }: { children: React.ReactNode; label?: string; className?: string }) {
  const area = React.useRef<HTMLDivElement>(null)
  const disc = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const el = area.current
    const d = disc.current
    if (!el || !d || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return
    let tx = el.clientWidth / 2
    let ty = el.clientHeight / 2
    let cx = tx
    let cy = ty
    let raf = 0
    d.style.left = "0"
    d.style.top = "0"
    d.style.translate = "none"
    const loop = () => {
      cx += (tx - cx) * 0.1
      cy += (ty - cy) * 0.1
      d.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
    }
    const leave = () => {
      tx = el.clientWidth / 2
      ty = el.clientHeight / 2
    }
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    }
  }, [])

  return (
    <div ref={area} className={cn("group/play relative overflow-hidden", className)}>
      {children}
      <span
        ref={disc}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 font-mono text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase shadow-lift backdrop-blur transition-[width,height] duration-300 group-hover/play:size-32"
      >
        <svg viewBox="0 0 16 16" className="mr-1.5 size-4 fill-brand-600" aria-hidden="true">
          <path d="M4 2.5v11l9-5.5z" />
        </svg>
        {label}
      </span>
    </div>
  )
}
