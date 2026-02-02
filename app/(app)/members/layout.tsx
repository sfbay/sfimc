import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Member Publications | SFIMC',
  description: 'Meet the independent publications that make up the San Francisco Independent Media Coalition — ethnic media, neighborhood news, and investigative journalism serving SF communities.',
}

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
