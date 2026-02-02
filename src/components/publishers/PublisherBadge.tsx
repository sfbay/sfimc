import { cn } from '@/lib/utils'
import { PublisherAvatar } from './PublisherAvatar'

export interface PublisherBadgeProps {
  /** Publisher name */
  name: string
  /** Logo URL */
  logo?: string
  /** Brand color (hex) */
  color?: string
  /** Size variant - affects avatar and text size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Show story count badge */
  storyCount?: number
  /** Show color accent bar on left */
  showAccent?: boolean
  /** Interactive state - adds hover effects */
  interactive?: boolean
  /** Is this the active/selected publisher */
  isActive?: boolean
  /** Additional classes */
  className?: string
  /** Click handler */
  onClick?: () => void
}

const sizeConfig = {
  sm: {
    avatar: 'sm' as const,
    text: 'text-xs',
    gap: 'gap-1.5',
    padding: 'px-2 py-1',
    countSize: 'text-[10px] px-1.5 py-0.5',
  },
  md: {
    avatar: 'md' as const,
    text: 'text-sm',
    gap: 'gap-2',
    padding: 'px-3 py-1.5',
    countSize: 'text-xs px-2 py-0.5',
  },
  lg: {
    avatar: 'lg' as const,
    text: 'text-base',
    gap: 'gap-3',
    padding: 'px-4 py-2',
    countSize: 'text-xs px-2 py-1',
  },
  xl: {
    avatar: 'xl' as const,
    text: 'text-lg',
    gap: 'gap-4',
    padding: 'px-5 py-3',
    countSize: 'text-sm px-2.5 py-1',
  },
}

/**
 * PublisherBadge - Complete publisher identification with logo, name, and optional count
 *
 * Use cases:
 * - Filter pills in news feed
 * - Story attribution
 * - Publisher spotlight headers
 */
export function PublisherBadge({
  name,
  logo,
  color = '#78716c',
  size = 'md',
  storyCount,
  showAccent = false,
  interactive = false,
  isActive = false,
  className,
  onClick,
}: PublisherBadgeProps) {
  const config = sizeConfig[size]

  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full transition-all',
        config.gap,
        config.padding,
        // Base styles
        'bg-[var(--color-paper)] border border-[var(--color-mist)]',
        // Interactive styles
        interactive && [
          'cursor-pointer',
          'hover:border-[var(--color-teal)] hover:shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dot)] focus-visible:ring-offset-2',
        ],
        // Active state
        isActive && 'border-[var(--color-dot)] bg-[var(--color-cream)] shadow-sm',
        // Accent bar
        showAccent && 'border-l-4',
        className
      )}
      style={showAccent ? { borderLeftColor: color } : undefined}
    >
      <PublisherAvatar
        name={name}
        logo={logo}
        color={color}
        size={config.avatar}
      />

      <span
        className={cn(
          config.text,
          'font-medium text-[var(--color-ink)]',
          interactive && 'group-hover:text-[var(--color-teal)]'
        )}
      >
        {name}
      </span>

      {typeof storyCount === 'number' && (
        <span
          className={cn(
            config.countSize,
            'rounded-full font-mono font-medium',
            'bg-[var(--color-mist)] text-[var(--color-warm-gray)]',
            isActive && 'bg-[var(--color-dot)] text-white'
          )}
        >
          {storyCount}
        </span>
      )}
    </Component>
  )
}
