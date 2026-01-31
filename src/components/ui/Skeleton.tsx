import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  /** Number of lines for text skeleton */
  lines?: number
  /** Show as circular avatar */
  avatar?: boolean
}

/**
 * Loading skeleton component for better perceived performance.
 * Uses CSS animation for shimmer effect.
 */
export function Skeleton({ className, lines = 1, avatar }: SkeletonProps) {
  if (avatar) {
    return (
      <div
        className={cn(
          'skeleton w-12 h-12 rounded-full',
          className
        )}
        aria-hidden="true"
      />
    )
  }

  if (lines > 1) {
    return (
      <div className={cn('space-y-2', className)} aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'skeleton h-4 rounded',
              i === lines - 1 && 'w-3/4' // Last line is shorter
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn('skeleton h-4 rounded', className)}
      aria-hidden="true"
    />
  )
}

/**
 * Card skeleton for loading states
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-[var(--color-paper)] border border-[var(--color-mist)] p-6',
        className
      )}
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="skeleton aspect-[3/2] rounded-lg mb-4" />

      {/* Title */}
      <div className="skeleton h-5 w-3/4 rounded mb-2" />

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="skeleton h-3 rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2">
        <div className="skeleton w-4 h-4 rounded-full" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  )
}

/**
 * Stats skeleton for dashboard loading
 */
export function StatSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'p-6 rounded-2xl bg-white/5 border border-white/10',
        className
      )}
      aria-hidden="true"
    >
      <div className="skeleton-dark w-12 h-12 rounded-xl mb-4" />
      <div className="skeleton-dark h-10 w-1/2 rounded mb-2" />
      <div className="skeleton-dark h-4 w-3/4 rounded mb-1" />
      <div className="skeleton-dark h-3 w-1/2 rounded" />
    </div>
  )
}
