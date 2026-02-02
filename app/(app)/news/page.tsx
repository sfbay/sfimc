import Link from 'next/link'
import { Rss } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload/client'
import {
  SearchBar,
  NewsFeedHero,
  PublisherFilterBar,
  NewsFeedMasonry,
  CoalitionLogoStrip,
  type NewsItem,
  type PublisherFilter,
  type HeroPublisher,
  type CoalitionMember,
} from '@/components/news'
import { CategoryDropdown } from '@/components/news/CategoryDropdown'
import { members } from '@/data/members'
import { getMemberMeta, formatRelativeTime } from '@/lib/news'
import type { Where } from 'payload'

/**
 * News Page - Aggregated feed from all member publications
 *
 * Redesigned for elegance and efficiency:
 * - Compact hero bar with live indicator
 * - Prominent publisher filter with large logos
 * - Category dropdown (not sprawling list)
 * - Content visible immediately
 */

interface PageProps {
  searchParams: Promise<{ member?: string; category?: string; search?: string }>
}

export const metadata = {
  title: 'News Feed | SFIMC',
  description: 'The latest journalism from San Francisco Independent Media Coalition members.',
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeMember = params.member || 'all'
  const activeCategory = params.category || 'all'
  const searchQuery = params.search || ''

  // Query Payload for news items
  const payload = await getPayloadClient()

  // Build where clause for Payload query
  const where: Where = {}

  if (activeMember !== 'all') {
    where.memberSlug = { equals: activeMember }
  }

  if (activeCategory !== 'all') {
    where.category = { equals: activeCategory }
  }

  if (searchQuery) {
    where.or = [
      { title: { contains: searchQuery } },
      { description: { contains: searchQuery } },
    ]
  }

  // Fetch news items
  const result = await payload.find({
    collection: 'news-items',
    where,
    limit: 30,
    sort: '-pubDate',
  })

  // Get all items for category and publisher counts
  const allItemsResult = await payload.find({
    collection: 'news-items',
    limit: 0,
  })

  // Get unique categories with counts
  const categoryCounts: Record<string, number> = {}
  allItemsResult.docs.forEach((doc) => {
    const cat = doc.category as string
    if (cat) {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    }
  })

  const categories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))

  // Calculate story counts per publisher
  const publisherCounts: Record<string, number> = {}
  allItemsResult.docs.forEach((doc) => {
    const slug = doc.memberSlug as string
    if (slug) {
      publisherCounts[slug] = (publisherCounts[slug] || 0) + 1
    }
  })

  // Build publisher data for components
  const publisherFilters: PublisherFilter[] = members
    .map((m) => {
      const meta = getMemberMeta(m.slug)
      return {
        slug: m.slug,
        name: m.name,
        logo: meta.logo || undefined,
        color: m.color || '#78716c',
        storyCount: publisherCounts[m.slug] || 0,
      }
    })
    .filter((p) => p.storyCount > 0)
    .sort((a, b) => b.storyCount - a.storyCount)

  const heroPublishers: HeroPublisher[] = publisherFilters.map((p) => ({
    name: p.name,
    slug: p.slug,
    logo: p.logo,
    color: p.color,
  }))

  const coalitionMembers: CoalitionMember[] = members.map((m) => {
    const meta = getMemberMeta(m.slug)
    return {
      name: m.name,
      slug: m.slug,
      logo: meta.logo || undefined,
      color: m.color || '#78716c',
      hasRecentStories: (publisherCounts[m.slug] || 0) > 0,
    }
  })

  // Transform to NewsItem format
  const newsItems: NewsItem[] = result.docs.map((doc) => {
    const meta = getMemberMeta(doc.memberSlug as string)

    return {
      id: String(doc.id),
      title: doc.title as string,
      excerpt: (doc.description as string) || '',
      publication: meta.name,
      publicationSlug: (doc.memberSlug as string) || '',
      publicationLogo: meta.logo || undefined,
      publicationColor: meta.color,
      category: (doc.category as string) || 'News',
      timeAgo: formatRelativeTime(doc.pubDate as string),
      pubDate: doc.pubDate as string,
      href: doc.url as string,
      imageUrl: (doc.image as string) || undefined,
      featured: doc.featured as boolean || false,
    }
  })

  const hasFiltersActive = activeMember !== 'all' || activeCategory !== 'all' || searchQuery
  const activePublisherCount = publisherFilters.length

  return (
    <>
      {/* Compact Hero */}
      <NewsFeedHero
        storyCount={allItemsResult.totalDocs}
        publisherCount={activePublisherCount}
      />

      {/* Sticky Filter Bar */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)] sticky top-0 z-30">
        <div className="container py-4">
          {/* Publisher Filter Bar - Main Feature */}
          <PublisherFilterBar
            publishers={publisherFilters}
            activePublisher={activeMember}
            baseUrl="/news"
          />

          {/* Secondary row: Category dropdown + Search */}
          <div className="flex items-center gap-3 pt-3">
            {/* Category Dropdown */}
            <CategoryDropdown
              categories={categories}
              activeCategory={activeCategory}
              activeMember={activeMember}
            />

            {/* Active filter indicator */}
            {hasFiltersActive && (
              <Link
                href="/news"
                className="text-xs text-[var(--color-warm-gray)] hover:text-white transition-colors"
              >
                Clear filters
              </Link>
            )}

            {/* Search - pushed to right */}
            <div className="ml-auto w-full max-w-[200px] lg:max-w-[240px]">
              <SearchBar placeholder="Search..." />
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="section section-paper py-5">
        <div className="container">
          {newsItems.length > 0 ? (
            <NewsFeedMasonry
              initialItems={newsItems}
              initialTotal={result.totalDocs}
              initialHasMore={result.hasNextPage}
              filters={{
                member: activeMember !== 'all' ? activeMember : undefined,
                category: activeCategory !== 'all' ? activeCategory : undefined,
                search: searchQuery || undefined,
              }}
              showFeatured={!hasFiltersActive}
              publishers={heroPublishers}
            />
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[var(--color-mist)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Rss className="w-6 h-6 text-[var(--color-warm-gray)]" />
              </div>
              <p className="text-[var(--color-warm-gray)] text-lg mb-2">
                {searchQuery ? 'No stories match your search' : 'No stories found'}
              </p>
              <p className="text-[var(--color-slate)] text-sm mb-4">
                {searchQuery
                  ? 'Try adjusting your search terms or clear filters.'
                  : 'Check back later for new stories from our members.'}
              </p>
              {hasFiltersActive && (
                <Link href="/news" className="text-[var(--color-dot)] font-medium hover:underline">
                  View all stories →
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Coalition Footer */}
      <section className="section section-cream py-8">
        <div className="container">
          <CoalitionLogoStrip
            members={coalitionMembers}
            activeMember={activeMember !== 'all' ? activeMember : undefined}
            baseUrl="/news"
            showTagline
            variant="light"
          />
        </div>
      </section>

      {/* RSS Subscribe CTA */}
      <section className="section section-paper py-10 border-t border-[var(--color-mist)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 bg-[var(--color-dot)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Rss className="w-6 h-6 text-[var(--color-dot)]" />
            </div>
            <h2 className="text-2xl font-semibold text-[var(--color-ink)] mb-2">
              Subscribe to our feed
            </h2>
            <p className="text-[var(--color-slate)] mb-6">
              Get stories from all coalition members in your favorite feed reader,
              or sign up for our weekly newsletter digest.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/api/rss"
                className="btn btn-outline flex items-center gap-2"
              >
                <Rss className="w-4 h-4" />
                RSS Feed
              </Link>
              <Link
                href="#newsletter"
                className="btn btn-dot"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Revalidate every 5 minutes
export const revalidate = 300
