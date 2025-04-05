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
 * This function Has a time complexity of approximately 𝑂(𝑛 × 𝑘), where 𝑛
 * is the number of items in the array, and 𝑘 (in this case, 5) is
 * the constant number of top elements to keep.
 *
 * @param array
 * @param key
 * @returns
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
 * This function Has a time complexity of 𝑂(𝑛 log 𝑛) due to the full array sort,
 * which is more computationally intensive than the linear approach of the first function.
 * This difference becomes significant as n grows.
 * @param array
 * @param key
 * @returns
 *
 * @deprecated The method should not be used
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
