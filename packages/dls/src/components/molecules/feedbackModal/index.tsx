'use client'

import Modal from '@/components/atoms/modal'
import { useSubmitFeedback } from '@/hooks/useSubmitFeedback'
import { useToast } from '@/hooks/useToast'
import FeedbackForm, { type FeedbackData } from './components/feedbackForm'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const { showToast } = useToast()
  const { mutate, isPending } = useSubmitFeedback()

  const handleSubmit = (data: FeedbackData) => {
    mutate(data, {
      onSuccess: () => {
        showToast('Thanks for your feedback!', 'success')
        onClose()
      },
      onError: () => {
        showToast('Could not send your feedback, please try again later.')
      },
    })
  }

  return (
    <Modal isOpen={isOpen} title="Leave us a review" onClose={onClose}>
      <FeedbackForm
        isSubmitting={isPending}
        onCancel={onClose}
        onSubmit={handleSubmit}
      />
    </Modal>
  )
}
