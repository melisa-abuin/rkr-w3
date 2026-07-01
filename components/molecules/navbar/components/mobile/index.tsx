'use client'
import Link from '@/components/atoms/link'
import { routes } from '@/constants'
import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from './index.module.css'

export default function MobileNavbar() {
  const pathname = usePathname()
  const prefersDarkMode = usePrefersDarkMode()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isMenuOpen) {
    return (
      <div className={styles.container}>
        <Image
          alt="hamburger menu"
          className={styles.hamburger}
          height={25}
          src={
            prefersDarkMode ? '/hamburger-white.png' : '/hamburger-black.png'
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
