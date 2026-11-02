"use client"

import * as React from "react"
import Image from "next/image"
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Wide photo band: the frame rises in and the photo eases from a slight zoom to
 * rest as it scrolls through, with an optional caption card on the lower left.
 */
export function ImageBand({ src, alt, caption, kicker, className }: { src: string; alt: string; caption?: string; kicker?: string; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1])
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative aspect-square overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-line sm:aspect-[16/9] lg:aspect-[21/9]", className)}
    >
      <m.div style={reduce ? undefined : { scale, y }} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
      </m.div>
      {caption && (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-800/70 via-brand-800/10 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 max-w-md rounded-2xl bg-white/90 p-4 backdrop-blur sm:inset-x-8 sm:bottom-8 sm:p-5">
            {kicker && <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">{kicker}</p>}
            <p className="mt-1 font-heading text-base leading-snug font-bold text-ink sm:text-xl">{caption}</p>
          </div>
        </>
      )}
    </m.div>
  )
}
