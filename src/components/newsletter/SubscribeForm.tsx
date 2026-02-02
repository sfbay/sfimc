'use client'

import { useState, useCallback } from 'react'
import { Send, Mail, Check, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isValidEmail } from '@/lib/news'

/**
 * SubscribeForm - Newsletter signup form
 *
 * Features:
 * - Client-side email validation
 * - Optimistic UI with loading states
 * - Success/error messages
 * - Configurable source tracking
 */

interface SubscribeFormProps {
  /** Source identifier for analytics (e.g., 'footer', 'news-page') */
  source?: string
  /** Tags to apply to the subscriber */
  tags?: string[]
  /** Variant styling */
  variant?: 'default' | 'compact' | 'inline'
  /** Additional class names */
  className?: string
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function SubscribeForm({
  source = 'website',
  tags = ['weekly-digest'],
  variant = 'default',
  className = '',
}: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!email || state === 'loading') return

      // Basic client-side validation
      if (!isValidEmail(email)) {
        setState('error')
        setMessage('Please enter a valid email address.')
        return
      }

      setState('loading')
      setMessage('')

      try {
        const response = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source, tags }),
        })

        const data = await response.json()

        if (response.ok) {
          setState('success')
          setMessage(data.message || 'Thanks for subscribing!')
          setEmail('')
        } else {
          setState('error')
          setMessage(data.error || 'Failed to subscribe. Please try again.')
        }
      } catch (error) {
        console.error('Subscribe error:', error)
        setState('error')
        setMessage('Something went wrong. Please try again.')
      }
    },
    [email, source, tags, state]
  )

  // Reset form after success (allow re-subscription with different email)
  const handleReset = () => {
    setState('idle')
    setMessage('')
    setEmail('')
  }

  // Success state
  if (state === 'success') {
    return (
      <div
        className={cn(
          'rounded-2xl p-6 text-center',
          variant === 'compact' ? 'p-4' : '',
          'bg-[var(--color-teal)]/10 border border-[var(--color-teal)]/20',
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div
          className="w-10 h-10 bg-[var(--color-teal)] rounded-full flex items-center justify-center mx-auto mb-3"
          aria-hidden="true"
        >
          <Check className="w-5 h-5 text-white" />
        </div>
        <p className="font-semibold text-[var(--color-ink)] mb-1">You&apos;re subscribed!</p>
        <p className="text-sm text-[var(--color-slate)]">{message}</p>
        <button
          onClick={handleReset}
          className="mt-3 text-xs text-[var(--color-teal)] hover:underline"
        >
          Subscribe another email
        </button>
      </div>
    )
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
        <div className="flex-1 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={state === 'loading'}
            aria-label="Email address"
            className={cn(
              'w-full px-4 py-2.5 rounded-lg text-sm',
              'bg-white/10 border border-white/20 text-white placeholder:text-[var(--color-warm-gray)]',
              'focus:outline-none focus:border-[var(--color-dot)] focus:ring-2 focus:ring-[var(--color-dot)]/20',
              'disabled:opacity-50 transition-all',
              state === 'error' && 'border-red-400'
            )}
          />
        </div>
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn btn-dot px-4 disabled:opacity-50"
        >
          {state === 'loading' ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
    )
  }

  // Default/compact form
  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-3', className)}
      aria-label="Newsletter signup"
    >
      <div className={cn('flex flex-col gap-3', variant === 'compact' ? 'sm:flex-row' : '')}>
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Mail className="w-4 h-4 text-[var(--color-warm-gray)]" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={state === 'loading'}
            aria-label="Email address"
            aria-describedby={state === 'error' ? 'subscribe-error' : undefined}
            className={cn(
              'w-full pl-11 pr-4 py-3 rounded-xl text-sm',
              'bg-white/10 border border-white/20 text-white placeholder:text-[var(--color-warm-gray)]',
              'focus:outline-none focus:border-[var(--color-dot)] focus:ring-2 focus:ring-[var(--color-dot)]/20',
              'disabled:opacity-50 transition-all',
              state === 'error' && 'border-red-400'
            )}
          />
        </div>
        <button
          type="submit"
          disabled={state === 'loading'}
          className={cn(
            'btn btn-dot whitespace-nowrap',
            variant === 'compact' ? 'px-6' : 'w-full'
          )}
        >
          {state === 'loading' ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <span>Subscribe</span>
              <Send className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {/* Error message */}
      {state === 'error' && message && (
        <div
          id="subscribe-error"
          className="flex items-center gap-2 text-sm text-red-400"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Privacy note */}
      <p className="text-xs text-[var(--color-warm-gray)]">
        No spam, unsubscribe anytime. We respect your privacy.
      </p>
    </form>
  )
}
