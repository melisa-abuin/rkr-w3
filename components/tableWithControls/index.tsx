'use client'

import { PlayersStats, PlayerStats } from '@/interfaces/player'
import Table from '../table'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState, ReactNode } from 'react'
import Pagination from './pagination'
import { pageSize } from '@/constants'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'
import { Badges } from './badges'
import { Difficulty } from '@/interfaces/difficulty'

interface TableProps {
  data?: PlayersStats
  headerLink?: ReactNode
  defaultSortKey: keyof PlayerStats
  loading?: boolean
  title: string
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
  // TODO: create custom hooks
  const totalPages = data ? Math.round(data?.length / pageSize) : 0
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams?.get('page') || '1', 10)
  const initialFilter = searchParams?.get('difficulty') as Difficulty
  const initialSortData = {
    key: (searchParams?.get('sortKey') as keyof PlayerStats) || defaultSortKey,
    asc: !!searchParams?.get('sortOrder') || false,
  }

  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >(initialFilter)

  const [sortKey, setSortKey] = useState<SortingKey>(initialSortData)

  useEffect(() => {
    const queryParams = new URLSearchParams()

    queryParams.set('page', currentPage.toString())

    if (difficultyFilter) {
      queryParams.set('difficulty', difficultyFilter)
    }

    if (sortKey) {
      queryParams.set('sortKey', sortKey.key)
      queryParams.set('sortOrder', sortKey.asc ? 'asc' : 'desc')
    }

    window.history.pushState(null, '', `?${queryParams.toString()}`)

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [currentPage, router, difficultyFilter, sortKey])

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
            onClick={setDifficultyFilter}
            options={['normal', 'hard', 'impossible', 'all']}
            selected={difficultyFilter}
          />
        }
        headerLink={headerLink}
        highlightedColumn={sortKey.key}
        loading={loading}
        difficultyFilter={difficultyFilter}
        onTableSort={setSortKey}
        title={title}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  )
}
