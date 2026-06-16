import { Player, RoundTimes, SaveStreak } from '@/interfaces/player'
import { GameStats } from '@/interfaces/game'
import { isTimeKey, isTimeKeyWithDiff } from '../checkKeyType'
import { Difficulty } from '@/interfaces/difficulty'

type DifficultyFilter = Difficulty | undefined

/**
 * Aproximate the save streak values for those players
 * who have the patrioticTendrils or redLightning rewards
 * This is a patch for players who got those rewards before RKR remastered version
 *
 * @param saveStreak
 * @returns number with the value of the save streak
 */
const getValueForSaveStreak = (saveStreak: SaveStreak) => {
  const { highestScore, patrioticTendrils, redLightning } = saveStreak

  if (highestScore < 50 && patrioticTendrils) {
    return 50
  }
  if (highestScore < 15 && redLightning) {
    return 15
  }

  return highestScore
}

export const getValueForKey = (
  key: string,
  elem: Partial<Player>,
  filter?: DifficultyFilter,
) => {
  if ((key === 'wins' || key === 'gamesPlayed') && filter !== 'solo') {
    return filter ? elem[key]?.[filter] : elem[key]?.total
  }

  if (key === 'saveStreak') {
    return elem.saveStreak ? getValueForSaveStreak(elem.saveStreak) : 0
  }

  if (key === 'completedChallenges') {
    return elem.completedChallenges?.general?.[0]
  }

  if (key === 'bestGameTimes') {
    const arr = elem.bestGameTimes as GameStats[] | undefined
    if (!arr || arr.length === 0) return 0
    if (filter) {
      return (
        arr.find((g) => g.difficulty.toLowerCase() === filter)?.totalTime ?? 0
      )
    }
    const times = arr.map((g) => g.totalTime).filter((t) => t > 0)
    return times.length ? Math.min(...times) : 0
  }

  if (isTimeKey(key)) {
    const roundData = elem[key as keyof Player] as RoundTimes | undefined
    return filter ? roundData?.[filter] : roundData?.best?.time
  }

  if (filter && isTimeKeyWithDiff(key, filter)) {
    const roundData = elem[key as keyof Player] as RoundTimes | undefined
    return roundData
  }

  if (key === 'battleTag') {
    return elem.battleTag?.name.toLocaleLowerCase() || ''
  }

  return (elem as Partial<Record<string, unknown>>)[key]
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
  key: string,
  elem: Partial<Player>,
  elem2: Partial<Player>,
  filter?: DifficultyFilter,
) => {
  const firstElement = getValueForKey(key, elem, filter)
  const secondElement = getValueForKey(key, elem2, filter)

  if (typeof firstElement !== 'string' && typeof firstElement !== 'number')
    return true

  if (typeof secondElement !== 'string' && typeof secondElement !== 'number')
    return true

  if (isTimeKey(key) || (filter && isTimeKeyWithDiff(key, filter))) {
    // For round (time) keys the sort is done in the opposite direction since lower times are faster
    // But we send the 0:00 times to the end because it means that they didn't finish the round
    if (firstElement === 0 || secondElement === 0) {
      return !(firstElement < secondElement)
    }
    return firstElement < secondElement
  }

  return key === 'battleTag' || key === 'deaths'
    ? firstElement < secondElement
    : firstElement > secondElement
}
