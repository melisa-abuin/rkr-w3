'use client'

import { Cross } from '@/components/icons/cross'
import { useState } from 'react'
import styles from './index.module.css'

// Change this key to update the announcement
const announcementKey = 'announcement-2025-08-19'
const isActiveAnnouncement = true

export default function Announcement() {
  const [visible, setVisible] = useState(
    localStorage.getItem(announcementKey) ? false : true,
  )

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
          Save the date! <strong>Summer Team Tournament </strong>on Saturday,
          August 9th, 2025
          <br />
          <small>
            <i>
              {' '}
              20:00 CEST on European servers and 8:00pm Eastern on US East
              servers
            </i>
          </small>
        </div>
        <button
          aria-label="Close announcement"
          className={styles.crossContainer}
          type="button"
          onClick={handleClose}
        >
          <Cross fill="#fff" height={16} width={16} />
        </button>
      </div>
    </>
  )
}
