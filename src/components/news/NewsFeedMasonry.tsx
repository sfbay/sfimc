'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2, Grid3X3, Layers } from 'lucide-react'
import { StoryCard, type Story } from '@/components/cards'
import { PublisherAvatar } from '@/components/publishers'
import { PublisherLane } from './PublisherLane'
import Link from 'next/link'
import Image from 'next/image'

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

export interface HeroPublisher {
  name: string
  slug: string
  logo?: string
  color: string
}

interface NewsFeedMasonryProps {
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
  /** Available publishers for lanes view */
  publishers?: HeroPublisher[]
  className?: string
}

type ViewMode = 'timeline' | 'by-publisher'

/**
 * NewsFeedMasonry - Enhanced news feed with multiple layout zones
 *
 * Features:
 * - View mode toggle (Timeline vs By Publisher)
 * - Zone A: Hero story
 * - Zone B: Publisher spotlight sidebar
 * - Zone C: Masonry grid
 * - Zone D: Publisher lanes (alternate view)
 * - Infinite scroll
 */
export function NewsFeedMasonry({
  initialItems,
  initialTotal,
  initialHasMore,
  filters = {},
  showFeatured = true,
  publishers = [],
  className,
}: NewsFeedMasonryProps) {
  const [items, setItems] = useState<NewsItem[]>(initialItems)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('timeline')
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Persist view mode preference
  useEffect(() => {
    const saved = localStorage.getItem('sfimc-news-view-mode') as ViewMode | null
    if (saved) setViewMode(saved)
  }, [])

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem('sfimc-news-view-mode', mode)
  }

  // Transform NewsItem to Story format
  const toStory = (item: NewsItem): Story => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    url: item.href,
    publishedAt: item.pubDate,
    source: {
      name: item.publication,
      slug: item.publicationSlug,
      logo: item.publicationLogo ? { url: item.publicationLogo, alt: item.publication } : undefined,
      color: item.publicationColor,
    },
    image: item.imageUrl ? { url: item.imageUrl, alt: '' } : undefined,
    category: item.category,
  })

  // Split items by layout zone
  const hasFilters = filters.member || filters.category || filters.search
  const heroItem = showFeatured && !hasFilters && items.length > 0 ? items[0] : null
  const gridItems = heroItem ? items.slice(1) : items

  // Publisher spotlight carousel - only publishers with stories
  const publishersWithStories = publishers.filter(
    (pub) => items.some((i) => i.publicationSlug === pub.slug)
  )
  const [spotlightIndex, setSpotlightIndex] = useState(0)

  // Auto-rotate spotlight every 8 seconds
  useEffect(() => {
    if (hasFilters || publishersWithStories.length <= 1) return

    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % publishersWithStories.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [hasFilters, publishersWithStories.length])

  const spotlightPublisher = !hasFilters && publishersWithStories.length > 0
    ? publishersWithStories[spotlightIndex % publishersWithStories.length]
    : null
  const spotlightItems = spotlightPublisher
    ? items.filter((i) => i.publicationSlug === spotlightPublisher.slug).slice(0, 3)
    : []

  // Group items by publisher for lanes view
  const itemsByPublisher = publishers.reduce((acc, pub) => {
    acc[pub.slug] = items.filter((i) => i.publicationSlug === pub.slug)
    return acc
  }, {} as Record<string, NewsItem[]>)

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

      if (!res.ok) throw new Error('Failed to load more stories')

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

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0, rootMargin: '200px' }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, loadMore])

  if (items.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* View Mode Toggle */}
      {!hasFilters && publishers.length > 0 && (
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-1 p-1 bg-[var(--color-mist)] rounded-lg">
            <button
              onClick={() => handleViewModeChange('timeline')}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                viewMode === 'timeline'
                  ? 'bg-white text-[var(--color-ink)] shadow-sm'
                  : 'text-[var(--color-warm-gray)] hover:text-[var(--color-ink)]'
              )}
            >
              <Grid3X3 className="w-4 h-4" />
              Timeline
            </button>
            <button
              onClick={() => handleViewModeChange('by-publisher')}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                viewMode === 'by-publisher'
                  ? 'bg-white text-[var(--color-ink)] shadow-sm'
                  : 'text-[var(--color-warm-gray)] hover:text-[var(--color-ink)]'
              )}
            >
              <Layers className="w-4 h-4" />
              By Publisher
            </button>
          </div>
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <>
          {/* Zone A: Hero Story */}
          {heroItem && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-dot)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-dot)]" />
                </span>
                <span className="font-mono text-sm uppercase tracking-wider text-[var(--color-slate)] font-semibold">
                  Latest Story
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <StoryCard
                    story={toStory(heroItem)}
                    variant="featured"
                  />
                </div>

                {/* Zone B: Publisher Spotlight Carousel */}
                {spotlightPublisher && spotlightItems.length > 0 && (
                  <div className="space-y-4">
                    <div
                      key={spotlightPublisher.slug}
                      className="p-4 rounded-xl transition-all duration-500 animate-fade-in"
                      style={{
                        background: `linear-gradient(135deg, ${spotlightPublisher.color}15 0%, transparent 100%)`,
                        borderLeft: `4px solid ${spotlightPublisher.color}`,
                      }}
                    >
                      <div className="mb-4">
                        <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)] block mb-3">
                          Publisher Spotlight
                        </span>
                        {spotlightPublisher.logo ? (
                          <Image
                            src={spotlightPublisher.logo}
                            alt={spotlightPublisher.name}
                            width={200}
                            height={60}
                            className="h-12 w-auto object-contain"
                          />
                        ) : (
                          <div className="flex items-center gap-3">
                            <PublisherAvatar
                              name={spotlightPublisher.name}
                              color={spotlightPublisher.color}
                              size="lg"
                            />
                            <h3
                              className="font-semibold text-lg"
                              style={{ color: spotlightPublisher.color }}
                            >
                              {spotlightPublisher.name}
                            </h3>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {spotlightItems.map((item) => (
                          <StoryCard
                            key={item.id}
                            story={toStory(item)}
                            variant="compact"
                            showSource={false}
                          />
                        ))}
                      </div>

                      <Link
                        href={`/news?member=${spotlightPublisher.slug}`}
                        className="block mt-4 text-sm font-medium text-center py-2 rounded-lg hover:bg-white/50 transition-colors"
                        style={{ color: spotlightPublisher.color }}
                      >
                        More from {spotlightPublisher.name} →
                      </Link>

                      {/* Carousel dots */}
                      {publishersWithStories.length > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-black/5">
                          {publishersWithStories.map((pub, idx) => (
                            <button
                              key={pub.slug}
                              onClick={() => setSpotlightIndex(idx)}
                              className={cn(
                                'w-2 h-2 rounded-full transition-all',
                                idx === spotlightIndex % publishersWithStories.length
                                  ? 'w-4'
                                  : 'opacity-40 hover:opacity-70'
                              )}
                              style={{
                                backgroundColor:
                                  idx === spotlightIndex % publishersWithStories.length
                                    ? spotlightPublisher.color
                                    : '#9ca3af',
                              }}
                              aria-label={`View ${pub.name} spotlight`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Zone C: Story Grid */}
          {gridItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-masonry-reveal"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <StoryCard
                    story={toStory(item)}
                    variant="publisher-branded"
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* By Publisher View - Zone D: Publisher Lanes */}
      {viewMode === 'by-publisher' && (
        <div className="space-y-8">
          {publishers
            .filter((pub) => itemsByPublisher[pub.slug]?.length > 0)
            .map((pub) => (
              <PublisherLane
                key={pub.slug}
                publisher={pub}
                stories={itemsByPublisher[pub.slug].map(toStory)}
                maxStories={5}
                showViewAll
              />
            ))}
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} className="h-4" />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--color-dot)]" />
          <span className="ml-2 text-[var(--color-warm-gray)]">Loading more stories...</span>
        </div>
      )}

      {/* End State */}
      {!hasMore && items.length > 10 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-cream)] rounded-full text-[var(--color-warm-gray)]">
            <span className="w-2 h-2 bg-[var(--color-teal)] rounded-full" />
            <span className="text-sm font-medium">You&apos;re all caught up!</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
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
