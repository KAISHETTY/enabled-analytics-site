import Image from "next/image"
import { cn } from "@/lib/utils"

type Logo = { name: string; logo: string }

/**
 * Infinite, pause-on-hover client logo strip. The list is rendered twice for a
 * seamless loop; the copy is hidden from assistive tech. Stops under reduced motion.
 */
export function LogoMarquee({ logos, className, duration = 60 }: { logos: Logo[]; className?: string; duration?: number }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-6"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-4 md:gap-6" aria-hidden={copy === 1 ? true : undefined}>
            {logos.map((l) => (
              <li
                key={l.name}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-line bg-white px-5 shadow-soft md:h-24 md:w-48"
              >
                <Image
                  src={l.logo}
                  alt={copy === 0 ? l.name : ""}
                  width={160}
                  height={64}
                  sizes="160px"
                  className="max-h-12 w-auto object-contain md:max-h-14"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

/** Static logo wall used on the projects page. */
export function LogoGrid({ logos, className }: { logos: Logo[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5", className)}>
      {logos.map((l) => (
        <li key={l.name} className="flex h-24 items-center justify-center rounded-xl border border-line bg-white p-5 shadow-soft">
          <Image src={l.logo} alt={l.name} width={160} height={64} sizes="160px" className="max-h-14 w-auto object-contain" />
        </li>
      ))}
    </ul>
  )
}
