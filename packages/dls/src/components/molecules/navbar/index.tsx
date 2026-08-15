'use client'
import Link from '@/components/atoms/link'
import Image from 'next/image'
import Announcement from './components/announcement'
import DesktopNavbar from './components/desktop'
import MobileNavbar from './components/mobile'
import styles from './index.module.css'

export interface NavRoute {
  label: string
  pathname: string
  url: string
  target: '_self' | '_blank'
  isNew: boolean
  method?: 'get' | 'post'
}

interface NavbarProps {
  routes: Record<string, NavRoute>
}

export default function Navbar({ routes }: NavbarProps) {
  return (
    <>
      <nav className={styles.styledNav}>
        <div className={styles.container}>
          <Link href="/">
            <Image
              priority
              alt="brand logo"
              height={54}
              src="/rkr-icon-primary-x64.png"
              width={54}
            />
          </Link>
          <DesktopNavbar routes={routes} />
          <MobileNavbar routes={routes} />
        </div>
      </nav>

      <Announcement />
    </>
  )
}
