'use client'
import Link from '@/components/atoms/link'
import type { AnnouncementData } from '@/interfaces/announcement'
import type { NavRoute } from '@/interfaces/navbar'
import Image from 'next/image'
import Announcement from './components/announcement'
import DesktopNavbar from './components/desktop'
import MobileNavbar from './components/mobile'
import styles from './index.module.css'

interface NavbarProps {
  routes: Record<string, NavRoute>
  announcement?: AnnouncementData
}

export default function Navbar({ routes, announcement }: NavbarProps) {
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

      {announcement && announcement.isActive && (
        <Announcement
          subtitle={announcement.subtitle}
          title={announcement.title}
        />
      )}
    </>
  )
}
