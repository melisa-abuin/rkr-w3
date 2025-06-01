import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { secondsToSexagesimal } from '../secondsToSexagesimal'
import { getSortConditionByKey, getValueForKey } from '../getSortConditionByKey'
import { RoundDifficulty } from '@/interfaces/difficulty'
import { isTimeKey } from '../checkKeyType'

const formatColumns = (
  column: { title: string; key: keyof DetailedPlayerStats },
  difficulty: RoundDifficulty | undefined,
  player: DetailedPlayerStats,
  comparePlayer: DetailedPlayerStats | undefined,
) => {
  const valueForKey = getValueForKey(column.key, player, difficulty) as number

  const value = isTimeKey(column.key)
    ? secondsToSexagesimal(valueForKey)
    : valueForKey

  const highlight = comparePlayer
    ? getSortConditionByKey(column.key, player, comparePlayer, difficulty)
    : false

  return {
    description: column.title,
    value,
    highlight,
  }
}

/**
 * Format the data of two players and provide a comparison by category requested
 * @param player
 * @param comparePlayer
 * @param columns
 * @param difficulty
 * @returns
 */
export const formatComparePlayer = (
  player: DetailedPlayerStats,
  comparePlayer: DetailedPlayerStats | undefined,
  columns: Readonly<Array<{ title: string; key: keyof DetailedPlayerStats }>>,
  difficulty: RoundDifficulty | undefined,
) => {
  const result = []

  result.push({
    title: comparePlayer ? player.battleTag.name : '',
    columns: columns.map((col) =>
      formatColumns(col, difficulty, player, comparePlayer),
    ),
  })

  if (comparePlayer) {
    result.push({
      title: comparePlayer.battleTag.name,
      columns: columns.map((col) =>
        formatColumns(col, difficulty, comparePlayer, player),
      ),
    })
  }

  return result
}
