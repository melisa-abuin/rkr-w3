import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Run Kitty Run - Seasons',
  description: 'View the run kitty run seasons',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
