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

interface TableProps<T> {
  apiBaseUrl: 'times' | 'stats' | 'kibbleStats'
  columns: Array<{
    title: string
    key: keyof T
  }>
  currentPage: number
  data: { pages: number; stats?: T[] }
  difficulty?: Difficulty | undefined
  handleDifficultyChange?: () => void
  handlePageChange: (page: number) => void
  handlePlayerChange?: (player: string) => void
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

  const rows = filteredData?.stats as unknown[] | undefined
  const hasKibbles =
    rows?.[0] && typeof rows[0] === 'object' && 'kibbles' in rows[0]
  const formattedQueryResult = hasKibbles
    ? (rows?.map((elem) => {
        const player = elem as {
          battleTag: unknown
          kibbles: Record<string, unknown>
        }

        return {
          battleTag: player.battleTag,
          ...player.kibbles,
        }
      }) as T[])
    : filteredData?.stats

  return (
    <>
      <Table
        columns={columns}
        data={formattedQueryResult ?? data.stats}
        pageSize={15}
        filters={
          !!handleDifficultyChange && (
            <div
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <Badges
                onClick={handleDifficultyChange}
                options={difficultyNames}
                selected={difficulty}
              />
              <PlayerFinder
                defaultValue={player || ''}
                onChange={handlePlayerChange}
                onPlayerSelect={() => {}}
                onClear={() => {}}
              />
            </div>
          )
        }
        headerLink={headerLink}
        highlightedColumn={sortKey}
        loading={isFetching}
        difficultyFilter={difficulty}
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
