import { cn } from '@/lib/utils'
import Link from 'next/link'
import { forwardRef } from 'react'

export interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Makes the entire card a link */
  href?: string
  /** Opens link in new tab */
  external?: boolean
  /** Card style variant */
  variant?: 'default' | 'dark' | 'outline' | 'ghost'
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Enable hover interactions */
  interactive?: boolean
  /** Accent color for hover effects */
  accent?: 'dot' | 'teal' | 'gold'
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const variantMap = {
  default: 'bg-[var(--color-paper)] border border-[var(--color-mist)]',
  dark: 'bg-[var(--color-ink)] text-[var(--color-paper)] border border-white/10',
  outline: 'bg-transparent border-2 border-[var(--color-mist)]',
  ghost: 'bg-transparent border-none',
}

const accentMap = {
  dot: 'hover-border-dot',
  teal: 'hover-border-teal',
  gold: 'hover:border-[var(--color-gold)]',
}

export const BaseCard = forwardRef<HTMLDivElement, BaseCardProps>(
  (
    {
      children,
      className,
      href,
      external,
      variant = 'default',
      padding = 'md',
      interactive = true,
      accent = 'dot',
      ...props
    },
    ref
  ) => {
    const cardClasses = cn(
      'rounded-2xl overflow-hidden relative',
      variantMap[variant],
      paddingMap[padding],
      interactive && 'hover-lift group transition-all duration-300',
      interactive && accentMap[accent],
      className
    )

    if (href) {
      return (
        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={cn(cardClasses, 'block')}
        >
          {children}
        </Link>
      )
    }

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    )
  }
)

BaseCard.displayName = 'BaseCard'
