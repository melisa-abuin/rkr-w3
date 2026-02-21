'use client'

import { ReactNode } from 'react'
import { difficultyNames } from '@/constants'
import Table from '@/components/molecules/table'
import Badges from '@/components/molecules/badges'
import Pagination from '@/components/molecules/pagination'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { Difficulty } from '@/interfaces/difficulty'

interface TableProps<T> {
  data: { pages: number; stats?: T[] }
  headerLink?: ReactNode
  sortKey: keyof T
  title?: string
  apiBaseUrl: 'times' | 'stats' | 'kibbleStats'
  shouldRefetch: boolean
  columns: Array<{
    title: string
    key: keyof T
  }>
  currentPage: number
  queryString: string | null
  handleSortChange: (columnKey: keyof T) => void
  handlePageChange: (page: number) => void
  handleFilterChange: () => void
  difficultyFilter?: Difficulty | undefined
  withDifficultyFilter?: boolean
}

export default function TableWithControls<T>({
  data,
  sortKey,
  columns,
  apiBaseUrl,
  title,
  headerLink,
  shouldRefetch = false,
  handlePageChange,
  handleSortChange,
  handleFilterChange,
  queryString,
  currentPage,
  difficultyFilter,
  withDifficultyFilter,
}: TableProps<T>) {
  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<{ pages: number; stats?: T[] }>(
    `/api/${apiBaseUrl}?${queryString}`,
    undefined,
    { enabled: shouldRefetch },
  )

  useQueryErrorToast(error, `Couldn't fetch the stats, please try again later.`)

  const rows = filteredData?.stats as unknown[] | undefined
  const hasKibbles =
    rows?.[0] && typeof rows[0] === 'object' && 'kibbles' in rows[0]
  const formattedQueryResult = hasKibbles
    ? (rows?.map((elem) => {
        const player = elem as {
          battleTag: unknown
          kibbles: Record<string, unknown>
        }

        return {
          battleTag: player.battleTag,
          ...player.kibbles,
        }
      }) as T[])
    : filteredData?.stats

  return (
    <>
      <Table
        columns={columns}
        data={formattedQueryResult ?? data.stats}
        pageSize={15}
        filters={
          withDifficultyFilter && (
            <Badges
              onClick={handleFilterChange}
              options={difficultyNames}
              selected={difficultyFilter}
            />
          )
        }
        headerLink={headerLink}
        highlightedColumn={sortKey}
        loading={isFetching}
        difficultyFilter={difficultyFilter}
        title={title}
        onTableSort={handleSortChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={filteredData?.pages ?? data.pages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
