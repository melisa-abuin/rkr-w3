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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="Warcraft 3, custom map, Run Kitty Run, strategy, co-op game, multiplayer"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <meta
          property="og:title"
          content="Run Kitty Run - Warcraft 3 Custom Map"
        />
        <meta
          property="og:description"
          content="Guide your kitties through obstacles in this popular Warcraft 3 custom map. Play with friends and join tournaments!"
        />
        <meta property="og:type" content="website" />
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
