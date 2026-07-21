import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Run Kitty Run - Leaderboard',
  description: 'View the run kitty run statistics for all players.',
  openGraph: {
    title: 'Run Kitty Run - Leaderboard',
    description: 'View the run kitty run statistics for all players.',
    type: 'website',
    images: [
      {
        url: 'https://rkr-w3.vercel.app/favicon.ico',
      },
    ],
    url: 'https://rkr-w3.vercel.app/leaderboard',
  },
  twitter: {
    card: 'summary',
    description: 'View the run kitty run statistics for all players.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
