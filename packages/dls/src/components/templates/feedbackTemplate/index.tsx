import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import Table from '@/components/molecules/table'
import type { Feedback } from '@/interfaces/feedback'
import FeedbackPagination from './components/feedbackPagination'

interface FeedbackTemplateProps {
  columns: Array<{ title: string; key: keyof Feedback }>
  feedbacks: Feedback[]
  page: number
  pageSize: number
  totalPages: number
}

export default function FeedbackTemplate({
  columns,
  feedbacks,
  page,
  pageSize,
  totalPages,
}: FeedbackTemplateProps) {
  return (
    <PageContainer>
      <PageHeader
        description="Feedback sent by website visitors"
        title="Feedback"
      />
      <PageContainer marginBottom={24} withPadding={false}>
        <Table<Feedback>
          columns={columns}
          data={feedbacks}
          pageSize={pageSize}
          title="Latest feedback"
        />
        <FeedbackPagination currentPage={page} totalPages={totalPages} />
      </PageContainer>
    </PageContainer>
  )
}
