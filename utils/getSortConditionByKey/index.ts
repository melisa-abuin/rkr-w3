import { PlayerStats } from '@/interfaces/player'
import { getNumericCompleteChallenges } from '../getNumericCompleteChallenges'
import { isRoundKey } from '../isRoundKey'

const getKeyToEvaluate = (key: keyof PlayerStats, elem: PlayerStats) => {
  if (key === 'wins' || key === 'gamesPlayed') {
    // TODO: handle hard/normal/impossible values when required
    return elem[key].total
  }

  if (key === 'completedChallenges') {
    return getNumericCompleteChallenges(elem[key])[0]
  }

  if (isRoundKey(key)) {
    // TODO: handle hard/normal/impossible values when required
    return elem[key].best.time
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
) => {
  const elementData = getKeyToEvaluate(key, elem)
  const topFiveData = getKeyToEvaluate(key, elem2)
  return isRoundKey(key) || key === 'battleTag'
    ? elementData < topFiveData
    : elementData > topFiveData
}
