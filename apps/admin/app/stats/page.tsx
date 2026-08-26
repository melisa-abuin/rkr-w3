import { getPageViews } from '@/lib/pageView'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import Table from '@rkr/dls/components/molecules/table'

import {
  pageViewColumns,
  pageViewPageSize,
  pageViewYearMs,
} from '../../constants'

interface PageViewStat {
  route: string
  views: number
  uniqueViews: number
}

async function getPageViewStats(): Promise<PageViewStat[]> {
  const since = new Date(Date.now() - pageViewYearMs)
  return getPageViews(since)
}

export default async function AdminPage() {
  const pageViewStats = await getPageViewStats()

  return (
    <main>
      <PageContainer>
        <PageHeader
          description="Overview of the main website statistics"
          title="Main Website Stats"
        />

        <PageContainer marginBottom={24} withPadding={false}>
          <Table<PageViewStat>
            columns={pageViewColumns}
            data={pageViewStats.slice(0, pageViewPageSize)}
            pageSize={pageViewPageSize}
            title="Page Views (Last 12 Months)"
          />
        </PageContainer>
      </PageContainer>
    </main>
  )
}
