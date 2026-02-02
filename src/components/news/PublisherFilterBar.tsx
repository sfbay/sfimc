'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { PublisherAvatar } from '@/components/publishers'

export interface PublisherFilter {
  slug: string
  name: string
  logo?: string
  color: string
  storyCount: number
}

interface PublisherFilterBarProps {
  publishers: PublisherFilter[]
  activePublisher: string
  baseUrl?: string
  className?: string
}

/**
 * PublisherFilterBar - Prominent publisher filter with logos and names
 *
 * Features:
 * - Flex-wrap layout to show all publishers
 * - Publisher logos with names
 * - Story counts
 * - Brand colors on selection
 */
export function PublisherFilterBar({
  publishers,
  activePublisher,
  baseUrl = '/news',
  className,
}: PublisherFilterBarProps) {
  return (
    <div className={cn('', className)}>
      {/* Flex-wrap container - shows all publishers */}
      <div className="flex flex-wrap items-center gap-3">
        {/* All Publications */}
        <Link
          href={baseUrl}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
            activePublisher === 'all'
              ? 'bg-[var(--color-dot)] text-white shadow-lg shadow-[var(--color-dot)]/25'
              : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
          )}
        >
          <span className="w-2 h-2 rounded-full bg-current" />
          <span>All</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10 mx-1" />

        {/* Publisher pills - will wrap to multiple lines */}
        {publishers.map((publisher) => {
          const isActive = activePublisher === publisher.slug
          const href = `${baseUrl}?member=${publisher.slug}`

          return (
            <Link
              key={publisher.slug}
              href={href}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap group',
                isActive
                  ? 'text-white shadow-lg'
                  : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
              )}
              style={
                isActive
                  ? {
                      backgroundColor: publisher.color,
                      boxShadow: `0 4px 14px ${publisher.color}40`,
                    }
                  : undefined
              }
              title={publisher.name}
            >
              <PublisherAvatar
                name={publisher.name}
                logo={publisher.logo}
                color={isActive ? '#ffffff' : publisher.color}
                size="sm"
                className={cn(
                  'ring-2 transition-all',
                  isActive
                    ? 'ring-white/30'
                    : 'ring-transparent group-hover:ring-white/20'
                )}
              />
              <span className="max-w-[120px] truncate">
                {publisher.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
