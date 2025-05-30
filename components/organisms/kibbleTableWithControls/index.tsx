'use client'

import { useState, useCallback, ReactNode } from 'react'
import Pagination from '@/components/molecules/pagination'
import Table from '@/components/molecules/table'
import { BattleTag, Kibbles } from '@/interfaces/player'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { useSearchParams } from 'next/navigation'

type KibbleType = Kibbles & {
  battleTag: BattleTag
}

interface TableProps {
  data: { pages: number; stats?: KibbleType[] }
  headerLink?: ReactNode
  defaultSortKey: keyof KibbleType
  title?: string
  apiBaseUrl: 'kibbleStats'
  columns: Array<{
    title: string
    key: keyof KibbleType
  }>
}

export default function KibbleTableWithControls({
  data,
  defaultSortKey,
  columns,
  apiBaseUrl,
  title,
  headerLink,
}: TableProps) {
  const params = useSearchParams()

  const [queryParams, setQueryParams] = useState(new URLSearchParams())

  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<{
    pages: number
    stats?: KibbleType[]
  }>(`/api/${apiBaseUrl}?${queryParams.toString()}`, undefined, {
    enabled: queryParams.size > 0,
  })

  console.log(queryParams.toString(), filteredData, params)

  useQueryErrorToast(
    error,
    `Couldn't fetch the kibble stats, please try again later.`,
  )

  const updateURL = useCallback(
    (page?: number, sortKey?: string, sortOrder?: boolean) => {
      page && queryParams.set('page', page.toString())
      sortKey && queryParams.set('sortKey', sortKey)
      sortOrder && queryParams.set('sortOrder', sortOrder ? 'asc' : 'desc')

      window.history.pushState(null, '', `?${queryParams.toString()}`)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

      setQueryParams(queryParams)
    },
    [queryParams],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      updateURL(page)
    },
    [updateURL],
  )

  const handleSortChange = useCallback(
    (sort: keyof KibbleType) => {
      updateURL(undefined, sort, queryParams.get('sortKey') === sort)
    },
    [updateURL, queryParams],
  )

  return (
    <>
      <Table
        columns={columns}
        data={
          filteredData
            ? filteredData?.stats?.map((elem) => ({
                battleTag: elem.battleTag,
                ...elem.kibbles,
              }))
            : data.stats
        }
        pageSize={15}
        headerLink={headerLink}
        highlightedColumn={queryParams?.get('sortKey') || defaultSortKey}
        loading={isFetching}
        title={title}
        onTableSort={handleSortChange}
      />
      <Pagination
        currentPage={Number(params?.get('page'))}
        totalPages={data?.pages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
