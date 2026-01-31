'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Send, Mail, ArrowRight, ExternalLink } from 'lucide-react'
import { members } from '@/data/members'
import { cn } from '@/lib/utils'

const footerLinks = {
  coalition: [
    { href: '/about', label: 'About Us' },
    { href: '/members', label: 'Our Members' },
    { href: '/impact', label: 'Impact Showcase' },
    { href: '/policy', label: 'Policy Wins' },
  ],
  resources: [
    { href: '/news', label: 'News Feed' },
    { href: '/events', label: 'Events' },
    { href: '/resources', label: 'Resources' },
    { href: '/action', label: 'Take Action' },
  ],
  connect: [
    { href: '/join', label: 'Join the Coalition' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/press', label: 'Press Inquiries' },
  ],
}

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/sfimc',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/sfimc',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/sfimc',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/sfimc',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call - replace with actual newsletter signup
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubscribed(true)
    setIsSubmitting(false)
  }

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-dot)] opacity-5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-teal)] opacity-5 blur-[120px] rounded-full" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter Copy */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-dot)]/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[var(--color-dot)]" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Stay Informed
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold mb-4">
                Get the coalition digest
                <span className="text-[var(--color-dot)]">.</span>
              </h2>
              <p className="text-[var(--color-warm-gray)] text-lg leading-relaxed">
                Weekly highlights from all member publications, policy updates, and
                opportunities to support local journalism.
              </p>
            </div>

            {/* Newsletter Form */}
            <div>
              {isSubscribed ? (
                <div className="bg-[var(--color-teal)]/20 border border-[var(--color-teal)]/30 rounded-2xl p-8 text-center">
                  <div className="w-12 h-12 bg-[var(--color-teal)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">You&apos;re subscribed!</h3>
                  <p className="text-[var(--color-warm-gray)]">
                    Check your inbox for a confirmation email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-[var(--color-warm-gray)] text-base focus:outline-none focus:border-[var(--color-dot)] focus:ring-2 focus:ring-[var(--color-dot)]/20 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'btn btn-dot btn-lg whitespace-nowrap',
                        isSubmitting && 'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[var(--color-warm-gray)]">
                    No spam, unsubscribe anytime. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Member Publications Showcase */}
      <div className="relative border-b border-white/10">
        <div className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)] block mb-1">
                Coalition Members
              </span>
              <h3 className="text-lg font-semibold">
                {members.length} independent voices, one coalition
              </h3>
            </div>
            <Link
              href="/members"
              className="text-[var(--color-dot)] text-sm font-medium hover:underline flex items-center gap-1 group"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Member logos/links */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {members.map((member) => (
              <a
                key={member.id}
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-center"
              >
                {/* Placeholder for logo - using stylized name */}
                <div
                  className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: `${member.color}20`, color: member.color }}
                >
                  {member.name.charAt(0)}
                </div>
                <div className="text-sm font-medium text-[var(--color-paper)] group-hover:text-[var(--color-dot)] transition-colors truncate">
                  {member.name}
                </div>
                <div className="text-xs text-[var(--color-warm-gray)] truncate mt-0.5">
                  {member.neighborhood}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-0.5 mb-4 group">
                <span className="font-[family-name:var(--font-display)] text-3xl font-bold">
                  sf
                </span>
                <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-dot)] dot-pulse">
                  ·
                </span>
                <span className="font-[family-name:var(--font-display)] text-3xl font-bold">
                  imc
                </span>
              </Link>
              <p className="text-[var(--color-warm-gray)] max-w-sm leading-relaxed mb-6">
                San Francisco Independent Media Coalition — ethnic and community publishers building
                the infrastructure for local journalism that makes a difference.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-dot)] flex items-center justify-center text-[var(--color-warm-gray)] hover:text-[var(--color-dot)] transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Coalition Links */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] font-semibold mb-4 text-sm uppercase tracking-wider">
                Coalition
              </h4>
              <ul className="space-y-3">
                {footerLinks.coalition.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] font-semibold mb-4 text-sm uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Links */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] font-semibold mb-4 text-sm uppercase tracking-wider">
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* RSS Feed */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <a
                  href="/api/rss"
                  className="flex items-center gap-2 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-dot)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
                  </svg>
                  RSS Feed
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-warm-gray)]">
              © {new Date().getFullYear()} San Francisco Independent Media Coalition. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--color-warm-gray)]">
              <Link href="/privacy" className="hover:text-[var(--color-paper)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[var(--color-paper)] transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-[var(--color-paper)] transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
