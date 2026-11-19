'use client'

import Button from '@/components/atoms/button'
import Dropdown, { type DropdownOption } from '@/components/atoms/dropdown'
import Input from '@/components/atoms/input'
import Textarea from '@/components/atoms/textarea'
import React, { useState } from 'react'
import styles from './index.module.css'

export interface FeedbackData {
  description: string
  title: string
  type: string
}

interface FeedbackFormProps {
  onCancel: () => void
  onSubmit: (data: FeedbackData) => void
}

const typeOptions: DropdownOption[] = [
  { label: 'Feedback', value: 'feedback' },
  { label: 'Bug report', value: 'bug-report' },
  { label: 'Feature request', value: 'feature-request' },
]

export default function FeedbackForm({
  onCancel,
  onSubmit,
}: FeedbackFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState(typeOptions[0])

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    onSubmit({ description, title, type: type.value })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <Dropdown
          label="Type"
          defaultOption={type}
          options={typeOptions}
          onSelect={setType}
        />
      </div>

      <Input
        id="feedback-title"
        label="Title"
        name="title"
        placeholder="A short summary"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        id="feedback-description"
        label="Description"
        name="description"
        placeholder="Tell us more"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className={styles.buttonGroup}>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
