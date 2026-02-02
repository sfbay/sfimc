import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Clock } from 'lucide-react'
import { PublisherAvatar } from '@/components/publishers'

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
    color?: string
  }
  image?: { url: string; alt: string }
  category?: string
  readingTime?: number
}

interface StoryCardProps {
  story: Story
  /** Card variant */
  variant?: 'default' | 'compact' | 'horizontal' | 'featured' | 'publisher-branded'
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
  const brandColor = story.source.color || '#0b525b'

  // Publisher-branded variant - prominent publisher identity
  if (variant === 'publisher-branded') {
    return (
      <Link
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'block rounded-2xl overflow-hidden bg-[var(--color-paper)] border border-[var(--color-mist)] hover-lift hover-border-dot group',
          className
        )}
        style={{
          borderLeftWidth: '4px',
          borderLeftColor: brandColor,
        }}
      >
        {/* Publisher Header Bar */}
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{
            background: `linear-gradient(135deg, ${brandColor}15 0%, transparent 100%)`,
          }}
        >
          {/* Publisher Logo - horizontal format */}
          {story.source.logo?.url ? (
            <Image
              src={story.source.logo.url}
              alt={story.source.name}
              width={100}
              height={32}
              className="h-7 w-auto object-contain"
            />
          ) : (
            <PublisherAvatar
              name={story.source.name}
              logo={story.source.logo?.url}
              color={brandColor}
              size="lg"
            />
          )}
          <div className="flex-1 min-w-0">
            {/* Only show name if no logo */}
            {!story.source.logo?.url && (
              <span
                className="font-semibold text-sm block truncate"
                style={{ color: brandColor }}
              >
                {story.source.name}
              </span>
            )}
            <span className="text-xs text-[var(--color-warm-gray)]">
              {formatDate(story.publishedAt)}
            </span>
          </div>
          <ExternalLink className="w-4 h-4 text-[var(--color-warm-gray)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </div>

        {/* Image or colored placeholder */}
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
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}dd 50%, ${brandColor}bb 100%)`,
              }}
            >
              {/* Subtle texture pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
          )}
          {story.category && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[var(--color-ink)] text-xs font-mono uppercase tracking-wider rounded-md">
                {story.category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-2 line-clamp-2 group-hover:text-[var(--color-dot)] transition-colors leading-snug">
            {story.title}
          </h3>

          {story.excerpt && (
            <p className="text-[var(--color-slate)] text-sm line-clamp-2">
              {story.excerpt}
            </p>
          )}
        </div>

        {/* Read at CTA */}
        <div className="px-4 pb-4">
          <span
            className="text-xs font-medium"
            style={{ color: brandColor }}
          >
            Read at {story.source.name} →
          </span>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'rounded-2xl overflow-hidden bg-[var(--color-ink)] group hover-lift relative block',
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
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}dd 50%, ${brandColor}bb 100%)`,
              }}
            >
              {/* Subtle texture pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
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

        {/* Content - gradient from dark to light for logo readability */}
        <div className="px-6 pt-6 pb-6 lg:px-8 lg:pt-8 lg:pb-8 bg-gradient-to-b from-transparent via-white/60 to-white rounded-b-2xl">
          <h3
            className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold mb-4 leading-tight text-white group-hover:text-[var(--color-dot)] transition-colors"
            style={{ textShadow: '1px 1px 0 #333' }}
          >
            {story.title}
          </h3>

          {story.excerpt && (
            <p className="text-[var(--color-slate)] text-lg mb-5 line-clamp-2">
              {story.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm pt-2">
            {showSource && (
              <div className="flex items-center gap-3">
                {/* Publisher Logo - horizontal format */}
                {story.source.logo?.url ? (
                  <Image
                    src={story.source.logo.url}
                    alt={story.source.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <>
                    <PublisherAvatar
                      name={story.source.name}
                      logo={story.source.logo?.url}
                      color={brandColor}
                      size="lg"
                    />
                    <span className="text-[var(--color-teal)] font-medium text-base">
                      {story.source.name}
                    </span>
                  </>
                )}
              </div>
            )}

            <div className="flex items-center gap-3 text-[var(--color-slate)]">
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
        <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
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
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}cc 100%)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20h-4v-4h4v4zm0-20h-4v4h4V0zM0 20h4v-4H0v4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
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
                {story.source.logo?.url ? (
                  <Image
                    src={story.source.logo.url}
                    alt={story.source.name}
                    width={64}
                    height={20}
                    className="h-4 w-auto object-contain"
                  />
                ) : (
                  <span className="text-[var(--color-teal)] font-medium">{story.source.name}</span>
                )}
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
              {story.source.logo?.url ? (
                <Image
                  src={story.source.logo.url}
                  alt={story.source.name}
                  width={64}
                  height={20}
                  className="h-4 w-auto object-contain"
                />
              ) : (
                <span className="text-[var(--color-teal)] font-medium">{story.source.name}</span>
              )}
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
      <div className="aspect-[3/2] relative overflow-hidden">
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
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}dd 50%, ${brandColor}bb 100%)`,
            }}
          >
            {/* Subtle texture pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
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
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-2 line-clamp-2 group-hover:text-[var(--color-dot)] transition-colors leading-snug">
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
              {/* Publisher Logo - horizontal format */}
              {story.source.logo?.url ? (
                <Image
                  src={story.source.logo.url}
                  alt={story.source.name}
                  width={80}
                  height={24}
                  className="h-5 w-auto object-contain"
                />
              ) : (
                <>
                  <PublisherAvatar
                    name={story.source.name}
                    logo={story.source.logo?.url}
                    color={brandColor}
                    size="sm"
                  />
                  <span className="text-[var(--color-teal)] font-medium">{story.source.name}</span>
                </>
              )}
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
