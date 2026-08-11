'use client'

import { DropdownOption } from '@/components/atoms/dropdown'
import TableWithControls from '@/components/organisms/tableWithControls'
import { timeAllDiffColumnsWithRender } from '@/constants/tableColumns'
import { Difficulty } from '@/interfaces/difficulty'
import { Player } from '@/interfaces/player'

interface TimesTableProps {
  currentPage: number
  data: { pages: number; stats?: Player[] } | undefined
  defaultSeasonValue?: string
  difficulty?: Difficulty
  handleDifficultyChange: (difficulty?: Difficulty) => void
  handlePageChange: (page: number) => void
  handlePlayerChange: (player: string) => void
  handleSortChange: (key: string) => void
  handleSeasonChange: (option: DropdownOption) => void
  isFetching: boolean
  player?: string
  seasonOptions?: DropdownOption[]
  sortKey: string
}

const defaultSortKey: keyof Player = 'roundOne'

export default function TimesTable({
  currentPage,
  data,
  defaultSeasonValue,
  difficulty,
  handleDifficultyChange,
  handlePageChange,
  handlePlayerChange,
  handleSortChange,
  handleSeasonChange,
  isFetching,
  player,
  seasonOptions,
  sortKey,
}: TimesTableProps) {
  const validSortKey = (
    timeAllDiffColumnsWithRender.some((c) => c.key === sortKey)
      ? sortKey
      : defaultSortKey
  ) as keyof Player

  const allSeasonsOption: DropdownOption = { label: 'All Seasons', value: '' }
  const seasonDropdownOptions = seasonOptions
    ? [allSeasonsOption, ...seasonOptions]
    : undefined
  const defaultSeasonOption =
    seasonOptions?.find((o) => o.value === defaultSeasonValue) ??
    allSeasonsOption

  return (
    <TableWithControls<Player>
      columns={timeAllDiffColumnsWithRender}
      currentPage={currentPage}
      data={data}
      defaultSeasonOption={defaultSeasonOption}
      difficulty={difficulty}
      handleDifficultyChange={handleDifficultyChange}
      handlePageChange={handlePageChange}
      handlePlayerChange={handlePlayerChange}
      handleSeasonChange={handleSeasonChange}
      handleSortChange={(key) => handleSortChange(key as string)}
      isFetching={isFetching}
      player={player}
      seasonOptions={seasonDropdownOptions}
      sortKey={validSortKey}
    />
  )
}
