"use client"

import * as React from "react"
import { m, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

/** A soft, original cumulus shape (not the Salesforce logo). */
export function Cloud({ className, opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 220 110" className={className} aria-hidden="true" style={{ opacity }}>
      <path
        d="M38 98c-19 0-32-12-32-28 0-15 12-27 28-28 3-19 19-33 39-33 13 0 25 6 32 16 6-5 14-8 22-8 18 0 33 13 35 30h2c17 0 30 12 30 26s-13 25-30 25H38z"
        fill="white"
      />
    </svg>
  )
}

function Layer({ progress, to, children, className, fade }: { progress: MotionValue<number>; to: number; children: React.ReactNode; className?: string; fade?: [number, number] }) {
  const y = useTransform(progress, [0, 1], ["0%", `${to}%`])
  const opacity = useTransform(progress, [0, 1], fade ?? [1, 1])
  return (
    <m.div style={{ y, opacity }} className={cn("pointer-events-none absolute inset-x-0 will-change-transform", className)}>
      {children}
    </m.div>
  )
}

/**
 * TO TOP's hero choreography rebuilt as a light Salesforce sky. As the hero
 * scrolls away, each layer travels a different distance (far clouds barely, near
 * hills most), the title lifts and fades, and the rotating badge rides ahead,
 * the same scrub-1.2 feel via a spring. `children` is the title block.
 */
export function SkyScene({ children, badge, className }: { children: React.ReactNode; badge?: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 })
  const progress = reduce ? (scrollYProgress as MotionValue<number>) : p
  const titleY = useTransform(progress, [0, 1], ["0%", "-55%"])
  const titleOpacity = useTransform(progress, [0, 0.55], [1, 0])
  const badgeY = useTransform(progress, [0, 1], ["0%", "160%"])
  const badgeRotate = useTransform(progress, [0, 1], [0, 90])

  return (
    <section ref={ref} className={cn("bg-sky relative isolate h-[118vh] min-h-[760px] overflow-hidden", className)}>
      {/* sun glow */}
      <div aria-hidden="true" className="absolute top-[12%] right-[12%] size-[38vw] max-w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0)_65%)]" />

      {/* far clouds: drift sideways forever and barely move on scroll */}
      <Layer progress={progress} to={8} className="top-[14%]">
        <div className="flex w-[200%] animate-drift opacity-70 motion-reduce:animate-none">
          {[0, 1].map((k) => (
            <div key={k} className="relative h-40 w-1/2">
              <Cloud className="absolute top-2 left-[6%] w-40" opacity={0.8} />
              <Cloud className="absolute top-14 left-[38%] w-28" opacity={0.6} />
              <Cloud className="absolute top-0 left-[70%] w-52" opacity={0.75} />
            </div>
          ))}
        </div>
      </Layer>

      {/* title block */}
      <m.div style={reduce ? undefined : { y: titleY, opacity: titleOpacity }} className="relative z-30 flex h-[100vh] min-h-[700px] flex-col justify-center pt-24">
        {children}
      </m.div>

      {/* rotating badge rides down with the hills (TO TOP sun disc) */}
      {badge && (
        <m.div style={reduce ? undefined : { y: badgeY, rotate: badgeRotate }} className="absolute right-[8%] bottom-[30%] z-40 hidden md:block">
          {badge}
        </m.div>
      )}

      {/* mid clouds */}
      <Layer progress={progress} to={30} className="bottom-[16%] z-10">
        <Cloud className="absolute bottom-10 left-[-4%] w-[34vw] max-w-[460px]" />
        <Cloud className="absolute bottom-24 left-[58%] w-[22vw] max-w-[300px]" opacity={0.9} />
      </Layer>

      {/* far hill */}
      <Layer progress={progress} to={45} className="bottom-0 z-10" fade={[1, 0.6]}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="block h-[34vh] w-full" aria-hidden="true">
          <path d="M0 220 C 220 120, 380 160, 560 190 S 900 90, 1100 150 S 1340 210, 1440 170 V320 H0z" fill="var(--color-hill)" />
        </svg>
      </Layer>

      {/* near hill + foreground clouds move most */}
      <Layer progress={progress} to={70} className="-bottom-1 z-20">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="block h-[26vh] w-full" aria-hidden="true">
          <path d="M0 210 C 260 140, 520 250, 760 200 S 1180 120, 1440 190 V300 H0z" fill="var(--color-hill-deep)" opacity="0.55" />
          <path d="M0 250 C 300 200, 600 290, 900 240 S 1300 200, 1440 230 V300 H0z" fill="white" />
        </svg>
        <Cloud className="absolute -bottom-6 left-[18%] w-[30vw] max-w-[420px]" />
        <Cloud className="absolute -bottom-10 right-[-6%] w-[40vw] max-w-[560px]" />
      </Layer>
    </section>
  )
}

/** Soft cloud-edge seam between sections (replaces TO TOP's torn paper). */
export function CloudSeam({ className, fill = "white", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none relative z-10 -mt-px h-16 w-full md:h-24", flip && "rotate-180", className)}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          d="M0 100V60c40-30 90-30 120 0 30-40 100-46 140-10 40-36 110-30 140 6 40-30 100-30 130 4 40-44 120-40 150 0 30-30 90-34 120 0 50-40 130-36 160 6 40-30 100-28 130 4 40-40 110-38 150-2 30-24 80-24 100 2V100z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

/** ABSYZ's little bouncing cloud-drop mark that sits above section headings. */
export function CloudMark({ className, tone = "brand" }: { className?: string; tone?: "brand" | "agent" }) {
  return (
    <span aria-hidden="true" className={cn("relative inline-flex h-6 w-9 animate-bob motion-reduce:animate-none", className)}>
      <svg viewBox="0 0 36 24" className="h-full w-full">
        <path d="M9 21c-4 0-7-3-7-6.5S5 8 9 8c1-4 4.5-6 8-6 3.6 0 6.6 2.3 7.6 5.5C29 7.3 34 10.4 34 14.6 34 18.2 31 21 27 21H9z" fill={tone === "brand" ? "var(--color-brand-400)" : "var(--color-agent-500)"} />
        <circle cx="13" cy="15" r="1.6" fill="white" />
        <circle cx="22" cy="15" r="1.6" fill="white" />
      </svg>
    </span>
  )
}
