import Footer from '@/components/molecules/footer'
import { Inter } from 'next/font/google'
import '../theme/dark.css'
import '../theme/light.css'
import './globals.css'

export const metadata = {
  title: 'Admin',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html dir="ltr" lang="en">
      <body className={inter.variable}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
