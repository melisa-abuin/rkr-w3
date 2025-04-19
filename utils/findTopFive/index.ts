import { PlayerStats } from '@/interfaces/player'
import { getValueForKey, getSortConditionByKey } from '../getSortConditionByKey'
import { isRoundKey } from '../isRoundKey'
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
 * Returns the top five players based on the provided key from their stats.
 *
 * Uses an insertion-based approach to maintain a sorted list of the top five elements
 * according to the dynamic condition provided by `getSortConditionByKey`. It supports filtering
 * by difficulty for round keys, and uses fallback total values for wins or games played.
 *
 * Time Complexity: O(n × k), where n = array length, k = 5 (constant).
 *
 * @param array - Array of PlayerStats to evaluate.
 * @param key - The stat key to rank players by (e.g., 'wins', 'gamesPlayed', or round keys).
 * @param filter - Optional difficulty filter for round-based stats.
 * @returns An array of the top five players with their battleTags and relevant stat data.
 */

export const findTopFive = (
  array: PlayerStats[],
  key: keyof PlayerStats,
  filter?: DifficultyFilter,
) => {
  const topFive: PlayerStats[] = []

  array.forEach((elem) => {
    let inserted = false

    if (getValueForKey(key, elem, filter) === 0) {
      return true
    }

    // Insert the element in the correct sorted position in topFive
    for (let i = 0; i < topFive.length; i++) {
      const condition = getSortConditionByKey(key, elem, topFive[i], filter)

      if (condition) {
        topFive.splice(i, 0, elem) // Insert at the found position
        inserted = true
        break
      }
    }

    // If not inserted, and topFive has less than 5 elements, push to the end
    if (!inserted && topFive.length < 5) {
      topFive.push(elem)
    }

    // If more than 5 elements, remove the smallest
    if (topFive.length > 5) {
      topFive.pop()
    }
  })

  return topFive.map((elem: PlayerStats) => ({
    player: elem.battleTag,
    data: getDataToMap(key, elem, filter),
  }))
}

/**
 * Returns the top five players by sorting the full array using the given key.
 *
 * This function sorts the entire input array based on the selected stat key,
 * and retrieves the top five elements. It's more computationally intensive and
 * should be avoided in favor of the optimized `findTopFive` function.
 *
 * Time Complexity: O(n log n)
 *
 * @deprecated Use `findTopFive` instead for better performance and filtering options.
 *
 * @param array - Array of PlayerStats to sort and slice.
 * @param key - The stat key used to compare and rank players.
 * @returns An array of the top five PlayerStats objects.
 */
export const findTopFiveOld = (
  array: PlayerStats[],
  key: keyof PlayerStats,
) => {
  const hasTotal = key === 'wins' || key === 'gamesPlayed'

  if (hasTotal) {
    return [...array].sort((a, b) => b[key].total - a[key].total).slice(0, 5)
  }
  return [...array]
    .sort((a, b) => {
      if (typeof b[key] === 'number' && typeof a[key] === 'number')
        return b[key] - a[key]

      return 0
    })
    .slice(0, 5)
}
