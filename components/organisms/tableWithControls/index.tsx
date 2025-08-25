'use client'

import { Player } from '@/interfaces/player'
import { useSearchParams } from 'next/navigation'
import { useState, useMemo, useEffect, useCallback, ReactNode } from 'react'
import { difficultyNames } from '@/constants'
import { Difficulty } from '@/interfaces/difficulty'
import Table from '@/components/molecules/table'
import Badges from '@/components/molecules/badges'
import Pagination from '@/components/molecules/pagination'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'

interface TableProps {
  data: { pages: number; stats?: Player[] }
  headerLink?: ReactNode
  defaultSortKey: keyof Player
  title?: string
  apiBaseUrl: 'times' | 'stats'
  columns: Array<{
    title: string
    key: keyof Player
  }>
}

interface SortingKey {
  key: keyof Player
  asc: boolean
}

export default function TableWithControls({
  data,
  defaultSortKey,
  columns,
  apiBaseUrl,
  title,
  headerLink,
}: TableProps) {
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams?.get('page') || '1', 10)
  const initialFilter = searchParams?.get('difficulty') as
    | Difficulty
    | undefined
  const initialSortKey =
    (searchParams?.get('sortKey') as keyof Player) || defaultSortKey
  const initialSortOrder = searchParams?.get('sortOrder') === 'asc'

  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >(initialFilter)
  const [sortKey, setSortKey] = useState<SortingKey>({
    key: initialSortKey,
    asc: initialSortOrder,
  })

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    if (difficultyFilter) params.set('difficulty', difficultyFilter)
    params.set('sortKey', sortKey.key)
    params.set('sortOrder', sortKey.asc ? 'asc' : 'desc')
    return params.toString()
  }, [currentPage, difficultyFilter, sortKey])

  const syncURL = useCallback(() => {
    window.history.pushState(null, '', `?${queryString}`)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [queryString])

  useEffect(() => {
    syncURL()
  }, [syncURL])

  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<{ pages: number; stats?: Player[] }>(
    `/api/${apiBaseUrl}?${queryString}`,
    undefined,
    { enabled: hasInteracted },
  )
  console.log(isFetching)
  useQueryErrorToast(error, `Couldn't fetch the stats, please try again later.`)

  const handlePageChange = useCallback((page: number) => {
    setHasInteracted(true)
    setCurrentPage(page)
  }, [])

  const handleSortChange = useCallback((newSortKey: keyof Player) => {
    setHasInteracted(true)
    setSortKey((prev) => ({
      key: newSortKey,
      asc: prev.key === newSortKey ? !prev.asc : false,
    }))
  }, [])

  const handleFilterChange = useCallback((difficulty?: Difficulty) => {
    setHasInteracted(true)
    setDifficultyFilter(difficulty)
    setCurrentPage(1)
  }, [])

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
        highlightedColumn={sortKey.key}
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
