import { PlayerStats } from '@/interfaces/player'
import { getNumericCompleteChallenges } from '../getNumericCompleteChallenges'
import { isRoundKey } from '../isRoundKey'
import { Difficulty } from '@/interfaces/difficulty'

type DifficultyFilter = Difficulty | undefined

export const getValueForKey = (
  key: keyof PlayerStats,
  elem: PlayerStats,
  filter?: DifficultyFilter,
) => {
  if (key === 'wins' || key === 'gamesPlayed') {
    return filter ? elem[key][filter] : elem[key].total
  }

  if (key === 'completedChallenges') {
    return getNumericCompleteChallenges(elem[key])[0]
  }

  if (isRoundKey(key)) {
    return filter ? elem[key][filter] : elem[key].best.time
  }

  return elem[key]
}

/**
 * Provides the sort condition according to the provided key
 *
 * For wins or games played it returns the condition total > total
 * For completed challenges it evaluates the first number beign a when a/b is provided
 * For rounds it returns the condition best time < best time
 * For battle tag and rounds the relation is inverted returning the smaller as the first isntead
 *
 * @param key key from PlayerStats that needs to be evaluated
 * @param elem player stats element
 * @param elem2 second player stats element
 * @returns comparison between two player stats elements based on the corresponding condition
 */
export const getSortConditionByKey = (
  key: keyof PlayerStats,
  elem: PlayerStats,
  elem2: PlayerStats,
  filter?: DifficultyFilter,
) => {
  const firstElement = getValueForKey(key, elem, filter)
  const secondElement = getValueForKey(key, elem2, filter)

  // For round (time) keys the sort is done in the opposite direction since lower times are faster
  // But we send the 0:00 times to the end because it means that they didn't finish the round
  if (isRoundKey(key)) {
    if (firstElement === 0 || secondElement === 0) {
      return !(firstElement < secondElement)
    }
    return firstElement < secondElement
  }

  return key === 'battleTag'
    ? firstElement < secondElement
    : firstElement > secondElement
}
