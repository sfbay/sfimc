'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronDown, Tag, X } from 'lucide-react'

interface Category {
  name: string
  count: number
}

interface CategoryDropdownProps {
  categories: Category[]
  activeCategory: string
  activeMember: string
  className?: string
}

/**
 * CategoryDropdown - Compact category filter replacing sprawling list
 *
 * Features:
 * - Clean dropdown with category counts
 * - Shows active selection
 * - Sorted by story count
 */
export function CategoryDropdown({
  categories,
  activeCategory,
  activeMember,
  className,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const buildHref = (category: string) => {
    if (category === 'all') {
      return activeMember === 'all' ? '/news' : `/news?member=${activeMember}`
    }
    return activeMember === 'all'
      ? `/news?category=${category}`
      : `/news?member=${activeMember}&category=${category}`
  }

  const activeLabel = activeCategory === 'all'
    ? 'All Categories'
    : activeCategory

  const totalCount = categories.reduce((sum, c) => sum + c.count, 0)

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
          activeCategory !== 'all'
            ? 'bg-[var(--color-teal)] text-white'
            : 'bg-white/10 text-[var(--color-warm-gray)] hover:bg-white/15 hover:text-white'
        )}
      >
        <Tag className="w-3.5 h-3.5" />
        <span className="max-w-[150px] truncate">{activeLabel}</span>
        <ChevronDown className={cn(
          'w-3.5 h-3.5 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--color-charcoal)] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
          {/* Header */}
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-warm-gray)]">
              Filter by Category
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-white/10 text-[var(--color-warm-gray)] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Options */}
          <div className="max-h-[300px] overflow-y-auto py-1">
            {/* All Categories */}
            <Link
              href={buildHref('all')}
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center justify-between px-3 py-2 text-sm transition-colors',
                activeCategory === 'all'
                  ? 'bg-[var(--color-teal)]/20 text-[var(--color-teal-light)]'
                  : 'text-[var(--color-warm-gray)] hover:bg-white/5 hover:text-white'
              )}
            >
              <span>All Categories</span>
              <span className="text-xs font-mono opacity-60">{totalCount}</span>
            </Link>

            {/* Divider */}
            <div className="h-px bg-white/10 my-1" />

            {/* Categories */}
            {categories.map((category) => (
              <Link
                key={category.name}
                href={buildHref(category.name)}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center justify-between px-3 py-2 text-sm transition-colors',
                  activeCategory === category.name
                    ? 'bg-[var(--color-teal)]/20 text-[var(--color-teal-light)]'
                    : 'text-[var(--color-warm-gray)] hover:bg-white/5 hover:text-white'
                )}
              >
                <span className="truncate">{category.name}</span>
                <span className="text-xs font-mono opacity-60 ml-2">{category.count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
