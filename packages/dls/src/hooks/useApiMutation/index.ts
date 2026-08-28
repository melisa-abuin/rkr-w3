import { useState } from 'react'

interface MutateOptions {
  onSuccess?: () => void
  onError?: () => void
}

export const useApiMutation = <T extends object>(endpoint: string) => {
  const [isPending, setIsPending] = useState(false)

  const mutate = async (
    payload: T,
    { onSuccess, onError }: MutateOptions = {},
  ) => {
    setIsPending(true)
    try {
      const res = await fetch(endpoint, {
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
