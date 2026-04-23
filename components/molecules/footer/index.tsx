'use client'

import { blizzardLink, githubReadMeLink } from '@/constants'
import styles from './index.module.css'
import Link from '@/components/atoms/link'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <p>This is a non-profit project developed and maintained by Aches</p>
      <p>
        Warcraft is ©2025 by{' '}
        <Link
          color="brandSecondary"
          href={blizzardLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          Blizzard Entertainment
        </Link>
      </p>
      <p>
        This website is an open-source project created by Melisa, learn{' '}
        <Link
          color="brandSecondary"
          href={githubReadMeLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          how to contribute
        </Link>
      </p>
      <p>
        Uicons by{' '}
        <Link
          color="brandSecondary"
          href="https://www.flaticon.com/uicons"
          rel="noopener noreferrer"
          target="_blank"
        >
          Flaticon
        </Link>
      </p>
    </footer>
  )
}
