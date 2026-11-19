export interface Feedback {
  id: number
  type: string
  title: string
  description: string
  name: string
  status: string
  createdAt: string
}

export interface FeedbackPage {
  feedbacks: Feedback[]
  page: number
  totalPages: number
}
