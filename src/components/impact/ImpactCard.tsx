import Link from 'next/link'
import { ImpactTag, type ImpactType } from './ImpactTag'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Story {
  id: string
  title: string
  slug: string
  excerpt: string
  member: { name: string; slug: string }
  impactType: ImpactType
  impactDescription: string
  publishedDate: string
  url: string
  image?: { url: string; alt: string }
  featured?: boolean
}

interface ImpactCardProps {
  story: Story
  featured?: boolean
  compact?: boolean
}

export function ImpactCard({ story, featured = false, compact = false }: ImpactCardProps) {
  const formattedDate = new Date(story.publishedDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  if (featured) {
    return (
      <article className="card card-dark overflow-hidden group h-full">
        {/* Image placeholder area */}
        <div className="aspect-[16/9] bg-[var(--color-charcoal)] relative">
          {story.image ? (
            <img
              src={story.image.url}
              alt={story.image.alt}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-warm-gray)]">
              <span className="text-sm font-mono">Featured Photo</span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] to-transparent" />
        </div>

        <div className="p-6 lg:p-8">
          <ImpactTag type={story.impactType} dark className="mb-4" />

          <h3 className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-bold text-[var(--color-paper)] mb-3 leading-tight">
            {story.title}
          </h3>

          <p className="text-[var(--color-warm-gray)] mb-4 leading-relaxed">
            {story.excerpt}
          </p>

          <div className="flex items-center gap-3 text-sm text-[var(--color-warm-gray)] mb-6">
            <span className="text-[var(--color-dot)] font-semibold">{story.member.name}</span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>

          {/* Outcome Box */}
          <div className="bg-[var(--color-teal)]/10 border border-[var(--color-teal)]/30 rounded-xl p-4 mb-6">
            <p className="text-[var(--color-teal-light)] font-mono text-xs uppercase tracking-wider mb-1">
              Documented Outcome
            </p>
            <p className="text-[var(--color-paper)] text-sm">
              {story.impactDescription}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dot btn-sm"
            >
              Read full story
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/impact/${story.slug}`}
              className="text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] text-sm font-medium transition-colors"
            >
              View impact details →
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // Compact variant
  return (
    <article className={cn(
      'card overflow-hidden group flex flex-col h-full',
      compact ? 'p-5' : 'p-6'
    )}>
      <ImpactTag type={story.impactType} className="mb-3 self-start" />

      <h3 className={cn(
        'font-[family-name:var(--font-display)] font-semibold text-[var(--color-ink)] mb-2 leading-tight',
        compact ? 'text-base' : 'text-lg'
      )}>
        {story.title}
      </h3>

      <div className="flex items-center gap-2 text-sm text-[var(--color-warm-gray)] mb-3">
        <span className="text-[var(--color-dot)] font-medium">{story.member.name}</span>
        <span>·</span>
        <span>{formattedDate}</span>
      </div>

      <p className="text-[var(--color-slate)] text-sm mb-4 flex-1 line-clamp-2">
        {story.impactDescription}
      </p>

      <Link
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-teal)] hover:text-[var(--color-teal-dark)] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
      >
        Read story
        <ExternalLink className="w-3 h-3" />
      </Link>
    </article>
  )
}
