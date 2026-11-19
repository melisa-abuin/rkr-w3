'use client'

import Link from '@/components/atoms/link'
import FeedbackModal from '@/components/molecules/feedbackModal'
import {
  blizzardLink,
  discordJoinLink,
  gameRepositoryLink,
  githubReadMeLink,
  wc3MapsLink,
} from '@/constants'
import Image from 'next/image'
import { useState } from 'react'
import styles from './index.module.css'

interface FooterLink {
  external?: boolean
  href?: string
  label: string
  onClick?: () => void
}

interface FooterColumn {
  links: FooterLink[]
  title: string
}

export default function Footer() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  const columns: FooterColumn[] = [
    {
      title: 'Community',
      links: [
        { external: true, href: discordJoinLink, label: 'Join our Discord' },
        { external: true, href: wc3MapsLink, label: 'Find the map on WC3Maps' },
        { label: 'Feedback', onClick: () => setIsFeedbackOpen(true) },
      ],
    },
    {
      title: 'Open source',
      links: [
        { external: true, href: gameRepositoryLink, label: 'Game repository' },
        {
          external: true,
          href: githubReadMeLink,
          label: 'Contribute to the website',
        },
      ],
    },
  ]

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.content}>
        <Image
          aria-hidden
          alt=""
          className={styles.icon}
          height={48}
          src="/minimap-icon.png"
          width={48}
        />
        <div className={styles.columns}>
          {columns.map(({ links, title }) => (
            <nav key={title} aria-label={title} className={styles.column}>
              <h3 className={styles.columnTitle}>{title}</h3>
              <ul className={styles.list}>
                {links.map(({ external, href, label, onClick }) => (
                  <li key={label}>
                    {href ? (
                      <Link
                        color="primary"
                        href={href}
                        rel={external ? 'noopener noreferrer' : undefined}
                        target={external ? '_blank' : '_self'}
                      >
                        {label}
                      </Link>
                    ) : (
                      <button
                        className={styles.linkButton}
                        type="button"
                        onClick={onClick}
                      >
                        {label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <hr className={styles.divider} />
        <p className={styles.legal}>
          Warcraft is ©2025 by{' '}
          <Link
            color="primary"
            href={blizzardLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            Blizzard Entertainment
          </Link>
        </p>
        <p className={styles.legal}>
          Uicons by{' '}
          <Link
            color="primary"
            href="https://www.flaticon.com/uicons"
            rel="noopener noreferrer"
            target="_blank"
          >
            Flaticon
          </Link>
        </p>
      </div>
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </footer>
  )
}
