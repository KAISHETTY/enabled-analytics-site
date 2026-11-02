import Image from "next/image"
import { cn } from "@/lib/utils"
import { linkedInFor, type TeamMember } from "@/lib/content"
import { LinkedInIcon } from "@/components/ea/primitives"

/** Leader card: the whole card opens the person's LinkedIn profile in a new tab. */
export function TeamCard({ member, className, priority = false }: { member: TeamMember; className?: string; priority?: boolean }) {
  return (
    <a
      href={linkedInFor(member)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group/card block overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-brand-50 to-surface">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}, ${member.role}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 22vw, 45vw"
          className="object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.03]"
        />
        <span aria-hidden="true" className="absolute right-2 bottom-2 flex size-8 sm:right-3 sm:bottom-3 sm:size-10 items-center justify-center rounded-full bg-white/95 text-[#0a66c2] shadow-soft transition-transform duration-300 group-hover/card:scale-110">
          <LinkedInIcon className="size-4" />
        </span>
      </div>
      <div className="p-3 sm:p-5">
        <h3 className="text-[0.9375rem] leading-snug font-bold sm:text-lg">{member.name}</h3>
        <p className="mt-1 text-xs text-brand-700 sm:text-sm">{member.role}</p>
        <span className="sr-only">(LinkedIn profile, opens in a new tab)</span>
      </div>
    </a>
  )
}
