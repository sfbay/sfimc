import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)] flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        {/* 404 Display */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 text-8xl lg:text-9xl font-[family-name:var(--font-display)] font-bold text-[var(--color-paper)]">
            <span>4</span>
            <span
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-dot)' }}
            />
            <span>4</span>
          </div>
        </div>

        <h1 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-bold text-[var(--color-paper)] mb-4">
          Page Not Found
        </h1>

        <p className="text-[var(--color-warm-gray)] text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-dot)] text-[var(--color-paper)] rounded-full font-medium hover:bg-[var(--color-dot-dark)] transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[var(--color-warm-gray)]/30 text-[var(--color-paper)] rounded-full font-medium hover:bg-[var(--color-charcoal)] transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse News
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-[var(--color-charcoal)]">
          <p className="text-[var(--color-warm-gray)] text-sm mb-4">
            Popular destinations
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/members"
              className="text-[var(--color-teal-light)] hover:underline"
            >
              Our Members
            </Link>
            <Link
              href="/impact"
              className="text-[var(--color-teal-light)] hover:underline"
            >
              Impact Stories
            </Link>
            <Link
              href="/about"
              className="text-[var(--color-teal-light)] hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/join"
              className="text-[var(--color-teal-light)] hover:underline"
            >
              Join
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
