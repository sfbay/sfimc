import Link from 'next/link'
import { ArrowRight, Users, Newspaper, TrendingUp, Heart } from 'lucide-react'

// Placeholder data - will be replaced with Payload queries
const timeline = [
  {
    year: '2023',
    title: 'Coalition Founded',
    description: 'Six founding publications come together to form the SF Independent Media Coalition.',
  },
  {
    year: '2024',
    title: 'First Collaborative Investigation',
    description: 'Members publish groundbreaking joint investigation on housing policy.',
  },
  {
    year: '2025',
    title: 'Platform Launch',
    description: 'Unified digital platform launches to amplify member journalism.',
  },
]

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'We serve the diverse communities of San Francisco, not advertisers or shareholders.',
  },
  {
    icon: Newspaper,
    title: 'Independent Voices',
    description: 'We preserve and amplify the unique perspectives of ethnic, neighborhood, and identity-based media.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Impact',
    description: 'We track and document how our journalism leads to real change in communities.',
  },
  {
    icon: Heart,
    title: 'Solidarity in Action',
    description: 'We share resources, knowledge, and support to strengthen all our members.',
  },
]

const team = [
  {
    name: 'Executive Director',
    role: 'Leadership',
    description: 'Strategic direction and funder relations',
  },
  {
    name: 'Member Services',
    role: 'Operations',
    description: 'Supporting publication success',
  },
  {
    name: 'Technology',
    role: 'Platform',
    description: 'Building shared infrastructure',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-ink)] text-[var(--color-paper)] py-20 lg:py-28 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              var(--color-dot) 40px,
              var(--color-dot) 41px
            )`
          }} />
        </div>

        <div className="container relative">
          <p className="text-[var(--color-teal-light)] font-mono text-sm uppercase tracking-wider mb-4">
            About the Coalition
          </p>
          <h1 className="display-lg mb-6 max-w-4xl">
            Stronger Together: San Francisco's Independent News Alliance
          </h1>
          <p className="text-xl text-[var(--color-warm-gray)] max-w-2xl">
            We are a coalition of independent, nonprofit news organizations serving San Francisco's
            diverse communities. Together, we're building a more informed, equitable city.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section section-ink">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
              <div>
                <p className="text-[var(--color-dot)] font-mono text-sm uppercase tracking-wider mb-2">
                  Our Mission
                </p>
                <div className="w-16 h-1 bg-[var(--color-dot)]" />
              </div>
              <div>
                <p className="text-2xl lg:text-3xl text-[var(--color-paper)] font-[family-name:var(--font-display)] leading-relaxed">
                  To preserve, strengthen, and amplify independent community journalism in San Francisco
                  by uniting diverse news organizations in a shared mission of accountability, equity,
                  and civic engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section section-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="display-md mb-4">Our Values</h2>
            <p className="text-[var(--color-slate)] max-w-xl mx-auto">
              The principles that guide our coalition and unite our diverse membership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card p-6 text-center group">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-dot)]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--color-dot)] transition-colors">
                  <value.icon className="w-7 h-7 text-[var(--color-dot)] group-hover:text-[var(--color-paper)] transition-colors" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[var(--color-slate)]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-paper">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="display-md mb-12 text-center">Our Journey</h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-[var(--color-mist)]" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={item.year} className="relative pl-20">
                    {/* Year bubble */}
                    <div className="absolute left-0 w-16 h-16 rounded-full bg-[var(--color-dot)] flex items-center justify-center">
                      <span className="text-[var(--color-paper)] font-[family-name:var(--font-display)] font-bold text-sm">
                        {item.year}
                      </span>
                    </div>

                    <div className="pt-3">
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[var(--color-slate)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section section-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="display-md mb-4">Coalition Team</h2>
            <p className="text-[var(--color-slate)] max-w-xl mx-auto">
              A small, dedicated team supporting our member publications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.role} className="card p-6 text-center">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-[var(--color-mist)] mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[var(--color-warm-gray)] text-xs font-mono">Photo</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
                  {member.name}
                </h3>
                <p className="text-[var(--color-dot)] text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-[var(--color-slate)]">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-ink">
        <div className="container text-center">
          <h2 className="display-md text-[var(--color-paper)] mb-4">
            Join Our Coalition
          </h2>
          <p className="text-[var(--color-warm-gray)] text-lg max-w-xl mx-auto mb-8">
            Whether you're a publication looking to join, a funder wanting to support local journalism,
            or a community member who cares — there's a place for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/join" className="btn btn-primary">
              Become a Member
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/members" className="btn btn-outline-light">
              Meet Our Members
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
