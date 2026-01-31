import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Clock } from 'lucide-react'

export interface Story {
  id: string
  title: string
  excerpt?: string
  url: string
  publishedAt: string
  source: {
    name: string
    slug: string
    logo?: { url: string; alt: string }
  }
  image?: { url: string; alt: string }
  category?: string
  readingTime?: number
}

interface StoryCardProps {
  story: Story
  /** Card variant */
  variant?: 'default' | 'compact' | 'horizontal' | 'featured'
  /** Show source badge */
  showSource?: boolean
  className?: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function StoryCard({
  story,
  variant = 'default',
  showSource = true,
  className,
}: StoryCardProps) {
  if (variant === 'featured') {
    return (
      <Link
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'rounded-2xl overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)] group hover-lift relative block',
          className
        )}
      >
        {/* Image */}
        <div className="aspect-[16/9] relative overflow-hidden">
          {story.image ? (
            <Image
              src={story.image.url}
              alt={story.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-charcoal)] to-[var(--color-ink)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-dot-teal opacity-20" aria-hidden="true" />
              </div>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-transparent" />

          {/* Category badge */}
          {story.category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[var(--color-dot)] text-white text-xs font-mono uppercase tracking-wider rounded-full">
                {story.category}
              </span>
            </div>
          )}

          {/* External icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-5 h-5 text-white/70" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-3 leading-tight group-hover:text-[var(--color-dot)] transition-colors">
            {story.title}
          </h3>

          {story.excerpt && (
            <p className="text-[var(--color-warm-gray)] mb-4 line-clamp-2">
              {story.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm">
            {showSource && (
              <div className="flex items-center gap-2">
                {story.source.logo ? (
                  <Image
                    src={story.source.logo.url}
                    alt={story.source.logo.alt}
                    width={20}
                    height={20}
                    className="rounded object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-5 h-5 rounded bg-[var(--color-dot)]/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-[var(--color-dot)]" aria-hidden="true">
                      {story.source.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="text-[var(--color-dot)] font-medium">
                  {story.source.name}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 text-[var(--color-warm-gray)]">
              <span>{formatDate(story.publishedAt)}</span>
              {story.readingTime && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {story.readingTime} min
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex gap-4 p-4 rounded-xl bg-[var(--color-paper)] border border-[var(--color-mist)] hover-lift hover-border-dot group',
          className
        )}
      >
        {/* Image */}
        <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--color-cream)] relative">
          {story.image ? (
            <Image
              src={story.image.url}
              alt={story.image.alt}
              fill
              sizes="112px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-dot-teal opacity-20" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--color-ink)] mb-1 line-clamp-2 group-hover:text-[var(--color-dot)] transition-colors">
            {story.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-[var(--color-warm-gray)]">
            {showSource && (
              <>
                <span className="text-[var(--color-teal)] font-medium">{story.source.name}</span>
                <span>·</span>
              </>
            )}
            <span>{formatDate(story.publishedAt)}</span>
          </div>
        </div>

        <ExternalLink className="w-4 h-4 text-[var(--color-warm-gray)] group-hover:text-[var(--color-dot)] flex-shrink-0 transition-colors" />
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'block p-4 rounded-xl border-l-4 border-[var(--color-mist)] hover:border-[var(--color-dot)] bg-[var(--color-paper)] hover:bg-[var(--color-cream)] transition-all group',
          className
        )}
      >
        <h3 className="font-medium text-[var(--color-ink)] mb-2 line-clamp-2 group-hover:text-[var(--color-dot)] transition-colors">
          {story.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-[var(--color-warm-gray)]">
          {showSource && (
            <>
              <span className="text-[var(--color-teal)] font-medium">{story.source.name}</span>
              <span>·</span>
            </>
          )}
          <span>{formatDate(story.publishedAt)}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'rounded-2xl overflow-hidden bg-[var(--color-paper)] border border-[var(--color-mist)] hover-lift hover-border-dot group block',
        className
      )}
    >
      {/* Image */}
      <div className="aspect-[3/2] relative overflow-hidden bg-[var(--color-cream)]">
        {story.image ? (
          <Image
            src={story.image.url}
            alt={story.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-dot-teal opacity-20" aria-hidden="true" />
          </div>
        )}

        {/* Category badge */}
        {story.category && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[var(--color-ink)] text-xs font-mono uppercase tracking-wider rounded-md">
              {story.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-ink)] mb-2 line-clamp-2 group-hover:text-[var(--color-dot)] transition-colors">
          {story.title}
        </h3>

        {story.excerpt && (
          <p className="text-[var(--color-slate)] text-sm mb-3 line-clamp-2">
            {story.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-[var(--color-warm-gray)]">
          {showSource && (
            <div className="flex items-center gap-2">
              {story.source.logo ? (
                <Image
                  src={story.source.logo.url}
                  alt={story.source.logo.alt}
                  width={16}
                  height={16}
                  className="rounded object-contain"
                  loading="lazy"
                  unoptimized={story.source.logo.url.startsWith('http')}
                />
              ) : (
                <div className="w-4 h-4 rounded bg-[var(--color-dot)]/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[var(--color-dot)]" aria-hidden="true">
                    {story.source.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-[var(--color-teal)] font-medium">{story.source.name}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <span>{formatDate(story.publishedAt)}</span>
            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  )
}
