import CardsContainer from '@/components/atoms/cardsContainer'
import type { DropdownOption } from '@/components/atoms/dropdown'
import PageContainer from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import ValueWithDescription from '@/components/atoms/valueWithDescription'
import Table from '@/components/molecules/table'
import type { PageViewStat, PageViewSummary } from '@/interfaces/pageView'
import PageViewFilters from './components/pageViewFilters'
import PageViewPagination from './components/pageViewPagination'

interface PageViewsTemplateProps {
  columns: Array<{ title: string; key: keyof PageViewStat }>
  monthLabel: string
  monthOptions: DropdownOption[]
  page: number
  pageSize: number
  stats: PageViewStat[]
  summary: PageViewSummary
  totalPages: number
}

const formatNumber = (value: number) => value.toLocaleString('en-US')

export default function PageViewsTemplate({
  columns,
  monthLabel,
  monthOptions,
  page,
  pageSize,
  stats,
  summary,
  totalPages,
}: PageViewsTemplateProps) {
  return (
    <PageContainer>
      <PageHeader description="Main website page views" title="RKR Stats" />
      <PageContainer marginBottom={24} withPadding={false}>
        <PageViewFilters monthOptions={monthOptions} />
        <CardsContainer title={`Total views - ${monthLabel}`}>
          <ValueWithDescription
            description="Total views"
            value={formatNumber(summary.totalViews)}
          />
          <ValueWithDescription
            description="Human views"
            value={formatNumber(summary.humanViews)}
          />
          <ValueWithDescription
            description="Bot views"
            value={formatNumber(summary.botViews)}
          />
          <ValueWithDescription
            description="Unique visitors"
            value={formatNumber(summary.uniqueVisitors)}
          />
        </CardsContainer>
      </PageContainer>
      <PageContainer marginBottom={24} withPadding={false}>
        <Table<PageViewStat>
          columns={columns}
          data={stats}
          pageSize={pageSize}
          title={`Page views by route - ${monthLabel}`}
        />
        <PageViewPagination currentPage={page} totalPages={totalPages} />
      </PageContainer>
    </PageContainer>
  )
}
