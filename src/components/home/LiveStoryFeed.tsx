'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

/**
 * LiveStoryFeed - A dynamic teaser of recent stories from member publications
 *
 * Design: Newsroom ticker energy meets editorial grid
 * Stories flow in like a live feed, enticing visitors to explore
 */

interface Story {
  id: string
  title: string
  excerpt: string
  publication: string
  publicationLogo?: string
  publicationColor: string
  category: string
  timeAgo: string
  href: string
  imageUrl?: string
}

// Placeholder stories - will be replaced with RSS data
const stories: Story[] = [
  {
    id: '1',
    title: 'Mission District rent stabilization proposal advances to full board',
    excerpt: 'Supervisors committee votes 2-1 to move forward with tenant protections',
    publication: 'Mission Local',
    publicationLogo: '/images/publishers/mission-local.png',
    publicationColor: '#0b525b',
    category: 'Housing',
    timeAgo: '2 hours ago',
    href: 'https://missionlocal.org',
  },
  {
    id: '2',
    title: 'Bayview community celebrates groundbreaking for new health center',
    excerpt: 'Long-awaited facility will bring primary care to underserved neighborhood',
    publication: 'The Bay View',
    publicationLogo: '/images/publishers/bayview-hp.png',
    publicationColor: '#0b525b',
    category: 'Health',
    timeAgo: '4 hours ago',
    href: 'https://sfbayview.com',
  },
  {
    id: '3',
    title: 'Calle 24 merchants organize against proposed development',
    excerpt: 'Latino Cultural District businesses fear displacement from new project',
    publication: 'El Tecolote',
    publicationLogo: '/images/publishers/el-tecolote.png',
    publicationColor: '#dcae27',
    category: 'Development',
    timeAgo: '6 hours ago',
    href: 'https://eltecolote.org',
  },
  {
    id: '4',
    title: 'Pride 2025 planning kicks off with expanded accessibility focus',
    excerpt: 'Organizers announce new initiatives for disability inclusion',
    publication: 'Bay Area Reporter',
    publicationLogo: '/images/publishers/bayarea-reporter.png',
    publicationColor: '#c41e6a',
    category: 'Community',
    timeAgo: '8 hours ago',
    href: 'https://ebar.com',
  },
  {
    id: '5',
    title: 'Investigation reveals gaps in city homeless outreach data',
    excerpt: 'Public records show inconsistent tracking across departments',
    publication: 'SF Public Press',
    publicationLogo: '/images/publishers/sf-public-press.png',
    publicationColor: '#ff4f1f',
    category: 'Investigation',
    timeAgo: '12 hours ago',
    href: 'https://sfpublicpress.org',
  },
]

export function LiveStoryFeed() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="live-story-feed">
      <div className="container">
        {/* Section header with live indicator */}
        <header className="live-story-feed-header">
          <div className="live-story-feed-title-group">
            <div className="live-indicator" aria-hidden="true">
              <span className="live-indicator-dot" />
              <span className="live-indicator-text">Live Feed</span>
            </div>
            <h2 className="live-story-feed-title">
              From Our Members<span className="text-[var(--color-dot)]">.</span>
            </h2>
            <p className="live-story-feed-subtitle">
              Real stories, real impact — updated as our members publish
            </p>
          </div>
          <Link href="/news" className="live-story-feed-more">
            <span>View all stories</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </header>

        {/* Story grid */}
        <div className="live-story-grid">
          {/* Featured story - large card */}
          <article
            className={`live-story-card live-story-card-featured ${isVisible ? 'animate-in' : ''}`}
            style={{ '--story-color': stories[0].publicationColor, '--delay': '0' } as React.CSSProperties}
          >
            <Link href={stories[0].href} target="_blank" rel="noopener noreferrer" className="live-story-card-inner">
              <div className="live-story-card-meta">
                {stories[0].publicationLogo && (
                  <Image
                    src={stories[0].publicationLogo}
                    alt={stories[0].publication}
                    width={24}
                    height={24}
                    className="live-story-pub-logo"
                  />
                )}
                <span className="live-story-pub-name">{stories[0].publication}</span>
                <span className="live-story-separator">·</span>
                <span className="live-story-time">{stories[0].timeAgo}</span>
              </div>
              <h3 className="live-story-title">{stories[0].title}</h3>
              <p className="live-story-excerpt">{stories[0].excerpt}</p>
              <div className="live-story-category">
                <span className="live-story-category-tag">{stories[0].category}</span>
              </div>
            </Link>
          </article>

          {/* Secondary stories - smaller cards */}
          {stories.slice(1).map((story, index) => (
            <article
              key={story.id}
              className={`live-story-card ${isVisible ? 'animate-in' : ''}`}
              style={{ '--story-color': story.publicationColor, '--delay': index + 1 } as React.CSSProperties}
            >
              <Link href={story.href} target="_blank" rel="noopener noreferrer" className="live-story-card-inner">
                <div className="live-story-card-meta">
                  {story.publicationLogo && (
                    <Image
                      src={story.publicationLogo}
                      alt={story.publication}
                      width={20}
                      height={20}
                      className="live-story-pub-logo"
                    />
                  )}
                  <span className="live-story-pub-name">{story.publication}</span>
                  <span className="live-story-separator">·</span>
                  <span className="live-story-time">{story.timeAgo}</span>
                </div>
                <h3 className="live-story-title">{story.title}</h3>
                <div className="live-story-category">
                  <span className="live-story-category-tag">{story.category}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Publisher logo strip */}
        <div className="live-story-publishers">
          <span className="live-story-publishers-label">Stories from</span>
          <div className="live-story-publishers-logos">
            {stories.map((story) => (
              story.publicationLogo && (
                <Image
                  key={story.id}
                  src={story.publicationLogo}
                  alt={story.publication}
                  width={32}
                  height={32}
                  className="live-story-publishers-logo"
                />
              )
            ))}
            <span className="live-story-publishers-more">+6 more</span>
          </div>
        </div>
      </div>
    </section>
  )
}
