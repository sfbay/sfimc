import Link from 'next/link'
import { ExternalLink, Share2 } from 'lucide-react'

// Placeholder data - will be replaced with Payload queries from RSS aggregator
const newsItems = [
  {
    id: '1',
    title: 'California\'s New AI Safety Law Created the Illusion of Whistleblower Protections',
    url: 'https://sfpublicpress.org',
    description: 'A deep dive into the gaps between promised protections and reality in California\'s landmark AI legislation.',
    member: { name: 'SF Public Press', slug: 'sf-public-press', color: '#ff4f1f' },
    pubDate: '2025-12-28',
    image: null,
  },
  {
    id: '2',
    title: '\'We\'re here to create something positive\': Pop-up at 16th St. BART seeks to activate plaza',
    url: 'https://missionlocal.org',
    description: 'Community organizers launch initiative to transform unused public space into vibrant gathering area.',
    member: { name: 'Mission Local', slug: 'mission-local', color: '#0b525b' },
    pubDate: '2025-12-27',
    image: null,
  },
  {
    id: '3',
    title: 'Oasis saved! – Popular nightclub receives emergency donation',
    url: 'https://ebar.com',
    description: 'After announcing permanent closure, the iconic LGBTQ+ venue gets a last-minute lifeline from an anonymous donor.',
    member: { name: 'Bay Area Reporter', slug: 'bay-area-reporter', color: '#c41e6a' },
    pubDate: '2025-12-26',
    image: null,
  },
  {
    id: '4',
    title: 'San Francisco is weaponizing parking rules to displace RV communities',
    url: 'https://eltecolote.org',
    description: 'Investigation reveals systematic enforcement patterns targeting vehicle-dwelling residents in specific neighborhoods.',
    member: { name: 'El Tecolote', slug: 'el-tecolote', color: '#dcae27' },
    pubDate: '2025-12-25',
    image: null,
  },
  {
    id: '5',
    title: 'What\'s it like to enroll in San Francisco Drug Court?',
    url: 'https://missionlocal.org',
    description: 'First-person accounts from participants reveal the challenges and opportunities of court-mandated treatment.',
    member: { name: 'Mission Local', slug: 'mission-local', color: '#0b525b' },
    pubDate: '2025-12-24',
    image: null,
  },
  {
    id: '6',
    title: 'Researchers Seek Hepatitis B Cure as Trump Slashes Funding',
    url: 'https://sfpublicpress.org',
    description: 'Scientists race against time as federal cuts threaten groundbreaking research affecting millions.',
    member: { name: 'SF Public Press', slug: 'sf-public-press', color: '#ff4f1f' },
    pubDate: '2025-12-23',
    image: null,
  },
  {
    id: '7',
    title: 'Community celebrates Japanese New Year at historic Japantown',
    url: 'https://nichibei.org',
    description: 'Hundreds gather for traditional mochitsuki and cultural performances at SF\'s enduring Japanese American enclave.',
    member: { name: 'Nichi Bei', slug: 'nichi-bei', color: '#14919b' },
    pubDate: '2025-12-22',
    image: null,
  },
  {
    id: '8',
    title: 'Navy admits new contamination at Hunters Point Shipyard',
    url: 'https://sfbayview.com',
    description: 'Decades of community advocacy vindicated as officials acknowledge previously undisclosed toxic sites.',
    member: { name: 'The Bay View', slug: 'the-bay-view', color: '#0b525b' },
    pubDate: '2025-12-21',
    image: null,
  },
]

const members = [
  { value: 'all', label: 'All Publications' },
  { value: 'sf-public-press', label: 'SF Public Press' },
  { value: 'mission-local', label: 'Mission Local' },
  { value: 'el-tecolote', label: 'El Tecolote' },
  { value: 'the-bay-view', label: 'The Bay View' },
  { value: 'bay-area-reporter', label: 'Bay Area Reporter' },
  { value: 'nichi-bei', label: 'Nichi Bei' },
]

interface PageProps {
  searchParams: Promise<{ member?: string }>
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeMember = params.member || 'all'

  const filteredNews = activeMember === 'all'
    ? newsItems
    : newsItems.filter(n => n.member.slug === activeMember)

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-ink)] text-[var(--color-paper)] py-16 lg:py-20">
        <div className="container">
          <h1 className="display-lg mb-4">
            Community News Feed
          </h1>
          <p className="text-xl text-[var(--color-warm-gray)] max-w-2xl">
            The latest journalism from our coalition members — aggregated in one place,
            always linking back to the source.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)] sticky top-16 z-40">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 -mb-2">
              {members.map((m) => (
                <Link
                  key={m.value}
                  href={m.value === 'all' ? '/news' : `/news?member=${m.value}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    activeMember === m.value
                      ? 'bg-[var(--color-dot)] text-[var(--color-paper)]'
                      : 'bg-transparent text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] border border-[var(--color-warm-gray)]/30'
                  }`}
                >
                  {m.label}
                </Link>
              ))}
            </div>

            <span className="text-[var(--color-warm-gray)] text-sm">
              {filteredNews.length} stories
            </span>
          </div>
        </div>
      </section>

      {/* News Feed */}
      <section className="section section-cream">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--color-warm-gray)] text-lg">
                No stories found from this publication.
              </p>
              <Link href="/news" className="text-[var(--color-dot)] font-medium mt-2 inline-block">
                View all stories →
              </Link>
            </div>
          )}

          {/* Load More Placeholder */}
          <div className="text-center mt-12">
            <button className="btn btn-outline">
              Load more stories
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function NewsCard({ item }: { item: typeof newsItems[0] }) {
  const formattedDate = new Date(item.pubDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="card p-6 group">
      <div className="flex items-start gap-4">
        {/* Publication indicator */}
        <div
          className="w-1 self-stretch rounded-full flex-shrink-0"
          style={{ backgroundColor: item.member.color }}
        />

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Link
              href={`/members/${item.member.slug}`}
              className="font-semibold hover:underline"
              style={{ color: item.member.color }}
            >
              {item.member.name}
            </Link>
            <span className="text-[var(--color-warm-gray)]">·</span>
            <span className="text-[var(--color-warm-gray)]">{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)] mb-2 leading-tight">
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-dot)] transition-colors"
            >
              {item.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-[var(--color-slate)] text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-teal)] hover:text-[var(--color-teal-dark)] text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              Read full story
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button className="text-[var(--color-warm-gray)] hover:text-[var(--color-ink)] text-sm font-medium flex items-center gap-1.5 transition-colors">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
