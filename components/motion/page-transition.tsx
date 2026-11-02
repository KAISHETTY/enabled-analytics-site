"use client"

import * as React from "react"
import { m } from "framer-motion"
import { usePathname } from "next/navigation"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Route entrance: each newly navigated page rises in with a soft blur clearing.
 * The first page load is left alone (the hero has its own entrance). The filter
 * is cleared afterwards so fixed/sticky descendants keep working.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [firstPath] = React.useState(pathname)
  const [navigated, setNavigated] = React.useState(false)
  if (!navigated && pathname !== firstPath) setNavigated(true)

  return (
    <m.div
      key={pathname}
      initial={navigated ? { opacity: 0, y: 28, filter: "blur(6px)" } : false}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </m.div>
  )
}
