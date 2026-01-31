import Link from 'next/link'
import { EventCard } from '@/components/cards'
import { Calendar, MapPin, Users, Filter } from 'lucide-react'

// Placeholder data - will be replaced with Payload queries
const events = [
  {
    id: '1',
    title: 'Coalition Monthly Meeting',
    description: 'Monthly gathering of all SFIMC member publications to discuss shared initiatives, challenges, and upcoming collaborations.',
    date: '2026-02-15T18:00:00Z',
    endDate: '2026-02-15T20:00:00Z',
    location: 'Mission Cultural Center, 2868 Mission St',
    type: 'meeting' as const,
    organizer: { name: 'SFIMC', slug: 'sfimc' },
    registrationUrl: 'https://sfimc.org/events/monthly-feb',
    featured: true,
  },
  {
    id: '2',
    title: 'Investigative Journalism Workshop',
    description: 'SF Public Press hosts a hands-on workshop on public records requests, data analysis, and investigative techniques for local reporters.',
    date: '2026-02-08T10:00:00Z',
    endDate: '2026-02-08T16:00:00Z',
    location: 'SF Public Library, Main Branch',
    type: 'workshop' as const,
    organizer: { name: 'SF Public Press', slug: 'sf-public-press' },
    registrationUrl: 'https://sfpublicpress.org/workshop',
  },
  {
    id: '3',
    title: 'Community Journalism Awards Gala',
    description: 'Annual celebration recognizing outstanding community journalism from coalition members. Featuring keynote by veteran local reporter.',
    date: '2026-03-22T18:30:00Z',
    endDate: '2026-03-22T21:30:00Z',
    location: 'African American Art & Culture Complex',
    type: 'social' as const,
    organizer: { name: 'SFIMC', slug: 'sfimc' },
    registrationUrl: 'https://sfimc.org/gala',
    featured: true,
  },
  {
    id: '4',
    title: 'Bilingual Reporting Best Practices',
    description: 'El Tecolote editors share strategies for effective bilingual coverage, translation workflows, and reaching multilingual audiences.',
    date: '2026-02-20T14:00:00Z',
    endDate: '2026-02-20T16:00:00Z',
    location: 'Virtual (Zoom)',
    type: 'workshop' as const,
    organizer: { name: 'El Tecolote', slug: 'el-tecolote' },
    registrationUrl: 'https://eltecolote.org/workshop',
  },
  {
    id: '5',
    title: 'City Hall Press Access Forum',
    description: 'Discussion on press credentials, access to public meetings, and advocating for journalist rights at local government.',
    date: '2026-02-28T17:00:00Z',
    endDate: '2026-02-28T19:00:00Z',
    location: 'SF City Hall, Room 416',
    type: 'meeting' as const,
    organizer: { name: 'SFIMC', slug: 'sfimc' },
  },
  {
    id: '6',
    title: 'Environmental Justice Reporting Panel',
    description: 'Bay View and Mission Local reporters discuss covering environmental issues in underserved communities.',
    date: '2026-03-05T18:00:00Z',
    endDate: '2026-03-05T20:00:00Z',
    location: 'Bayview Opera House',
    type: 'panel' as const,
    organizer: { name: 'The Bay View', slug: 'the-bay-view' },
  },
  {
    id: '7',
    title: 'Newsletter Strategy Session',
    description: 'Coalition members share tactics for growing email subscribers and improving newsletter engagement.',
    date: '2026-03-12T12:00:00Z',
    endDate: '2026-03-12T13:30:00Z',
    location: 'Virtual (Zoom)',
    type: 'workshop' as const,
    organizer: { name: 'Mission Local', slug: 'mission-local' },
  },
]

const eventTypes = [
  { value: 'all', label: 'All Events' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'meeting', label: 'Meetings' },
  { value: 'panel', label: 'Panels' },
  { value: 'social', label: 'Social' },
]

interface PageProps {
  searchParams: Promise<{ type?: string; month?: string }>
}

export const metadata = {
  title: 'Events | SFIMC',
  description: 'Workshops, meetings, and community events from the San Francisco Independent Media Coalition.',
}

export default async function EventsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeType = params.type || 'all'

  // Filter by type
  const filteredEvents = activeType === 'all'
    ? events
    : events.filter((e) => e.type === activeType)

  // Sort by date
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Get featured events
  const featuredEvents = sortedEvents.filter((e) => e.featured)
  const upcomingEvents = sortedEvents.filter((e) => !e.featured)

  // Group by month
  const eventsByMonth = upcomingEvents.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    if (!acc[month]) acc[month] = []
    acc[month].push(event)
    return acc
  }, {} as Record<string, typeof events>)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)] py-20 lg:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[var(--color-teal)] opacity-10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-dot)] opacity-10 blur-[100px] rounded-full" />
          {/* Calendar grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="container relative">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-4 h-4 text-[var(--color-teal)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                Coalition Calendar
              </span>
            </div>

            <h1 className="display-lg mb-4">
              Events & Workshops
              <span className="text-[var(--color-teal)]">.</span>
            </h1>

            <p className="text-xl text-[var(--color-warm-gray)] leading-relaxed mb-8">
              Training, networking, and community gatherings from coalition members.
              All events are free for member publication staff.
            </p>

            {/* Quick stats */}
            <div className="flex gap-8 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-[var(--color-paper)]">{events.length}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)]">Upcoming</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--color-paper)]">
                  {events.filter((e) => e.type === 'workshop').length}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)]">Workshops</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--color-paper)]">Free</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)]">For Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)] sticky top-16 z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Type filters */}
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <Link
                  key={type.value}
                  href={type.value === 'all' ? '/events' : `/events?type=${type.value}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeType === type.value
                      ? 'bg-[var(--color-teal)] text-white'
                      : 'bg-transparent text-[var(--color-warm-gray)] hover:text-white border border-white/20 hover:border-white/40'
                  }`}
                >
                  {type.label}
                </Link>
              ))}
            </div>

            {/* Count */}
            <div className="flex items-center gap-4">
              <span className="text-[var(--color-warm-gray)] text-sm">
                {filteredEvents.length} events
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && activeType === 'all' && (
        <section className="section section-paper">
          <div className="container">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[var(--color-teal)] rounded-full" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                Featured Events
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={{
                    id: event.id,
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    endDate: event.endDate,
                    location: event.location,
                    type: event.type,
                    organizer: event.organizer,
                    registrationUrl: event.registrationUrl,
                  }}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events by Month */}
      <section className={`section ${featuredEvents.length > 0 && activeType === 'all' ? 'section-cream' : 'section-paper'}`}>
        <div className="container">
          {Object.keys(eventsByMonth).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
                <div key={month}>
                  {/* Month header */}
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-lg font-semibold text-[var(--color-ink)]">{month}</h2>
                    <div className="flex-1 h-px bg-[var(--color-mist)]" />
                    <span className="text-sm text-[var(--color-warm-gray)]">
                      {monthEvents.length} {monthEvents.length === 1 ? 'event' : 'events'}
                    </span>
                  </div>

                  {/* Events grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {monthEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={{
                          id: event.id,
                          title: event.title,
                          description: event.description,
                          date: event.date,
                          endDate: event.endDate,
                          location: event.location,
                          type: event.type,
                          organizer: event.organizer,
                          registrationUrl: event.registrationUrl,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[var(--color-mist)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-[var(--color-warm-gray)]" />
              </div>
              <p className="text-[var(--color-warm-gray)] text-lg mb-2">
                No events found
              </p>
              <p className="text-[var(--color-slate)] text-sm mb-4">
                Try adjusting your filters or check back later.
              </p>
              <Link href="/events" className="text-[var(--color-teal)] font-medium hover:underline">
                View all events →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Host an Event CTA */}
      <section className="section section-paper border-t border-[var(--color-mist)]">
        <div className="container">
          <div className="bg-gradient-to-br from-[var(--color-ink)] to-[var(--color-charcoal)] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-teal)]/10 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[var(--color-teal)]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                    For Members
                  </span>
                </div>
                <h2 className="display-sm mb-4">
                  Host a workshop or event
                </h2>
                <p className="text-[var(--color-warm-gray)] mb-6">
                  Coalition members can host training sessions, panels, and community events.
                  We provide promotion, space coordination, and registration support.
                </p>
                <Link href="/contact?subject=host-event" className="btn btn-teal">
                  Propose an event
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Event types showcase */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '📚', label: 'Workshops', desc: 'Skills training' },
                  { icon: '🎤', label: 'Panels', desc: 'Expert discussions' },
                  { icon: '🤝', label: 'Networking', desc: 'Community building' },
                  { icon: '🏆', label: 'Awards', desc: 'Recognition events' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-[var(--color-warm-gray)]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
