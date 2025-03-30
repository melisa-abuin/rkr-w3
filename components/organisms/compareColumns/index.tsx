import Columns from '@/components/molecules/columns'
import { playerColumns, playerTimeColumns } from '@/constants'
import { Difficulty } from '@/interfaces/difficulty'
import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { getSortConditionByKey } from '@/utils/getSortConditionByKey'
import { secondsToSexagesimal } from '@/utils/secondsToSexagesimal'

interface Props {
  loading: boolean
  player: DetailedPlayerStats
  comparePlayer?: DetailedPlayerStats
  difficulty?: Difficulty
}

export default function ColumnsWithComparison({
  comparePlayer,
  loading,
  player,
  difficulty = undefined,
}: Props) {
  const calculateBestStat = (
    column: keyof PlayerStats,
    player: DetailedPlayerStats,
    comparePlayer: DetailedPlayerStats | undefined,
  ) =>
    comparePlayer ? getSortConditionByKey(column, player, comparePlayer) : false

  return (
    <Columns
      loading={loading}
      data={[
        {
          title: player.battleTag.tag,
          columns: playerTimeColumns.map((col) => ({
            description: col.title,
            value: difficulty
              ? secondsToSexagesimal(player[col.key][difficulty])
              : player[col.key],
            highlight: calculateBestStat(col.key, player, comparePlayer),
          })),
        },
        {
          title: comparePlayer.battleTag.tag,
          columns: playerColumns.map((col) => ({
            description: col.title,
            value: difficulty ? player[col.key][difficulty] : player[col.key],
            highlight: calculateBestStat(col.key, player, comparePlayer),
          })),
        },
      ]}
    />
  )
}
