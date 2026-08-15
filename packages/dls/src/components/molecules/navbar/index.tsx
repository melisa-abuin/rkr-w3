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
  withAnnouncement?: boolean
}

export default function Navbar({
  routes,
  announcement,
  withAnnouncement = true,
}: NavbarProps) {
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

      {withAnnouncement && announcement && announcement.isActive && (
        <Announcement
          subtitle={announcement.subtitle}
          title={announcement.title}
        />
      )}
    </>
  )
}
