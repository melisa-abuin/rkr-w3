'use client'

import ColorBadge from '@/components/atoms/colorBadge'
import { routes } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './index.module.css'

export default function DesktopNavbar() {
  const pathname = usePathname()
  const basePath = pathname?.split('/').slice(0, 2).join('/')

  return (
    <ul className={styles.navLinks}>
      {Object.values(routes).map((route) => (
        <li
          key={route.label}
          className={`${styles.navLink} ${
            basePath === route.pathname ? styles.selected : ''
          }`}
        >
          <Link
            className={styles.navLinkAnchor}
            href={route.url}
            target={route.target}
          >
            {route.label}
            {route.isNew && (
              <span className={styles.newBadge}>
                <ColorBadge small colorName="red">
                  New
                </ColorBadge>
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
