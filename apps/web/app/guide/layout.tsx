import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Run Kitty Run - How to upload my stats',
  description:
    'Learn how to upload your stats through the Discord server and view them on the website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
