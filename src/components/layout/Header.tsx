import Link from 'next/link'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/members', label: 'Members' },
  { href: '/impact', label: 'Impact' },
  { href: '/news', label: 'News' },
  { href: '/policy', label: 'Policy' },
  { href: '/join', label: 'Join' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-cream)]/95 backdrop-blur-md border-b border-[var(--color-mist)]">
      <nav className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[var(--color-ink)]">
            sf
          </span>
          <span className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[var(--color-dot)] dot-pulse">
            ·
          </span>
          <span className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[var(--color-ink)]">
            imc
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-warm-gray)] hover:text-[var(--color-ink)] font-medium text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/join" className="btn btn-dot btn-sm">
            Get Involved
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-[var(--color-ink)]" aria-label="Open menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
