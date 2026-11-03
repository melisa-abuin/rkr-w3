import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RKR Stats - Leaderboard',
  description: 'View the run kitty run statistics for all players.',
  openGraph: {
    title: 'RKR Stats - Leaderboard',
    description: 'View the run kitty run statistics for all players.',
    type: 'website',
    images: [{ url: '/rkr-icon-primary-x64.png' }],
    url: '/leaderboard',
  },
  twitter: {
    card: 'summary',
    title: 'RKR Stats - Leaderboard',
    description: 'View the run kitty run statistics for all players.',
    images: ['/rkr-icon-primary-x64.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
