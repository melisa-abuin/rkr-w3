'use client'

import { PlayersStats, PlayerStats } from '@/interfaces/player'
import Table from '../table'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import Pagination from './pagination'
import { pageSize } from '@/constants'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'
import { Badges } from './badges'

interface TableProps {
  data?: PlayersStats
  loading?: boolean
  title: string
  columns: Array<{
    title: string
    key: keyof PlayerStats
  }>
  statsLink?: string
}

interface SortingKey {
  key: keyof PlayerStats
  asc: boolean
}

export default function TableWithControls({
  data,
  loading = false,
  columns,
  statsLink,
  title,
}: TableProps) {
  const totalPages = data ? Math.round(data?.length / pageSize) : 0
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams?.get('page') || '1', 10)

  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')

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

    let filteredData = data
    if (difficultyFilter !== 'all') {
      filteredData = data.map((elem) => ({
        ...elem,
        wins: elem.wins ? elem.wins[difficultyFilter] : undefined,
        gamesPlayed: elem.gamesPlayed
          ? elem.gamesPlayed[difficultyFilter]
          : undefined,
        r1: elem.r1 ? elem.r1[difficultyFilter] : undefined,
        r2: elem.r2 ? elem.r2[difficultyFilter] : undefined,
        r3: elem.r3 ? elem.r3[difficultyFilter] : undefined,
        r4: elem.r4 ? elem.r4[difficultyFilter] : undefined,
        r5: elem.r5 ? elem.r5[difficultyFilter] : undefined,
      }))
    }
    console.log(filteredData)
    const initialIndex = (Number(currentPage) - 1) * pageSize

    const sortedData = [...filteredData].sort((a, b) => {
      const condition = getSortConditionByKey(sortKey.key, a, b)
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
        onTableSort={setSortKey}
        statsLink={statsLink}
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
