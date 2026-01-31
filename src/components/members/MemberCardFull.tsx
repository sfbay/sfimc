import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface Member {
  id: string
  name: string
  slug: string
  community: string
  category: string[]
  description: string
  url: string
  foundedYear?: number
  logo?: { url: string; alt: string }
  teamPhoto?: { url: string; alt: string }
}

interface MemberCardFullProps {
  member: Member
}

export function MemberCardFull({ member }: MemberCardFullProps) {
  return (
    <article className="card overflow-hidden group h-full flex flex-col">
      {/* Team Photo */}
      <div className="aspect-[4/3] bg-[var(--color-mist)] relative">
        {member.teamPhoto ? (
          <img
            src={member.teamPhoto.url}
            alt={member.teamPhoto.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-warm-gray)]">
            <span className="text-sm font-mono">Team / Community Photo</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header with logo */}
        <div className="flex gap-4 mb-4">
          <div className="w-14 h-14 bg-[var(--color-cream)] rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--color-mist)]">
            {member.logo ? (
              <img
                src={member.logo.url}
                alt={member.logo.alt}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <span className="text-[var(--color-warm-gray)] text-xs font-mono">Logo</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)] truncate">
              {member.name}
            </h3>
            <p className="text-[var(--color-dot)] text-sm font-medium">
              {member.community}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--color-slate)] text-sm leading-relaxed flex-1 mb-4">
          {member.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-mist)]">
          {member.foundedYear && (
            <span className="text-xs text-[var(--color-warm-gray)] font-mono">
              Est. {member.foundedYear}
            </span>
          )}
          <Link
            href={member.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-ink)] hover:text-[var(--color-dot)] text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            Visit website
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
