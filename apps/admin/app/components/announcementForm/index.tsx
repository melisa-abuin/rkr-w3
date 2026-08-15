'use client'

import { useState } from 'react'
import styles from './index.module.css'

interface AnnouncementFormProps {
  initialTitle: string
  initialSubtitle: string
  initialIsActive: boolean
}

export default function AnnouncementForm({
  initialTitle,
  initialSubtitle,
  initialIsActive,
}: AnnouncementFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [subtitle, setSubtitle] = useState(initialSubtitle)
  const [isActive, setIsActive] = useState(initialIsActive)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    'idle',
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('saving')
    try {
      const res = await fetch('/api/announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subtitle, isActive }),
      })
      setStatus(res.ok ? 'saved' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          title
        </label>
        <input
          className={styles.input}
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="subtitle">
          subtitle
        </label>
        <input
          className={styles.input}
          id="subtitle"
          name="subtitle"
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="isActive">
          is active
        </label>
        <button
          aria-checked={isActive}
          className={`${styles.toggle} ${isActive ? styles.toggleOn : ''}`}
          id="isActive"
          role="switch"
          type="button"
          onClick={() => setIsActive((v) => !v)}
        >
          <span className={styles.toggleThumb} />
        </button>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.saveButton}
          disabled={status === 'saving'}
          type="submit"
        >
          {status === 'saving' ? 'Saving...' : 'Save'}
        </button>
        {status === 'saved' && (
          <span className={styles.statusSaved}>Saved!</span>
        )}
        {status === 'error' && (
          <span className={styles.statusError}>Error saving.</span>
        )}
      </div>
    </form>
  )
}
