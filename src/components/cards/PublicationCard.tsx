import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

export interface Publication {
  id: string
  name: string
  slug: string
  description: string
  community?: string
  beats?: string[]
  url: string
  rssUrl?: string
  foundedYear?: number
  logo?: { url: string; alt: string }
}

interface PublicationCardProps {
  publication: Publication
  /** Show full details or compact version */
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export function PublicationCard({ publication, variant = 'default', className }: PublicationCardProps) {
  if (variant === 'featured') {
    return (
      <div className={cn(
        'rounded-2xl overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)] group hover-lift relative',
        className
      )}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-dot)]/10 via-transparent to-[var(--color-teal)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="p-8 relative">
          {/* Logo */}
          <div className="w-20 h-20 bg-[var(--color-charcoal)] rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-[var(--color-dot)]/50 transition-colors">
            {publication.logo ? (
              <Image
                src={publication.logo.url}
                alt={publication.logo.alt}
                width={56}
                height={56}
                className="object-contain"
                loading="lazy"
              />
            ) : (
              <span className="text-3xl font-bold text-[var(--color-dot)]" aria-hidden="true">
                {publication.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Content */}
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">
            {publication.name}
          </h3>

          {publication.community && (
            <p className="text-[var(--color-teal-light)] font-medium mb-4">
              {publication.community}
            </p>
          )}

          <p className="text-[var(--color-warm-gray)] leading-relaxed mb-6">
            {publication.description}
          </p>

          {/* Beats */}
          {publication.beats && publication.beats.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {publication.beats.map((beat) => (
                <span
                  key={beat}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)]"
                >
                  {beat}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href={`/members/${publication.slug}`}
              className="btn btn-dot"
            >
              View profile
            </Link>
            <Link
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] flex items-center gap-2 text-sm font-medium transition-colors"
            >
              Visit site
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {publication.foundedYear && (
            <div className="absolute top-8 right-8 text-[var(--color-warm-gray)] font-mono text-xs">
              Est. {publication.foundedYear}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/members/${publication.slug}`}
        className={cn(
          'flex items-center gap-4 p-4 rounded-xl bg-[var(--color-paper)] border border-[var(--color-mist)] hover-lift hover-border-dot group',
          className
        )}
      >
        {/* Logo */}
        <div className="w-12 h-12 bg-[var(--color-cream)] rounded-xl flex-shrink-0 flex items-center justify-center border border-[var(--color-mist)] group-hover:border-[var(--color-dot)] transition-colors">
          {publication.logo ? (
            <Image
              src={publication.logo.url}
              alt={publication.logo.alt}
              width={32}
              height={32}
              className="object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-lg font-bold text-[var(--color-dot)] opacity-50" aria-hidden="true">
              {publication.name.charAt(0)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--color-ink)] truncate group-hover:text-[var(--color-dot)] transition-colors">
            {publication.name}
          </h3>
          {publication.community && (
            <p className="text-[var(--color-teal)] text-sm truncate">
              {publication.community}
            </p>
          )}
        </div>

        {/* Arrow */}
        <svg
          className="w-4 h-4 text-[var(--color-warm-gray)] group-hover:text-[var(--color-dot)] group-hover:translate-x-1 transition-all flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/members/${publication.slug}`}
      className={cn(
        'rounded-2xl overflow-hidden bg-[var(--color-paper)] border border-[var(--color-mist)] p-6 flex flex-col h-full hover-lift hover-border-dot group relative',
        className
      )}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-dot-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

      {/* Logo */}
      <div className="w-16 h-16 bg-[var(--color-cream)] rounded-xl flex items-center justify-center mb-4 border border-[var(--color-mist)] group-hover:border-[var(--color-dot)] transition-colors">
        {publication.logo ? (
          <Image
            src={publication.logo.url}
            alt={publication.logo.alt}
            width={48}
            height={48}
            className="object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-2xl font-bold text-[var(--color-dot)] opacity-50" aria-hidden="true">
            {publication.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-dot)] transition-colors">
        {publication.name}
      </h3>

      {publication.community && (
        <p className="text-[var(--color-teal)] text-sm font-medium mb-3">
          {publication.community}
        </p>
      )}

      <p className="text-[var(--color-slate)] text-sm leading-relaxed flex-1 mb-4">
        {publication.description}
      </p>

      {/* Link indicator */}
      <div className="flex items-center gap-1 text-[var(--color-warm-gray)] group-hover:text-[var(--color-dot)] text-sm transition-colors">
        <span className="font-medium">View profile</span>
        <svg
          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Corner glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--color-dot)] opacity-0 group-hover:opacity-5 blur-3xl transition-opacity rounded-full" />
    </Link>
  )
}
