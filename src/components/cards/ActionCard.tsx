import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight, Mail, FileSignature, Megaphone, Share2, Heart } from 'lucide-react'

export type ActionType = 'petition' | 'letter' | 'share' | 'donate' | 'contact' | 'campaign'

export interface Action {
  id: string
  title: string
  description?: string
  type: ActionType
  url: string
  urgent?: boolean
  deadline?: string
  progress?: { current: number; goal: number }
  image?: { url: string; alt: string }
}

interface ActionCardProps {
  action: Action
  variant?: 'default' | 'compact' | 'banner'
  className?: string
}

const typeIcons: Record<ActionType, React.ReactNode> = {
  petition: <FileSignature className="w-5 h-5" />,
  letter: <Mail className="w-5 h-5" />,
  share: <Share2 className="w-5 h-5" />,
  donate: <Heart className="w-5 h-5" />,
  contact: <Mail className="w-5 h-5" />,
  campaign: <Megaphone className="w-5 h-5" />,
}

const typeLabels: Record<ActionType, string> = {
  petition: 'Sign Petition',
  letter: 'Send Letter',
  share: 'Share',
  donate: 'Donate',
  contact: 'Contact',
  campaign: 'Join Campaign',
}

const typeCTA: Record<ActionType, string> = {
  petition: 'Sign now',
  letter: 'Send letter',
  share: 'Share now',
  donate: 'Donate',
  contact: 'Get in touch',
  campaign: 'Take action',
}

export function ActionCard({ action, variant = 'default', className }: ActionCardProps) {
  const progressPercent = action.progress
    ? Math.min((action.progress.current / action.progress.goal) * 100, 100)
    : null

  if (variant === 'banner') {
    return (
      <Link
        href={action.url}
        className={cn(
          'block rounded-2xl overflow-hidden group',
          action.urgent
            ? 'bg-gradient-to-r from-[var(--color-dot)] to-[var(--color-magenta)]'
            : 'bg-gradient-to-r from-[var(--color-teal)] to-[var(--color-teal-light)]',
          className
        )}
      >
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
            {typeIcons[action.type]}
          </div>

          {/* Content */}
          <div className="flex-1 text-white">
            {action.urgent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 text-xs font-mono uppercase tracking-wider rounded mb-2">
                Urgent
              </span>
            )}

            <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold mb-1">
              {action.title}
            </h3>

            {action.description && (
              <p className="text-white/80 text-sm md:text-base">
                {action.description}
              </p>
            )}

            {/* Progress bar */}
            {progressPercent !== null && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>{action.progress?.current.toLocaleString()} signed</span>
                  <span>Goal: {action.progress?.goal.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <span className="btn bg-white text-[var(--color-ink)] hover:bg-white/90 group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
              {typeCTA[action.type]}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={action.url}
        className={cn(
          'flex items-center gap-3 p-4 rounded-xl border-2 transition-all group',
          action.urgent
            ? 'border-[var(--color-dot)] bg-[var(--color-dot)]/5 hover:bg-[var(--color-dot)]/10'
            : 'border-[var(--color-mist)] bg-[var(--color-paper)] hover:border-[var(--color-teal)] hover:bg-[var(--color-teal)]/5',
          className
        )}
      >
        {/* Icon */}
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
          action.urgent
            ? 'bg-[var(--color-dot)] text-white'
            : 'bg-[var(--color-teal)]/10 text-[var(--color-teal)] group-hover:bg-[var(--color-teal)] group-hover:text-white transition-colors'
        )}>
          {typeIcons[action.type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-semibold truncate transition-colors',
            action.urgent
              ? 'text-[var(--color-dot)]'
              : 'text-[var(--color-ink)] group-hover:text-[var(--color-teal)]'
          )}>
            {action.title}
          </h3>
          <span className="text-xs text-[var(--color-warm-gray)]">
            {typeLabels[action.type]}
          </span>
        </div>

        {/* Arrow */}
        <ArrowRight className={cn(
          'w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-all',
          action.urgent ? 'text-[var(--color-dot)]' : 'text-[var(--color-warm-gray)] group-hover:text-[var(--color-teal)]'
        )} />
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={action.url}
      className={cn(
        'rounded-2xl overflow-hidden group block relative',
        action.urgent
          ? 'bg-[var(--color-dot)] text-white'
          : 'bg-[var(--color-paper)] border border-[var(--color-mist)] hover-lift hover-border-teal',
        className
      )}
    >
      {/* Urgent pulse effect */}
      {action.urgent && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      <div className="p-6 relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            action.urgent
              ? 'bg-white/20 text-white'
              : 'bg-[var(--color-teal)]/10 text-[var(--color-teal)]'
          )}>
            {typeIcons[action.type]}
          </div>

          {action.urgent && (
            <span className="px-2 py-1 bg-white/20 text-xs font-mono uppercase tracking-wider rounded animate-pulse">
              Urgent
            </span>
          )}

          {action.deadline && !action.urgent && (
            <span className="text-xs text-[var(--color-warm-gray)]">
              Deadline: {new Date(action.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(
          'font-[family-name:var(--font-display)] font-semibold text-lg mb-2 transition-colors',
          action.urgent
            ? 'text-white'
            : 'text-[var(--color-ink)] group-hover:text-[var(--color-teal)]'
        )}>
          {action.title}
        </h3>

        {/* Description */}
        {action.description && (
          <p className={cn(
            'text-sm mb-4 line-clamp-2',
            action.urgent ? 'text-white/80' : 'text-[var(--color-slate)]'
          )}>
            {action.description}
          </p>
        )}

        {/* Progress bar */}
        {progressPercent !== null && (
          <div className="mb-4">
            <div className={cn(
              'flex justify-between text-xs mb-1',
              action.urgent ? 'text-white/70' : 'text-[var(--color-warm-gray)]'
            )}>
              <span>{action.progress?.current.toLocaleString()} signed</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className={cn(
              'h-2 rounded-full overflow-hidden',
              action.urgent ? 'bg-white/20' : 'bg-[var(--color-mist)]'
            )}>
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  action.urgent ? 'bg-white' : 'bg-[var(--color-teal)]'
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className={cn(
          'flex items-center gap-1 text-sm font-medium transition-colors',
          action.urgent
            ? 'text-white'
            : 'text-[var(--color-teal)]'
        )}>
          <span>{typeCTA[action.type]}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
