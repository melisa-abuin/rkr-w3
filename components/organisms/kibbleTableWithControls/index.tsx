'use client'

import { ReactNode } from 'react'
import Pagination from '@/components/molecules/pagination'
import Table from '@/components/molecules/table'
import { BattleTag, Kibbles, Player } from '@/interfaces/player'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

type KibbleType = Kibbles & {
  battleTag: BattleTag
}

interface TableProps {
  data: { pages: number; stats?: KibbleType[] }
  headerLink?: ReactNode
  sortKey: keyof KibbleType
  title?: string
  apiBaseUrl: 'kibbleStats'
  columns: Array<{
    title: string
    key: keyof KibbleType
  }>
  shouldRefetch: boolean
  currentPage: number
  queryString: string | null
  handleSortChange: (columnKey: keyof Kibbles | 'battleTag') => void
  handlePageChange: (page: number) => void
}

export default function KibbleTableWithControls({
  data,
  sortKey,
  columns,
  apiBaseUrl,
  title,
  headerLink,
  shouldRefetch = false,
  handlePageChange,
  handleSortChange,
  queryString,
  currentPage,
}: TableProps) {
  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<{
    pages: number
    stats?: Player[]
  }>(`/api/${apiBaseUrl}?${queryString}`, undefined, {
    enabled: shouldRefetch,
  })

  useQueryErrorToast(
    error,
    `Couldn't fetch the kibble stats, please try again later.`,
  )

  return (
    <>
      <Table
        columns={columns}
        data={
          filteredData
            ? (filteredData?.stats?.map((elem) => ({
                battleTag: elem.battleTag,
                ...elem.kibbles,
              })) as KibbleType[])
            : data.stats
        }
        pageSize={15}
        headerLink={headerLink}
        highlightedColumn={sortKey}
        loading={isFetching}
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
