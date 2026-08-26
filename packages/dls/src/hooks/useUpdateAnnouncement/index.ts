import { useState } from 'react'

interface AnnouncementPayload {
  title: string
  subtitle: string
  isActive: boolean
}

interface MutateOptions {
  onSuccess?: () => void
  onError?: () => void
}

export const useUpdateAnnouncement = () => {
  const [isPending, setIsPending] = useState(false)

  const mutate = async (
    payload: AnnouncementPayload,
    { onSuccess, onError }: MutateOptions = {},
  ) => {
    setIsPending(true)
    try {
      const res = await fetch('/api/announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      onSuccess?.()
    } catch {
      onError?.()
    } finally {
      setIsPending(false)
    }
  }

  return { mutate, isPending }
}
