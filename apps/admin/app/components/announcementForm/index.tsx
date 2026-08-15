'use client'

import Button from '@rkr/dls/components/atoms/button'
import Input from '@rkr/dls/components/atoms/input'
import { useToast } from '@rkr/dls/hooks/useToast'
import { useState } from 'react'
import { useUpdateAnnouncement } from '../../../hooks/useUpdateAnnouncement'
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
  const { mutate, isPending } = useUpdateAnnouncement()
  const { showToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(
      { title, subtitle, isActive },
      {
        onSuccess: () => showToast('Announcement saved.', 'success'),
        onError: () => showToast('Error saving, please try again.'),
      },
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        id="title"
        label="title"
        name="title"
        placeholder="Announcement title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        id="subtitle"
        label="subtitle"
        name="subtitle"
        placeholder="Some description about the announcement"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <div className={styles.field}>
        <label className={styles.label} htmlFor="isActive">
          is active
        </label>
        <Button
          aria-checked={isActive}
          className={`${styles.toggle} ${isActive ? styles.toggleOn : ''}`}
          id="isActive"
          role="switch"
          type="button"
          onClick={() => setIsActive((v) => !v)}
        >
          <span className={styles.toggleThumb} />
        </Button>
      </div>

      <div className={styles.actions}>
        <Button disabled={isPending} loading={isPending} type="submit">
          Save
        </Button>
      </div>
    </form>
  )
}
