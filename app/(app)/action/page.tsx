import Link from 'next/link'
import { ActionCard } from '@/components/cards'
import { Megaphone, TrendingUp, Users, Mail, FileSignature, Heart } from 'lucide-react'

// Placeholder data - will be replaced with Payload queries
const actions = [
  {
    id: '1',
    title: 'Protect Local News Tax Credit',
    description: 'Contact your state legislators to support SB-1234, which would provide tax credits for local news subscriptions and advertising.',
    type: 'letter' as const,
    url: '/action/local-news-tax-credit',
    urgent: true,
    deadline: '2026-02-28',
    progress: { current: 847, goal: 1000 },
  },
  {
    id: '2',
    title: 'Sign: Defend Press Access at City Hall',
    description: 'Join journalists demanding the city restore full press access to public meetings and end restrictions on recording.',
    type: 'petition' as const,
    url: '/action/press-access-petition',
    urgent: true,
    progress: { current: 2341, goal: 3000 },
  },
  {
    id: '3',
    title: 'Donate to the Coalition Emergency Fund',
    description: 'Support publications facing unexpected challenges with a contribution to our emergency assistance fund.',
    type: 'donate' as const,
    url: '/donate',
    progress: { current: 12500, goal: 25000 },
  },
  {
    id: '4',
    title: 'Share: Why Local News Matters',
    description: 'Help spread the word about the importance of independent local journalism by sharing our campaign on social media.',
    type: 'share' as const,
    url: '/action/share-campaign',
  },
  {
    id: '5',
    title: 'Contact Your Supervisor: Support SFJC Funding',
    description: 'Ask your district supervisor to support full funding for the SF Journalism Collective in the next budget cycle.',
    type: 'contact' as const,
    url: '/action/sfjc-funding',
    deadline: '2026-03-15',
  },
  {
    id: '6',
    title: 'Join the Local News Advocate Network',
    description: 'Sign up to be notified when there are opportunities to advocate for local journalism at the state and local level.',
    type: 'campaign' as const,
    url: '/action/advocate-network',
    progress: { current: 156, goal: 500 },
  },
]

const impactStats = [
  { value: '12', label: 'Policy wins', sublabel: 'in 2025' },
  { value: '5,400+', label: 'Letters sent', sublabel: 'to legislators' },
  { value: '$2.1M', label: 'Funding secured', sublabel: 'for local news' },
  { value: '3', label: 'Bills passed', sublabel: 'with coalition support' },
]

const urgentActions = actions.filter((a) => a.urgent)
const regularActions = actions.filter((a) => !a.urgent)

export const metadata = {
  title: 'Take Action | SFIMC',
  description: 'Support independent local journalism through advocacy, donations, and community action.',
}

export default function ActionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[var(--color-dot)] via-[var(--color-dot)] to-[var(--color-magenta)] text-white py-20 lg:py-28 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[150px] rounded-full" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="container relative">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <Megaphone className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                Action Center
              </span>
            </div>

            <h1 className="display-lg mb-4">
              Your voice strengthens local journalism
              <span className="text-white/50">.</span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8">
              When community members speak up, policymakers listen. Join thousands
              advocating for independent news in San Francisco.
            </p>

            {/* Impact stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
              {impactStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                  <div className="text-xs text-white/50">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Actions */}
      {urgentActions.length > 0 && (
        <section className="section section-paper">
          <div className="container">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[var(--color-dot)] rounded-full animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-dot)]">
                Urgent — Act Now
              </span>
            </div>

            <div className="space-y-6">
              {urgentActions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  variant="banner"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ways to Help */}
      <section className="section section-cream">
        <div className="container">
          <header className="mb-12">
            <h2 className="display-md mb-2">
              Ways to help
              <span className="text-[var(--color-teal)]">.</span>
            </h2>
            <p className="text-[var(--color-warm-gray)] text-lg">
              Every action makes a difference — choose how you want to contribute.
            </p>
          </header>

          {/* Action type cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <FileSignature className="w-6 h-6" />,
                title: 'Sign petitions',
                description: 'Add your name to campaigns supporting local journalism',
                color: 'var(--color-teal)',
                count: actions.filter((a) => a.type === 'petition').length,
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: 'Contact officials',
                description: 'Send letters to policymakers on critical issues',
                color: 'var(--color-dot)',
                count: actions.filter((a) => a.type === 'letter' || a.type === 'contact').length,
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: 'Donate',
                description: 'Support coalition programs and member publications',
                color: 'var(--color-magenta)',
                count: actions.filter((a) => a.type === 'donate').length,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-mist)]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[var(--color-ink)] mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--color-slate)] mb-3">{item.description}</p>
                <span className="text-xs font-mono text-[var(--color-warm-gray)]">
                  {item.count} active {item.count === 1 ? 'campaign' : 'campaigns'}
                </span>
              </div>
            ))}
          </div>

          {/* All actions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </div>
      </section>

      {/* Advocacy Wins */}
      <section className="section section-paper">
        <div className="container">
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[var(--color-teal)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                Recent Wins
              </span>
            </div>
            <h2 className="display-md mb-2">
              Advocacy that worked
              <span className="text-[var(--color-teal)]">.</span>
            </h2>
            <p className="text-[var(--color-warm-gray)] text-lg">
              When we organize together, we achieve real policy change.
            </p>
          </header>

          {/* Timeline of wins */}
          <div className="space-y-6">
            {[
              {
                date: 'December 2025',
                title: 'City funds $500K for local news innovation grants',
                description: 'After sustained advocacy, the Board of Supervisors approved dedicated funding for local journalism innovation.',
                letters: 342,
              },
              {
                date: 'October 2025',
                title: 'State passes journalist shield law expansion',
                description: 'SB-456 extends shield law protections to digital journalists and freelancers.',
                letters: 1247,
              },
              {
                date: 'August 2025',
                title: 'Press access restored at SFPD briefings',
                description: 'Police commission reversed policy limiting media attendance at weekly crime briefings.',
                letters: 89,
              },
            ].map((win, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 rounded-2xl bg-[var(--color-cream)] border border-[var(--color-mist)]"
              >
                {/* Date column */}
                <div className="hidden md:block w-32 flex-shrink-0">
                  <div className="text-sm font-mono text-[var(--color-teal)]">{win.date}</div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="md:hidden text-sm font-mono text-[var(--color-teal)] mb-2">{win.date}</div>
                  <h3 className="font-semibold text-[var(--color-ink)] mb-2">{win.title}</h3>
                  <p className="text-[var(--color-slate)] text-sm mb-3">{win.description}</p>
                  <div className="flex items-center gap-2 text-xs text-[var(--color-warm-gray)]">
                    <Mail className="w-3 h-3" />
                    <span>{win.letters.toLocaleString()} community letters contributed</span>
                  </div>
                </div>

                {/* Success badge */}
                <div className="hidden md:flex items-start">
                  <span className="px-3 py-1 bg-[var(--color-teal)]/10 text-[var(--color-teal)] text-xs font-medium rounded-full">
                    ✓ Won
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/policy" className="text-[var(--color-teal)] font-medium hover:underline">
              View all policy wins →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section section-cream">
        <div className="container">
          <div className="bg-[var(--color-ink)] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-dot)]/20 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[var(--color-dot)]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Stay Connected
                  </span>
                </div>
                <h2 className="display-sm mb-4">
                  Get action alerts
                </h2>
                <p className="text-[var(--color-warm-gray)] mb-6">
                  Be the first to know when there's an opportunity to support local journalism.
                  We only send alerts when your voice is needed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-[var(--color-warm-gray)] text-base focus:outline-none focus:border-[var(--color-dot)] focus:ring-2 focus:ring-[var(--color-dot)]/20 transition-all"
                />
                <button className="btn btn-dot btn-lg whitespace-nowrap">
                  Subscribe
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
