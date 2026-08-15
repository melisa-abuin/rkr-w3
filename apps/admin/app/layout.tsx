import Footer from '@/components/molecules/footer'
import Navbar from '@/components/molecules/navbar'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { routes } from '../constants'
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.has('admin_session')

  return (
    <html dir="ltr" lang="en">
      <body className={inter.variable}>
        {isLoggedIn && <Navbar routes={routes} />}
        {children}
        <Footer />
      </body>
    </html>
  )
}
