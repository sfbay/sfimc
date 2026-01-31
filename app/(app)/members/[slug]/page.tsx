import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Rss, Calendar, MapPin, Users } from 'lucide-react'

// Placeholder data - will be replaced with Payload queries
const members = [
  {
    id: '1',
    name: 'El Tecolote',
    slug: 'el-tecolote',
    community: 'Mission District · Latino',
    neighborhood: 'Mission District',
    category: ['ethnic'],
    description: 'Bilingual newspaper serving SF\'s Latino community since 1970. Published with SF State journalism students.',
    longDescription: `El Tecolote is San Francisco's oldest bilingual community newspaper, founded in 1970 by journalism students at San Francisco State University. For over five decades, El Tecolote has been a vital voice for the Latino community in San Francisco, covering local news, arts, culture, and social justice issues in both English and Spanish.

The newspaper continues its partnership with SF State's journalism program, providing hands-on training for the next generation of community journalists while serving as an essential information source for the Mission District and beyond.`,
    url: 'https://eltecolote.org',
    rssUrl: 'https://eltecolote.org/feed/',
    foundedYear: 1970,
    color: '#dcae27',
    socialLinks: {
      twitter: 'https://twitter.com/elteabordo',
      facebook: 'https://facebook.com/eltecolote',
      instagram: 'https://instagram.com/eltecolote',
    },
    stats: {
      founded: 1970,
      languages: ['English', 'Spanish'],
      frequency: 'Bi-weekly',
    },
  },
  {
    id: '2',
    name: 'Mission Local',
    slug: 'mission-local',
    community: 'Mission District',
    neighborhood: 'Mission District',
    category: ['neighborhood', 'investigative'],
    description: 'Nonprofit news covering SF\'s Mission neighborhood with in-depth local reporting and investigations.',
    longDescription: `Mission Local is an award-winning nonprofit news organization dedicated to covering San Francisco's Mission neighborhood. Founded in 2009 by journalists and community members, Mission Local has grown into one of the most respected hyperlocal news outlets in the country.

The publication is known for its in-depth investigative reporting on housing, public safety, and local government, as well as its street-level coverage of the vibrant Mission District community. Mission Local has won numerous journalism awards and serves as a model for sustainable community news organizations.`,
    url: 'https://missionlocal.org',
    rssUrl: 'https://missionlocal.org/feed/',
    foundedYear: 2009,
    color: '#0b525b',
    socialLinks: {
      twitter: 'https://twitter.com/mabordo',
      facebook: 'https://facebook.com/missionlocal',
      instagram: 'https://instagram.com/missionlocalsf',
    },
    stats: {
      founded: 2009,
      languages: ['English'],
      frequency: 'Daily',
    },
  },
  {
    id: '3',
    name: 'The Bay View',
    slug: 'the-bay-view',
    community: 'Hunters Point · Black',
    neighborhood: 'Bayview-Hunters Point',
    category: ['ethnic'],
    description: 'San Francisco\'s Black newspaper, covering Bayview-Hunters Point and Black communities since 1976.',
    longDescription: `The San Francisco Bay View, founded in 1976, is San Francisco's Black newspaper and a powerful voice for the Bayview-Hunters Point community and Black communities throughout the Bay Area.

The Bay View has been at the forefront of environmental justice reporting, particularly around the Hunters Point Shipyard cleanup, and continues to provide essential coverage of issues affecting Black San Franciscans. The newspaper is known for its fearless advocacy journalism and deep community roots.`,
    url: 'https://sfbayview.com',
    rssUrl: 'https://sfbayview.com/feed/',
    foundedYear: 1976,
    color: '#0b525b',
    socialLinks: {
      twitter: 'https://twitter.com/sfbayview',
      facebook: 'https://facebook.com/sfbayview',
    },
    stats: {
      founded: 1976,
      languages: ['English'],
      frequency: 'Weekly',
    },
  },
  {
    id: '4',
    name: 'SF Public Press',
    slug: 'sf-public-press',
    community: 'Citywide · Investigative',
    neighborhood: 'Citywide',
    category: ['investigative'],
    description: 'Nonprofit investigative newsroom producing deep-dive reporting on housing, government, and public safety.',
    longDescription: `SF Public Press is a nonprofit, nonpartisan news organization dedicated to investigative and explanatory journalism that serves San Francisco. Founded in 2009, SF Public Press produces in-depth reporting on critical issues including housing, homelessness, government accountability, and public safety.

The organization is known for its rigorous, data-driven approach to journalism and its commitment to making complex issues accessible to all San Franciscans. SF Public Press stories have led to significant policy changes and have been recognized with numerous journalism awards.`,
    url: 'https://sfpublicpress.org',
    rssUrl: 'https://sfpublicpress.org/feed/',
    foundedYear: 2009,
    color: '#ff4f1f',
    socialLinks: {
      twitter: 'https://twitter.com/sfpublicpress',
      facebook: 'https://facebook.com/sfpublicpress',
    },
    stats: {
      founded: 2009,
      languages: ['English'],
      frequency: 'Weekly',
    },
  },
  {
    id: '5',
    name: 'Bay Area Reporter',
    slug: 'bay-area-reporter',
    community: 'Citywide · LGBTQ+',
    neighborhood: 'Castro',
    category: ['lgbtq'],
    description: 'The nation\'s oldest continuously published LGBTQ+ newspaper, serving the Bay Area since 1971.',
    longDescription: `The Bay Area Reporter (B.A.R.) is the nation's oldest continuously published LGBTQ+ newspaper. Founded in 1971, the B.A.R. has been documenting and serving the Bay Area's LGBTQ+ community for over five decades.

The newspaper has chronicled the community through historic moments including the AIDS crisis, the fight for marriage equality, and continues to cover politics, arts, culture, and community news. The B.A.R. remains an essential voice for LGBTQ+ San Franciscans and a vital part of the city's journalistic landscape.`,
    url: 'https://ebar.com',
    rssUrl: 'https://ebar.com/feed/',
    foundedYear: 1971,
    color: '#c41e6a',
    socialLinks: {
      twitter: 'https://twitter.com/ebabordo',
      facebook: 'https://facebook.com/bayareareporter',
      instagram: 'https://instagram.com/bayareareporter',
    },
    stats: {
      founded: 1971,
      languages: ['English'],
      frequency: 'Weekly',
    },
  },
  {
    id: '6',
    name: 'Nichi Bei',
    slug: 'nichi-bei',
    community: 'Japantown · Japanese American',
    neighborhood: 'Japantown',
    category: ['ethnic'],
    description: 'Covering Japanese American news since 1899, with roots in SF\'s historic Japantown community.',
    longDescription: `The Nichi Bei traces its roots to 1899, making it one of the oldest Japanese American news organizations in the country. Based in San Francisco's historic Japantown, the publication serves the Japanese American community with news, cultural coverage, and community information.

The Nichi Bei plays a vital role in preserving Japanese American history and culture while covering contemporary issues affecting the community. The publication is an important voice for one of San Francisco's oldest and most established ethnic communities.`,
    url: 'https://nichibei.org',
    rssUrl: 'https://nichibei.org/feed/',
    foundedYear: 1899,
    color: '#14919b',
    socialLinks: {
      twitter: 'https://twitter.com/nichibei',
      facebook: 'https://facebook.com/nichibei',
    },
    stats: {
      founded: 1899,
      languages: ['English', 'Japanese'],
      frequency: 'Bi-weekly',
    },
  },
]

// Placeholder recent stories - will be replaced with Payload queries
const recentStories = [
  { id: '1', title: 'Community responds to new housing development proposal', pubDate: '2025-01-28' },
  { id: '2', title: 'Local school celebrates cultural heritage month', pubDate: '2025-01-25' },
  { id: '3', title: 'Interview: Small business owners on neighborhood changes', pubDate: '2025-01-22' },
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return members.map((member) => ({
    slug: member.slug,
  }))
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { slug } = await params
  const member = members.find((m) => m.slug === slug)

  if (!member) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-ink)] text-[var(--color-paper)] py-16 lg:py-24">
        <div className="container">
          <Link
            href="/members"
            className="inline-flex items-center gap-2 text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Members
          </Link>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              {/* Publication color accent */}
              <div
                className="w-16 h-1 rounded-full mb-6"
                style={{ backgroundColor: member.color }}
              />

              <h1 className="display-lg mb-4">{member.name}</h1>

              <div className="flex flex-wrap items-center gap-4 text-[var(--color-warm-gray)] mb-6">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {member.neighborhood}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Est. {member.foundedYear}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {member.community}
                </span>
              </div>

              <p className="text-xl text-[var(--color-warm-gray)] max-w-2xl">
                {member.description}
              </p>
            </div>

            {/* Logo/Photo */}
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-[var(--color-charcoal)] rounded-2xl flex items-center justify-center">
              <span className="text-[var(--color-warm-gray)] text-xs font-mono">Logo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)]">
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={member.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Visit Website
              <ExternalLink className="w-4 h-4" />
            </a>
            {member.rssUrl && (
              <a
                href={member.rssUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
              >
                <Rss className="w-4 h-4" />
                RSS Feed
              </a>
            )}
            {member.socialLinks && (
              <div className="flex items-center gap-2 ml-auto">
                {Object.entries(member.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--color-ink)] flex items-center justify-center text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] hover:bg-[var(--color-dot)] transition-colors"
                    aria-label={`Follow on ${platform}`}
                  >
                    <span className="text-xs font-medium uppercase">{platform[0]}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section section-cream">
        <div className="container">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
            {/* About */}
            <div>
              <h2 className="display-sm mb-6">About {member.name}</h2>
              <div className="prose prose-lg max-w-none text-[var(--color-slate)]">
                {member.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Recent Stories */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
                    Recent Stories
                  </h3>
                  <Link
                    href={`/news?member=${member.slug}`}
                    className="text-[var(--color-dot)] text-sm font-medium hover:underline"
                  >
                    View all →
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentStories.map((story) => (
                    <a
                      key={story.id}
                      href={member.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card p-4 flex items-center gap-4 group hover:border-[var(--color-dot)]"
                    >
                      <div
                        className="w-1 self-stretch rounded-full"
                        style={{ backgroundColor: member.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[var(--color-ink)] group-hover:text-[var(--color-dot)] transition-colors truncate">
                          {story.title}
                        </h4>
                        <p className="text-sm text-[var(--color-warm-gray)]">
                          {new Date(story.pubDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[var(--color-warm-gray)] flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publication Stats */}
              <div className="card p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-4">
                  Publication Info
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs text-[var(--color-warm-gray)] font-mono uppercase tracking-wider">
                      Founded
                    </dt>
                    <dd className="text-[var(--color-ink)] font-medium">
                      {member.stats.founded}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-warm-gray)] font-mono uppercase tracking-wider">
                      Languages
                    </dt>
                    <dd className="text-[var(--color-ink)] font-medium">
                      {member.stats.languages.join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-warm-gray)] font-mono uppercase tracking-wider">
                      Publishing Frequency
                    </dt>
                    <dd className="text-[var(--color-ink)] font-medium">
                      {member.stats.frequency}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-warm-gray)] font-mono uppercase tracking-wider">
                      Coverage Area
                    </dt>
                    <dd className="text-[var(--color-ink)] font-medium">
                      {member.neighborhood}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Categories */}
              <div className="card p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-4">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.category.map((cat) => (
                    <Link
                      key={cat}
                      href={`/members?category=${cat}`}
                      className="px-3 py-1.5 rounded-full bg-[var(--color-mist)] text-[var(--color-slate)] text-sm font-medium hover:bg-[var(--color-dot)] hover:text-[var(--color-paper)] transition-colors capitalize"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="card p-6 bg-gradient-to-br from-[var(--color-dot)]/10 to-transparent border-[var(--color-dot)]/20">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-2">
                  Support {member.name}
                </h3>
                <p className="text-sm text-[var(--color-slate)] mb-4">
                  Independent journalism needs your support. Visit their website to subscribe, donate, or learn more.
                </p>
                <a
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full justify-center"
                >
                  Support This Publication
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Members */}
      <section className="section section-paper">
        <div className="container">
          <h2 className="display-sm mb-8 text-center">Other Coalition Members</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {members
              .filter((m) => m.slug !== member.slug)
              .slice(0, 5)
              .map((m) => (
                <Link
                  key={m.id}
                  href={`/members/${m.slug}`}
                  className="card p-4 text-center group hover:border-[var(--color-dot)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-mist)] mx-auto mb-3 flex items-center justify-center">
                    <span className="text-[var(--color-warm-gray)] text-xs font-mono">Logo</span>
                  </div>
                  <h3 className="font-semibold text-[var(--color-ink)] text-sm group-hover:text-[var(--color-dot)] transition-colors">
                    {m.name}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
