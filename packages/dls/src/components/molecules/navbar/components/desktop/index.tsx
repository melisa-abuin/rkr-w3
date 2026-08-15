'use client'

import ColorBadge from '@/components/atoms/colorBadge'
import type { NavRoute } from '@/interfaces/navbar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './index.module.css'

interface DesktopNavbarProps {
  routes: Record<string, NavRoute>
}

export default function DesktopNavbar({ routes }: DesktopNavbarProps) {
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
          {route.method === 'post' ? (
            <form action={route.url} method="post">
              <button className={styles.navLinkAnchor} type="submit">
                {route.label}
                {route.isNew && (
                  <span className={styles.newBadge}>
                    <ColorBadge small colorName="red">
                      New
                    </ColorBadge>
                  </span>
                )}
              </button>
            </form>
          ) : (
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
          )}
        </li>
      ))}
    </ul>
  )
}
