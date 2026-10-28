import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * TO TOP's rotating disc CTA: circular text spins slowly, and the centre arrow
 * tilts on hover. Pure CSS.
 */
export function RotatingBadge({ href, text, className, tone = "brand" }: { href: string; text: string; className?: string; tone?: "brand" | "agent" }) {
  const id = `badge-${text.replace(/\W+/g, "").slice(0, 12)}`
  return (
    <Link
      href={href}
      aria-label={text.replaceAll("•", "").trim()}
      className={cn(
        "group/badge relative flex size-32 items-center justify-center rounded-full shadow-lift transition-transform duration-700 ease-out hover:-rotate-6 md:size-36",
        tone === "brand" ? "bg-brand-600 text-white" : "bg-agent-500 text-white",
        className
      )}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 animate-spin-slow motion-reduce:animate-none" aria-hidden="true">
        <defs>
          <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-white font-mono text-[9.5px] tracking-[0.22em] uppercase">
          {/* 2πr for r=46: the phrase always wraps the disc exactly once */}
          <textPath href={`#${id}`} textLength={289} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-white text-brand-700 transition-transform duration-500 group-hover/badge:rotate-45">
        <svg viewBox="0 0 16 16" className="size-5" fill="none">
          <path d="M4 12 12 4m0 0H6m6 0v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}
