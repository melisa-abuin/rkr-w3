'use client'

import Dropdown, { DropdownOption } from '@/components/atoms/dropdown'
import Badges from '@/components/molecules/badges'
import Pagination from '@/components/molecules/pagination'
import PlayerFinder from '@/components/molecules/playerFinder'
import Table from '@/components/molecules/table'
import { difficultyNames } from '@/constants'
import { Difficulty } from '@/interfaces/difficulty'
import { ReactNode } from 'react'
import styles from './index.module.css'

interface TableWithControlsProps<T> {
  columns: Array<{
    title: string
    key: keyof T
    render?: (data: T, difficultyFilter?: Difficulty) => ReactNode
  }>
  currentPage: number
  data?: { pages: number; stats?: T[] }
  defaultSeasonOption?: DropdownOption
  difficulty?: Difficulty
  handleDifficultyChange?: (difficulty?: Difficulty) => void
  handlePageChange: (page: number) => void
  handlePlayerChange: (player: string) => void
  handleSeasonChange?: (option: DropdownOption) => void
  handleSortChange: (columnKey: keyof T) => void
  headerLink?: ReactNode
  isFetching: boolean
  player?: string
  seasonOptions?: DropdownOption[]
  sortKey: keyof T
  title?: string
}

export default function TableWithControls<T>({
  columns,
  currentPage,
  data,
  defaultSeasonOption,
  difficulty,
  handleDifficultyChange,
  handlePageChange,
  handlePlayerChange,
  handleSeasonChange,
  handleSortChange,
  headerLink,
  isFetching,
  player,
  seasonOptions,
  sortKey,
  title,
}: TableWithControlsProps<T>) {
  return (
    <>
      <Table
        columns={columns}
        data={data?.stats}
        difficultyFilter={difficulty}
        filters={
          <div className={styles.filtersRow}>
            {handleDifficultyChange && (
              <Badges
                options={difficultyNames}
                selected={difficulty}
                onClick={handleDifficultyChange}
              />
            )}
            {handleSeasonChange && seasonOptions && (
              <Dropdown
                defaultOption={defaultSeasonOption}
                options={seasonOptions}
                onSelect={handleSeasonChange}
              />
            )}
            <div className={styles.playerFinder}>
              <PlayerFinder
                defaultValue={player || ''}
                onChange={handlePlayerChange}
                onClear={() => handlePlayerChange('')}
                onPlayerSelect={() => {}}
              />
            </div>
          </div>
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
        totalPages={data?.pages ?? 0}
        onPageChange={handlePageChange}
      />
    </>
  )
}
