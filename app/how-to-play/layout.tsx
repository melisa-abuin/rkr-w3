import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Run Kitty Run - How to play',
  description: 'Learn the basics to play Run Kitty Run',
  openGraph: {
    title: 'Run Kitty Run - How to play',
    description: 'Learn the basics to play Run Kitty Run',
  },
  twitter: {
    card: 'summary',
    description: 'Learn the basics to play Run Kitty Run',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
