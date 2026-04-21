'use client'

import { usePathname } from 'next/navigation'
import styles from './index.module.css'
import { routes } from '@/constants'
import Link from 'next/link'

export default function DesktopNavbar({
  hasTransparentStyle,
}: {
  hasTransparentStyle: boolean
}) {
  const pathname = usePathname()
  const basePath = pathname?.split('/').slice(0, 2).join('/')

  return (
    <ul className={styles.navLinks}>
      {Object.values(routes).map((route) => (
        <li
          key={route.label}
          className={`${styles.navLink} ${
            basePath === route.pathname ? styles.selected : ''
          } ${hasTransparentStyle ? styles.transparent : ''}`}
        >
          <Link
            className={styles.navLinkAnchor}
            href={route.url}
            target={route.target}
          >
            {route.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
