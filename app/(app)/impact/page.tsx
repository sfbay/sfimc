import Link from 'next/link'
import { ImpactCard } from '@/components/impact/ImpactCard'
import { ImpactTag } from '@/components/impact/ImpactTag'

// Placeholder data - will be replaced with Payload queries
const stories = [
  {
    id: '1',
    title: 'Investigation leads to new city oversight requirements for contracting',
    slug: 'city-oversight-reform',
    excerpt: 'A collaborative investigation documented systematic failures in city contracting that led to new transparency requirements passed unanimously by the Board of Supervisors.',
    member: { name: 'SF Public Press', slug: 'sf-public-press' },
    impactType: 'policy' as const,
    impactDescription: 'Board passed Resolution 25-1847 requiring quarterly public reporting on contracts over $500k.',
    publishedDate: '2025-12-15',
    url: 'https://sfpublicpress.org',
    featured: true,
  },
  {
    id: '2',
    title: 'Mission Local wins California Journalism Award for housing series',
    slug: 'housing-series-award',
    excerpt: 'In-depth reporting on displacement and housing policy earns statewide recognition.',
    member: { name: 'Mission Local', slug: 'mission-local' },
    impactType: 'recognition' as const,
    impactDescription: 'California News Publishers Association award for public service journalism.',
    publishedDate: '2025-11-20',
    url: 'https://missionlocal.org',
  },
  {
    id: '3',
    title: 'Coverage connects 200+ families to rental assistance',
    slug: 'rental-assistance-impact',
    excerpt: 'Reporting on city rental assistance programs in Spanish and English reached families who didn\'t know help was available.',
    member: { name: 'El Tecolote', slug: 'el-tecolote' },
    impactType: 'resources' as const,
    impactDescription: 'City confirmed 214 applications traced to El Tecolote coverage.',
    publishedDate: '2025-10-08',
    url: 'https://eltecolote.org',
  },
  {
    id: '4',
    title: 'Hunters Point cleanup investigation wins national award',
    slug: 'hunters-point-award',
    excerpt: 'Long-term environmental justice reporting on the Hunters Point Shipyard cleanup earns recognition.',
    member: { name: 'The Bay View', slug: 'the-bay-view' },
    impactType: 'recognition' as const,
    impactDescription: 'Society of Environmental Journalists Best Environmental Coverage award.',
    publishedDate: '2025-10-01',
    url: 'https://sfbayview.com',
  },
  {
    id: '5',
    title: 'LGBTQ+ senior housing series leads to expanded city program',
    slug: 'senior-housing-expansion',
    excerpt: 'Coverage of housing insecurity among LGBTQ+ seniors prompted city to expand dedicated housing units.',
    member: { name: 'Bay Area Reporter', slug: 'bay-area-reporter' },
    impactType: 'policy' as const,
    impactDescription: 'Mayor announced 50 additional LGBTQ+ senior housing units in response to reporting.',
    publishedDate: '2025-09-15',
    url: 'https://ebar.com',
  },
  {
    id: '6',
    title: 'School board member resigns after accountability reporting',
    slug: 'school-board-accountability',
    excerpt: 'Investigative reporting on conflicts of interest led to public pressure and resignation.',
    member: { name: 'Mission Local', slug: 'mission-local' },
    impactType: 'accountability' as const,
    impactDescription: 'Board member resigned within 2 weeks of series publication.',
    publishedDate: '2025-08-22',
    url: 'https://missionlocal.org',
  },
]

const impactTypes = [
  { value: 'all', label: 'All Impact' },
  { value: 'policy', label: 'Policy Changed' },
  { value: 'accountability', label: 'Accountability' },
  { value: 'resources', label: 'Resources Connected' },
  { value: 'recognition', label: 'Recognition' },
  { value: 'community', label: 'Community Response' },
]

interface PageProps {
  searchParams: Promise<{ type?: string; member?: string }>
}

export default async function ImpactPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeType = params.type || 'all'

  const filteredStories = activeType === 'all'
    ? stories
    : stories.filter(s => s.impactType === activeType)

  const featuredStory = filteredStories.find(s => s.featured) || filteredStories[0]
  const remainingStories = filteredStories.filter(s => s.id !== featuredStory?.id)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-dot)] to-[var(--color-dot-dark)] text-[var(--color-paper)] py-20 lg:py-28 relative overflow-hidden">
        {/* Background text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10 font-[family-name:var(--font-display)] text-[12rem] font-bold tracking-tighter pointer-events-none hidden lg:block">
          IMPACT
        </div>

        <div className="container relative">
          <h1 className="display-lg mb-4">
            Journalism That Moves
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Stories from our coalition members that led to real outcomes in San Francisco communities.
          </p>
        </div>
      </section>

      {/* Featured Story */}
      {featuredStory && (
        <section className="bg-[var(--color-ink)] py-12 lg:py-16">
          <div className="container">
            <p className="text-[var(--color-teal-light)] font-mono text-xs uppercase tracking-wider mb-6 flex items-center gap-3">
              Featured Impact
              <span className="flex-1 h-px bg-gradient-to-r from-[var(--color-teal-light)] to-transparent" />
            </p>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image */}
              <div className="aspect-[16/10] bg-[var(--color-charcoal)] rounded-2xl overflow-hidden relative">
                {featuredStory.image ? (
                  <img
                    src={featuredStory.image.url}
                    alt={featuredStory.image.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--color-warm-gray)]">
                    <span className="text-sm font-mono">Featured Photo</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <ImpactTag type={featuredStory.impactType} dark className="mb-4" />

                <h2 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold text-[var(--color-paper)] mb-4 leading-tight">
                  {featuredStory.title}
                </h2>

                <p className="text-[var(--color-warm-gray)] text-lg mb-6 leading-relaxed">
                  {featuredStory.excerpt}
                </p>

                <div className="flex items-center gap-3 text-sm text-[var(--color-warm-gray)] mb-6">
                  <span className="text-[var(--color-dot)] font-semibold">{featuredStory.member.name}</span>
                  <span>·</span>
                  <span>{new Date(featuredStory.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>

                {/* Outcome Box */}
                <div className="bg-[var(--color-teal)]/10 border border-[var(--color-teal)]/30 rounded-xl p-5 mb-6">
                  <p className="text-[var(--color-teal-light)] font-mono text-xs uppercase tracking-wider mb-2">
                    Documented Outcome
                  </p>
                  <p className="text-[var(--color-paper)]">
                    {featuredStory.impactDescription}
                  </p>
                </div>

                {/* Share Tools */}
                <div className="flex items-center gap-3">
                  <span className="text-[var(--color-warm-gray)] text-sm">Share:</span>
                  <div className="flex gap-2">
                    {['X', 'Facebook', 'LinkedIn', 'Copy'].map((platform) => (
                      <button
                        key={platform}
                        className="w-10 h-10 rounded-full bg-[var(--color-charcoal)] border border-[var(--color-warm-gray)]/30 flex items-center justify-center text-[var(--color-paper)] hover:bg-[var(--color-dot)] hover:border-[var(--color-dot)] transition-colors"
                        aria-label={`Share on ${platform}`}
                      >
                        <span className="text-xs font-medium">{platform[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)] sticky top-16 z-40">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {impactTypes.map((type) => (
                <Link
                  key={type.value}
                  href={type.value === 'all' ? '/impact' : `/impact?type=${type.value}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeType === type.value
                      ? 'bg-[var(--color-dot)] text-[var(--color-paper)]'
                      : 'bg-transparent text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] border border-[var(--color-warm-gray)]/30'
                  }`}
                >
                  {type.label}
                </Link>
              ))}
            </div>

            <span className="text-[var(--color-warm-gray)] text-sm">
              {filteredStories.length} stories
            </span>
          </div>
        </div>
      </section>

      {/* Stories Feed */}
      <section className="section section-cream">
        <div className="container">
          <div className="space-y-4">
            {remainingStories.map((story) => (
              <ImpactFeedItem key={story.id} story={story} />
            ))}
          </div>

          {remainingStories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--color-warm-gray)] text-lg">
                No stories found in this category.
              </p>
              <Link href="/impact" className="text-[var(--color-dot)] font-medium mt-2 inline-block">
                View all impact stories →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

// Feed item component (horizontal layout)
function ImpactFeedItem({ story }: { story: typeof stories[0] }) {
  const formattedDate = new Date(story.publishedDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-[160px_1fr_auto] gap-4 lg:gap-8 items-center group"
    >
      {/* Thumbnail */}
      <div className="hidden lg:block aspect-[4/3] bg-[var(--color-mist)] rounded-xl overflow-hidden">
        {story.image ? (
          <img
            src={story.image.url}
            alt={story.image.alt}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-2 leading-tight group-hover:text-[var(--color-dot)] transition-colors">
          {story.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-[var(--color-warm-gray)]">
          <span className="text-[var(--color-dot)] font-medium">{story.member.name}</span>
          <span>·</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Outcome */}
      <div className="flex flex-col items-start lg:items-end gap-2">
        <ImpactTag type={story.impactType} />
        <p className="text-sm text-[var(--color-slate)] max-w-[200px] text-left lg:text-right line-clamp-2">
          {story.impactDescription}
        </p>
      </div>
    </Link>
  )
}
