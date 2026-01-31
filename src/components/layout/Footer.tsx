import Link from 'next/link'

const footerLinks = {
  coalition: [
    { href: '/about', label: 'About Us' },
    { href: '/members', label: 'Our Members' },
    { href: '/impact', label: 'Impact Showcase' },
    { href: '/policy', label: 'Policy Wins' },
  ],
  resources: [
    { href: '/news', label: 'Latest News' },
    { href: '/join', label: 'Join the Coalition' },
    { href: '/contact', label: 'Contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-1 mb-4">
              <span className="font-[family-name:var(--font-syne)] text-3xl font-bold">
                sf
              </span>
              <span className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[var(--color-dot)]">
                ·
              </span>
              <span className="font-[family-name:var(--font-syne)] text-3xl font-bold">
                imc
              </span>
            </Link>
            <p className="text-[var(--color-warm-gray)] max-w-md leading-relaxed">
              San Francisco Independent Media Coalition — ethnic and community publishers building
              the infrastructure for local journalism that makes a difference.
            </p>
          </div>

          {/* Coalition Links */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-semibold mb-4">Coalition</h4>
            <ul className="space-y-2">
              {footerLinks.coalition.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-charcoal)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-warm-gray)]">
            © {new Date().getFullYear()} San Francisco Independent Media Coalition. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[var(--color-warm-gray)]">
            <Link href="/privacy" className="hover:text-[var(--color-paper)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--color-paper)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
