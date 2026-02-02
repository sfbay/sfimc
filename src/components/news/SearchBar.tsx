'use client'

import { useState, useEffect, useCallback, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'

/**
 * SearchBar - Debounced search input with URL sync
 *
 * Updates URL search params for server-side filtering.
 * Includes clear button and loading indicator.
 */

interface SearchBarProps {
  /** Placeholder text */
  placeholder?: string
  /** Additional class names */
  className?: string
}

export function SearchBar({
  placeholder = 'Search stories...',
  className = '',
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Local state for immediate input feedback
  const [value, setValue] = useState(searchParams.get('search') || '')

  // Sync local state with URL params
  useEffect(() => {
    setValue(searchParams.get('search') || '')
  }, [searchParams])

  // Debounced URL update
  const updateUrl = useCallback(
    (searchValue: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (searchValue.trim()) {
        params.set('search', searchValue.trim())
      } else {
        params.delete('search')
      }

      startTransition(() => {
        router.push(`/news?${params.toString()}`, { scroll: false })
      })
    },
    [router, searchParams]
  )

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value !== (searchParams.get('search') || '')) {
        updateUrl(value)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [value, searchParams, updateUrl])

  const handleClear = () => {
    setValue('')
    updateUrl('')
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {isPending ? (
            <Loader2 className="w-4 h-4 text-[var(--color-warm-gray)] animate-spin" />
          ) : (
            <Search className="w-4 h-4 text-[var(--color-warm-gray)]" />
          )}
        </div>

        {/* Input */}
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search stories"
          className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-[var(--color-warm-gray)] text-sm focus:outline-none focus:border-[var(--color-dot)] focus:ring-2 focus:ring-[var(--color-dot)]/20 transition-all"
        />

        {/* Clear Button */}
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[var(--color-warm-gray)] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
