'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/members', label: 'Members' },
  { href: '/impact', label: 'Impact' },
  { href: '/news', label: 'News' },
  { href: '/policy', label: 'Policy' },
  { href: '/join', label: 'Join' },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[var(--color-cream)]/98 backdrop-blur-md border-b border-[var(--color-mist)] shadow-sm'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <nav className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 group relative z-10">
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-ink)]">
              sf
            </span>
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-dot)] dot-pulse">
              ·
            </span>
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-ink)]">
              imc
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors rounded-lg',
                  isActive(link.href)
                    ? 'text-[var(--color-dot)]'
                    : 'text-[var(--color-warm-gray)] hover:text-[var(--color-ink)] hover:bg-[var(--color-mist)]/50'
                )}
              >
                {link.label}
                {/* Active indicator */}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-dot)] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/join"
              className="btn btn-dot btn-sm group"
            >
              Get Involved
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[var(--color-ink)] hover:bg-[var(--color-mist)]/50 rounded-lg transition-colors relative z-10"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Spacer to account for fixed header */}
      <div className="h-16" />

      {/* Mobile Menu - Full Screen */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[var(--color-ink)]/90 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={cn(
            'absolute inset-x-0 top-16 bottom-0 bg-[var(--color-ink)] transition-transform duration-300 overflow-y-auto',
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          )}
        >
          <div className="container py-8">
            {/* Navigation Links */}
            <nav className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block py-4 text-2xl font-[family-name:var(--font-display)] font-semibold transition-all',
                    'border-b border-white/10',
                    isActive(link.href)
                      ? 'text-[var(--color-dot)]'
                      : 'text-[var(--color-paper)] hover:text-[var(--color-dot)] hover:pl-2'
                  )}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  <span className="flex items-center justify-between">
                    {link.label}
                    {isActive(link.href) && (
                      <span className="w-2 h-2 bg-[var(--color-dot)] rounded-full" />
                    )}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-8">
              <Link
                href="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-dot btn-lg w-full justify-center"
              >
                Get Involved
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile Footer Info */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-[var(--color-warm-gray)] text-sm mb-4">
                San Francisco Independent Media Coalition
              </p>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/sfimc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="mailto:info@sfimc.org"
                  className="text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] transition-colors"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
