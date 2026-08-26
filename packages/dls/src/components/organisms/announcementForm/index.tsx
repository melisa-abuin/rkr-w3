'use client'

import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import Switch from '@/components/atoms/switch'
import Textarea from '@/components/atoms/textarea'
import { useToast } from '@/hooks/useToast'
import { useUpdateAnnouncement } from '@/hooks/useUpdateAnnouncement'
import React, { useState } from 'react'
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
        label="Title"
        name="title"
        placeholder="Announcement title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
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
