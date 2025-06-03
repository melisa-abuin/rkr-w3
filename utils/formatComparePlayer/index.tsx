import { Player } from '@/interfaces/player'
import { secondsToSexagesimal } from '../secondsToSexagesimal'
import { getSortConditionByKey, getValueForKey } from '../getSortConditionByKey'
import { Difficulty } from '@/interfaces/difficulty'
import { isTimeKey } from '../checkKeyType'

const formatColumns = (
  column: { title: string; key: keyof Player },
  difficulty: Difficulty | undefined,
  player: Player,
  comparePlayer: Player | undefined,
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
  player: Player,
  comparePlayer: Player | undefined,
  columns: Readonly<Array<{ title: string; key: keyof Player }>>,
  difficulty: Difficulty | undefined,
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

const formatColumnsDynamic = (
  column: { title: string; key: string },
  player: Player,
  comparePlayer: Player | undefined,
) => {
  const { key, title } = column

  if (key in player.kibbles) {
    const value = player.kibbles[key as keyof Player['kibbles']] ?? 0
    const compareValue =
      comparePlayer?.kibbles[key as keyof Player['kibbles']] ?? 0

    return {
      description: title,
      value,
      highlight: compareValue ? value > compareValue : false,
    }
  }

  const value = player[key as keyof Player] ?? 0
  const compareValue = comparePlayer?.[key as keyof Player] ?? 0

  if (typeof value === 'number' && typeof compareValue === 'number') {
    return {
      description: title,
      value,
      highlight: compareValue ? value > compareValue : false,
    }
  }

  return {
    description: title,
    value: 0,
    highlight: false,
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
export const formatCompare = (
  player: Player,
  comparePlayer: Player | undefined,
  columns: Readonly<Array<{ title: string; key: string }>>,
) => {
  const result = []

  result.push({
    title: comparePlayer ? player.battleTag.name : '',
    columns: columns.map((col) =>
      formatColumnsDynamic(col, player, comparePlayer),
    ),
  })

  if (comparePlayer) {
    result.push({
      title: comparePlayer.battleTag.name,
      columns: columns.map((col) =>
        formatColumnsDynamic(col, comparePlayer, player),
      ),
    })
  }

  return result
}
