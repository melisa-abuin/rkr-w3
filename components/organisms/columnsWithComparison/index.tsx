import Columns from '@/components/molecules/columns'
import { RoundDifficulty } from '@/interfaces/difficulty'
import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { formatComparePlayer } from '@/utils'

interface Props {
  columns: Readonly<Array<{ title: string; key: keyof PlayerStats }>>
  loading: boolean
  player: DetailedPlayerStats
  comparePlayer?: DetailedPlayerStats
  difficulty?: RoundDifficulty
  variant?: 'primary' | 'secondary'
}

export default function ColumnsWithComparison({
  columns,
  comparePlayer,
  loading,
  player,
  difficulty = undefined,
  variant = 'primary',
}: Props) {
  return (
    <Columns
      loading={loading}
      data={formatComparePlayer(player, comparePlayer, columns, difficulty)}
      variant={variant}
    />
  )
}
