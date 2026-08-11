'use client'

import { Cross } from '@/components/icons/cross'
import { useEffect, useState } from 'react'
import styles from './index.module.css'

// Change this key to update the announcement
const announcementKey = 'announcement-2026-08-11'
const isActiveAnnouncement = true

export default function Announcement() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(announcementKey)
    setVisible(!dismissed)
  }, [])

  const handleClose = () => {
    localStorage.setItem(announcementKey, 'dismissed')
    setVisible(false)
  }

  if (!visible || !isActiveAnnouncement) return null

  return (
    <>
      <div className={styles.spacer} />
      <div className={styles.container}>
        <div className={styles.content}>
          Season 1 starting on August 22nd, 2026!
          <br />
          <small>
            <i>Keep an eye out for updates!</i>
          </small>
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
