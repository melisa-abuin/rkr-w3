'use client'

import { Player } from '@/interfaces/player'
import { ReactNode } from 'react'
import { difficultyNames } from '@/constants'
import Table from '@/components/molecules/table'
import Badges from '@/components/molecules/badges'
import Pagination from '@/components/molecules/pagination'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { Difficulty } from '@/interfaces/difficulty'

interface TableProps {
  data: { pages: number; stats?: Player[] }
  headerLink?: ReactNode
  sortKey: keyof Player
  title?: string
  apiBaseUrl: 'times' | 'stats'
  shouldRefetch: boolean
  columns: Array<{
    title: string
    key: keyof Player
  }>
  currentPage: number
  queryString: string | null
  handleSortChange: (columnKey: keyof Player) => void
  handlePageChange: (page: number) => void
  handleFilterChange: () => void
  difficultyFilter?: Difficulty | undefined
}

export default function TableWithControls({
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
}: TableProps) {
  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<{ pages: number; stats?: Player[] }>(
    `/api/${apiBaseUrl}?${queryString}`,
    undefined,
    { enabled: shouldRefetch },
  )

  useQueryErrorToast(error, `Couldn't fetch the stats, please try again later.`)

  return (
    <>
      <Table
        columns={columns}
        data={filteredData?.stats ?? data.stats}
        pageSize={15}
        filters={
          <Badges
            onClick={handleFilterChange}
            options={difficultyNames}
            selected={difficultyFilter}
          />
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
