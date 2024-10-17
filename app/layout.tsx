import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/hooks/useTheme'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Run Kitty Run',
  description:
    'The famous Warcraft 3 custom map where teamwork and agility guide your kitties through deadly obstacles.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="keywords"
          content="Warcraft 3, custom map, Run Kitty Run, strategy, co-op game, multiplayer"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Run Kitty Run - Warcraft 3 Custom Map"
        />
        <meta
          property="og:description"
          content="Guide your kitties through obstacles in this popular Warcraft 3 custom map. Play with friends and join tournaments!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/map.png" />
        <meta
          name="google-site-verification"
          content="4BStbCZAJGxWyjIjzPF8D807sohjzI8OtB7UwrDIz-o"
        />
        <meta
          name="twitter:card"
          content="Guide your kitties through obstacles in this popular Warcraft 3 custom map. Play with friends and join tournaments!"
        />
        <meta name="author" content="Warcraft 3 Custom Maps Community" />
        <meta
          name="keywords"
          content="runkittyrun, rkr, warcraft3, reforged, map, coop, strategy, multiplayer"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="page-topic" content="Game" />
        <meta name="page-type" content="Software Download" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="audience" content="Alle" />

        <link rel="shortcut icon" href="/map.png" />
        <link
          rel="sitemap"
          type="application/xml"
          href="https://rkr-w3.vercel.app/sitemap.xml"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://rkr-w3.vercel.app" />
      </head>
      <ThemeProvider>
        <body className={inter.variable}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  )
}
