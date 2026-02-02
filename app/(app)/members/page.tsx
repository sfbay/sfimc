'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { ExternalLink, MapPin, Calendar, Newspaper, Search, ArrowRight } from 'lucide-react'
import { members, memberCategories, getMembersByCategory } from '@/data/members'
import { getMemberMeta } from '@/lib/news/utils'
import { cn } from '@/lib/utils'

/**
 * Members Page - Editorial magazine-style showcase of coalition publications
 *
 * Design: Celebrates each publication's unique identity while showing
 * the collective power of independent voices together.
 */

export default function MembersPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  const filteredMembers = useMemo(() => {
    let result = getMembersByCategory(activeCategory)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.community.toLowerCase().includes(query)
      )
    }
    return result
  }, [activeCategory, searchQuery])

  // Calculate combined years of service
  const combinedYears = members.reduce((sum, m) => {
    if (m.foundedYear) {
      return sum + (new Date().getFullYear() - m.foundedYear)
    }
    return sum
  }, 0)

  return (
    <>
      {/* Hero Section - Dynamic Logo Showcase */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 animate-pulse"
            style={{
              background: 'var(--color-dot)',
              top: '-200px',
              right: '-100px',
              animationDuration: '4s'
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
            style={{
              background: 'var(--color-teal)',
              bottom: '-150px',
              left: '-100px',
              animationDuration: '6s'
            }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-10"
            style={{
              background: 'var(--color-gold)',
              top: '50%',
              left: '30%',
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-dot)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-dot)]" />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Coalition Members
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] mb-6">
                <span className="text-[var(--color-dot)]">{members.length}</span> Independent
                <br />
                <span className="text-[var(--color-teal-light)]">Voices</span> of SF
                <span className="text-[var(--color-dot)]">.</span>
              </h1>

              <p className="text-xl text-[var(--color-warm-gray)] leading-relaxed mb-10 max-w-lg">
                From ethnic media to investigative journalism, neighborhood news to LGBTQ+ coverage —
                meet the publications telling San Francisco's stories.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8">
                <div className="group">
                  <div className="text-4xl font-bold text-[var(--color-paper)] group-hover:text-[var(--color-dot)] transition-colors">
                    {combinedYears}+
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)] mt-1">
                    Combined Years
                  </div>
                </div>
                <div className="group">
                  <div className="text-4xl font-bold text-[var(--color-paper)] group-hover:text-[var(--color-teal-light)] transition-colors">
                    8
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)] mt-1">
                    Neighborhoods
                  </div>
                </div>
                <div className="group">
                  <div className="text-4xl font-bold text-[var(--color-paper)] group-hover:text-[var(--color-gold)] transition-colors">
                    6
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)] mt-1">
                    Languages
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Logo Mosaic */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-3 lg:gap-4">
                {members.slice(0, 9).map((member, idx) => {
                  const meta = getMemberMeta(member.slug)
                  const isHovered = hoveredMember === member.slug

                  return (
                    <Link
                      key={member.slug}
                      href={`/members/${member.slug}`}
                      className={cn(
                        'aspect-square rounded-2xl p-4 flex items-center justify-center transition-all duration-300 group relative overflow-hidden',
                        isHovered ? 'scale-105 z-10' : 'scale-100'
                      )}
                      style={{
                        background: isHovered
                          ? `linear-gradient(135deg, ${member.color}40 0%, ${member.color}20 100%)`
                          : 'rgba(255,255,255,0.03)',
                        borderWidth: '1px',
                        borderColor: isHovered ? `${member.color}60` : 'rgba(255,255,255,0.08)',
                        animationDelay: `${idx * 100}ms`,
                      }}
                      onMouseEnter={() => setHoveredMember(member.slug)}
                      onMouseLeave={() => setHoveredMember(null)}
                    >
                      {meta.logo ? (
                        <Image
                          src={meta.logo}
                          alt={member.name}
                          width={120}
                          height={60}
                          className={cn(
                            'max-h-12 w-auto object-contain transition-all duration-300',
                            isHovered ? 'scale-110 brightness-110' : 'brightness-90 grayscale-[30%]'
                          )}
                        />
                      ) : (
                        <span
                          className={cn(
                            'text-3xl font-bold transition-colors',
                            isHovered ? '' : 'text-white/30'
                          )}
                          style={{ color: isHovered ? member.color : undefined }}
                        >
                          {member.name.charAt(0)}
                        </span>
                      )}

                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                        style={{
                          boxShadow: `inset 0 0 30px ${member.color}30`
                        }}
                      />
                    </Link>
                  )
                })}
              </div>

              {/* Additional members indicator */}
              {members.length > 9 && (
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-[var(--color-dot)] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  +{members.length - 9}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)] sticky top-0 z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 flex-1">
              {memberCategories.map((cat) => {
                const count = getMembersByCategory(cat.value).length
                const isActive = activeCategory === cat.value

                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-all',
                      isActive
                        ? 'bg-[var(--color-dot)] text-white shadow-lg shadow-[var(--color-dot)]/25'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {cat.label}
                    {cat.value !== 'all' && (
                      <span className={cn('ml-1.5', isActive ? 'opacity-80' : 'opacity-50')}>
                        ({count})
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-warm-gray)]" />
              <input
                type="search"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-[var(--color-warm-gray)] text-sm focus:outline-none focus:border-[var(--color-dot)] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="section section-paper">
        <div className="container">
          {filteredMembers.length > 0 ? (
            <div className="grid gap-6">
              {filteredMembers.map((member, idx) => {
                const meta = getMemberMeta(member.slug)

                return (
                  <article
                    key={member.slug}
                    className="group relative rounded-2xl overflow-hidden bg-[var(--color-paper)] border border-[var(--color-mist)] hover:border-transparent transition-all duration-300"
                    style={{
                      animationDelay: `${idx * 50}ms`,
                    }}
                  >
                    {/* Accent border on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 0 2px ${member.color}`,
                      }}
                    />

                    <div className="flex flex-col lg:flex-row">
                      {/* Logo Section */}
                      <div
                        className="lg:w-72 flex-shrink-0 p-8 flex items-center justify-center relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${member.color}12 0%, transparent 100%)`,
                        }}
                      >
                        {/* Background pattern */}
                        <div
                          className="absolute inset-0 opacity-5"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        />

                        {meta.logo ? (
                          <Image
                            src={meta.logo}
                            alt={member.name}
                            width={180}
                            height={80}
                            className="max-h-16 w-auto object-contain relative z-10 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10"
                            style={{ backgroundColor: `${member.color}20` }}
                          >
                            <span
                              className="text-4xl font-bold"
                              style={{ color: member.color }}
                            >
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                          <div className="flex-1">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-dot)] transition-colors">
                                  {member.name}
                                </h2>
                                <div className="flex items-center gap-3 mt-1">
                                  <span
                                    className="text-sm font-medium"
                                    style={{ color: member.color }}
                                  >
                                    {member.community}
                                  </span>
                                </div>
                              </div>

                              {member.foundedYear && (
                                <div className="flex items-center gap-1.5 text-[var(--color-warm-gray)] text-sm">
                                  <Calendar className="w-4 h-4" />
                                  <span>Est. {member.foundedYear}</span>
                                </div>
                              )}
                            </div>

                            {/* Description */}
                            <p className="text-[var(--color-slate)] leading-relaxed mb-4">
                              {member.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {member.category.map((cat) => (
                                <span
                                  key={cat}
                                  className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider"
                                  style={{
                                    backgroundColor: `${member.color}15`,
                                    color: member.color,
                                  }}
                                >
                                  {cat}
                                </span>
                              ))}
                              {member.stats?.languages && member.stats.languages.length > 1 && (
                                <span className="px-3 py-1 rounded-full bg-[var(--color-mist)] text-[var(--color-slate)] text-xs font-mono uppercase tracking-wider">
                                  {member.stats.languages.join(' + ')}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-row lg:flex-col gap-3 flex-shrink-0">
                            <Link
                              href={`/members/${member.slug}`}
                              className="btn btn-outline group/btn flex items-center gap-2"
                            >
                              <span>View Profile</span>
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                              href={member.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-[var(--color-mist)] flex items-center gap-2"
                            >
                              <span>Visit Site</span>
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-[var(--color-mist)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-[var(--color-warm-gray)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-ink)] mb-2">
                No publications found
              </h3>
              <p className="text-[var(--color-slate)] mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : 'No publications in this category'}
              </p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="text-[var(--color-dot)] font-medium hover:underline"
              >
                View all publications →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Coalition Map / Neighborhood Section */}
      <section className="section section-cream">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-teal)]/10 mb-4">
              <MapPin className="w-4 h-4 text-[var(--color-teal)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-teal)]">
                Across San Francisco
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold text-[var(--color-ink)] mb-4">
              Every Neighborhood Has a Voice
            </h2>
            <p className="text-[var(--color-slate)] max-w-2xl mx-auto">
              From the Mission to Ingleside, Bayview to the Richmond — our coalition members
              ensure every community's stories are told.
            </p>
          </div>

          {/* Neighborhood Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Mission District', publications: ['El Tecolote', 'Mission Local'], color: '#dcae27' },
              { name: 'Bayview-Hunters Point', publications: ['The Bay View'], color: '#0b525b' },
              { name: 'Japantown', publications: ['Nichi Bei'], color: '#14919b' },
              { name: 'Castro', publications: ['Bay Area Reporter'], color: '#7c3aed' },
              { name: 'Richmond', publications: ['Richmond Review'], color: '#059669' },
              { name: 'Sunset', publications: ['Sunset Beacon'], color: '#d97706' },
              { name: 'Ingleside', publications: ['Ingleside Light'], color: '#0891b2' },
              { name: 'Citywide', publications: ['48 Hills', 'SF Public Press'], color: '#ff4f1f' },
            ].map((neighborhood) => (
              <div
                key={neighborhood.name}
                className="p-5 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-mist)] hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-3 h-3 rounded-full mb-3"
                  style={{ backgroundColor: neighborhood.color }}
                />
                <h3 className="font-semibold text-[var(--color-ink)] mb-1">
                  {neighborhood.name}
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)]">
                  {neighborhood.publications.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="section section-paper">
        <div className="container">
          <div
            className="rounded-3xl p-8 lg:p-12 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--color-ink) 0%, var(--color-charcoal) 100%)',
            }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-20" style={{ background: 'var(--color-dot)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-15" style={{ background: 'var(--color-teal)' }} />

            <div className="relative flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 mb-4">
                  <Newspaper className="w-4 h-4 text-[var(--color-dot)]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                    Join the Coalition
                  </span>
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold text-white mb-4">
                  Are You an SF Publication?
                </h2>
                <p className="text-white/70 text-lg max-w-xl">
                  Join the coalition for shared resources, collaborative opportunities,
                  and advocacy support for independent local journalism.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href="/join"
                  className="btn bg-[var(--color-dot)] text-white hover:bg-[var(--color-dot-dark)] text-lg px-8 py-4 shadow-lg shadow-[var(--color-dot)]/30"
                >
                  Apply to Join
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
