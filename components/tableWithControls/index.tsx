'use client'

import { PlayersStats, PlayerStats } from '@/interfaces/player'
import Table from '../table'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import Pagination from './pagination'
import { pageSize } from '@/constants'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'
import { Badges } from './badges'
import { Difficulty } from '@/interfaces/difficulty'

interface TableProps {
  data?: PlayersStats
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
  loading = false,
  columns,
  title,
}: TableProps) {
  const totalPages = data ? Math.round(data?.length / pageSize) : 0
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams?.get('page') || '1', 10)

  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | undefined
  >()

  const [sortKey, setSortKey] = useState<SortingKey>({
    key: 'completedChallenges',
    asc: false,
  })

  useEffect(() => {
    window.history.pushState(null, '', `?page=${currentPage}`)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [currentPage, router])

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
