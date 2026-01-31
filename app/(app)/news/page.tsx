import Link from 'next/link'
import { StoryCard } from '@/components/cards'
import { members } from '@/data/members'
import { Rss, Filter } from 'lucide-react'

// Placeholder data - will be replaced with Payload queries from RSS aggregator
const newsItems = [
  {
    id: '1',
    title: "California's New AI Safety Law Created the Illusion of Whistleblower Protections",
    url: 'https://sfpublicpress.org',
    excerpt: 'A deep dive into the gaps between promised protections and reality in California\'s landmark AI legislation.',
    source: { name: 'SF Public Press', slug: 'sf-public-press' },
    publishedAt: '2025-12-28T10:00:00Z',
    category: 'Investigation',
  },
  {
    id: '2',
    title: "'We're here to create something positive': Pop-up at 16th St. BART seeks to activate plaza",
    url: 'https://missionlocal.org',
    excerpt: 'Community organizers launch initiative to transform unused public space into vibrant gathering area.',
    source: { name: 'Mission Local', slug: 'mission-local' },
    publishedAt: '2025-12-27T14:30:00Z',
    category: 'Community',
  },
  {
    id: '3',
    title: 'Oasis saved! – Popular nightclub receives emergency donation',
    url: 'https://ebar.com',
    excerpt: 'After announcing permanent closure, the iconic LGBTQ+ venue gets a last-minute lifeline from an anonymous donor.',
    source: { name: 'Bay Area Reporter', slug: 'bay-area-reporter' },
    publishedAt: '2025-12-26T09:15:00Z',
    category: 'Culture',
  },
  {
    id: '4',
    title: 'San Francisco is weaponizing parking rules to displace RV communities',
    url: 'https://eltecolote.org',
    excerpt: 'Investigation reveals systematic enforcement patterns targeting vehicle-dwelling residents in specific neighborhoods.',
    source: { name: 'El Tecolote', slug: 'el-tecolote' },
    publishedAt: '2025-12-25T11:00:00Z',
    category: 'Investigation',
  },
  {
    id: '5',
    title: "What's it like to enroll in San Francisco Drug Court?",
    url: 'https://missionlocal.org',
    excerpt: 'First-person accounts from participants reveal the challenges and opportunities of court-mandated treatment.',
    source: { name: 'Mission Local', slug: 'mission-local' },
    publishedAt: '2025-12-24T16:45:00Z',
    category: 'Justice',
  },
  {
    id: '6',
    title: 'Researchers Seek Hepatitis B Cure as Trump Slashes Funding',
    url: 'https://sfpublicpress.org',
    excerpt: 'Scientists race against time as federal cuts threaten groundbreaking research affecting millions.',
    source: { name: 'SF Public Press', slug: 'sf-public-press' },
    publishedAt: '2025-12-23T08:00:00Z',
    category: 'Health',
  },
  {
    id: '7',
    title: "Community celebrates Japanese New Year at historic Japantown",
    url: 'https://nichibei.org',
    excerpt: "Hundreds gather for traditional mochitsuki and cultural performances at SF's enduring Japanese American enclave.",
    source: { name: 'Nichi Bei', slug: 'nichi-bei' },
    publishedAt: '2025-12-22T12:00:00Z',
    category: 'Culture',
  },
  {
    id: '8',
    title: 'Navy admits new contamination at Hunters Point Shipyard',
    url: 'https://sfbayview.com',
    excerpt: 'Decades of community advocacy vindicated as officials acknowledge previously undisclosed toxic sites.',
    source: { name: 'The Bay View', slug: 'the-bay-view' },
    publishedAt: '2025-12-21T10:30:00Z',
    category: 'Environment',
  },
]

const memberFilters = [
  { value: 'all', label: 'All Publications' },
  ...members.map((m) => ({ value: m.slug, label: m.name })),
]

interface PageProps {
  searchParams: Promise<{ member?: string; category?: string }>
}

export const metadata = {
  title: 'News Feed | SFIMC',
  description: 'The latest journalism from San Francisco Independent Media Coalition members.',
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeMember = params.member || 'all'
  const activeCategory = params.category || 'all'

  // Filter by member
  let filteredNews = activeMember === 'all'
    ? newsItems
    : newsItems.filter((n) => n.source.slug === activeMember)

  // Filter by category
  if (activeCategory !== 'all') {
    filteredNews = filteredNews.filter((n) => n.category?.toLowerCase() === activeCategory.toLowerCase())
  }

  // Get unique categories
  const categories = ['all', ...new Set(newsItems.map((n) => n.category).filter(Boolean))]

  // Featured story (first one)
  const featuredStory = activeMember === 'all' && activeCategory === 'all' ? filteredNews[0] : null
  const gridStories = featuredStory ? filteredNews.slice(1) : filteredNews

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

            {/* Category filter pills */}
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-[var(--color-warm-gray)]" />
              <div className="flex gap-1">
                {categories.map((cat) => {
                  const href = cat === 'all'
                    ? activeMember === 'all' ? '/news' : `/news?member=${activeMember}`
                    : activeMember === 'all' ? `/news?category=${cat}` : `/news?member=${activeMember}&category=${cat}`
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
              <span className="text-[var(--color-warm-gray)] text-sm ml-2">
                {filteredNews.length} stories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredStory && (
        <section className="section section-paper">
          <div className="container">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[var(--color-dot)] rounded-full" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                Latest Story
              </span>
            </div>

            <div className="max-w-4xl">
              <StoryCard
                story={{
                  id: featuredStory.id,
                  title: featuredStory.title,
                  excerpt: featuredStory.excerpt,
                  url: featuredStory.url,
                  publishedAt: featuredStory.publishedAt,
                  source: featuredStory.source,
                  category: featuredStory.category,
                }}
                variant="featured"
              />
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className={`section ${featuredStory ? 'section-cream' : 'section-paper'}`}>
        <div className="container">
          {gridStories.length > 0 ? (
            <>
              {/* Two-column layout: main feed + sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main feed */}
                <div className="lg:col-span-2 space-y-6">
                  {gridStories.slice(0, 5).map((item) => (
                    <StoryCard
                      key={item.id}
                      story={{
                        id: item.id,
                        title: item.title,
                        excerpt: item.excerpt,
                        url: item.url,
                        publishedAt: item.publishedAt,
                        source: item.source,
                        category: item.category,
                      }}
                      variant="horizontal"
                    />
                  ))}
                </div>

                {/* Sidebar - compact stories */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)] mb-4">
                    More Stories
                  </h3>
                  {gridStories.slice(5).map((item) => (
                    <StoryCard
                      key={item.id}
                      story={{
                        id: item.id,
                        title: item.title,
                        url: item.url,
                        publishedAt: item.publishedAt,
                        source: item.source,
                      }}
                      variant="compact"
                    />
                  ))}

                  {/* RSS Subscribe CTA */}
                  <div className="mt-8 p-6 bg-[var(--color-paper)] border border-[var(--color-mist)] rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[var(--color-dot)]/10 rounded-xl flex items-center justify-center">
                        <Rss className="w-5 h-5 text-[var(--color-dot)]" />
                      </div>
                      <h4 className="font-semibold text-[var(--color-ink)]">Subscribe via RSS</h4>
                    </div>
                    <p className="text-sm text-[var(--color-slate)] mb-4">
                      Get stories from all coalition members in your favorite feed reader.
                    </p>
                    <Link
                      href="/api/rss"
                      className="text-[var(--color-dot)] text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      Copy RSS feed URL
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="btn btn-outline">
                  Load more stories
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[var(--color-mist)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Rss className="w-6 h-6 text-[var(--color-warm-gray)]" />
              </div>
              <p className="text-[var(--color-warm-gray)] text-lg mb-2">
                No stories found
              </p>
              <p className="text-[var(--color-slate)] text-sm mb-4">
                Try adjusting your filters or check back later.
              </p>
              <Link href="/news" className="text-[var(--color-dot)] font-medium hover:underline">
                View all stories →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
