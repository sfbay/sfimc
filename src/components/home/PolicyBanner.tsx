import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export function PolicyBanner() {
  return (
    <Link
      href="/policy"
      className="block bg-gradient-to-r from-[var(--color-teal)] to-[var(--color-teal-light)] text-[var(--color-paper)] group"
    >
      <div className="container py-5 flex items-center gap-4 lg:gap-6">
        <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg lg:text-xl truncate">
            50% of SF city advertising now goes to community media
          </h3>
          <p className="text-white/80 text-sm lg:text-base">
            Our coalition advocacy led to this landmark policy — passed by the Board of Supervisors in 2024.
          </p>
        </div>
        <div className="flex-shrink-0 hidden sm:flex items-center gap-2 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          Learn more
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
