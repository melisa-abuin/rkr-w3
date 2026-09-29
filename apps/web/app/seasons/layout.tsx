import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RKR Stats - Seasons',
  description: 'View the run kitty run seasons',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
