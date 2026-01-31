'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { TrendingUp, Award, Users, FileText, ArrowRight } from 'lucide-react'

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}

function CountUp({ end, duration = 2000, prefix = '', suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: 12,
    label: 'Policy wins',
    sublabel: 'in the past year',
    color: 'var(--color-teal)',
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: 47,
    label: 'Journalism awards',
    sublabel: 'coalition members',
    color: 'var(--color-gold)',
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: 850000,
    suffix: '+',
    label: 'Monthly readers',
    sublabel: 'across all publications',
    color: 'var(--color-dot)',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    value: 125,
    suffix: '+',
    label: 'Combined years',
    sublabel: 'serving SF communities',
    color: 'var(--color-magenta)',
  },
]

const recentWins = [
  {
    title: 'City oversight reform passes',
    member: 'SF Public Press',
    type: 'Policy',
    date: 'Dec 2025',
  },
  {
    title: 'California Journalism Award',
    member: 'Mission Local',
    type: 'Recognition',
    date: 'Nov 2025',
  },
  {
    title: '214 families connected to aid',
    member: 'El Tecolote',
    type: 'Community',
    date: 'Oct 2025',
  },
]

export function ImpactDashboard() {
  return (
    <section className="section bg-[var(--color-ink)] text-[var(--color-paper)] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-teal)] opacity-10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-dot)] opacity-10 blur-[120px] rounded-full" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container relative">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[var(--color-teal)] rounded-full" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                Impact Dashboard
              </span>
            </div>
            <h2 className="display-md mb-2">
              Journalism that moves
              <span className="text-[var(--color-teal)]">.</span>
            </h2>
            <p className="text-[var(--color-warm-gray)] text-lg max-w-xl">
              When community newsrooms work together, they create outsized impact
              on policy, accountability, and civic life.
            </p>
          </div>
          <Link
            href="/impact"
            className="text-[var(--color-teal)] font-semibold flex items-center gap-2 hover:gap-3 transition-all group"
          >
            See all impact stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/20 transition-colors"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-4xl lg:text-5xl font-bold mb-1" style={{ color: stat.color }}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>

              {/* Labels */}
              <div className="text-[var(--color-paper)] font-medium">{stat.label}</div>
              <div className="text-sm text-[var(--color-warm-gray)]">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Recent Wins */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-2">Recent wins</h3>
            <p className="text-[var(--color-warm-gray)] text-sm mb-6">
              The latest documented outcomes from coalition journalism.
            </p>
            <Link
              href="/impact"
              className="text-sm text-[var(--color-teal)] hover:underline"
            >
              View full impact timeline →
            </Link>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {recentWins.map((win, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                {/* Type badge */}
                <span className="px-2 py-1 rounded text-xs font-mono uppercase tracking-wider bg-[var(--color-teal)]/20 text-[var(--color-teal)]">
                  {win.type}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[var(--color-paper)] truncate">
                    {win.title}
                  </div>
                  <div className="text-sm text-[var(--color-warm-gray)]">
                    {win.member}
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-[var(--color-warm-gray)] whitespace-nowrap">
                  {win.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
