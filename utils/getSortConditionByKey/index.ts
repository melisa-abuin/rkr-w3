import { PlayerStats, SaveStreak } from '@/interfaces/player'
import { isRoundKey } from '../isRoundKey'
import { RoundDifficulty } from '@/interfaces/difficulty'

type DifficultyFilter = RoundDifficulty | undefined

/**
 * Aproximate the save streak values for those players
 * who have the patrioticTendrils or redLightning rewards
 * This is a patch for players who got those rewards before RKR remastered version
 *
 * @param saveStreak
 * @returns number with the value of the save streak
 */
const getValueForSaveStreak = (saveStreak: SaveStreak) => {
  const { highestSaveStreak, patrioticTendrils, redLightning } = saveStreak

  if (highestSaveStreak < 50 && patrioticTendrils) {
    return 50
  }
  if (highestSaveStreak < 15 && redLightning) {
    return 15
  }

  return highestSaveStreak
}

export const getValueForKey = (
  key: keyof PlayerStats,
  elem: PlayerStats,
  filter?: DifficultyFilter,
) => {
  if ((key === 'wins' || key === 'gamesPlayed') && filter !== 'solo') {
    return filter ? elem[key][filter] : elem[key].total
  }

  if (key === 'saveStreak') {
    return getValueForSaveStreak(elem[key])
  }

  if (key === 'kibbles') {
    return elem[key].collectedSingleGame
  }

  if (key === 'completedChallenges') {
    return elem[key]['general'][0]
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

  return key === 'battleTag' || key === 'deaths'
    ? firstElement < secondElement
    : firstElement > secondElement
}
