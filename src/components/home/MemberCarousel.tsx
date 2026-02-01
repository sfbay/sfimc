'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef, useCallback } from 'react'

/**
 * MemberCarousel - Showcases coalition members with community context
 *
 * Design: Each member is positioned within their community story
 * The carousel reveals the geographic and cultural footprint of the coalition
 */

interface MemberSlide {
  id: string
  name: string
  slug: string
  tagline: string
  community: string
  neighborhood: string
  description: string
  foundedYear: number
  logo?: string
  color: string
  languages?: string[]
  coverageAreas: string[]
}

const members: MemberSlide[] = [
  {
    id: '1',
    name: 'El Tecolote',
    slug: 'el-tecolote',
    tagline: 'La Voz Latina de San Francisco',
    community: 'Latino Community',
    neighborhood: 'Mission District',
    description: 'For over 50 years, El Tecolote has been the voice of San Francisco\'s Latino community — telling the stories that matter in Spanish and English.',
    foundedYear: 1970,
    logo: '/images/publishers/el-tecolote.png',
    color: '#dcae27',
    languages: ['English', 'Spanish'],
    coverageAreas: ['Mission', 'Excelsior', 'Bayview'],
  },
  {
    id: '2',
    name: 'The Bay View',
    slug: 'the-bay-view',
    tagline: 'San Francisco\'s Black Newspaper',
    community: 'Black Community',
    neighborhood: 'Bayview-Hunters Point',
    description: 'Since 1976, The Bay View has been a fearless advocate for SF\'s Black community — from environmental justice to housing rights.',
    foundedYear: 1976,
    logo: '/images/publishers/bayview-hp.png',
    color: '#0b525b',
    coverageAreas: ['Bayview', 'Hunters Point', 'Fillmore'],
  },
  {
    id: '3',
    name: 'Mission Local',
    slug: 'mission-local',
    tagline: 'Hyperlocal. Independent. Essential.',
    community: 'Mission Neighborhood',
    neighborhood: 'Mission District',
    description: 'Award-winning investigative journalism that holds power accountable, from City Hall to the corner store.',
    foundedYear: 2009,
    logo: '/images/publishers/mission-local.png',
    color: '#0b525b',
    coverageAreas: ['Mission', 'Bernal Heights', 'Noe Valley'],
  },
  {
    id: '4',
    name: 'Bay Area Reporter',
    slug: 'bay-area-reporter',
    tagline: 'America\'s Oldest LGBTQ+ Newspaper',
    community: 'LGBTQ+ Community',
    neighborhood: 'Castro District',
    description: 'Since 1971, the B.A.R. has chronicled the triumphs and struggles of the LGBTQ+ community in the Bay Area and beyond.',
    foundedYear: 1971,
    logo: '/images/publishers/bayarea-reporter.png',
    color: '#c41e6a',
    coverageAreas: ['Castro', 'SOMA', 'Citywide'],
  },
  {
    id: '5',
    name: 'SF Public Press',
    slug: 'sf-public-press',
    tagline: 'Deep Investigations. Public Interest.',
    community: 'Citywide',
    neighborhood: 'San Francisco',
    description: 'Nonprofit investigative journalism that uncovers the stories others miss — holding institutions accountable.',
    foundedYear: 2009,
    logo: '/images/publishers/sf-public-press.png',
    color: '#ff4f1f',
    coverageAreas: ['Citywide', 'Regional'],
  },
  {
    id: '6',
    name: 'Nichi Bei',
    slug: 'nichi-bei',
    tagline: 'Japanese American Voice Since 1899',
    community: 'Japanese American Community',
    neighborhood: 'Japantown',
    description: 'One of the oldest Japanese American publications in the nation, serving the community through news, culture, and history.',
    foundedYear: 1899,
    color: '#14919b',
    coverageAreas: ['Japantown', 'Bay Area'],
  },
]

export function MemberCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const carouselRef = useRef<HTMLElement>(null)
  const touchStartX = useRef(0)

  const goTo = useCallback((index: number) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
    // Resume autoplay after interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % members.length)
  }, [])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(goNext, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, goNext])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (carouselRef.current) {
      observer.observe(carouselRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext()
      } else {
        goPrev()
      }
      setIsAutoPlaying(false)
      setTimeout(() => setIsAutoPlaying(true), 10000)
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goPrev()
      setIsAutoPlaying(false)
    } else if (e.key === 'ArrowRight') {
      goNext()
      setIsAutoPlaying(false)
    }
  }

  const activeMember = members[activeIndex]

  return (
    <section
      ref={carouselRef}
      className="member-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Member publications carousel"
      aria-roledescription="carousel"
    >
      {/* Background with member color */}
      <div
        className="member-carousel-bg"
        style={{ '--member-color': activeMember.color } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="member-carousel-bg-gradient" />
        <div className="member-carousel-bg-pattern" />
      </div>

      <div className="container">
        {/* Section header */}
        <header className={`member-carousel-header ${isVisible ? 'animate-in' : ''}`}>
          <div className="member-carousel-header-text">
            <h2 className="member-carousel-title">
              11 Publications<span className="text-[var(--color-dot)]">.</span> One Coalition<span className="text-[var(--color-dot)]">.</span>
            </h2>
            <p className="member-carousel-subtitle">
              Ethnic media, neighborhood news, investigative journalism — together we cover all of San Francisco.
            </p>
          </div>
          <Link href="/members" className="member-carousel-view-all">
            View all members
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </header>

        {/* Main carousel area */}
        <div className={`member-carousel-stage ${isVisible ? 'animate-in' : ''}`}>
          {/* Navigation arrows */}
          <button
            className="member-carousel-arrow member-carousel-arrow-prev"
            onClick={goPrev}
            aria-label="Previous member"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="member-carousel-arrow member-carousel-arrow-next"
            onClick={goNext}
            aria-label="Next member"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide content */}
          <div
            className="member-carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${activeIndex + 1} of ${members.length}: ${activeMember.name}`}
          >
            {/* Left: Logo and identity */}
            <div className="member-carousel-identity">
              <div className="member-carousel-logo-wrap">
                {activeMember.logo ? (
                  <Image
                    src={activeMember.logo}
                    alt={`${activeMember.name} logo`}
                    width={120}
                    height={120}
                    className="member-carousel-logo"
                  />
                ) : (
                  <div className="member-carousel-logo-placeholder">
                    <span>{activeMember.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="member-carousel-founded">
                <span className="member-carousel-founded-label">Est.</span>
                <span className="member-carousel-founded-year">{activeMember.foundedYear}</span>
              </div>
            </div>

            {/* Right: Content */}
            <div className="member-carousel-content">
              <div className="member-carousel-community-badge">
                <span className="member-carousel-community-icon" aria-hidden="true">◆</span>
                <span>{activeMember.community}</span>
              </div>

              <h3 className="member-carousel-name">{activeMember.name}</h3>
              <p className="member-carousel-tagline">{activeMember.tagline}</p>

              <p className="member-carousel-description">{activeMember.description}</p>

              {/* Coverage areas */}
              <div className="member-carousel-coverage">
                <span className="member-carousel-coverage-label">Covering:</span>
                <div className="member-carousel-coverage-areas">
                  {activeMember.coverageAreas.map((area) => (
                    <span key={area} className="member-carousel-coverage-tag">{area}</span>
                  ))}
                </div>
              </div>

              {/* Languages if multilingual */}
              {activeMember.languages && activeMember.languages.length > 1 && (
                <div className="member-carousel-languages">
                  {activeMember.languages.map((lang) => (
                    <span key={lang} className="member-carousel-lang-tag">{lang}</span>
                  ))}
                </div>
              )}

              <Link href={`/members/${activeMember.slug}`} className="member-carousel-cta">
                <span>Read their stories</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="member-carousel-progress" role="tablist" aria-label="Carousel pagination">
            {members.map((member, index) => (
              <button
                key={member.id}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to ${member.name}`}
                className={`member-carousel-progress-dot ${index === activeIndex ? 'is-active' : ''}`}
                onClick={() => goTo(index)}
                style={{ '--dot-color': member.color } as React.CSSProperties}
              >
                <span className="member-carousel-progress-fill" />
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail strip for quick navigation */}
        <div className="member-carousel-thumbs">
          {members.map((member, index) => (
            <button
              key={member.id}
              className={`member-carousel-thumb ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`View ${member.name}`}
              style={{ '--thumb-color': member.color } as React.CSSProperties}
            >
              {member.logo ? (
                <Image
                  src={member.logo}
                  alt=""
                  width={48}
                  height={48}
                  className="member-carousel-thumb-logo"
                />
              ) : (
                <span className="member-carousel-thumb-initial">{member.name.charAt(0)}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
