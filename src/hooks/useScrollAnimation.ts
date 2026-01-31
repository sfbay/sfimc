'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Hook to trigger animations when element enters viewport
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, isInView } = useScrollAnimation()
 *   return (
 *     <div ref={ref} className={`scroll-fade-up ${isInView ? 'in-view' : ''}`}>
 *       Content that animates in
 *     </div>
 *   )
 * }
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (triggerOnce && hasTriggered.current) return
          setIsInView(true)
          hasTriggered.current = true
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isInView }
}

/**
 * Hook for staggered animations of multiple children
 * Returns a ref to attach to the parent container
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, isInView } = useStaggerAnimation()
 *   return (
 *     <div ref={ref} className={`scroll-stagger ${isInView ? 'in-view' : ''}`}>
 *       <div>Item 1</div>
 *       <div>Item 2</div>
 *       <div>Item 3</div>
 *     </div>
 *   )
 * }
 * ```
 */
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  options?: UseScrollAnimationOptions
) {
  return useScrollAnimation<T>({
    threshold: 0.2,
    ...options,
  })
}

/**
 * Hook for count-up animations
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, count } = useCountUp({ end: 1000, duration: 2000 })
 *   return <span ref={ref}>{count}</span>
 * }
 * ```
 */
export function useCountUp({
  end,
  duration = 2000,
  startOnView = true,
}: {
  end: number
  duration?: number
  startOnView?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }
    requestAnimationFrame(tick)
  }, [end, duration])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    if (!startOnView) {
      animate()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [animate, end, startOnView])

  return { ref, count }
}

/**
 * Hook for parallax scroll effects
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, offset } = useParallax({ speed: 0.5 })
 *   return (
 *     <div ref={ref} style={{ transform: `translateY(${offset}px)` }}>
 *       Parallax content
 *     </div>
 *   )
 * }
 * ```
 */
export function useParallax({
  speed = 0.5,
  direction = 'up',
}: {
  speed?: number
  direction?: 'up' | 'down'
} = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const distanceFromCenter = elementCenter - windowHeight / 2
      const multiplier = direction === 'up' ? -1 : 1
      setOffset(distanceFromCenter * speed * multiplier)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, direction])

  return { ref, offset }
}
