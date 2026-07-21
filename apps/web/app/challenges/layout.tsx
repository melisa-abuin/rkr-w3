import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Run Kitty Run - Challenges',
  description: 'View the run kitty run challenges',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
