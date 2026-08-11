'use client'

import TableWithControls from '@/components/organisms/tableWithControls'
import { kibbleColumnsWithRender, KibbleRow } from '@/constants/tableColumns'
import { KibbleStats } from '@/interfaces/leaderboard'
import { formatKibbleRows } from '@/utils'

interface KibbleTableProps {
  currentPage: number
  data: { pages: number; stats?: KibbleStats[] } | undefined
  handlePageChange: (page: number) => void
  handlePlayerChange: (player: string) => void
  handleSortChange: (key: string) => void
  isFetching: boolean
  player?: string
  sortKey: string
}

const defaultSortKey: keyof KibbleRow = 'singleGame'

export default function KibbleTable({
  currentPage,
  data,
  handlePageChange,
  handlePlayerChange,
  handleSortChange,
  isFetching,
  player,
  sortKey,
}: KibbleTableProps) {
  const formattedStats = data?.stats ? formatKibbleRows(data.stats) : undefined
  const validSortKey = (
    kibbleColumnsWithRender.some((c) => c.key === sortKey)
      ? sortKey
      : defaultSortKey
  ) as keyof KibbleRow

  return (
    <TableWithControls<KibbleRow>
      columns={kibbleColumnsWithRender}
      currentPage={currentPage}
      data={{ pages: data?.pages ?? 0, stats: formattedStats }}
      handlePageChange={handlePageChange}
      handlePlayerChange={handlePlayerChange}
      handleSortChange={(key) => handleSortChange(key as string)}
      isFetching={isFetching}
      player={player}
      sortKey={validSortKey}
    />
  )
}
