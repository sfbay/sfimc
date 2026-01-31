import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Calendar, MapPin, Video, Clock, Users } from 'lucide-react'

export interface Event {
  id: string
  title: string
  slug: string
  description?: string
  date: string
  endDate?: string
  time?: string
  location?: string
  isVirtual?: boolean
  virtualUrl?: string
  registrationUrl?: string
  capacity?: number
  attendees?: number
  image?: { url: string; alt: string }
  tags?: string[]
}

interface EventCardProps {
  event: Event
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

function formatEventDate(dateString: string): { day: string; month: string; weekday: string } {
  const date = new Date(dateString)
  return {
    day: date.getDate().toString(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
  }
}

function isUpcoming(dateString: string): boolean {
  return new Date(dateString) > new Date()
}

export function EventCard({ event, variant = 'default', className }: EventCardProps) {
  const { day, month, weekday } = formatEventDate(event.date)
  const upcoming = isUpcoming(event.date)

  if (variant === 'featured') {
    return (
      <div
        className={cn(
          'rounded-2xl overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)] group hover-lift relative',
          className
        )}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-teal)]/20 via-transparent to-[var(--color-dot)]/10" />

        <div className="relative p-8">
          <div className="flex gap-6">
            {/* Date block */}
            <div className="flex-shrink-0 w-20 h-20 bg-[var(--color-dot)] rounded-2xl flex flex-col items-center justify-center text-white">
              <span className="text-xs font-mono uppercase tracking-wider opacity-80">
                {month}
              </span>
              <span className="text-3xl font-bold leading-none">{day}</span>
              <span className="text-xs font-mono uppercase tracking-wider opacity-80">
                {weekday}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {event.isVirtual ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--color-teal)] text-white text-xs font-mono uppercase tracking-wider rounded-md">
                    <Video className="w-3 h-3" />
                    Virtual
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--color-gold)] text-[var(--color-ink)] text-xs font-mono uppercase tracking-wider rounded-md">
                    <MapPin className="w-3 h-3" />
                    In Person
                  </span>
                )}
                {!upcoming && (
                  <span className="px-2 py-1 bg-white/10 text-white/60 text-xs font-mono uppercase tracking-wider rounded-md">
                    Past Event
                  </span>
                )}
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">
                {event.title}
              </h3>

              {event.description && (
                <p className="text-[var(--color-warm-gray)] mb-4 line-clamp-2">
                  {event.description}
                </p>
              )}

              {/* Event details */}
              <div className="flex flex-wrap gap-4 text-sm text-[var(--color-warm-gray)] mb-6">
                {event.time && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                )}
                {event.capacity && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.attendees || 0}/{event.capacity} registered
                  </span>
                )}
              </div>

              {/* Actions */}
              {upcoming && event.registrationUrl && (
                <Link href={event.registrationUrl} className="btn btn-dot">
                  Register now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/events/${event.slug}`}
        className={cn(
          'flex items-center gap-4 p-4 rounded-xl bg-[var(--color-paper)] border border-[var(--color-mist)] hover-lift hover-border-teal group',
          !upcoming && 'opacity-60',
          className
        )}
      >
        {/* Date block */}
        <div className="flex-shrink-0 w-14 h-14 bg-[var(--color-cream)] rounded-xl flex flex-col items-center justify-center border border-[var(--color-mist)] group-hover:border-[var(--color-teal)] group-hover:bg-[var(--color-teal)] group-hover:text-white transition-all">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-warm-gray)] group-hover:text-white/80">
            {month}
          </span>
          <span className="text-xl font-bold leading-none text-[var(--color-ink)] group-hover:text-white">
            {day}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--color-ink)] truncate group-hover:text-[var(--color-teal)] transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-[var(--color-warm-gray)]">
            {event.isVirtual ? (
              <span className="flex items-center gap-1">
                <Video className="w-3 h-3" />
                Virtual
              </span>
            ) : (
              event.location && (
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </span>
              )
            )}
          </div>
        </div>

        {/* Arrow */}
        <svg
          className="w-4 h-4 text-[var(--color-warm-gray)] group-hover:text-[var(--color-teal)] group-hover:translate-x-1 transition-all flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/events/${event.slug}`}
      className={cn(
        'rounded-2xl overflow-hidden bg-[var(--color-paper)] border border-[var(--color-mist)] hover-lift hover-border-teal group block',
        !upcoming && 'opacity-70',
        className
      )}
    >
      {/* Top accent */}
      <div className="h-1 bg-gradient-teal-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

      <div className="p-6">
        <div className="flex gap-4">
          {/* Date block */}
          <div className="flex-shrink-0 w-16 h-16 bg-[var(--color-cream)] rounded-xl flex flex-col items-center justify-center border border-[var(--color-mist)] group-hover:border-[var(--color-teal)] group-hover:bg-[var(--color-teal)] group-hover:text-white transition-all">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)] group-hover:text-white/80">
              {month}
            </span>
            <span className="text-2xl font-bold leading-none text-[var(--color-ink)] group-hover:text-white">
              {day}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {event.isVirtual ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--color-teal)]/10 text-[var(--color-teal)] text-xs font-mono uppercase tracking-wider rounded">
                  <Video className="w-3 h-3" />
                  Virtual
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--color-gold)]/10 text-[var(--color-gold-dark)] text-xs font-mono uppercase tracking-wider rounded">
                  <MapPin className="w-3 h-3" />
                  In Person
                </span>
              )}
            </div>

            <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-teal)] transition-colors">
              {event.title}
            </h3>

            {event.description && (
              <p className="text-[var(--color-slate)] text-sm mb-3 line-clamp-2">
                {event.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-[var(--color-warm-gray)]">
              {event.time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {event.time}
                </span>
              )}
              {event.location && !event.isVirtual && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
