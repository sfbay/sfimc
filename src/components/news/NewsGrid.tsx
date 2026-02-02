'use client'

import { useState, useCallback } from 'react'
import { StoryCard } from '@/components/cards'
import { Loader2 } from 'lucide-react'

/**
 * NewsGrid - Client component for progressive loading of news items
 *
 * Handles "Load More" pagination with optimistic UI.
 * Transforms API response to StoryCard props format.
 */

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  publication: string
  publicationSlug: string
  publicationLogo?: string
  publicationColor: string
  category: string
  timeAgo: string
  pubDate: string
  href: string
  imageUrl?: string
  featured?: boolean
}

interface NewsGridProps {
  /** Initial items from server render */
  initialItems: NewsItem[]
  /** Total count from initial query */
  initialTotal: number
  /** Whether there are more items to load */
  initialHasMore: boolean
  /** Active filters to pass to API */
  filters?: {
    member?: string
    category?: string
    search?: string
  }
  /** Show featured story at top */
  showFeatured?: boolean
}

export function NewsGrid({
  initialItems,
  initialTotal,
  initialHasMore,
  filters = {},
  showFeatured = true,
}: NewsGridProps) {
  const [items, setItems] = useState<NewsItem[]>(initialItems)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Split featured from grid items
  const featuredItem = showFeatured && !filters.member && !filters.category && !filters.search
    ? items[0]
    : null
  const gridItems = featuredItem ? items.slice(1) : items

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        offset: items.length.toString(),
        limit: '20',
      })

      if (filters.member) params.set('member', filters.member)
      if (filters.category) params.set('category', filters.category)
      if (filters.search) params.set('search', filters.search)

      const res = await fetch(`/api/news?${params}`)

      if (!res.ok) {
        throw new Error('Failed to load more stories')
      }

      const data = await res.json()

      setItems((prev) => [...prev, ...data.stories])
      setHasMore(data.hasMore)
    } catch (err) {
      console.error('Failed to load more:', err)
      setError(err instanceof Error ? err.message : 'Failed to load more stories')
    } finally {
      setIsLoading(false)
    }
  }, [items.length, hasMore, isLoading, filters])

  // Transform NewsItem to StoryCard props
  const toStoryCardProps = (item: NewsItem) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    url: item.href,
    publishedAt: item.pubDate,
    source: {
      name: item.publication,
      slug: item.publicationSlug,
      logo: item.publicationLogo ? { url: item.publicationLogo, alt: item.publication } : undefined,
    },
    image: item.imageUrl ? { url: item.imageUrl, alt: '' } : undefined,
    category: item.category,
  })

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Featured Story */}
      {featuredItem && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-[var(--color-dot)] rounded-full" />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
              Latest Story
            </span>
          </div>
          <div className="max-w-4xl">
            <StoryCard
              story={toStoryCardProps(featuredItem)}
              variant="featured"
            />
          </div>
        </div>
      )}

      {/* Grid of Stories */}
      {gridItems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main feed - larger cards */}
          <div className="lg:col-span-2 space-y-6">
            {gridItems.slice(0, 5).map((item) => (
              <StoryCard
                key={item.id}
                story={toStoryCardProps(item)}
                variant="horizontal"
              />
            ))}
          </div>

          {/* Sidebar - compact cards */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)] mb-4">
              More Stories
            </h3>
            {gridItems.slice(5, 10).map((item) => (
              <StoryCard
                key={item.id}
                story={toStoryCardProps(item)}
                variant="compact"
              />
            ))}
          </div>
        </div>
      )}

      {/* Additional stories below fold */}
      {gridItems.length > 10 && (
        <div className="mt-12 pt-8 border-t border-[var(--color-mist)]">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)] mb-6">
            Earlier Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridItems.slice(10).map((item) => (
              <StoryCard
                key={item.id}
                story={toStoryCardProps(item)}
                variant="default"
              />
            ))}
          </div>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              'Load more stories'
            )}
          </button>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center mt-8">
          <p className="text-red-500 text-sm mb-2">{error}</p>
          <button
            onClick={loadMore}
            className="text-[var(--color-dot)] text-sm font-medium hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
