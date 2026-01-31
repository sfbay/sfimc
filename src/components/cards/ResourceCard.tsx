import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FileText, Download, ExternalLink, BookOpen, Wrench, Video, Headphones } from 'lucide-react'

export type ResourceType = 'guide' | 'toolkit' | 'report' | 'template' | 'video' | 'podcast' | 'article'

export interface Resource {
  id: string
  title: string
  slug: string
  description?: string
  type: ResourceType
  url?: string
  downloadUrl?: string
  category?: string
  tags?: string[]
  publishedAt?: string
  author?: string
  image?: { url: string; alt: string }
}

interface ResourceCardProps {
  resource: Resource
  variant?: 'default' | 'compact' | 'horizontal'
  className?: string
}

const typeIcons: Record<ResourceType, React.ReactNode> = {
  guide: <BookOpen className="w-5 h-5" />,
  toolkit: <Wrench className="w-5 h-5" />,
  report: <FileText className="w-5 h-5" />,
  template: <FileText className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  podcast: <Headphones className="w-5 h-5" />,
  article: <FileText className="w-5 h-5" />,
}

const typeColors: Record<ResourceType, string> = {
  guide: 'bg-[var(--color-teal)]/10 text-[var(--color-teal)]',
  toolkit: 'bg-[var(--color-dot)]/10 text-[var(--color-dot)]',
  report: 'bg-[var(--color-gold)]/10 text-[var(--color-gold-dark)]',
  template: 'bg-[var(--color-magenta)]/10 text-[var(--color-magenta)]',
  video: 'bg-[var(--color-dot)]/10 text-[var(--color-dot)]',
  podcast: 'bg-[var(--color-teal)]/10 text-[var(--color-teal)]',
  article: 'bg-[var(--color-ink)]/10 text-[var(--color-ink)]',
}

const typeLabels: Record<ResourceType, string> = {
  guide: 'Guide',
  toolkit: 'Toolkit',
  report: 'Report',
  template: 'Template',
  video: 'Video',
  podcast: 'Podcast',
  article: 'Article',
}

export function ResourceCard({ resource, variant = 'default', className }: ResourceCardProps) {
  const href = resource.url || `/resources/${resource.slug}`
  const isExternal = resource.url?.startsWith('http')

  if (variant === 'horizontal') {
    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={cn(
          'flex gap-4 p-4 rounded-xl bg-[var(--color-paper)] border border-[var(--color-mist)] hover-lift hover-border-dot group',
          className
        )}
      >
        {/* Icon */}
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
          typeColors[resource.type]
        )}>
          {typeIcons[resource.type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              'text-xs font-mono uppercase tracking-wider',
              typeColors[resource.type].split(' ')[1]
            )}>
              {typeLabels[resource.type]}
            </span>
            {resource.category && (
              <>
                <span className="text-[var(--color-mist)]">·</span>
                <span className="text-xs text-[var(--color-warm-gray)]">{resource.category}</span>
              </>
            )}
          </div>

          <h3 className="font-semibold text-[var(--color-ink)] mb-1 line-clamp-1 group-hover:text-[var(--color-dot)] transition-colors">
            {resource.title}
          </h3>

          {resource.description && (
            <p className="text-[var(--color-slate)] text-sm line-clamp-1">
              {resource.description}
            </p>
          )}
        </div>

        {/* Action indicator */}
        {resource.downloadUrl ? (
          <Download className="w-4 h-4 text-[var(--color-warm-gray)] group-hover:text-[var(--color-dot)] flex-shrink-0" />
        ) : (
          <ExternalLink className="w-4 h-4 text-[var(--color-warm-gray)] group-hover:text-[var(--color-dot)] flex-shrink-0" />
        )}
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg bg-[var(--color-paper)] border border-[var(--color-mist)] hover:bg-[var(--color-cream)] hover:border-[var(--color-dot)] transition-all group',
          className
        )}
      >
        {/* Icon */}
        <div className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
          typeColors[resource.type]
        )}>
          {typeIcons[resource.type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-[var(--color-ink)] truncate group-hover:text-[var(--color-dot)] transition-colors">
            {resource.title}
          </h3>
          <span className={cn(
            'text-xs font-mono uppercase tracking-wider',
            typeColors[resource.type].split(' ')[1]
          )}>
            {typeLabels[resource.type]}
          </span>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'rounded-2xl overflow-hidden bg-[var(--color-paper)] border border-[var(--color-mist)] hover-lift hover-border-dot group block relative',
        className
      )}
    >
      {/* Top accent */}
      <div className="h-1 bg-gradient-dot-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

      <div className="p-6">
        {/* Type badge & Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center',
            typeColors[resource.type]
          )}>
            {typeIcons[resource.type]}
          </div>

          {resource.downloadUrl && (
            <button
              onClick={(e) => {
                e.preventDefault()
                window.open(resource.downloadUrl, '_blank')
              }}
              className="p-2 rounded-lg bg-[var(--color-cream)] hover:bg-[var(--color-dot)] hover:text-white transition-colors"
              aria-label="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Type label */}
        <div className="flex items-center gap-2 mb-2">
          <span className={cn(
            'text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded',
            typeColors[resource.type]
          )}>
            {typeLabels[resource.type]}
          </span>
          {resource.category && (
            <span className="text-xs text-[var(--color-warm-gray)]">
              {resource.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-dot)] transition-colors">
          {resource.title}
        </h3>

        {/* Description */}
        {resource.description && (
          <p className="text-[var(--color-slate)] text-sm mb-4 line-clamp-2">
            {resource.description}
          </p>
        )}

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-[var(--color-cream)] text-[var(--color-warm-gray)] text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        <div className="flex items-center gap-1 text-[var(--color-warm-gray)] group-hover:text-[var(--color-dot)] text-sm transition-colors">
          <span className="font-medium">
            {resource.downloadUrl ? 'Download' : 'View resource'}
          </span>
          {resource.downloadUrl ? (
            <Download className="w-3.5 h-3.5" />
          ) : (
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      </div>
    </Link>
  )
}
