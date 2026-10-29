"use client"

import * as React from "react"
import Image from "next/image"
import { m, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/** Loop timeline in seconds: walk in → turn to camera → wave → turn away → walk off → empty beat. */
const T = { in: 3.4, turn: 0.45, wave: 3.6, off: 3.2, rest: 1.2 }
const CYCLE = T.in + T.turn + T.wave + T.turn + T.off + T.rest
const STEPS_PER_SEC = 2.4
const ANGLE = 32 // rotateY while walking, so the flat render reads as a 3D figure turning

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeIn = (t: number) => t * t * t
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * The Enabled Analytics longhorn walks in from the left with a bouncy step,
 * turns to face the visitor, waves the flag (it swings from his grip while
 * the cloth ripples), then turns and walks off to the right, on a loop.
 * The body and flag are separate layers cut from the same render.
 */
export function MascotParade({ className }: { className?: string }) {
  const stage = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const visible = useInView(stage, { margin: "200px 0px" })
  const [width, setWidth] = React.useState(0)
  const id = React.useId().replace(/:/g, "")

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotY = useMotionValue(ANGLE)
  const tilt = useMotionValue(0)
  const squash = useMotionValue(1)
  const flag = useMotionValue(0)
  const shadowScale = useTransform(y, [-26, 0], [0.7, 1])
  const shadowOpacity = useTransform(y, [-26, 0], [0.12, 0.28])
  const turbulence = React.useRef<SVGFETurbulenceElement>(null)
  const elapsed = React.useRef(0)

  React.useEffect(() => {
    const el = stage.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (reduce || !visible || !width) return
    elapsed.current += Math.min(delta, 50) / 1000
    const t = elapsed.current % CYCLE
    const fig = Math.min(width * 0.42, 300) // rendered figure width
    const start = -fig - 40
    const center = (width - fig) / 2
    const end = width + 40

    const tIn = T.in
    const tFace = tIn + T.turn
    const tWave = tFace + T.wave
    const tAway = tWave + T.turn
    const tOff = tAway + T.off

    let walking = false
    if (t < tIn) {
      x.set(start + (center - start) * easeOut(t / T.in))
      rotY.set(ANGLE)
      walking = t / T.in < 0.92
    } else if (t < tFace) {
      x.set(center)
      rotY.set(ANGLE * (1 - easeInOut((t - tIn) / T.turn)))
    } else if (t < tWave) {
      x.set(center)
      rotY.set(0)
    } else if (t < tAway) {
      x.set(center)
      rotY.set(-ANGLE * easeInOut((t - tWave) / T.turn))
    } else if (t < tOff) {
      const p = (t - tAway) / T.off
      x.set(center + (end - center) * easeIn(p))
      rotY.set(-ANGLE)
      walking = p > 0.04
    } else {
      x.set(end + 200)
    }

    if (walking) {
      const s = t * STEPS_PER_SEC * Math.PI
      y.set(-Math.abs(Math.sin(s)) * 14)
      tilt.set(Math.sin(s) * 3.2)
      squash.set(1 - Math.max(0, Math.cos(2 * s)) * 0.03)
      flag.set(Math.sin(s - 0.8) * 8)
    } else if (t >= tFace && t < tWave) {
      // Wave: a happy hop as he lands, then big flag sweeps.
      const w = t - tFace
      const hop = w < 0.5 ? Math.sin((w / 0.5) * Math.PI) : 0
      y.set(-hop * 22)
      squash.set(w < 0.5 ? 1 + hop * 0.03 : 1 - Math.max(0, Math.sin(w * 9) * 0.012))
      tilt.set(Math.sin(w * 4.2) * 2.4)
      const env = clamp(w / 0.4) * clamp((T.wave - w) / 0.5)
      flag.set(Math.sin(w * 7.2) * 22 * env - 5 * env)
    } else {
      y.set(0)
      tilt.set(0)
      squash.set(1)
      flag.set(flag.get() * 0.9)
    }

    // Cloth ripple: drift the turbulence so the flag reads as fabric in the wind.
    turbulence.current?.setAttribute("baseFrequency", `${0.012 + Math.sin(t * 2.1) * 0.003} ${0.03 + Math.cos(t * 1.7) * 0.006}`)
  })

  return (
    <div
      ref={stage}
      role="img"
      aria-label="The Enabled Analytics longhorn mascot walking in, waving the company flag and walking off"
      className={cn("relative h-[260px] overflow-hidden sm:h-[330px] lg:h-[380px]", className)}
    >
      <svg aria-hidden="true" className="absolute size-0">
        <filter id={`cloth-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence ref={turbulence} type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* ground */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-6 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />

      <m.div
        style={reduce ? { left: "50%", translateX: "-50%" } : { x }}
        className="absolute bottom-6 left-0 w-[42vw] max-w-[300px] [perspective:900px]"
      >
        {/* contact shadow stays on the ground while he bounces */}
        <m.span
          aria-hidden="true"
          style={{ scaleX: shadowScale, opacity: shadowOpacity }}
          className="absolute -bottom-2 left-[18%] h-5 w-[64%] rounded-[50%] bg-ink blur-md"
        />
        <m.div style={reduce ? undefined : { y, rotateY: rotY, rotateZ: tilt, scaleY: squash }} className="relative origin-bottom [transform-style:preserve-3d]">
          {/* flag sits behind the fist so the grip hides the seam */}
          <m.div
            aria-hidden="true"
            style={{ rotate: reduce ? 0 : flag, transformOrigin: "26% 63.8%", filter: reduce ? undefined : `url(#cloth-${id})` }}
            className="absolute inset-0"
          >
            <Image src="/images/mascot/longhorn-flag.webp" alt="" width={607} height={623} sizes="(min-width: 768px) 300px, 42vw" draggable={false} className="h-auto w-full select-none" />
          </m.div>
          <Image
            src="/images/mascot/longhorn-body.webp"
            alt=""
            width={607}
            height={623}
            sizes="(min-width: 768px) 300px, 42vw"
            draggable={false}
            className="relative h-auto w-full drop-shadow-[0_18px_24px_rgba(3,45,96,0.18)] select-none"
          />
        </m.div>
      </m.div>
    </div>
  )
}
