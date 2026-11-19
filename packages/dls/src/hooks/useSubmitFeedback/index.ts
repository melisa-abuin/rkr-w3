import { useMutation } from '@tanstack/react-query'

export interface FeedbackPayload {
  description: string
  name: string
  title: string
  type: string
}

export const useSubmitFeedback = () =>
  useMutation({
    mutationFn: async (payload: FeedbackPayload) => {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Feedback failed: ${response.status}`)
      }
    },
  })
