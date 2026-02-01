'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef, useCallback } from 'react'

/**
 * LiveStoryFeed - A dynamic teaser of recent stories from member publications
 *
 * Design: Newsroom ticker energy meets editorial grid
 * Stories flow in like a live feed, enticing visitors to explore
 */

interface Story {
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
}

interface StoriesResponse {
  stories: Story[]
  total: number
  hasMore: boolean
  fetchedAt: string
  feedsSuccessful: number
  feedsTotal: number
}

export function LiveStoryFeed() {
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastFetched, setLastFetched] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch stories from API
  const fetchStories = useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/stories?limit=5')
      if (!res.ok) throw new Error('Failed to fetch stories')

      const data: StoriesResponse = await res.json()
      setStories(data.stories)
      setLastFetched(data.fetchedAt)
    } catch (err) {
      console.error('Error fetching stories:', err)
      setError(err instanceof Error ? err.message : 'Failed to load stories')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchStories()
  }, [fetchStories])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    refreshIntervalRef.current = setInterval(() => {
      fetchStories(false) // Silent refresh
    }, 5 * 60 * 1000)

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
    }
  }, [fetchStories])

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Loading skeleton
  if (isLoading && stories.length === 0) {
    return (
      <section ref={sectionRef} className="live-story-feed">
        <div className="container">
          <header className="live-story-feed-header">
            <div className="live-story-feed-title-group">
              <div className="live-indicator" aria-hidden="true">
                <span className="live-indicator-dot" />
                <span className="live-indicator-text">Loading</span>
              </div>
              <h2 className="live-story-feed-title">
                From Our Members<span className="text-[var(--color-dot)]">.</span>
              </h2>
            </div>
          </header>

          <div className="live-story-grid">
            {/* Skeleton cards */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`live-story-card live-story-skeleton ${i === 0 ? 'live-story-card-featured' : ''}`}
              >
                <div className="live-story-card-inner">
                  <div className="live-story-skeleton-meta" />
                  <div className="live-story-skeleton-title" />
                  {i === 0 && <div className="live-story-skeleton-excerpt" />}
                  <div className="live-story-skeleton-category" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error && stories.length === 0) {
    return (
      <section ref={sectionRef} className="live-story-feed">
        <div className="container">
          <header className="live-story-feed-header">
            <div className="live-story-feed-title-group">
              <h2 className="live-story-feed-title">
                From Our Members<span className="text-[var(--color-dot)]">.</span>
              </h2>
            </div>
          </header>

          <div className="live-story-error">
            <p>Unable to load stories right now.</p>
            <button onClick={() => fetchStories()} className="live-story-error-retry">
              Try again
            </button>
          </div>
        </div>
      </section>
    )
  }

  // No stories
  if (stories.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="live-story-feed">
      <div className="container">
        {/* Section header with live indicator */}
        <header className="live-story-feed-header">
          <div className="live-story-feed-title-group">
            <div className="live-indicator" aria-hidden="true">
              <span className="live-indicator-dot" />
              <span className="live-indicator-text">Live Feed</span>
            </div>
            <h2 className="live-story-feed-title">
              From Our Members<span className="text-[var(--color-dot)]">.</span>
            </h2>
            <p className="live-story-feed-subtitle">
              Real stories, real impact — updated as our members publish
            </p>
          </div>
          <Link href="/news" className="live-story-feed-more">
            <span>View all stories</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </header>

        {/* Story grid */}
        <div className="live-story-grid">
          {/* Featured story - large card */}
          {stories[0] && (
            <article
              className={`live-story-card live-story-card-featured ${isVisible ? 'animate-in' : ''}`}
              style={{ '--story-color': stories[0].publicationColor, '--delay': '0' } as React.CSSProperties}
            >
              <a
                href={stories[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="live-story-card-inner"
              >
                <div className="live-story-card-meta">
                  {stories[0].publicationLogo && (
                    <Image
                      src={stories[0].publicationLogo}
                      alt={stories[0].publication}
                      width={24}
                      height={24}
                      className="live-story-pub-logo"
                    />
                  )}
                  <span className="live-story-pub-name">{stories[0].publication}</span>
                  <span className="live-story-separator">·</span>
                  <span className="live-story-time">{stories[0].timeAgo}</span>
                </div>
                <h3 className="live-story-title">{stories[0].title}</h3>
                <p className="live-story-excerpt">{stories[0].excerpt}</p>
                <div className="live-story-category">
                  <span className="live-story-category-tag">{stories[0].category}</span>
                </div>
              </a>
            </article>
          )}

          {/* Secondary stories - smaller cards */}
          {stories.slice(1).map((story, index) => (
            <article
              key={story.id}
              className={`live-story-card ${isVisible ? 'animate-in' : ''}`}
              style={{ '--story-color': story.publicationColor, '--delay': index + 1 } as React.CSSProperties}
            >
              <a
                href={story.href}
                target="_blank"
                rel="noopener noreferrer"
                className="live-story-card-inner"
              >
                <div className="live-story-card-meta">
                  {story.publicationLogo && (
                    <Image
                      src={story.publicationLogo}
                      alt={story.publication}
                      width={20}
                      height={20}
                      className="live-story-pub-logo"
                    />
                  )}
                  <span className="live-story-pub-name">{story.publication}</span>
                  <span className="live-story-separator">·</span>
                  <span className="live-story-time">{story.timeAgo}</span>
                </div>
                <h3 className="live-story-title">{story.title}</h3>
                <div className="live-story-category">
                  <span className="live-story-category-tag">{story.category}</span>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* Publisher logo strip */}
        <div className="live-story-publishers">
          <span className="live-story-publishers-label">Stories from</span>
          <div className="live-story-publishers-logos">
            {/* Deduplicate and show unique publication logos */}
            {Array.from(new Set(stories.map((s) => s.publicationSlug))).map((slug) => {
              const story = stories.find((s) => s.publicationSlug === slug)
              return story?.publicationLogo ? (
                <Image
                  key={slug}
                  src={story.publicationLogo}
                  alt={story.publication}
                  width={32}
                  height={32}
                  className="live-story-publishers-logo"
                />
              ) : null
            })}
            <span className="live-story-publishers-more">+6 more</span>
          </div>
        </div>

        {/* Last updated indicator */}
        {lastFetched && (
          <div className="live-story-updated" aria-live="polite">
            <span>
              Updated {new Date(lastFetched).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
