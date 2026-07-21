import { useEffect } from 'react'
import { useToast } from '../useToast'

export const useQueryErrorToast = (error: unknown, context?: string) => {
  const { showToast } = useToast()

  useEffect(() => {
    if (error) {
      showToast(
        `An error occurred${context ? ` while ${context}` : ''}, please try again later.`,
      )
    }
  }, [error, showToast, context])
}
