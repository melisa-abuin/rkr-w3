'use client'

import { PlayersStats, PlayerStats } from '@/interfaces/player'
import { useSearchParams } from 'next/navigation'
import { useState, useCallback, ReactNode } from 'react'
import Pagination from './components/pagination'
import { difficultyNames } from '@/constants'
import { Difficulty } from '@/interfaces/difficulty'
import Table from '@/components/molecules/table'
import Badges from '@/components/molecules/badges'

interface TableProps {
  data: { pages: number; stats?: PlayersStats }
  headerLink?: ReactNode
  defaultSortKey: keyof PlayerStats
  title?: string
  isTimeStats: boolean
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
  columns,
  isTimeStats,
  title,
  headerLink,
}: TableProps) {
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
  const [loading, setLoading] = useState(false)
  const [filteredData, setFilteredData] = useState<{
    pages: number
    stats?: PlayersStats
  }>(data)

  const updateURL = useCallback(
    async (page: number, difficulty?: Difficulty, sort?: SortingKey) => {
      const queryParams = new URLSearchParams()
      queryParams.set('page', page.toString())
      if (difficulty) queryParams.set('difficulty', difficulty)
      if (sort) {
        queryParams.set('sortKey', sort.key)
        queryParams.set('sortOrder', sort.asc ? 'asc' : 'desc')
      }
      setLoading(true)

      // TODO: create helper or what about react query?
      try {
        const response = await fetch(
          `/api/${isTimeStats ? 'times' : 'stats'}?${queryParams.toString()}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()
        setFilteredData(result)
      } catch (error) {
        console.log('something went wrong')
      } finally {
        setLoading(false)
      }

      window.history.pushState(null, '', `?${queryParams.toString()}`)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    },
    [isTimeStats],
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

  return (
    <>
      <Table
        columns={columns}
        data={filteredData.stats ?? []}
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
        loading={loading}
        difficultyFilter={difficultyFilter}
        title={title}
        onTableSort={handleSortChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={filteredData.pages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
