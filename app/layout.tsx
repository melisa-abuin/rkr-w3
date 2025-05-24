import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { QueryProvider } from '@/hooks/useQuery'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Run Kitty Run - Warcraft 3 Custom Map',
  description:
    'The famous Warcraft 3 custom map where teamwork and agility guide your kitties through deadly obstacles.',
  keywords: [
    'Warcraft 3',
    'custom map',
    'Run Kitty Run',
    'strategy',
    'co-op game',
    'multiplayer',
    'runkittyrun',
    'rkr',
    'warcraft3',
    'reforged',
    'map',
    'coop',
  ],
  authors: { name: 'Warcraft 3 Custom Maps Community' },
  openGraph: {
    title: 'Run Kitty Run - Warcraft 3 Custom Map',
    description:
      'The famous Warcraft 3 custom map where teamwork and agility guide your kitties through deadly obstacles.',
    type: 'website',
    images: [
      {
        url: 'https://rkr-w3.vercel.app/favicon.ico',
      },
    ],
    url: 'https://rkr-w3.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary',
    description:
      'The famous Warcraft 3 custom map where teamwork and agility guide your kitties through deadly obstacles.',
    images: ['https://rkr-w3.vercel.app/favicon.ico'],
  },
  verification: {
    google: '4BStbCZAJGxWyjIjzPF8D807sohjzI8OtB7UwrDIz-o',
  },
  other: {
    'page-topic': 'Game',
    'page-type': 'Software Download',
    audience: 'All',
    sitemap: '/sitemap.xml',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },
  alternates: {
    canonical: 'https://rkr-w3.vercel.app',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <QueryProvider>
        <body className={inter.variable}>{children}</body>
      </QueryProvider>
    </html>
  )
}
