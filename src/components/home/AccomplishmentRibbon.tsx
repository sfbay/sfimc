'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

/**
 * AccomplishmentRibbon - A bold celebration of coalition wins
 *
 * Design: Editorial meets activist - the kind of banner you'd see
 * in a newsroom celebrating a Pulitzer, but for policy wins
 */

interface Accomplishment {
  id: string
  metric: string
  metricLabel: string
  headline: string
  description: string
  href: string
  accentColor: string
}

const accomplishments: Accomplishment[] = [
  {
    id: '50-percent',
    metric: '50%',
    metricLabel: 'city ad spend',
    headline: 'SF city advertising now goes to community media',
    description: 'Landmark policy passed by the Board of Supervisors, 2024',
    href: '/policy',
    accentColor: 'var(--color-teal)',
  },
  {
    id: 'civic-fund',
    metric: '$2.5M',
    metricLabel: 'proposed fund',
    headline: 'SF Civic Media Fund gaining momentum',
    description: 'Coalition-backed initiative to sustain local journalism',
    href: '/policy#civic-fund',
    accentColor: 'var(--color-gold)',
  },
  {
    id: 'coalition-growth',
    metric: '11',
    metricLabel: 'publications',
    headline: 'Coalition continues to grow',
    description: 'Ethnic, neighborhood, and investigative outlets united',
    href: '/members',
    accentColor: 'var(--color-dot)',
  },
]

export function AccomplishmentRibbon() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ribbonRef = useRef<HTMLElement>(null)

  // Auto-rotate accomplishments
  useEffect(() => {
    if (isHovered) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % accomplishments.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isHovered])

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ribbonRef.current) {
      observer.observe(ribbonRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const active = accomplishments[activeIndex]

  return (
    <section
      ref={ribbonRef}
      className="accomplishment-ribbon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--accent': active.accentColor } as React.CSSProperties}
    >
      {/* Animated background */}
      <div className="accomplishment-ribbon-bg" aria-hidden="true">
        <div className="accomplishment-ribbon-gradient" />
        <div className="accomplishment-ribbon-pattern" />
      </div>

      <div className="container">
        <Link href={active.href} className="accomplishment-ribbon-content">
          {/* Victory badge */}
          <div className={`accomplishment-badge ${hasAnimated ? 'animate-in' : ''}`}>
            <div className="accomplishment-badge-inner">
              <svg className="accomplishment-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="accomplishment-badge-label">Victory</span>
          </div>

          {/* Main metric - the big number */}
          <div className={`accomplishment-metric ${hasAnimated ? 'animate-in' : ''}`}>
            <span className="accomplishment-metric-value">{active.metric}</span>
            <span className="accomplishment-metric-label">{active.metricLabel}</span>
          </div>

          {/* Headline and description */}
          <div className={`accomplishment-text ${hasAnimated ? 'animate-in' : ''}`}>
            <h3 className="accomplishment-headline">{active.headline}</h3>
            <p className="accomplishment-description">{active.description}</p>
          </div>

          {/* CTA arrow */}
          <div className={`accomplishment-cta ${hasAnimated ? 'animate-in' : ''}`}>
            <span className="accomplishment-cta-text">Learn more</span>
            <svg className="accomplishment-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </Link>

        {/* Navigation dots */}
        <div className="accomplishment-nav" role="tablist" aria-label="Accomplishments">
          {accomplishments.map((item, index) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`View ${item.headline}`}
              className={`accomplishment-nav-dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="accomplishment-nav-dot-fill" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
