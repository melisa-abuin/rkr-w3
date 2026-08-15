'use client'

import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import Switch from '@/components/atoms/switch'
import type { AnnouncementData } from '@/interfaces/announcement'
import React, { useState } from 'react'
import styles from './index.module.css'

interface AnnouncementFormProps {
  initialTitle: string
  initialSubtitle: string
  initialIsActive: boolean
  isPending: boolean
  onSubmit: (data: AnnouncementData) => void
}

export default function AnnouncementForm({
  initialTitle,
  initialSubtitle,
  initialIsActive,
  isPending,
  onSubmit,
}: AnnouncementFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [subtitle, setSubtitle] = useState(initialSubtitle)
  const [isActive, setIsActive] = useState(initialIsActive)

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    onSubmit({ title, subtitle, isActive })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        id="title"
        label="Title"
        name="title"
        placeholder="Announcement title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        id="subtitle"
        label="Subtitle"
        name="subtitle"
        placeholder="Some description about the announcement"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <Switch
        checked={isActive}
        id="isActive"
        label="Is active"
        name="isActive"
        onChange={(e) => setIsActive(e.target.checked)}
      />

      <div className={styles.actions}>
        <Button disabled={isPending} loading={isPending} type="submit">
          Save
        </Button>
      </div>
    </form>
  )
}
