import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/a11y'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}
