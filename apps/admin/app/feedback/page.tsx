import { requireUser } from '@/lib/auth'
import { getFeedbackPage } from '@/lib/feedback'
import FeedbackTemplate from '@rkr/dls/components/templates/feedbackTemplate'
import type { Metadata } from 'next'
import { feedbackColumns } from '../../constants'

export const metadata: Metadata = {
  title: 'Feedback',
}

interface FeedbackPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function FeedbackPage({
  searchParams,
}: FeedbackPageProps) {
  await requireUser()

  const { page: pageParam } = await searchParams
  const requestedPage = Math.max(
    1,
    Math.floor(Number(Array.isArray(pageParam) ? pageParam[0] : pageParam)) ||
      1,
  )
  const { feedback, page, totalPages } = await getFeedbackPage(requestedPage)

  return (
    <main>
      <FeedbackTemplate
        columns={feedbackColumns}
        feedback={feedback}
        page={page}
        totalPages={totalPages}
      />
    </main>
  )
}
