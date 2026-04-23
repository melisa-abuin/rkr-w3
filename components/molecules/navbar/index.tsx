'use client'
import { usePathname } from 'next/navigation'
import styles from './index.module.css'
import Image from 'next/image'
import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import DesktopNavbar from './components/desktop'
import MobileNavbar from './components/mobile'
import Link from '@/components/atoms/link'
import Announcement from './components/announcement'

export default function Navbar() {
  const pathname = usePathname()
  const [isAtTopPage] = useIsScrollAtTop()
  const shouldShowTransparentNav = isAtTopPage && pathname === '/'
  const navClassName = `${styles.styledNav} ${
    shouldShowTransparentNav ? styles.transparentNav : styles.defaultNav
  }`

  return (
    <>
      <nav className={navClassName}>
        <div className={styles.container}>
          <Link href="/">
            <Image
              priority
              alt="brand logo"
              height={54}
              src={
                shouldShowTransparentNav
                  ? '/rkr-icon-white.png'
                  : `/rkr-icon-primary.png`
              }
              width={54}
            />
          </Link>
          <DesktopNavbar hasTransparentStyle={shouldShowTransparentNav} />
          <MobileNavbar />
        </div>
      </nav>

      {!shouldShowTransparentNav && <Announcement />}
    </>
  )
}
