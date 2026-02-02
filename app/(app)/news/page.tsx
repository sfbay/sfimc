import Link from 'next/link'
import { Rss, Filter } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload/client'
import { NewsGrid, SearchBar, type NewsItem } from '@/components/news'
import { members } from '@/data/members'
import { getMemberMeta, formatRelativeTime } from '@/lib/news'
import type { Where } from 'payload'

/**
 * News Page - Aggregated feed from all member publications
 *
 * Features:
 * - Real-time RSS data from Payload CMS
 * - Filter by publication and category
 * - Full-text search
 * - Progressive "Load More" pagination
 */

const memberFilters = [
  { value: 'all', label: 'All Publications' },
  ...members.map((m) => ({ value: m.slug, label: m.name })),
]

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
    limit: 20,
    sort: '-pubDate',
  })

  // Get unique categories for filter
  const allItemsResult = await payload.find({
    collection: 'news-items',
    limit: 0,
  })

  const categories = [
    'all',
    ...new Set(
      allItemsResult.docs
        .map((d) => d.category)
        .filter(Boolean) as string[]
    ),
  ].sort()

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

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] py-16 lg:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[var(--color-teal)] opacity-10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[var(--color-dot)] opacity-10 blur-[80px] rounded-full" />
        </div>

        <div className="container relative">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <Rss className="w-4 h-4 text-[var(--color-dot)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                Aggregated Feed
              </span>
            </div>

            <h1 className="display-lg mb-4">
              Community News Feed
              <span className="text-[var(--color-dot)]">.</span>
            </h1>

            <p className="text-xl text-[var(--color-warm-gray)] leading-relaxed">
              The latest journalism from our coalition members — aggregated in one place,
              always linking back to the source.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)] sticky top-0 z-30">
        <div className="container py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Publication filters */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {memberFilters.map((m) => (
                  <Link
                    key={m.value}
                    href={m.value === 'all' ? '/news' : `/news?member=${m.value}`}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeMember === m.value
                        ? 'bg-[var(--color-dot)] text-white'
                        : 'bg-transparent text-[var(--color-warm-gray)] hover:text-white border border-white/20 hover:border-white/40'
                    }`}
                  >
                    {m.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="w-full lg:w-64">
              <SearchBar placeholder="Search stories..." />
            </div>
          </div>

          {/* Category filters + count */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
            <Filter className="w-4 h-4 text-[var(--color-warm-gray)]" />
            <div className="flex gap-1 flex-wrap">
              {categories.map((cat) => {
                const href =
                  cat === 'all'
                    ? activeMember === 'all'
                      ? '/news'
                      : `/news?member=${activeMember}`
                    : activeMember === 'all'
                      ? `/news?category=${cat}`
                      : `/news?member=${activeMember}&category=${cat}`
                return (
                  <Link
                    key={cat}
                    href={href}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-[var(--color-teal)] text-white'
                        : 'text-[var(--color-warm-gray)] hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </Link>
                )
              })}
            </div>
            <span className="text-[var(--color-warm-gray)] text-sm ml-auto">
              {result.totalDocs} stories
            </span>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="section section-paper">
        <div className="container">
          {newsItems.length > 0 ? (
            <NewsGrid
              initialItems={newsItems}
              initialTotal={result.totalDocs}
              initialHasMore={result.hasNextPage}
              filters={{
                member: activeMember !== 'all' ? activeMember : undefined,
                category: activeCategory !== 'all' ? activeCategory : undefined,
                search: searchQuery || undefined,
              }}
              showFeatured={!hasFiltersActive}
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

      {/* RSS Subscribe CTA */}
      <section className="section section-cream">
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
