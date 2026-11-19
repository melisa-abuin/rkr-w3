'use client'

import Modal from '@/components/atoms/modal'
import FeedbackForm, { type FeedbackData } from './components/feedbackForm'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const handleSubmit = (data: FeedbackData) => {
    console.log(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} title="Leave us a review" onClose={onClose}>
      <FeedbackForm onCancel={onClose} onSubmit={handleSubmit} />
    </Modal>
  )
}
