import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Share2, Calendar, Building2 } from 'lucide-react'
import { ImpactTag } from '@/components/impact/ImpactTag'

// Placeholder data - will be replaced with Payload queries
const stories = [
  {
    id: '1',
    title: 'Investigation leads to new city oversight requirements for contracting',
    slug: 'city-oversight-reform',
    excerpt: 'A collaborative investigation documented systematic failures in city contracting that led to new transparency requirements passed unanimously by the Board of Supervisors.',
    content: `A months-long collaborative investigation by SF Independent Media Coalition members revealed systematic failures in how San Francisco awards and monitors large city contracts. The investigation found that dozens of contracts worth over $500,000 lacked required performance reviews and transparency measures.

Key findings included missing quarterly reports, delayed audits, and a pattern of contract renewals without competitive bidding. The investigation drew on public records requests, interviews with city employees, and analysis of contract databases.

Following publication, the story was discussed at two Board of Supervisors hearings. Supervisor Jane Kim introduced Resolution 25-1847, which passed unanimously and now requires quarterly public reporting on all contracts over $500,000, mandatory annual audits for contracts over $1 million, and a public dashboard tracking contract performance.

"This is exactly the kind of accountability journalism that makes a difference in people's lives," said Coalition Executive Director Maria Santos. "When our members work together, we can tackle investigations that no single outlet could do alone."`,
    member: { id: '4', name: 'SF Public Press', slug: 'sf-public-press', color: '#ff4f1f' },
    collaborators: [
      { name: 'Mission Local', slug: 'mission-local' },
    ],
    impactType: 'policy' as const,
    impactDescription: 'Board passed Resolution 25-1847 requiring quarterly public reporting on contracts over $500k.',
    impactTimeline: [
      { date: '2025-09-01', event: 'Investigation published' },
      { date: '2025-10-15', event: 'First Board of Supervisors hearing' },
      { date: '2025-11-20', event: 'Resolution introduced' },
      { date: '2025-12-15', event: 'Resolution passed unanimously' },
    ],
    publishedDate: '2025-12-15',
    originalUrl: 'https://sfpublicpress.org',
    featured: true,
    image: null,
  },
  {
    id: '2',
    title: 'Mission Local wins California Journalism Award for housing series',
    slug: 'housing-series-award',
    excerpt: 'In-depth reporting on displacement and housing policy earns statewide recognition.',
    content: `Mission Local's year-long series "Displaced: The Hidden Cost of San Francisco's Housing Crisis" has been awarded the California News Publishers Association's top prize for public service journalism.

The series, which ran from January through October 2025, documented the experiences of families displaced from the Mission District and traced the policy decisions that contributed to the neighborhood's rapid transformation.

"This award belongs to the community members who trusted us with their stories," said lead reporter Ana Martinez. "Their willingness to share difficult experiences made this series possible."

The judges praised the series for its "rigorous reporting, compelling storytelling, and clear impact on local policy discussions."`,
    member: { id: '2', name: 'Mission Local', slug: 'mission-local', color: '#0b525b' },
    collaborators: [],
    impactType: 'recognition' as const,
    impactDescription: 'California News Publishers Association award for public service journalism.',
    impactTimeline: [
      { date: '2025-01-15', event: 'Series begins publication' },
      { date: '2025-10-30', event: 'Final installment published' },
      { date: '2025-11-20', event: 'Award announced' },
    ],
    publishedDate: '2025-11-20',
    originalUrl: 'https://missionlocal.org',
    image: null,
  },
  {
    id: '3',
    title: 'Coverage connects 200+ families to rental assistance',
    slug: 'rental-assistance-impact',
    excerpt: 'Reporting on city rental assistance programs in Spanish and English reached families who didn\'t know help was available.',
    content: `El Tecolote's bilingual coverage of San Francisco's Emergency Rental Assistance Program (ERAP) directly connected over 200 families to critical housing support, according to city data.

The newspaper published a series of articles in both Spanish and English explaining the program's eligibility requirements, application process, and deadlines. The coverage included step-by-step guides, FAQ sections, and information about community organizations that could help with applications.

City officials confirmed that 214 successful ERAP applications mentioned El Tecolote as their information source. The applications represented over $2.5 million in rental assistance, helping families stay in their homes during a challenging economic period.

"Language access isn't just a nice-to-have—it's essential for ensuring that all San Franciscans can access the resources they need," said El Tecolote Editor Rosa Hernandez.`,
    member: { id: '1', name: 'El Tecolote', slug: 'el-tecolote', color: '#dcae27' },
    collaborators: [],
    impactType: 'resources' as const,
    impactDescription: 'City confirmed 214 applications traced to El Tecolote coverage.',
    impactTimeline: [
      { date: '2025-07-01', event: 'ERAP coverage begins' },
      { date: '2025-08-15', event: 'Application guide published' },
      { date: '2025-10-08', event: 'City confirms impact data' },
    ],
    publishedDate: '2025-10-08',
    originalUrl: 'https://eltecolote.org',
    image: null,
  },
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }))
}

export default async function ImpactStoryPage({ params }: PageProps) {
  const { slug } = await params
  const story = stories.find((s) => s.slug === slug)

  if (!story) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-ink)] text-[var(--color-paper)] py-16 lg:py-24">
        <div className="container">
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Impact Stories
          </Link>

          <div className="max-w-4xl">
            <ImpactTag type={story.impactType} dark className="mb-4" />

            <h1 className="display-md mb-6">{story.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-[var(--color-warm-gray)] mb-8">
              <Link
                href={`/members/${story.member.slug}`}
                className="flex items-center gap-2 hover:text-[var(--color-paper)] transition-colors"
              >
                <Building2 className="w-4 h-4" />
                <span style={{ color: story.member.color }} className="font-medium">
                  {story.member.name}
                </span>
              </Link>
              {story.collaborators.length > 0 && (
                <>
                  <span>with</span>
                  {story.collaborators.map((collab, index) => (
                    <span key={collab.slug}>
                      <Link
                        href={`/members/${collab.slug}`}
                        className="text-[var(--color-teal-light)] hover:underline"
                      >
                        {collab.name}
                      </Link>
                      {index < story.collaborators.length - 1 && ', '}
                    </span>
                  ))}
                </>
              )}
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(story.publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <p className="text-xl text-[var(--color-warm-gray)]">
              {story.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Impact Outcome Banner */}
      <section className="bg-[var(--color-teal)] py-6">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <p className="text-[var(--color-teal-light)] font-mono text-xs uppercase tracking-wider mb-1">
                Documented Outcome
              </p>
              <p className="text-[var(--color-paper)] text-lg font-medium">
                {story.impactDescription}
              </p>
            </div>
            <a
              href={story.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light flex-shrink-0"
            >
              Read Original Story
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section section-cream">
        <div className="container">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
            {/* Story Content */}
            <div>
              {story.image && (
                <div className="aspect-video bg-[var(--color-mist)] rounded-2xl mb-8 overflow-hidden">
                  <img
                    src={story.image.url}
                    alt={story.image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                {story.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-[var(--color-slate)] mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share Section */}
              <div className="border-t border-[var(--color-mist)] pt-8 mt-12">
                <div className="flex items-center gap-4">
                  <span className="text-[var(--color-warm-gray)] text-sm">Share this story:</span>
                  <div className="flex gap-2">
                    {['X', 'Facebook', 'LinkedIn', 'Email'].map((platform) => (
                      <button
                        key={platform}
                        className="w-10 h-10 rounded-full bg-[var(--color-mist)] flex items-center justify-center text-[var(--color-ink)] hover:bg-[var(--color-dot)] hover:text-[var(--color-paper)] transition-colors"
                        aria-label={`Share on ${platform}`}
                      >
                        <span className="text-xs font-medium">{platform[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Impact Timeline */}
              {story.impactTimeline && story.impactTimeline.length > 0 && (
                <div className="card p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-4">
                    Impact Timeline
                  </h3>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-2 top-2 bottom-2 w-px bg-[var(--color-mist)]" />

                    <div className="space-y-4">
                      {story.impactTimeline.map((item, index) => (
                        <div key={index} className="relative pl-8">
                          {/* Dot */}
                          <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[var(--color-dot)] border-2 border-[var(--color-paper)]" />

                          <p className="text-xs text-[var(--color-warm-gray)] font-mono">
                            {new Date(item.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-[var(--color-ink)]">
                            {item.event}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Publication Info */}
              <div className="card p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-4">
                  About the Publisher
                </h3>
                <Link
                  href={`/members/${story.member.slug}`}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${story.member.color}20` }}
                  >
                    <span className="text-xs font-mono" style={{ color: story.member.color }}>Logo</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-dot)] transition-colors">
                      {story.member.name}
                    </p>
                    <p className="text-sm text-[var(--color-dot)]">View profile →</p>
                  </div>
                </Link>
              </div>

              {/* Related Stories */}
              <div className="card p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-4">
                  More Impact Stories
                </h3>
                <div className="space-y-3">
                  {stories
                    .filter((s) => s.slug !== story.slug)
                    .slice(0, 3)
                    .map((relatedStory) => (
                      <Link
                        key={relatedStory.id}
                        href={`/impact/${relatedStory.slug}`}
                        className="block group"
                      >
                        <ImpactTag type={relatedStory.impactType} className="mb-1" />
                        <p className="text-sm text-[var(--color-ink)] font-medium group-hover:text-[var(--color-dot)] transition-colors line-clamp-2">
                          {relatedStory.title}
                        </p>
                      </Link>
                    ))}
                </div>
                <Link
                  href="/impact"
                  className="block text-center text-[var(--color-dot)] text-sm font-medium mt-4 hover:underline"
                >
                  View all impact stories →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
