'use client'

import Link from '@/components/atoms/link'
import FeedbackModal from '@/components/molecules/feedbackModal'
import { blizzardLink, footerColumns } from '@/constants'
import Image from 'next/image'
import { useState } from 'react'
import styles from './index.module.css'

export default function Footer() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

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
          {footerColumns.map(({ links, title }) => (
            <nav key={title} aria-label={title} className={styles.column}>
              <h3 className={styles.columnTitle}>{title}</h3>
              <ul className={styles.list}>
                {links.map(({ action, external, href, label }) => (
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
                        onClick={
                          action === 'openFeedback'
                            ? () => setIsFeedbackOpen(true)
                            : undefined
                        }
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
