import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RKR Statistics - Frequently Asked Questions',
  description:
    'Find answers to frequently asked questions about RKR Statistics',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
