import Link from 'next/link'
import { MemberCardFull } from '@/components/members/MemberCardFull'

// Placeholder data - will be replaced with Payload queries
const members = [
  {
    id: '1',
    name: 'El Tecolote',
    slug: 'el-tecolote',
    community: 'Mission District · Latino',
    category: ['ethnic'],
    description: 'Bilingual newspaper serving SF\'s Latino community since 1970. Published with SF State journalism students.',
    url: 'https://eltecolote.org',
    foundedYear: 1970,
  },
  {
    id: '2',
    name: 'Mission Local',
    slug: 'mission-local',
    community: 'Mission District',
    category: ['neighborhood', 'investigative'],
    description: 'Nonprofit news covering SF\'s Mission neighborhood with in-depth local reporting and investigations.',
    url: 'https://missionlocal.org',
    foundedYear: 2009,
  },
  {
    id: '3',
    name: 'The Bay View',
    slug: 'the-bay-view',
    community: 'Hunters Point · Black',
    category: ['ethnic'],
    description: 'San Francisco\'s Black newspaper, covering Bayview-Hunters Point and Black communities since 1976.',
    url: 'https://sfbayview.com',
    foundedYear: 1976,
  },
  {
    id: '4',
    name: 'SF Public Press',
    slug: 'sf-public-press',
    community: 'Citywide · Investigative',
    category: ['investigative'],
    description: 'Nonprofit investigative newsroom producing deep-dive reporting on housing, government, and public safety.',
    url: 'https://sfpublicpress.org',
    foundedYear: 2009,
  },
  {
    id: '5',
    name: 'Bay Area Reporter',
    slug: 'bay-area-reporter',
    community: 'Citywide · LGBTQ+',
    category: ['lgbtq'],
    description: 'The nation\'s oldest continuously published LGBTQ+ newspaper, serving the Bay Area since 1971.',
    url: 'https://ebar.com',
    foundedYear: 1971,
  },
  {
    id: '6',
    name: 'Nichi Bei',
    slug: 'nichi-bei',
    community: 'Japantown · Japanese American',
    category: ['ethnic'],
    description: 'Covering Japanese American news since 1899, with roots in SF\'s historic Japantown community.',
    url: 'https://nichibei.org',
    foundedYear: 1899,
  },
]

const categories = [
  { value: 'all', label: 'All Publications' },
  { value: 'ethnic', label: 'Ethnic Media' },
  { value: 'neighborhood', label: 'Neighborhood' },
  { value: 'investigative', label: 'Investigative' },
  { value: 'lgbtq', label: 'LGBTQ+' },
]

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function MembersPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeCategory = params.category || 'all'

  const filteredMembers = activeCategory === 'all'
    ? members
    : members.filter(m => m.category.includes(activeCategory))

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-ink)] text-[var(--color-paper)] py-20 lg:py-28 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--color-dot)] opacity-10 blur-[120px] rounded-full" />
        </div>

        <div className="container relative">
          <h1 className="display-lg mb-4">
            <span className="text-[var(--color-teal-light)]">{members.length}</span> Independent Voices
          </h1>
          <p className="text-xl text-[var(--color-warm-gray)] max-w-2xl">
            Ethnic media, neighborhood news, investigative journalism — diverse publications
            serving San Francisco's diverse communities.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)]">
        <div className="container py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === 'all' ? '/members' : `/members?category=${cat.value}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-[var(--color-dot)] text-[var(--color-paper)]'
                    : 'bg-transparent text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] border border-[var(--color-warm-gray)]/30'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="section section-cream">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <MemberCardFull key={member.id} member={member} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--color-warm-gray)] text-lg">
                No publications found in this category.
              </p>
              <Link href="/members" className="text-[var(--color-dot)] font-medium mt-2 inline-block">
                View all publications →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
