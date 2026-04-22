'use client'
import { usePathname } from 'next/navigation'
import styles from './index.module.css'
import Image from 'next/image'
import { useIsScrollAtTop } from '@/hooks/useIsScrollAtTop'
import { usePreferredTheme } from '@/hooks/usePreferredTheme'
import { useState } from 'react'
import { routes } from '@/constants'
import Link from '@/components/atoms/link'

export default function MobileNavbar() {
  const pathname = usePathname()
  const [isAtTopPage] = useIsScrollAtTop()
  const [theme] = usePreferredTheme()
  const shouldShowTransparentNav = isAtTopPage && pathname === '/'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isMenuOpen) {
    return (
      <div className={styles.container}>
        <Image
          alt="hamburger menu"
          className={styles.hamburger}
          height={25}
          src={
            shouldShowTransparentNav || theme.name === 'dark'
              ? '/hamburger-white.png'
              : '/hamburger-black.png'
          }
          width={25}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.mobileMenu}>
        <button
          aria-label="Close modal"
          className={styles.closeButton}
          type="button"
          onClick={() => setIsMenuOpen(false)}
        >
          <span aria-hidden="true" className={styles.closeIcon}>
            &times;
          </span>
        </button>
        <ul className={styles.navLinks}>
          {Object.values(routes).map((route) => (
            <li
              key={route.label}
              className={`${styles.navLink} ${
                pathname === route.pathname ? styles.selected : ''
              }`}
            >
              <Link
                href={route.url}
                target={route.target}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
