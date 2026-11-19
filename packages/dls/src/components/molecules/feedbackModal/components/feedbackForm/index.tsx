'use client'

import Button from '@/components/atoms/button'
import Dropdown, { type DropdownOption } from '@/components/atoms/dropdown'
import Input from '@/components/atoms/input'
import Textarea from '@/components/atoms/textarea'
import React, { useState } from 'react'
import styles from './index.module.css'

export interface FeedbackData {
  description: string
  name: string
  title: string
  type: string
}

interface FeedbackFormProps {
  isSubmitting?: boolean
  onCancel: () => void
  onSubmit: (data: FeedbackData) => void
}

const typeOptions: DropdownOption[] = [
  { label: 'Feedback', value: 'feedback' },
  { label: 'Bug report', value: 'bug-report' },
  { label: 'Feature request', value: 'feature-request' },
]

export default function FeedbackForm({
  isSubmitting = false,
  onCancel,
  onSubmit,
}: FeedbackFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('Anonymous')
  const [type, setType] = useState(typeOptions[0])

  const canSubmit = title.trim() !== '' && description.trim() !== ''

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (!canSubmit || isSubmitting) return
    onSubmit({
      description: description.trim(),
      name: name.trim(),
      title: title.trim(),
      type: type.value,
    })
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
        maxLength={100}
        name="title"
        placeholder="A short summary"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        id="feedback-description"
        label="Description"
        maxLength={2000}
        name="description"
        placeholder="Tell us more"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input
        id="feedback-name"
        label="Your name"
        maxLength={50}
        name="name"
        placeholder="Anonymous"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className={styles.buttonGroup}>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={!canSubmit} loading={isSubmitting} type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}
