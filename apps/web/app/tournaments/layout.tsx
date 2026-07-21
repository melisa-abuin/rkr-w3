import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Run Kitty Run - Tournaments',
  description: 'View the run kitty run tournaments',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
