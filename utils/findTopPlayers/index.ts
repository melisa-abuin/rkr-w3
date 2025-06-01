import { PlayerStats } from '@/interfaces/player'
import { getValueForKey, getSortConditionByKey } from '../getSortConditionByKey'
import { isRoundKey } from '../checkKeyType'
import { Difficulty } from '@/interfaces/difficulty'

type DifficultyFilter = Difficulty | undefined

const getDataToMap = (
  key: keyof PlayerStats,
  elem: PlayerStats,
  filter: DifficultyFilter,
) => {
  if (key === 'wins' || key === 'gamesPlayed') {
    return elem[key].total
  }

  if (isRoundKey(key)) {
    if (filter) {
      return { time: elem[key][filter], difficulty: filter }
    }
    return { ...elem[key].best }
  }

  return elem[key]
}

/**
 * Returns the top N players based on the provided key from their stats.
 *
 * Uses an insertion-based approach to maintain a sorted list of the top N elements
 * according to the dynamic condition provided by `getSortConditionByKey`. It supports filtering
 * by difficulty for round keys, and uses fallback total values for wins or games played.
 *
 * Time Complexity: O(n × k), where n = array length, k = count (usually small).
 *
 * WARNING: This approach is likely faster than full sorting, especially when `count` is small (≤ 20),
 * as it avoids sorting the entire array and only tracks the top N players.
 *
 * @param array - Array of PlayerStats to evaluate.
 * @param key - The stat key to rank players by (e.g., 'wins', 'gamesPlayed', or round keys).
 * @param filter - Optional difficulty filter for round-based stats.
 * @param count - Number of top players to return.
 * @returns An array of the top `count` players with their battleTags and relevant stat data.
 */
export const findTopPlayersByInsertion = (
  array: PlayerStats[],
  key: keyof PlayerStats,
  filter?: DifficultyFilter,
  count: number = 5,
) => {
  const top: PlayerStats[] = []

  array.forEach((elem) => {
    let inserted = false

    if (getValueForKey(key, elem, filter) === 0) {
      return true
    }

    for (let i = 0; i < top.length; i++) {
      const condition = getSortConditionByKey(key, elem, top[i], filter)

      if (condition) {
        top.splice(i, 0, elem)
        inserted = true
        break
      }
    }

    if (!inserted && top.length < count) {
      top.push(elem)
    }

    if (top.length > count) {
      top.pop()
    }
  })

  return top.map((elem: PlayerStats) => ({
    player: elem.battleTag,
    data: getDataToMap(key, elem, filter),
  }))
}

/**
 * Returns the top N players by sorting the full array using the given key.
 *
 * This function sorts the entire input array based on the selected stat key,
 * using the same comparison logic as `findTopPlayers` via `getSortConditionByKey`,
 * and retrieves the top N elements.
 *
 * WARNING: This approach is less efficient for small `count` values, since it sorts the full array.
 * Use `findTopPlayers` instead for better performance when `count` is small (≤ 20).
 *
 * @param array - Array of PlayerStats to sort and slice.
 * @param key - The stat key used to compare and rank players.
 * @param count - Number of top players to return.
 * @param filter - Optional difficulty filter for round-based stats.
 * @returns An array of the top `count` players with their battleTags and relevant stat data.
 */
export const findTopPlayersByFullSort = (
  array: PlayerStats[],
  key: keyof PlayerStats,
  filter?: DifficultyFilter,
  count: number = 5,
) => {
  const sorted = [...array].sort((a, b) => {
    const shouldPlaceAFirst = getSortConditionByKey(key, a, b, filter)
    const shouldPlaceBFirst = getSortConditionByKey(key, b, a, filter)

    // If a should be before b, return -1
    if (shouldPlaceAFirst) return -1
    // If b should be before a, return 1
    if (shouldPlaceBFirst) return 1
    // Equal
    return 0
  })

  return sorted.slice(0, count).map((elem) => ({
    player: elem.battleTag,
    data: getDataToMap(key, elem, filter),
  }))
}
