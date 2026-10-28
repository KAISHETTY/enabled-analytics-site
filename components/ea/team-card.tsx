import Image from "next/image"
import { cn } from "@/lib/utils"
import type { TeamMember } from "@/lib/content"

export function TeamCard({ member, className, priority = false }: { member: TeamMember; className?: string; priority?: boolean }) {
  return (
    <article className={cn("group/card overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-brand-50 to-surface">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}, ${member.role}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold">{member.name}</h3>
        <p className="mt-1 text-sm text-brand-700">{member.role}</p>
      </div>
    </article>
  )
}
