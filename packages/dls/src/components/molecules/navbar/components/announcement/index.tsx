'use client'

import { Cross } from '@/components/icons/cross'
import { useEffect, useState } from 'react'
import styles from './index.module.css'

interface AnnouncementProps {
  title: string
  subtitle: string
  isActive: boolean
}

export default function Announcement({
  title,
  subtitle,
  isActive,
}: AnnouncementProps) {
  const storageKey = `announcement-${title.substring(0, 40)}`
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey)
    setVisible(!dismissed)
  }, [storageKey])

  const handleClose = () => {
    localStorage.setItem(storageKey, 'dismissed')
    setVisible(false)
  }

  if (!visible || !isActive || !title) return null

  return (
    <>
      <div className={styles.spacer} />
      <div className={styles.container}>
        <div className={styles.content}>
          {title}
          {subtitle && (
            <>
              <br />
              <small>
                <i>{subtitle}</i>
              </small>
            </>
          )}
        </div>
        <button
          aria-label="Close announcement"
          className={styles.crossContainer}
          type="button"
          onClick={handleClose}
        >
          <Cross fill="currentColor" height={16} width={16} />
        </button>
      </div>
    </>
  )
}
