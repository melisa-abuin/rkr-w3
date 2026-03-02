import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Run Kitty Run - Tournament',
  description: 'View the run kitty run tournament details',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
