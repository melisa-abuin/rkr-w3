import { DetailedPlayerStats, PlayerStats } from '@/interfaces/player'
import { secondsToSexagesimal } from '../secondsToSexagesimal'
import { getSortConditionByKey, getValueForKey } from '../getSortConditionByKey'
import { RoundDifficulty, Difficulty } from '@/interfaces/difficulty'
import { isRoundKey } from '../isRoundKey'

export const getValueForBestGamesKey = (
  key: keyof DetailedPlayerStats,
  elem: DetailedPlayerStats,
  filter?: Difficulty,
) => {
  if (key === 'bestGameTimes')
    return filter ? elem['bestGameTimes'][filter] : elem[key].best
  return elem[key]
}

const formatColumns = (
  column: { title: string; key: keyof DetailedPlayerStats },
  difficulty: RoundDifficulty | undefined,
  player: DetailedPlayerStats,
  comparePlayer: DetailedPlayerStats | undefined,
) => {
  const valueForKey =
    column.key === 'bestGameTimes' && difficulty
      ? getValueForBestGamesKey(column.key, player, difficulty)
      : (getValueForKey(column.key, player, difficulty) as number)
  console.log(valueForKey, column.key)

  const value =
    isRoundKey(column.key) || column.key === 'bestGameTimes'
      ? secondsToSexagesimal(valueForKey)
      : valueForKey
  console.log(value)

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
  columns: Readonly<Array<{ title: string; key: keyof PlayerStats }>>,
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
