import Link from 'next/link'
import { FileText, Scale, Target, Users, ArrowRight, ExternalLink } from 'lucide-react'

// Placeholder data - will be replaced with Payload queries
const policyAreas = [
  {
    id: '1',
    title: 'Local News Sustainability',
    slug: 'local-news-sustainability',
    icon: FileText,
    description: 'Advocating for policies that create sustainable funding models for community journalism.',
    priorities: [
      'Tax incentives for local news subscriptions and donations',
      'Public funding mechanisms for nonprofit newsrooms',
      'Fair compensation from platforms for news content',
    ],
    status: 'active',
  },
  {
    id: '2',
    title: 'Media Ownership Transparency',
    slug: 'media-ownership',
    icon: Scale,
    description: 'Promoting transparency in media ownership and preventing harmful consolidation.',
    priorities: [
      'Disclosure requirements for media ownership',
      'Anti-consolidation regulations for local markets',
      'Support for locally-owned news organizations',
    ],
    status: 'active',
  },
  {
    id: '3',
    title: 'Government Advertising Equity',
    slug: 'government-advertising',
    icon: Target,
    description: 'Ensuring community and ethnic media receive fair share of public notice and advertising spending.',
    priorities: [
      'Equitable distribution of government advertising',
      'Recognition of ethnic media reach and impact',
      'Transparent procurement processes',
    ],
    status: 'active',
  },
  {
    id: '4',
    title: 'Press Freedom & Access',
    slug: 'press-freedom',
    icon: Users,
    description: 'Protecting journalists\' rights and ensuring access to public information.',
    priorities: [
      'Shield law protections for journalists',
      'Public records access improvements',
      'Safety protections for community reporters',
    ],
    status: 'monitoring',
  },
]

const recentActions = [
  {
    date: '2025-01-15',
    title: 'Coalition testifies on local journalism tax credit',
    body: 'Board of Supervisors Budget Committee',
    outcome: 'Pending',
  },
  {
    date: '2024-12-10',
    title: 'Statement on public notice modernization',
    body: 'California State Assembly',
    outcome: 'Bill amended',
  },
  {
    date: '2024-11-20',
    title: 'Submitted comments on government advertising equity',
    body: 'City Administrator\'s Office',
    outcome: 'Under review',
  },
]

export default function PolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-teal-dark)] text-[var(--color-paper)] py-20 lg:py-28 relative overflow-hidden">
        {/* Background element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/5 font-[family-name:var(--font-display)] text-[10rem] font-bold tracking-tighter pointer-events-none hidden lg:block">
          POLICY
        </div>

        <div className="container relative">
          <p className="text-[var(--color-teal-light)] font-mono text-sm uppercase tracking-wider mb-4">
            Policy & Advocacy
          </p>
          <h1 className="display-lg mb-6 max-w-4xl">
            Advocating for a Stronger Local News Ecosystem
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            We work with policymakers at every level to create conditions where independent,
            community journalism can thrive.
          </p>
        </div>
      </section>

      {/* Policy Areas */}
      <section className="section section-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="display-md mb-4">Priority Areas</h2>
            <p className="text-[var(--color-slate)] max-w-xl mx-auto">
              Our coalition focuses on policies that directly impact the sustainability and
              effectiveness of community journalism.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {policyAreas.map((area) => (
              <article key={area.id} className="card p-6 lg:p-8 group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-teal)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-teal)] transition-colors">
                    <area.icon className="w-6 h-6 text-[var(--color-teal)] group-hover:text-[var(--color-paper)] transition-colors" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
                        {area.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        area.status === 'active'
                          ? 'bg-[var(--color-teal)]/10 text-[var(--color-teal)]'
                          : 'bg-[var(--color-gold)]/20 text-[var(--color-gold-dark)]'
                      }`}>
                        {area.status === 'active' ? 'Active' : 'Monitoring'}
                      </span>
                    </div>
                    <p className="text-[var(--color-slate)] text-sm">
                      {area.description}
                    </p>
                  </div>
                </div>

                <div className="pl-16">
                  <p className="text-xs text-[var(--color-warm-gray)] font-mono uppercase tracking-wider mb-3">
                    Current Priorities
                  </p>
                  <ul className="space-y-2">
                    {area.priorities.map((priority, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-slate)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-dot)] mt-1.5 flex-shrink-0" />
                        {priority}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Actions */}
      <section className="section section-paper">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="display-md mb-8 text-center">Recent Actions</h2>

            <div className="space-y-4">
              {recentActions.map((action, index) => (
                <div key={index} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-xs text-[var(--color-warm-gray)] font-mono">
                      {new Date(action.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--color-ink)] mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-[var(--color-slate)]">
                      {action.body}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      action.outcome === 'Pending'
                        ? 'bg-[var(--color-gold)]/20 text-[var(--color-gold-dark)]'
                        : 'bg-[var(--color-teal)]/10 text-[var(--color-teal)]'
                    }`}>
                      {action.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="btn btn-outline">
                View All Actions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Position Statement */}
      <section className="section section-ink">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[var(--color-teal-light)] font-mono text-sm uppercase tracking-wider mb-4">
              Our Position
            </p>
            <blockquote className="text-2xl lg:text-3xl text-[var(--color-paper)] font-[family-name:var(--font-display)] leading-relaxed mb-8">
              "Local journalism is essential infrastructure for democracy. We advocate for policies
              that recognize this public good and create sustainable conditions for community
              news organizations to serve their readers."
            </blockquote>
            <p className="text-[var(--color-warm-gray)]">
              — SF Independent Media Coalition Policy Committee
            </p>
          </div>
        </div>
      </section>

      {/* Resources & CTA */}
      <section className="section section-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Resources */}
            <div>
              <h2 className="display-sm mb-6">Policy Resources</h2>
              <div className="space-y-3">
                <a href="#" className="card p-4 flex items-center gap-4 group hover:border-[var(--color-dot)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-dot)]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-[var(--color-dot)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-dot)] transition-colors">
                      2025 Policy Priorities
                    </h3>
                    <p className="text-sm text-[var(--color-slate)]">PDF • Updated January 2025</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-warm-gray)]" />
                </a>
                <a href="#" className="card p-4 flex items-center gap-4 group hover:border-[var(--color-dot)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-dot)]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-[var(--color-dot)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-dot)] transition-colors">
                      Local News Sustainability Report
                    </h3>
                    <p className="text-sm text-[var(--color-slate)]">PDF • November 2024</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-warm-gray)]" />
                </a>
              </div>
            </div>

            {/* Get Involved */}
            <div className="lg:pl-12 lg:border-l border-[var(--color-mist)]">
              <h2 className="display-sm mb-6">Get Involved</h2>
              <p className="text-[var(--color-slate)] mb-6">
                Want to support policies that strengthen local journalism? There are several
                ways to make your voice heard.
              </p>
              <div className="space-y-4">
                <Link href="/join" className="btn btn-primary w-full justify-center">
                  Join Our Advocacy Network
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="mailto:policy@sfindependentmedia.org" className="btn btn-outline w-full justify-center">
                  Contact Policy Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
