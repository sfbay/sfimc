'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { PublisherAvatar } from '@/components/publishers'
import { StoryCard, type Story } from '@/components/cards'

interface PublisherLaneProps {
  /** Publisher info */
  publisher: {
    name: string
    slug: string
    logo?: string
    color: string
  }
  /** Stories for this publisher */
  stories: Story[]
  /** Max stories to show (default: 5) */
  maxStories?: number
  /** Show "View all" link */
  showViewAll?: boolean
  className?: string
}

/**
 * PublisherLane - Horizontal lane of stories grouped by publisher
 *
 * Features:
 * - Large publisher header with logo and brand color
 * - Horizontal scrolling stories
 * - "View all" link to publisher filtered view
 * - Brand color accents
 */
export function PublisherLane({
  publisher,
  stories,
  maxStories = 5,
  showViewAll = true,
  className,
}: PublisherLaneProps) {
  const displayStories = stories.slice(0, maxStories)

  if (displayStories.length === 0) {
    return null
  }

  return (
    <div className={cn('', className)}>
      {/* Publisher Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <PublisherAvatar
            name={publisher.name}
            logo={publisher.logo}
            color={publisher.color}
            size="xl"
          />
          <div>
            <h3
              className="font-[family-name:var(--font-display)] text-xl font-semibold"
              style={{ color: publisher.color }}
            >
              {publisher.name}
            </h3>
            <p className="text-sm text-[var(--color-warm-gray)]">
              {stories.length} {stories.length === 1 ? 'story' : 'stories'}
            </p>
          </div>
        </div>

        {showViewAll && stories.length > maxStories && (
          <Link
            href={`/news?member=${publisher.slug}`}
            className="flex items-center gap-1 text-sm font-medium hover:underline transition-colors"
            style={{ color: publisher.color }}
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative -mx-4 px-4">
        {/* Fade indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--color-cream)] to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--color-cream)] to-transparent z-10 pointer-events-none" />

        <div className="overflow-x-auto scrollbar-hide pb-4">
          <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
            {displayStories.map((story) => (
              <div key={story.id} className="w-[300px] flex-shrink-0">
                <StoryCard
                  story={{
                    ...story,
                    source: {
                      ...story.source,
                      color: publisher.color,
                    },
                  }}
                  variant="publisher-branded"
                  showSource={false}
                />
              </div>
            ))}

            {/* View All Card */}
            {showViewAll && stories.length > maxStories && (
              <Link
                href={`/news?member=${publisher.slug}`}
                className="w-[200px] flex-shrink-0 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 hover:border-solid transition-all"
                style={{ borderColor: publisher.color }}
              >
                <span
                  className="text-4xl font-bold mb-2"
                  style={{ color: publisher.color }}
                >
                  +{stories.length - maxStories}
                </span>
                <span className="text-sm text-[var(--color-warm-gray)] text-center">
                  more stories
                </span>
                <span
                  className="mt-4 text-sm font-medium flex items-center gap-1"
                  style={{ color: publisher.color }}
                >
                  View all
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
