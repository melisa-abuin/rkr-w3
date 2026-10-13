import { requireUser } from '@/lib/auth'
import { getPageViews } from '@/lib/pageView'
import { getMonthOptions } from '@/utils/getMonthOptions'
import { parsePageViewFilters } from '@/utils/parsePageViewFilters'
import PageViewsTemplate from '@rkr/dls/components/templates/pageViewsTemplate'
import type { Metadata } from 'next'
import { pageViewColumns, pageViewPageSize } from '../../constants'

export const metadata: Metadata = {
  title: 'Admin - Stats',
}

interface StatsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

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
      <PageViewsTemplate
        columns={pageViewColumns}
        monthLabel={monthLabel}
        monthOptions={monthOptions}
        page={page}
        pageSize={pageViewPageSize}
        stats={stats}
        summary={summary}
        totalPages={totalPages}
      />
    </main>
  )
}
