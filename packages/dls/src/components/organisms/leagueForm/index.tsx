'use client'

import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import RichTextEditor from '@/components/atoms/richTextEditor'
import Switch from '@/components/atoms/switch'
import { useApiMutation } from '@/hooks/useApiMutation'
import { useToast } from '@/hooks/useToast'
import { useState } from 'react'
import styles from './index.module.css'

interface LeagueFormProps {
  initialTitle: string
  initialContent: string
  initialIsActive: boolean
}

export default function LeagueForm({
  initialTitle,
  initialContent,
  initialIsActive,
}: LeagueFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [isActive, setIsActive] = useState(initialIsActive)
  const { mutate, isPending } = useApiMutation<{
    title: string
    content: string
    isActive: boolean
  }>('/api/league')
  const { showToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(
      { title, content, isActive },
      {
        onSuccess: () => showToast('League info saved.', 'success'),
        onError: () => showToast('Error saving, please try again.'),
      },
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        id="leagueTitle"
        label="Title"
        name="leagueTitle"
        placeholder="League title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <RichTextEditor
        id="leagueContent"
        label="Content"
        value={content}
        onChange={setContent}
      />

      <Switch
        checked={isActive}
        id="leagueIsActive"
        label="Is active"
        name="leagueIsActive"
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
