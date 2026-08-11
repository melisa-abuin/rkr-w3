'use client'

import TableWithControls from '@/components/organisms/tableWithControls'
import { statsColumnsWithRender } from '@/constants/tableColumns'
import { Difficulty } from '@/interfaces/difficulty'
import { Player } from '@/interfaces/player'

interface StatsTableProps {
  currentPage: number
  data: { pages: number; stats?: Player[] } | undefined
  difficulty?: Difficulty
  handleDifficultyChange: (difficulty?: Difficulty) => void
  handlePageChange: (page: number) => void
  handlePlayerChange: (player: string) => void
  handleSortChange: (key: string) => void
  isFetching: boolean
  player?: string
  sortKey: string
}

const defaultSortKey: keyof Player = 'completedChallenges'

export default function StatsTable({
  currentPage,
  data,
  difficulty,
  handleDifficultyChange,
  handlePageChange,
  handlePlayerChange,
  handleSortChange,
  isFetching,
  player,
  sortKey,
}: StatsTableProps) {
  const validSortKey = (
    statsColumnsWithRender.some((c) => c.key === sortKey)
      ? sortKey
      : defaultSortKey
  ) as keyof Player

  return (
    <TableWithControls<Player>
      columns={statsColumnsWithRender}
      currentPage={currentPage}
      data={data}
      difficulty={difficulty}
      handleDifficultyChange={handleDifficultyChange}
      handlePageChange={handlePageChange}
      handlePlayerChange={handlePlayerChange}
      handleSortChange={(key) => handleSortChange(key as string)}
      isFetching={isFetching}
      player={player}
      sortKey={validSortKey}
    />
  )
}
