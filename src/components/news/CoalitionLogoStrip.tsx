'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { PublisherAvatar } from '@/components/publishers'

export interface CoalitionMember {
  name: string
  slug: string
  logo?: string
  color: string
  hasRecentStories?: boolean
}

interface CoalitionLogoStripProps {
  /** All coalition members */
  members: CoalitionMember[]
  /** Currently selected member (optional) */
  activeMember?: string
  /** Base URL for filtering */
  baseUrl?: string
  /** Show tagline */
  showTagline?: boolean
  /** Variant style */
  variant?: 'light' | 'dark'
  className?: string
}

/**
 * CoalitionLogoStrip - All publisher logos in a row
 *
 * Features:
 * - All 14 publisher logos displayed
 * - Click to filter
 * - Activity indicators (green dot for recent stories)
 * - Coalition tagline
 */
export function CoalitionLogoStrip({
  members,
  activeMember,
  baseUrl = '/news',
  showTagline = true,
  variant = 'light',
  className,
}: CoalitionLogoStripProps) {
  const isDark = variant === 'dark'

  return (
    <div
      className={cn(
        'py-8 px-6 rounded-2xl',
        isDark
          ? 'bg-[var(--color-ink)]'
          : 'bg-gradient-to-br from-[var(--color-cream)] to-white border border-[var(--color-mist)]',
        className
      )}
    >
      {/* Tagline */}
      {showTagline && (
        <div className="text-center mb-6">
          <p
            className={cn(
              'text-lg font-[family-name:var(--font-display)]',
              isDark ? 'text-[var(--color-paper)]' : 'text-[var(--color-ink)]'
            )}
          >
            <span className="font-bold">{members.length} voices</span>
            <span className="text-[var(--color-dot)]">.</span>
            {' '}One coalition
            <span className="text-[var(--color-teal)]">.</span>
            {' '}All San Francisco
            <span className="text-[var(--color-gold)]">.</span>
          </p>
        </div>
      )}

      {/* Logo Grid */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {members.map((member) => {
          const isActive = activeMember === member.slug
          const href = isActive ? baseUrl : `${baseUrl}?member=${member.slug}`

          return (
            <Link
              key={member.slug}
              href={href}
              className={cn(
                'relative p-2 rounded-xl transition-all group',
                isActive
                  ? 'ring-2 ring-offset-2 ring-[var(--color-dot)]'
                  : isDark
                    ? 'hover:bg-white/10'
                    : 'hover:bg-[var(--color-mist)]'
              )}
              title={member.name}
            >
              <PublisherAvatar
                name={member.name}
                logo={member.logo}
                color={member.color}
                size="lg"
              />

              {/* Activity indicator */}
              {member.hasRecentStories && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[var(--color-teal)] rounded-full border-2 border-white" />
              )}

              {/* Hover tooltip */}
              <span
                className={cn(
                  'absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap',
                  'text-xs font-medium px-2 py-1 rounded',
                  'opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none',
                  isDark
                    ? 'bg-white text-[var(--color-ink)]'
                    : 'bg-[var(--color-ink)] text-white'
                )}
              >
                {member.name}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Clear filter link */}
      {activeMember && (
        <div className="text-center mt-4">
          <Link
            href={baseUrl}
            className={cn(
              'text-sm font-medium hover:underline',
              isDark ? 'text-[var(--color-dot)]' : 'text-[var(--color-teal)]'
            )}
          >
            Clear filter - View all publications
          </Link>
        </div>
      )}
    </div>
  )
}
