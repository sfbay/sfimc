import type { Metadata } from 'next'
import { DM_Sans, Fraunces, JetBrains_Mono, Syne } from 'next/font/google'
import '@/styles/globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SFIMC | San Francisco Independent Media Coalition',
    template: '%s | SFIMC',
  },
  description: 'A coalition of ethnic and community publishers building the infrastructure for local journalism that makes a difference in San Francisco.',
  keywords: ['local journalism', 'community media', 'San Francisco', 'ethnic media', 'independent media', 'coalition'],
  authors: [{ name: 'San Francisco Independent Media Coalition' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sfindependentmedia.org',
    siteName: 'SFIMC',
    title: 'San Francisco Independent Media Coalition',
    description: 'Journalism that moves San Francisco',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${syne.variable}`}
    >
      <body className="min-h-screen bg-cream antialiased">
        {children}
      </body>
    </html>
  )
}
