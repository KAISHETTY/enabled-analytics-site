"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { mascotPlayer } from "@/lib/mascot-player"

/** Inline bootstrap: runs as the HTML parses, so the longhorn starts before hydration. */
const BOOT = `(${mascotPlayer.toString()})(document.currentScript.parentElement)`

/**
 * Hero longhorn: plays the arrival (raises and plants the summit flag) once,
 * then loops the proud idle from `loopStart`. The stacked-alpha MP4 is drawn
 * through WebGL by `lib/mascot-player.ts`, which starts from an inline script
 * the moment the markup arrives (holding only while the intro curtain is down),
 * pauses off-screen, and shows a still for reduced motion or without WebGL.
 * With `startAt` (the header menus) it skips the arrival, starts straight in
 * the waving loop, and shows the still until the first frame is drawn.
 */
export function HeroMascot({
  src,
  srcSmall,
  poster,
  width,
  height,
  loopStart,
  startAt,
  waitForIntro = true,
  foreground,
  className,
}: {
  src: string
  /** Lighter encode for phones (under 768px wide). */
  srcSmall?: string
  poster: string
  width: number
  height: number
  loopStart: number
  /** Start playback here instead of at the arrival (seconds). */
  startAt?: number
  /** Hold until the intro curtain lifts; off for elements that appear later, like menus. */
  waitForIntro?: boolean
  /** Drawn in front of the clip, e.g. the cloud he leaps out of and lands on. */
  foreground?: React.ReactNode
  className?: string
}) {
  const wrap = React.useRef<HTMLDivElement>(null)
  const at = (f: string) => (startAt ? `${f}#t=${startAt}` : f)

  // Client-mounted instances (menus) never run the inline script, so start them here. Idempotent for server-rendered ones.
  React.useEffect(() => {
    const el = wrap.current as (HTMLDivElement & { __mascotStop?: () => void }) | null
    if (!el) return
    const stop = mascotPlayer(el)
    return () => {
      stop()
      delete el.__mascotStop
    }
  }, [])

  return (
    <div
      ref={wrap}
      data-loop-start={loopStart}
      data-wait-intro={waitForIntro ? "1" : "0"}
      className={cn("pointer-events-none relative select-none", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- a plain img so the inline player can toggle it before hydration */}
      <img
        data-poster=""
        src={poster}
        alt="Enabled Analytics longhorn mascot planting the summit flag"
        width={width}
        height={height}
        decoding="async"
        suppressHydrationWarning
        className="absolute inset-0 size-full object-contain"
        style={{ visibility: startAt === undefined ? "hidden" : "visible" }}
      />
      <canvas width={width} height={height} aria-hidden="true" suppressHydrationWarning className="absolute inset-0 size-full" style={{ visibility: "hidden" }} />
      {/* Kept rendered (not display:none) so iOS Safari decodes its frames. Phones get the lighter encode. */}
      <video muted playsInline preload="auto" crossOrigin="anonymous" aria-hidden="true" className="absolute size-px opacity-0">
        {srcSmall && <source src={at(src)} type="video/mp4" media="(min-width: 768px)" />}
        <source src={at(srcSmall ?? src)} type="video/mp4" />
      </video>
      <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BOOT }} />
      {foreground}
    </div>
  )
}
