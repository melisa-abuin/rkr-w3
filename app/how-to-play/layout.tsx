import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Run Kitty Run - How to play',
  description:
    'The famous Warcraft 3 custom map where teamwork and agility guide your kitties through deadly obstacles.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
