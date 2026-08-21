import Footer from '@rkr/dls/components/molecules/footer'
import Navbar from '@rkr/dls/components/molecules/navbar'
import { QueryProvider } from '@rkr/dls/hooks/useQuery'
import { ToastProvider } from '@rkr/dls/hooks/useToast'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { routes } from '../constants'
import { getAnnouncement } from '../lib/announcement'
import { postPageView } from '../lib/pageView'
import '../theme/dark.css'
import '../theme/light.css'
import './globals.css'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? '/'
  // x-real-ip is set by Vercel infrastructure and cannot be spoofed; x-forwarded-for[0] can.
  const ip =
    headersList.get('x-real-ip') ??
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (ip) {
    void postPageView(pathname, ip)
  }

  const announcement = await getAnnouncement()

  return (
    <html dir="ltr" lang="en">
      <body className={inter.variable}>
        <QueryProvider>
          <ToastProvider>
            <Navbar announcement={announcement} routes={routes} />
            {children}
            <Footer />
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
