'use client'

import { cn } from '@/lib/utils'
import { Rss } from 'lucide-react'

interface NewsFeedHeroProps {
  /** Total number of stories */
  storyCount: number
  /** Number of active publishers with stories */
  publisherCount: number
  /** Last updated timestamp */
  lastUpdated?: Date
  className?: string
}

/**
 * Format time in AP style: "5:12 a.m." or "11:45 p.m."
 */
function formatAPTime(date: Date): string {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'p.m.' : 'a.m.'
  const displayHours = hours % 12 || 12
  const displayMinutes = minutes.toString().padStart(2, '0')
  return `${displayHours}:${displayMinutes} ${ampm}`
}

/**
 * NewsFeedHero - Compact, elegant hero for news feed
 *
 * Slimmed down design:
 * - Single row with live indicator, title, and stats
 * - AP-style updated time
 * - Gets users to content faster
 */
export function NewsFeedHero({
  storyCount,
  publisherCount,
  lastUpdated = new Date(),
  className,
}: NewsFeedHeroProps) {
  return (
    <section
      className={cn(
        'relative bg-[var(--color-ink)] text-[var(--color-paper)] py-4',
        className
      )}
    >
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[var(--color-dot)] opacity-[0.07] blur-[80px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-[var(--color-teal)] opacity-[0.07] blur-[60px] rounded-full" />
      </div>

      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left: Title with live indicator */}
          <div className="flex items-center gap-4">
            {/* Live indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-dot)]/15 rounded-full border border-[var(--color-dot)]/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-dot)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-dot)]" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-dot)] font-semibold">
                Live
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-[family-name:var(--font-display)] font-bold">
              News Feed
              <span className="text-[var(--color-dot)] animate-dot-blink">.</span>
            </h1>
          </div>

          {/* Right: Stats + Updated time */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Rss className="w-4 h-4 text-[var(--color-teal)]" />
              <span>
                <span className="font-semibold text-[var(--color-paper)]">{storyCount}</span>
                <span className="text-[var(--color-warm-gray)]"> stories</span>
              </span>
            </div>
            <span className="text-[var(--color-warm-gray)]/40">|</span>
            <span>
              <span className="font-semibold text-[var(--color-teal-light)]">{publisherCount}</span>
              <span className="text-[var(--color-warm-gray)]"> publications</span>
            </span>
            <span className="text-[var(--color-warm-gray)]/40">|</span>
            <span className="text-[var(--color-warm-gray)]">
              Updated {formatAPTime(lastUpdated)}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
