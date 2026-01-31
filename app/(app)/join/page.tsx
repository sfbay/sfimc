import Link from 'next/link'
import { ArrowRight, CheckCircle2, Building2, Heart, Mail, Users } from 'lucide-react'

const memberBenefits = [
  'Amplified reach through our shared platform and social channels',
  'Collaborative funding opportunities and grant support',
  'Shared technology infrastructure and tools',
  'Professional development and training programs',
  'Networking with peer publications across communities',
  'Collective advocacy on policy issues affecting local news',
]

const memberCriteria = [
  'Based in or primarily covering San Francisco',
  'Independent, nonprofit, or locally-owned',
  'Commitment to community-focused journalism',
  'Editorial independence from commercial or political interests',
  'Regular publishing schedule (at least monthly)',
]

const supporterTiers = [
  {
    name: 'Community Supporter',
    amount: '$10/month',
    description: 'Show your support for local journalism',
    benefits: [
      'Newsletter updates on coalition work',
      'Invitation to community events',
      'Recognition on supporters page',
    ],
  },
  {
    name: 'Champion',
    amount: '$50/month',
    description: 'Make a meaningful impact',
    benefits: [
      'All Community Supporter benefits',
      'Quarterly impact reports',
      'Early access to coalition initiatives',
      'Champion badge and recognition',
    ],
    featured: true,
  },
  {
    name: 'Sustainer',
    amount: '$100/month',
    description: 'Become a pillar of local news',
    benefits: [
      'All Champion benefits',
      'Annual meeting with coalition leadership',
      'Named recognition in annual report',
      'Exclusive briefings on local news ecosystem',
    ],
  },
]

export default function JoinPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-ink)] text-[var(--color-paper)] py-20 lg:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-dot)]/20 via-transparent to-[var(--color-teal)]/10" />

        <div className="container relative">
          <h1 className="display-lg mb-6 max-w-4xl">
            Join the Movement for Local News
          </h1>
          <p className="text-xl text-[var(--color-warm-gray)] max-w-2xl">
            Whether you're a publication, funder, or community member — there's a role for
            you in strengthening San Francisco's independent media ecosystem.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-[var(--color-charcoal)] border-b border-[var(--color-ink)] sticky top-16 z-40">
        <div className="container py-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#publications" className="px-4 py-2 rounded-full text-sm font-medium text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] border border-[var(--color-warm-gray)]/30 hover:border-[var(--color-dot)] transition-colors">
              For Publications
            </a>
            <a href="#funders" className="px-4 py-2 rounded-full text-sm font-medium text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] border border-[var(--color-warm-gray)]/30 hover:border-[var(--color-dot)] transition-colors">
              For Funders
            </a>
            <a href="#supporters" className="px-4 py-2 rounded-full text-sm font-medium text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] border border-[var(--color-warm-gray)]/30 hover:border-[var(--color-dot)] transition-colors">
              For Supporters
            </a>
            <a href="#contact" className="px-4 py-2 rounded-full text-sm font-medium text-[var(--color-warm-gray)] hover:text-[var(--color-paper)] border border-[var(--color-warm-gray)]/30 hover:border-[var(--color-dot)] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* For Publications */}
      <section id="publications" className="section section-cream scroll-mt-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-dot)] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[var(--color-paper)]" />
                </div>
                <p className="text-[var(--color-dot)] font-mono text-sm uppercase tracking-wider">
                  For Publications
                </p>
              </div>
              <h2 className="display-md mb-4">Become a Member Publication</h2>
              <p className="text-[var(--color-slate)] text-lg mb-8">
                Join a coalition of independent news organizations committed to serving
                San Francisco's diverse communities. Together, we're stronger.
              </p>

              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)] mb-4">
                Member Benefits
              </h3>
              <ul className="space-y-3 mb-8">
                {memberBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-teal)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--color-slate)]">{benefit}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className="btn btn-primary">
                Apply for Membership
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="card p-6 lg:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)] mb-4">
                Membership Criteria
              </h3>
              <p className="text-[var(--color-slate)] text-sm mb-6">
                We welcome applications from news organizations that meet the following criteria:
              </p>
              <ul className="space-y-3 mb-6">
                {memberCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-dot)] mt-2 flex-shrink-0" />
                    <span className="text-[var(--color-slate)]">{criterion}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[var(--color-mist)] pt-6">
                <p className="text-sm text-[var(--color-warm-gray)]">
                  Membership is free for qualifying organizations. We believe financial barriers
                  should never prevent community journalism from being represented.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Funders */}
      <section id="funders" className="section section-ink scroll-mt-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-teal)] flex items-center justify-center">
                <Users className="w-5 h-5 text-[var(--color-paper)]" />
              </div>
              <p className="text-[var(--color-teal-light)] font-mono text-sm uppercase tracking-wider">
                For Funders
              </p>
            </div>
            <h2 className="display-md text-[var(--color-paper)] mb-4">
              Invest in Local News Infrastructure
            </h2>
            <p className="text-[var(--color-warm-gray)] text-lg mb-8">
              Foundation and philanthropic support helps us provide shared services, capacity building,
              and sustainability programs that strengthen the entire local news ecosystem.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[var(--color-charcoal)] rounded-2xl p-6 text-left">
                <p className="text-3xl font-[family-name:var(--font-display)] font-bold text-[var(--color-teal-light)] mb-2">
                  6+
                </p>
                <p className="text-[var(--color-paper)] font-medium">Member Publications</p>
                <p className="text-sm text-[var(--color-warm-gray)]">Independent voices united</p>
              </div>
              <div className="bg-[var(--color-charcoal)] rounded-2xl p-6 text-left">
                <p className="text-3xl font-[family-name:var(--font-display)] font-bold text-[var(--color-teal-light)] mb-2">
                  500K+
                </p>
                <p className="text-[var(--color-paper)] font-medium">Monthly Readers</p>
                <p className="text-sm text-[var(--color-warm-gray)]">Across all member publications</p>
              </div>
              <div className="bg-[var(--color-charcoal)] rounded-2xl p-6 text-left">
                <p className="text-3xl font-[family-name:var(--font-display)] font-bold text-[var(--color-teal-light)] mb-2">
                  100%
                </p>
                <p className="text-[var(--color-paper)] font-medium">Community-Focused</p>
                <p className="text-sm text-[var(--color-warm-gray)]">Serving underrepresented voices</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:partnerships@sfindependentmedia.org" className="btn btn-primary">
                Schedule a Conversation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="btn btn-outline-light">
                Download Impact Report
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* For Supporters */}
      <section id="supporters" className="section section-cream scroll-mt-32">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-dot)] flex items-center justify-center">
                <Heart className="w-5 h-5 text-[var(--color-paper)]" />
              </div>
              <p className="text-[var(--color-dot)] font-mono text-sm uppercase tracking-wider">
                For Community Supporters
              </p>
            </div>
            <h2 className="display-md mb-4">Support Local Journalism</h2>
            <p className="text-[var(--color-slate)] max-w-xl mx-auto">
              Your monthly contribution helps us strengthen the organizations that keep
              San Francisco's communities informed and connected.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {supporterTiers.map((tier) => (
              <div
                key={tier.name}
                className={`card p-6 flex flex-col ${
                  tier.featured ? 'ring-2 ring-[var(--color-dot)] relative' : ''
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--color-dot)] text-[var(--color-paper)] text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
                    {tier.name}
                  </h3>
                  <p className="text-2xl font-bold text-[var(--color-dot)] mt-1">
                    {tier.amount}
                  </p>
                  <p className="text-sm text-[var(--color-slate)] mt-1">
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-2 flex-1 mb-6">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-slate)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-teal)] flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button className={`btn w-full justify-center ${tier.featured ? 'btn-primary' : 'btn-outline'}`}>
                  Choose {tier.name}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[var(--color-warm-gray)] mt-8">
            All contributions are tax-deductible. SF Independent Media Coalition is a 501(c)(3) organization.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="section section-paper scroll-mt-32">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-teal)] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[var(--color-paper)]" />
                </div>
                <p className="text-[var(--color-teal)] font-mono text-sm uppercase tracking-wider">
                  Get in Touch
                </p>
              </div>
              <h2 className="display-md mb-4">Contact Us</h2>
              <p className="text-[var(--color-slate)]">
                Have questions? Want to learn more? We'd love to hear from you.
              </p>
            </div>

            <form className="card p-6 lg:p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-ink)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-mist)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-dot)] focus:border-transparent"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-ink)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-mist)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-dot)] focus:border-transparent"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-type" className="block text-sm font-medium text-[var(--color-ink)] mb-2">
                  I'm interested in...
                </label>
                <select
                  id="inquiry-type"
                  name="inquiry-type"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-mist)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-dot)] focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="membership">Publication Membership</option>
                  <option value="funding">Funding Partnership</option>
                  <option value="supporting">Community Support</option>
                  <option value="press">Press Inquiry</option>
                  <option value="other">Something Else</option>
                </select>
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-[var(--color-ink)] mb-2">
                  Organization (optional)
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-mist)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-dot)] focus:border-transparent"
                  placeholder="Your organization name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-ink)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-mist)] bg-[var(--color-paper)] text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-dot)] focus:border-transparent resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center">
                Send Message
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-[var(--color-warm-gray)]">
              <p>
                Or email us directly at{' '}
                <a href="mailto:hello@sfindependentmedia.org" className="text-[var(--color-dot)] hover:underline">
                  hello@sfindependentmedia.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
