'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useCallback, ReactNode, useEffect } from 'react'
import Pagination from '@/components/molecules/pagination'
import Table from '@/components/molecules/table'
import { useToast } from '@/hooks/useToast'
import { BattleTag, Kibbles, PlayerStats } from '@/interfaces/player'

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
}: TableProps) {
  const searchParams = useSearchParams()
  const initialPage = parseInt(searchParams?.get('page') || '1', 10)
  const initialSortData = {
    key: (searchParams?.get('sortKey') as keyof KibbleType) || defaultSortKey,
    asc: searchParams?.get('sortOrder') === 'asc',
  }

  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  const [sortKey, setSortKey] = useState<SortingKey>(initialSortData)
  const [loading, setLoading] = useState(false)
  const [filteredData, setFilteredData] = useState<{
    pages: number
    stats?: KibbleType[]
  }>(data)
  const { showToast } = useToast()

  const updateURL = useCallback(
    async (page: number, sort?: SortingKey) => {
      const queryParams = new URLSearchParams()
      queryParams.set('page', page.toString())
      if (sort) {
        queryParams.set('sortKey', sort.key)
        queryParams.set('sortOrder', sort.asc ? 'asc' : 'desc')
      }
      setLoading(true)

      // TODO: create helper or what about react query?
      try {
        const response = await fetch(
          `/api/${apiBaseUrl}?${queryParams.toString()}`,
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
        const formattedResult = {
          stats: result.stats?.map((elem: PlayerStats) => ({
            battleTag: elem.battleTag,
            ...elem.kibbles,
          })),
          pages: result.pages,
        }
        setFilteredData(formattedResult)
      } catch (error) {
        showToast(`Couldn't fetch the kibble stats, please try again later.`)
      } finally {
        setLoading(false)
      }

      window.history.pushState(null, '', `?${queryParams.toString()}`)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    },
    [apiBaseUrl, showToast],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      updateURL(page, sortKey)
    },
    [sortKey, updateURL],
  )

  const handleSortChange = useCallback(
    (sort: keyof KibbleType) => {
      const newSortKey = {
        key: sort,
        asc: sortKey.key === sort ? !sortKey.asc : false,
      }
      setSortKey(newSortKey)
      updateURL(currentPage, newSortKey)
    },
    [currentPage, updateURL, sortKey],
  )

  useEffect(() => {
    console.log(filteredData)
  }, [filteredData])

  return (
    <>
      <Table
        columns={columns}
        data={filteredData.stats ?? []}
        pageSize={15}
        headerLink={headerLink}
        highlightedColumn={sortKey.key}
        loading={loading}
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
