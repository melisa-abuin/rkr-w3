'use client'

import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import TableWithControls from '@/components/organisms/tableWithControls'
import type { Feedback } from '@/interfaces/feedback'
import { usePathname, useRouter } from 'next/navigation'

interface FeedbackTemplateProps {
  columns: Array<{ title: string; key: keyof Feedback }>
  feedback: Feedback[]
  page: number
  totalPages: number
}

export default function FeedbackTemplate({
  columns,
  feedback,
  page,
  totalPages,
}: FeedbackTemplateProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handlePageChange = (nextPage: number) =>
    router.replace(nextPage === 1 ? pathname : `${pathname}?page=${nextPage}`, {
      scroll: false,
    })

  return (
    <PageContainer>
      <PageHeader
        description="Feedback sent by website visitors"
        title="Feedback"
      />
      <PageContainer marginBottom={24} withPadding={false}>
        <TableWithControls<Feedback>
          columns={columns}
          currentPage={page}
          data={{ pages: totalPages, stats: feedback }}
          handlePageChange={handlePageChange}
          title="Latest feedback"
        />
      </PageContainer>
    </PageContainer>
  )
}
