'use client'

import { ReactNode } from 'react'
import { difficultyNames } from '@/constants'
import Table from '@/components/molecules/table'
import Badges from '@/components/molecules/badges'
import Pagination from '@/components/molecules/pagination'
import { useApiQuery } from '@/hooks/useApiQuery'
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast'
import { Difficulty } from '@/interfaces/difficulty'
import PlayerFinder from '@/components/molecules/playerFinder'
import { FiltersRow } from './styled'

interface TableProps<T> {
  apiBaseUrl: 'times' | 'stats' | 'kibbleStats'
  columns: Array<{
    title: string
    key: keyof T
    render?: (data: T, difficultyFilter?: Difficulty) => ReactNode
  }>
  currentPage: number
  data: { pages: number; stats?: T[] }
  difficulty?: Difficulty | undefined
  handleDifficultyChange?: () => void
  handlePageChange: (page: number) => void
  handlePlayerChange: (player: string) => void
  handleSortChange: (columnKey: keyof T) => void
  headerLink?: ReactNode
  player?: string
  queryString: string | null
  shouldRefetch: boolean
  sortKey: keyof T
  title?: string
}

export default function TableWithControls<T>({
  apiBaseUrl,
  columns,
  currentPage,
  data,
  difficulty,
  handleDifficultyChange,
  handlePageChange,
  handlePlayerChange,
  handleSortChange,
  headerLink,
  player,
  queryString,
  shouldRefetch = false,
  sortKey,
  title,
}: TableProps<T>) {
  const {
    data: filteredData,
    isFetching,
    error,
  } = useApiQuery<{ pages: number; stats?: T[] }>(
    `/api/${apiBaseUrl}?${queryString}`,
    undefined,
    { enabled: shouldRefetch },
  )

  useQueryErrorToast(error, `Couldn't fetch the stats, please try again later.`)

  return (
    <>
      <Table
        columns={columns}
        data={filteredData?.stats ?? data.stats}
        difficultyFilter={difficulty}
        filters={
          !!handleDifficultyChange && (
            <FiltersRow>
              <Badges
                options={difficultyNames}
                selected={difficulty}
                onClick={handleDifficultyChange}
              />
              <PlayerFinder
                defaultValue={player || ''}
                onChange={handlePlayerChange}
                onClear={() => handlePlayerChange('')}
                onPlayerSelect={() => {}}
              />
            </FiltersRow>
          )
        }
        headerLink={headerLink}
        highlightedColumn={sortKey}
        loading={isFetching}
        pageSize={15}
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
