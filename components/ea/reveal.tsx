"use client"

import * as React from "react"
import { domAnimation, LazyMotion, m, MotionConfig, type Variants } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const viewport = { once: true, margin: "0px 0px -8% 0px" } as const

/**
 * App-wide motion settings: honours the OS "reduce motion" preference and loads
 * only the DOM animation feature set (the lightweight `m` components use it).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

type Tag = "div" | "li" | "ul" | "ol" | "section" | "article"

/** Fades and lifts its content into view once. */
export function Reveal({ children, className, delay = 0, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: Tag }) {
  const Comp = m[as]
  return (
    <Comp className={className} initial="hidden" whileInView="show" viewport={viewport} variants={item} transition={{ delay }}>
      {children}
    </Comp>
  )
}

/** Staggers the reveal of direct `RevealItem` children. */
export function RevealGroup({ children, className, stagger = 0.08, as = "div" }: { children: React.ReactNode; className?: string; stagger?: number; as?: Tag }) {
  const Comp = m[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: Tag }) {
  const Comp = m[as]
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  )
}
