import type { PageViewStat } from '@/interfaces/pageView'
import { requireUser } from '@/lib/auth'
import { getPageViews } from '@/lib/pageView'
import { getMonthOptions } from '@/utils/getMonthOptions'
import { parsePageViewFilters } from '@/utils/parsePageViewFilters'
import CardsContainer from '@rkr/dls/components/atoms/cardsContainer'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import ValueWithDescription from '@rkr/dls/components/atoms/valueWithDescription'
import Table from '@rkr/dls/components/molecules/table'
import type { Metadata } from 'next'
import { pageViewColumns, pageViewPageSize } from '../../constants'
import PageViewFilters from './components/pageViewFilters'
import PageViewPagination from './components/pageViewPagination'

export const metadata: Metadata = {
  title: 'Admin - Stats',
}

interface StatsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const formatNumber = (value: number) => value.toLocaleString('en-US')

export default async function StatsPage({ searchParams }: StatsPageProps) {
  await requireUser()

  const filters = parsePageViewFilters(await searchParams)
  const monthOptions = getMonthOptions(new Date())
  const monthLabel =
    monthOptions.find(({ value }) => value === filters.month)?.label ??
    filters.month
  const { stats, summary, page, totalPages } = await getPageViews(filters)

  return (
    <main>
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
            columns={pageViewColumns}
            data={stats}
            pageSize={pageViewPageSize}
            title={`Page views by route - ${monthLabel}`}
          />
          <PageViewPagination currentPage={page} totalPages={totalPages} />
        </PageContainer>
      </PageContainer>
    </main>
  )
}
