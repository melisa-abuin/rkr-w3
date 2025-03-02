'use client'

import { PlayersStats, PlayerStats } from '@/interfaces/player'
import Table from '../table'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState, useCallback, ReactNode } from 'react'
import Pagination from './components/pagination'
import { difficultyNames, pageSize } from '@/constants'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'
import Badges from '../atoms/badges'
import { Difficulty } from '@/interfaces/difficulty'

interface TableProps {
  data?: PlayersStats
  headerLink?: ReactNode
  defaultSortKey: keyof PlayerStats
  loading?: boolean
  title?: string
  columns: Array<{
    title: string
    key: keyof PlayerStats
  }>
}

interface SortingKey {
  key: keyof PlayerStats
  asc: boolean
}

export default function TableWithControls({
  data,
  defaultSortKey,
  loading = false,
  columns,
  title,
  headerLink,
}: TableProps) {
  const totalPages = data ? Math.ceil(data?.length / pageSize) : 0
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams?.get('page') || '1', 10)
  const initialFilter = searchParams?.get('difficulty') as Difficulty
  const initialSortData = {
    key: (searchParams?.get('sortKey') as keyof PlayerStats) || defaultSortKey,
    asc: searchParams?.get('sortOrder') === 'asc',
  }

  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >(initialFilter)
  const [sortKey, setSortKey] = useState<SortingKey>(initialSortData)

  const updateURL = useCallback(
    (page: number, difficulty?: Difficulty, sort?: SortingKey) => {
      const queryParams = new URLSearchParams()
      queryParams.set('page', page.toString())
      if (difficulty) queryParams.set('difficulty', difficulty)
      if (sort) {
        queryParams.set('sortKey', sort.key)
        queryParams.set('sortOrder', sort.asc ? 'asc' : 'desc')
      }
      window.history.pushState(null, '', `?${queryParams.toString()}`)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    },
    [],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      updateURL(page, difficultyFilter, sortKey)
    },
    [difficultyFilter, sortKey, updateURL],
  )

  const handleSortChange = useCallback(
    (sort: keyof PlayerStats) => {
      const newSortKey = {
        key: sort,
        asc: sortKey.key === sort ? !sortKey.asc : false,
      }
      setSortKey(newSortKey)
      updateURL(currentPage, difficultyFilter, newSortKey)
    },
    [currentPage, difficultyFilter, updateURL, sortKey],
  )

  const handleFilterChange = useCallback(
    (difficulty?: Difficulty) => {
      setDifficultyFilter(difficulty)
      updateURL(currentPage, difficulty, sortKey)
    },
    [currentPage, sortKey, updateURL],
  )

  const dataToShow = useMemo(() => {
    if (!data) return []
    const initialIndex = (Number(currentPage) - 1) * pageSize

    const sortedData = [...data].sort((a, b) => {
      const condition = getSortConditionByKey(
        sortKey.key,
        a,
        b,
        difficultyFilter,
      )
      if (condition === undefined) return 0
      return sortKey.asc ? (condition ? 1 : -1) : condition ? -1 : 1
    })

    return sortedData.slice(initialIndex, initialIndex + pageSize)
  }, [data, currentPage, sortKey, difficultyFilter])

  return (
    <>
      <Table
        columns={columns}
        data={dataToShow}
        filters={
          <Badges
            onClick={handleFilterChange}
            options={difficultyNames}
            selected={difficultyFilter}
          />
        }
        headerLink={headerLink}
        highlightedColumn={sortKey.key}
        loading={loading}
        difficultyFilter={difficultyFilter}
        title={title}
        onTableSort={handleSortChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
