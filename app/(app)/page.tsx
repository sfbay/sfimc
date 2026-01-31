import Link from 'next/link'
import { ImpactTag } from '@/components/impact/ImpactTag'
import { MemberCard } from '@/components/members/MemberCard'
import { ImpactCard } from '@/components/impact/ImpactCard'
import { StatsBar } from '@/components/home/StatsBar'
import { PolicyBanner } from '@/components/home/PolicyBanner'

// Placeholder data - will be replaced with Payload queries
const featuredMembers = [
  {
    id: '1',
    name: 'El Tecolote',
    slug: 'el-tecolote',
    community: 'Mission District · Latino',
    description: 'Bilingual newspaper serving SF\'s Latino community since 1970. Published with SF State journalism students.',
    url: 'https://eltecolote.org',
    foundedYear: 1970,
  },
  {
    id: '2',
    name: 'The Bay View',
    slug: 'the-bay-view',
    community: 'Hunters Point · Black',
    description: 'San Francisco\'s Black newspaper, covering Bayview-Hunters Point and Black communities since 1976.',
    url: 'https://sfbayview.com',
    foundedYear: 1976,
  },
  {
    id: '3',
    name: 'Mission Local',
    slug: 'mission-local',
    community: 'Mission District',
    description: 'Nonprofit news covering SF\'s Mission neighborhood with in-depth local reporting and investigations.',
    url: 'https://missionlocal.org',
    foundedYear: 2009,
  },
  {
    id: '4',
    name: 'Bay Area Reporter',
    slug: 'bay-area-reporter',
    community: 'Citywide · LGBTQ+',
    description: 'The nation\'s oldest continuously published LGBTQ+ newspaper, serving the Bay Area since 1971.',
    url: 'https://ebar.com',
    foundedYear: 1971,
  },
]

const recentImpact = [
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
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[var(--color-dot)] opacity-10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-teal)] opacity-10 blur-[100px] rounded-full" />
        </div>

        <div className="container relative py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="display-xl mb-6">
              Journalism that{' '}
              <span className="text-gradient-dot">moves</span>{' '}
              San Francisco
            </h1>
            <p className="text-xl text-[var(--color-warm-gray)] leading-relaxed mb-8 max-w-2xl">
              We're a coalition of ethnic and community publishers building the infrastructure
              for local news that actually makes a difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/impact" className="btn btn-dot">
                Explore our impact
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/members" className="btn btn-outline text-[var(--color-paper)] border-[var(--color-warm-gray)] hover:border-[var(--color-paper)]">
                Meet our members
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Win Banner */}
      <PolicyBanner />

      {/* Stats Bar */}
      <StatsBar />

      {/* Members Section */}
      <section className="section section-paper">
        <div className="container">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="display-md mb-2">
                11 Publications<span className="text-[var(--color-dot)]">.</span>{' '}
                One Coalition<span className="text-[var(--color-dot)]">.</span>
              </h2>
              <p className="text-[var(--color-warm-gray)] text-lg">
                Ethnic media, neighborhood news, investigative journalism — serving diverse communities.
              </p>
            </div>
            <Link
              href="/members"
              className="text-[var(--color-dot)] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              View all members
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section section-cream">
        <div className="container">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="display-md mb-2">
                Recent Impact
              </h2>
              <p className="text-[var(--color-warm-gray)] text-lg">
                Stories from our coalition that led to real outcomes.
              </p>
            </div>
            <Link
              href="/impact"
              className="text-[var(--color-teal)] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              See all impact stories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Impact Card */}
            <div className="lg:col-span-2">
              <ImpactCard story={recentImpact[0]} featured />
            </div>
            {/* Smaller Cards */}
            <div className="flex flex-col gap-6">
              {recentImpact.slice(1).map((story) => (
                <ImpactCard key={story.id} story={story} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-paper">
        <div className="container">
          <div className="bg-[var(--color-ink)] rounded-3xl p-12 lg:p-16 text-center text-[var(--color-paper)] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-dots" />
            </div>

            <div className="relative">
              <h2 className="display-md mb-4">
                Ready to support community journalism?
              </h2>
              <p className="text-[var(--color-warm-gray)] text-lg mb-8 max-w-2xl mx-auto">
                Whether you're a funder, policymaker, or publication — there's a place for you in the coalition.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/join" className="btn btn-dot btn-lg">
                  Join the Coalition
                </Link>
                <Link href="/about" className="btn btn-outline text-[var(--color-paper)] border-[var(--color-warm-gray)]">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
