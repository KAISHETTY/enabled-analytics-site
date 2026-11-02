"use client"

import { m } from "framer-motion"
import { CloudMark } from "@/components/motion/sky-scene"

/** The full cloud expertise list: each group's card rises in and its clouds pop in one after another. */
export function CloudGrid({ groups }: { groups: { title: string; clouds: string[] }[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((g, gi) => (
        <m.section
          key={g.title}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 16, delay: gi * 0.1, staggerChildren: 0.05, delayChildren: 0.25 + gi * 0.1 } } }}
          aria-label={g.title}
          className="rounded-[1.5rem] border border-line bg-white p-6 shadow-soft"
        >
          <h3 className="flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
            <CloudMark /> {g.title}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {g.clouds.map((c) => (
              <m.li
                key={c}
                variants={{ hidden: { opacity: 0, scale: 0.6, y: 8 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 18 } } }}
                className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-brand-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
              >
                {c}
              </m.li>
            ))}
          </ul>
        </m.section>
      ))}
    </div>
  )
}
