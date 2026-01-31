import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface Member {
  id: string
  name: string
  slug: string
  community: string
  description: string
  url: string
  foundedYear?: number
  logo?: { url: string; alt: string }
}

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Link
      href={`/members/${member.slug}`}
      className="card hover-lift hover-border-dot p-6 flex flex-col h-full group relative overflow-hidden"
    >
      {/* Logo Placeholder */}
      <div className="w-16 h-16 bg-[var(--color-cream)] rounded-xl flex items-center justify-center mb-4 border border-[var(--color-mist)] group-hover:border-[var(--color-dot)] transition-colors">
        {member.logo ? (
          <img
            src={member.logo.url}
            alt={member.logo.alt}
            className="w-12 h-12 object-contain"
          />
        ) : (
          <span className="text-2xl font-bold text-[var(--color-dot)] opacity-50">
            {member.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-dot)] transition-colors">
        {member.name}
      </h3>

      <p className="text-[var(--color-teal)] text-sm font-medium mb-3">
        {member.community}
      </p>

      <p className="text-[var(--color-slate)] text-sm leading-relaxed flex-1 mb-4">
        {member.description}
      </p>

      {/* Link indicator */}
      <div className="flex items-center gap-1 text-[var(--color-warm-gray)] group-hover:text-[var(--color-dot)] text-sm transition-colors">
        <span className="font-medium">View profile</span>
        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Top accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-dot-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

      {/* Corner glow effect on hover */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--color-dot)] opacity-0 group-hover:opacity-5 blur-3xl transition-opacity rounded-full" />
    </Link>
  )
}
