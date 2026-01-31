import Link from 'next/link'
import { PublicationCard } from '@/components/cards'
import { members, memberCategories, getMembersByCategory } from '@/data/members'
import { Search } from 'lucide-react'

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>
}

export const metadata = {
  title: 'Member Publications | SFIMC',
  description: 'Meet the 11 independent publications that make up the San Francisco Independent Media Coalition.',
}

export default async function MembersPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeCategory = params.category || 'all'
  const searchQuery = params.q?.toLowerCase() || ''

  // Filter by category
  let filteredMembers = getMembersByCategory(activeCategory)

  // Filter by search query
  if (searchQuery) {
    filteredMembers = filteredMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery) ||
        m.description.toLowerCase().includes(searchQuery) ||
        m.community.toLowerCase().includes(searchQuery)
    )
  }

  // Get featured member (first one for now)
  const featuredMember = activeCategory === 'all' && !searchQuery ? members[0] : null
  const gridMembers = featuredMember ? filteredMembers.filter((m) => m.id !== featuredMember.id) : filteredMembers

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] py-20 lg:py-28 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[var(--color-dot)] opacity-10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[var(--color-teal)] opacity-10 blur-[100px] rounded-full" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container relative">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[var(--color-dot)] rounded-full" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                Coalition Members
              </span>
            </div>

            <h1 className="display-lg mb-4">
              <span className="text-[var(--color-dot)]">{members.length}</span> Independent Voices
              <span className="text-[var(--color-dot)]">.</span>
            </h1>

            <p className="text-xl text-[var(--color-warm-gray)] leading-relaxed mb-8">
              Ethnic media, neighborhood news, investigative journalism — diverse publications
              serving San Francisco's diverse communities for over 125 combined years.
            </p>

            {/* Stats */}
            <div className="flex gap-8 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-[var(--color-paper)]">{members.length}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)]">Publications</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--color-paper)]">125+</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)]">Years Combined</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--color-paper)]">8</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)]">Neighborhoods</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)] sticky top-0 z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              {memberCategories.map((cat) => (
                <Link
                  key={cat.value}
                  href={cat.value === 'all' ? '/members' : `/members?category=${cat.value}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.value
                      ? 'bg-[var(--color-dot)] text-white'
                      : 'bg-transparent text-[var(--color-warm-gray)] hover:text-white border border-white/20 hover:border-white/40'
                  }`}
                >
                  {cat.label}
                  {cat.value !== 'all' && (
                    <span className="ml-1.5 opacity-60">
                      ({getMembersByCategory(cat.value).length})
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Search */}
            <form action="/members" className="relative">
              <input type="hidden" name="category" value={activeCategory} />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-warm-gray)]" />
              <input
                type="search"
                name="q"
                placeholder="Search publications..."
                defaultValue={searchQuery}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-[var(--color-warm-gray)] text-sm focus:outline-none focus:border-[var(--color-dot)] transition-colors"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Featured Member */}
      {featuredMember && (
        <section className="section section-paper">
          <div className="container">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[var(--color-teal)] rounded-full" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                Featured Publication
              </span>
            </div>
            <PublicationCard
              publication={{
                id: featuredMember.id,
                name: featuredMember.name,
                slug: featuredMember.slug,
                description: featuredMember.longDescription || featuredMember.description,
                community: featuredMember.community,
                beats: featuredMember.category,
                url: featuredMember.url,
                rssUrl: featuredMember.rssUrl,
                foundedYear: featuredMember.foundedYear,
              }}
              variant="featured"
            />
          </div>
        </section>
      )}

      {/* Members Grid */}
      <section className={`section ${featuredMember ? 'section-cream' : 'section-paper'}`}>
        <div className="container">
          {!featuredMember && filteredMembers.length > 0 && (
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                {activeCategory === 'all' ? 'All Publications' : memberCategories.find(c => c.value === activeCategory)?.label}
                <span className="ml-2 text-[var(--color-warm-gray)] font-normal">({filteredMembers.length})</span>
              </h2>
            </div>
          )}

          {gridMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridMembers.map((member) => (
                <PublicationCard
                  key={member.id}
                  publication={{
                    id: member.id,
                    name: member.name,
                    slug: member.slug,
                    description: member.description,
                    community: member.community,
                    url: member.url,
                    rssUrl: member.rssUrl,
                    foundedYear: member.foundedYear,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[var(--color-mist)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-[var(--color-warm-gray)]" />
              </div>
              <p className="text-[var(--color-warm-gray)] text-lg mb-2">
                No publications found
              </p>
              <p className="text-[var(--color-slate)] text-sm mb-4">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : 'No publications in this category'}
              </p>
              <Link href="/members" className="text-[var(--color-dot)] font-medium hover:underline">
                View all publications →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-paper border-t border-[var(--color-mist)]">
        <div className="container">
          <div className="bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-teal-dark)] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

            <div className="relative max-w-2xl">
              <h2 className="display-sm mb-4">
                Are you a San Francisco publication?
              </h2>
              <p className="text-white/80 mb-6">
                Join the coalition to access shared resources, collaborative opportunities,
                and advocacy support for independent local journalism.
              </p>
              <Link href="/join" className="btn bg-white text-[var(--color-teal)] hover:bg-white/90">
                Apply to join
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
