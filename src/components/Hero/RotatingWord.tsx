'use client'

import { useEffect, useState, useCallback } from 'react'

/**
 * The rotating verbs that capture SFIMC's multifaceted impact.
 * Each word represents a different way journalism serves the community.
 */
const VERBS = [
  'moves',
  'connects',
  'informs',
  'empowers',
  'serves',
  'enlightens',
  'strengthens',
  'inspires',
  'represents',
]

interface RotatingWordProps {
  /** Interval between word changes in ms */
  interval?: number
  /** Additional CSS classes */
  className?: string
  /** Whether the component has mounted (for entrance animation sync) */
  isReady?: boolean
}

/**
 * Vertical carousel component that rotates through impact verbs.
 * Uses a slot-machine style animation where words slide upward.
 * Respects reduced motion preferences.
 */
export function RotatingWord({
  interval = 3000,
  className = '',
  isReady = true,
}: RotatingWordProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'sliding' | 'resetting' | 'shimmering'>('idle')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Rotate words with proper phase management
  const rotateWord = useCallback(() => {
    if (!isReady) return

    // Phase 1: Start sliding animation
    setAnimationPhase('sliding')

    // Phase 2: After slide completes, instantly reset (no transition)
    setTimeout(() => {
      setAnimationPhase('resetting')
      setCurrentIndex((prev) => (prev + 1) % VERBS.length)

      // Phase 3: After a frame, trigger shimmer effect
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationPhase('shimmering')

          // Phase 4: After shimmer completes, return to idle
          setTimeout(() => {
            setAnimationPhase('idle')
          }, 600) // Match shimmer animation duration
        })
      })
    }, 500) // Match CSS transition duration
  }, [isReady])

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return

    const timer = setInterval(rotateWord, interval)
    return () => clearInterval(timer)
  }, [interval, isReady, prefersReducedMotion, rotateWord])

  // For reduced motion, just show current word without animation
  if (prefersReducedMotion) {
    return (
      <span className={`rotating-word-container ${className}`}>
        <span className="rotating-word-static">{VERBS[currentIndex]}</span>
      </span>
    )
  }

  const currentWord = VERBS[currentIndex]
  const nextWord = VERBS[(currentIndex + 1) % VERBS.length]

  return (
    <span className={`rotating-word-container ${className}`} aria-live="polite">
      {/* Screen reader text - announces changes */}
      <span className="sr-only">{currentWord}</span>

      {/* Visual carousel */}
      <span className="rotating-word-carousel" aria-hidden="true">
        <span
          className={`rotating-word-track ${animationPhase === 'sliding' ? 'is-sliding' : ''} ${animationPhase === 'resetting' ? 'is-resetting' : ''} ${animationPhase === 'shimmering' ? 'is-shimmering' : ''}`}
        >
          <span className="rotating-word">{currentWord}</span>
          <span className="rotating-word">{nextWord}</span>
        </span>
      </span>
    </span>
  )
}
