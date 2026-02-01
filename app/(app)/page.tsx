import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { AccomplishmentRibbon } from '@/components/home/AccomplishmentRibbon'
import { LiveStoryFeed } from '@/components/home/LiveStoryFeed'
import { MemberCarousel } from '@/components/home/MemberCarousel'
import { ImpactDashboard } from '@/components/home/ImpactDashboard'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Accomplishment Ribbon - Celebrates policy wins */}
      <AccomplishmentRibbon />

      {/* Live Story Feed - Teases member content */}
      <LiveStoryFeed />

      {/* Member Carousel - Showcases coalition members */}
      <MemberCarousel />

      {/* Impact Dashboard */}
      <ImpactDashboard />

      {/* CTA Section */}
      <section className="section section-paper">
        <div className="container">
          <div className="bg-[var(--color-ink)] rounded-3xl p-12 lg:p-16 text-center text-[var(--color-paper)] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-dots" />
            </div>

            <div className="relative">
              <h2 className="display-md mb-4">
                Ready to support community journalism?
              </h2>
              <p className="text-[var(--color-warm-gray)] text-lg mb-8 max-w-2xl mx-auto">
                Whether you're a funder, policymaker, or publication — there's a place for you in the coalition.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/join" className="btn btn-dot btn-lg">
                  Join the Coalition
                </Link>
                <Link href="/about" className="btn btn-outline text-[var(--color-paper)] border-[var(--color-warm-gray)]">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
