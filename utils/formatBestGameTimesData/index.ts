import { FromattedApiPlayerStats } from '@/interfaces/player'
import { calculateBestTimeByDifficulty } from '../calculateBestTimeByDifficulty'

const formatKeysToCamelCase = (gametime) => {
  return {
    date: gametime.Date,
    teamMembers: gametime.TeamMembers,
    time: gametime.Time,
  }
}

/**
 * Formats the keys of the round times and add a best time element
 *
 * @param newObject raw player stats data
 * @param round round for which the formatting needs to be done
 * @returns object containing the keys of a round formatted
 */
export const formatBestGameTimesData = (
  newObject: Partial<FromattedApiPlayerStats>,
) => {
  if (!newObject) {
    return {}
  }

  const normal = formatKeysToCamelCase(newObject.NormalGameTime) || {}
  const hard = formatKeysToCamelCase(newObject.HardGameTime) || {}
  const impossible = formatKeysToCamelCase(newObject.ImpossibleGameTime) || {}

  const best = calculateBestTimeByDifficulty({
    normal: normal.time,
    hard: hard.time,
    impossible: impossible.time,
  })

  const gameTimes = {
    normal,
    hard,
    impossible,
  }

  return {
    ...gameTimes,
    best: {
      ...best,
      date: gameTimes[best.difficulty].date,
      teamMembers: gameTimes[best.difficulty].teamMembers,
    },
  }
}
