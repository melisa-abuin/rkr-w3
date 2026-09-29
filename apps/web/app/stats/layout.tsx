import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RKR Stats - Overall Statistics',
  description: 'View the run kitty run statistics for all players',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
