import Columns from '@/components/molecules/columns'
import { Difficulty } from '@/interfaces/difficulty'
import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { formatComparePlayer } from '@/utils/formatComparePlayer'

interface Props {
  columns: Readonly<Array<{ title: string; key: keyof PlayerStats }>>
  loading: boolean
  player: DetailedPlayerStats
  comparePlayer?: DetailedPlayerStats
  difficulty?: Difficulty
}

export default function ColumnsWithComparison({
  columns,
  comparePlayer,
  loading,
  player,
  difficulty = undefined,
}: Props) {
  return (
    <Columns
      loading={loading}
      data={formatComparePlayer(player, comparePlayer, columns, difficulty)}
    />
  )
}
