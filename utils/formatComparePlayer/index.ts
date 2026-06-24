import { Player } from '@/interfaces/player'
import { formatSecondsAsTime } from '../formatSecondsAsTime'
import { getSortConditionByKey, getValueForKey } from '../getSortConditionByKey'
import { Difficulty } from '@/interfaces/difficulty'
import { isTimeKey, isTimeKeyWithDiff } from '../checkKeyType'
import { isRoundDifficultyAvailable } from '../isRoundDifficultyAvailable'

/**
 * Formats a single column for a player's stats row.
 *
 * Resolves the value by key and optional difficulty, converts time-based keys to
 * display format, and computes whether the value should be highlighted against a
 * comparison player.
 */
const formatColumns = (
  column: { title: string; key: string },
  difficulty: Difficulty | undefined,
  player: Player,
  comparePlayer: Player | undefined,
) => {
  const valueForKey = getValueForKey(column.key, player, difficulty) as number

  const value =
    isTimeKey(column.key) ||
    (difficulty && isTimeKeyWithDiff(column.key, difficulty))
      ? formatSecondsAsTime(valueForKey)
      : valueForKey
  console.log(
    'value',
    value,
    'valueForKey',
    valueForKey,
    'key',
    column.key,
    'difficulty',
    difficulty,
    'player',
    player.battleTag.name,
  )
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
 * Builds comparison data for fixed player keys.
 *
 * Returns one row when `comparePlayer` is not provided, and two rows when it is.
 * Each row contains a player title and formatted columns with highlight metadata.
 *
 * @param player Base player to format.
 * @param comparePlayer Optional player used to compare and highlight values.
 * @param columns Column definitions using strongly typed `Player` keys.
 * @param difficulty Optional difficulty used for nested difficulty-based keys.
 * @returns Array of formatted rows ready for UI rendering.
 */
export const formatComparePlayer = (
  player: Player,
  comparePlayer: Player | undefined,
  columns: Readonly<Array<{ title: string; key: string }>>,
  difficulty: Difficulty | undefined,
) => {
  const result = []
  const filteredColumns = columns.filter((col) =>
    isRoundDifficultyAvailable(col.key as string, difficulty),
  )

  result.push({
    title: comparePlayer ? player.battleTag.name : '',
    columns: filteredColumns.map((col) =>
      formatColumns(col, difficulty, player, comparePlayer),
    ),
  })

  if (comparePlayer) {
    result.push({
      title: comparePlayer.battleTag.name,
      columns: filteredColumns.map((col) =>
        formatColumns(col, difficulty, comparePlayer, player),
      ),
    })
  }

  return result
}

/**
 * Formats a single column for dynamic string keys.
 *
 * Supports keys from `player.kibbles` and top-level numeric `Player` fields.
 * For unsupported/non-numeric values, it falls back to a safe default.
 */
const formatColumnsDynamic = (
  column: { title: string; key: string },
  player: Player,
  comparePlayer: Player | undefined,
) => {
  const { key, title } = column

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
 * Builds comparison data for dynamic string keys.
 *
 * Works like `formatComparePlayer`, but accepts untyped keys (for mixed data
 * sources such as kibbles and top-level numeric fields).
 *
 * @param player Base player to format.
 * @param comparePlayer Optional player used to compare and highlight values.
 * @param columns Column definitions using dynamic string keys.
 * @returns Array of formatted rows ready for UI rendering.
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
