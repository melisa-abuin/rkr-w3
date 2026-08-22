'use client'

import { DropdownOption } from '@/components/atoms/dropdown'
import TableWithControls from '@/components/organisms/tableWithControls'
import { leagueScoreboardBreakdownColumns } from '@/constants/tableColumns'
import {
  BreakdownApiEntry,
  formatBreakdownRows,
  LeagueScoreboardBreakdownRow,
} from '@/utils'

interface BreakdownTableProps {
  currentPage: number
  data: BreakdownApiEntry[] | undefined
  defaultSeasonValue?: string
  handlePageChange: (page: number) => void
  handlePlayerChange: (player: string) => void
  handleSortChange: (key: string) => void
  handleSeasonChange: (option: DropdownOption) => void
  isFetching: boolean
  player?: string
  seasonOptions?: DropdownOption[]
  sortKey: string
}

const defaultSortKey: keyof LeagueScoreboardBreakdownRow = 'weightedWins'

export default function BreakdownTable({
  currentPage,
  data,
  defaultSeasonValue,
  handlePageChange,
  handlePlayerChange,
  handleSortChange,
  handleSeasonChange,
  isFetching,
  player,
  seasonOptions,
  sortKey,
}: BreakdownTableProps) {
  // TODO: Fix pagination
  const formattedStats = data ? formatBreakdownRows(data) : undefined
  const validSortKey = (
    leagueScoreboardBreakdownColumns.some((c) => c.key === sortKey)
      ? sortKey
      : defaultSortKey
  ) as keyof LeagueScoreboardBreakdownRow

  const defaultSeasonOption =
    seasonOptions?.find((o) => o.value === defaultSeasonValue) ?? undefined

  return (
    <TableWithControls<LeagueScoreboardBreakdownRow>
      columns={leagueScoreboardBreakdownColumns}
      currentPage={currentPage}
      data={{ pages: 1, stats: formattedStats }}
      defaultSeasonOption={defaultSeasonOption}
      handlePageChange={handlePageChange}
      handlePlayerChange={handlePlayerChange}
      handleSeasonChange={handleSeasonChange}
      handleSortChange={(key) => handleSortChange(key as string)}
      isFetching={isFetching}
      player={player}
      seasonOptions={seasonOptions}
      sortKey={validSortKey}
    />
  )
}
