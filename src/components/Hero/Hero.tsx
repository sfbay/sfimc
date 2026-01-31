'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HeroProps {
  headline?: string
  highlightWord?: string
  subheadline?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  stats?: { value: string; label: string }[]
}

export function Hero({
  headline = 'Journalism that',
  highlightWord = 'moves',
  subheadline = "We're a coalition of ethnic and community publishers building the infrastructure for local news that actually makes a difference.",
  primaryCta = { label: 'Explore our impact', href: '/impact' },
  secondaryCta = { label: 'Meet our members', href: '/members' },
  stats = [
    { value: '11', label: 'Publications' },
    { value: '50+', label: 'Years Combined' },
    { value: '1M+', label: 'Readers Reached' },
  ],
}: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="hero">
      {/* Animated Background */}
      <div className="hero-bg">
        {/* The Dot - Animated Brand Element */}
        <div className="hero-dot" aria-hidden="true">
          <div className="hero-dot-core" />
          <div className="hero-dot-ring hero-dot-ring-1" />
          <div className="hero-dot-ring hero-dot-ring-2" />
          <div className="hero-dot-ring hero-dot-ring-3" />
        </div>

        {/* Gradient Orbs */}
        <div className="hero-orb hero-orb-teal" />
        <div className="hero-orb hero-orb-gold" />

        {/* Grid Pattern */}
        <div className="hero-grid" />
      </div>

      <div className="container relative">
        <div className="hero-content">
          {/* Eyebrow */}
          <div className={`hero-eyebrow ${mounted ? 'animate-in' : ''}`}>
            <span className="hero-eyebrow-dot" />
            <span>San Francisco Independent Media Coalition</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline">
            <span className={`hero-headline-line ${mounted ? 'animate-in stagger-1' : ''}`}>
              {headline}
            </span>
            <span className={`hero-headline-highlight ${mounted ? 'animate-in stagger-2' : ''}`}>
              {highlightWord}
            </span>
            <span className={`hero-headline-line ${mounted ? 'animate-in stagger-3' : ''}`}>
              San Francisco
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`hero-subheadline ${mounted ? 'animate-in stagger-4' : ''}`}>
            {subheadline}
          </p>

          {/* CTAs */}
          <div className={`hero-ctas ${mounted ? 'animate-in stagger-5' : ''}`}>
            <Link href={primaryCta.href} className="btn btn-dot btn-lg group">
              {primaryCta.label}
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href={secondaryCta.href} className="btn btn-outline-light btn-lg">
              {secondaryCta.label}
            </Link>
          </div>

          {/* Stats Strip */}
          <div className={`hero-stats ${mounted ? 'animate-in stagger-6' : ''}`}>
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`hero-scroll ${mounted ? 'animate-in stagger-7' : ''}`}>
        <span>Scroll to explore</span>
        <div className="hero-scroll-line">
          <div className="hero-scroll-dot" />
        </div>
      </div>
    </section>
  )
}
