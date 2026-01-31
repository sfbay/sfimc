import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { MemberCard } from '@/components/members/MemberCard'
import { PolicyBanner } from '@/components/home/PolicyBanner'
import { ImpactDashboard } from '@/components/home/ImpactDashboard'

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


export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Policy Win Banner */}
      <PolicyBanner />

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

      {/* Impact Dashboard */}
      <ImpactDashboard />

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
