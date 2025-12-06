'use client'

import { useCallback, useEffect, useMemo, useState, ReactNode } from 'react'
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
  defaultSortKey: keyof KibbleType
  title?: string
  apiBaseUrl: 'kibbleStats'
  columns: Array<{
    title: string
    key: keyof KibbleType
  }>
  shouldRefetch: boolean
}

interface SortingKey {
  key: keyof KibbleType
  asc: boolean
}

export default function KibbleTableWithControls({
  data,
  defaultSortKey,
  columns,
  apiBaseUrl,
  title,
  headerLink,
  shouldRefetch = false,
}: TableProps) {
  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortingKey>({
    key: defaultSortKey,
    asc: false,
  })

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    params.set('sortKey', sortKey.key)
    params.set('sortOrder', sortKey.asc ? 'asc' : 'desc')
    params.set('filter', apiBaseUrl)

    return params.toString()
  }, [currentPage, sortKey.key, sortKey.asc, apiBaseUrl])

  const syncURL = useCallback(() => {
    window.history.pushState(null, '', `?${queryString}`)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [queryString])

  useEffect(() => {
    hasInteracted && syncURL()
  }, [syncURL, hasInteracted])

  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<{
    pages: number
    stats?: Player[]
  }>(`/api/${apiBaseUrl}?${queryString}`, undefined, {
    enabled: hasInteracted || shouldRefetch,
  })

  useQueryErrorToast(
    error,
    `Couldn't fetch the kibble stats, please try again later.`,
  )

  const handlePageChange = useCallback((page: number) => {
    setHasInteracted(true)
    setCurrentPage(page)
  }, [])

  const handleSortChange = useCallback((newSortKey: keyof KibbleType) => {
    setHasInteracted(true)
    setSortKey((prev) => ({
      key: newSortKey,
      asc: prev.key === newSortKey ? !prev.asc : false,
    }))
  }, [])

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
        highlightedColumn={sortKey.key}
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
