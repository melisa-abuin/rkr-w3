import { PlayerStats } from '@/interfaces/player'
import { calculateBestTimeByDifficulty } from '../calculateBestTimeByDifficulty'

/**
 * Formats the keys of the round times and add a best time element
 *
 * @param newObject raw player stats data
 * @param round round for which the formatting needs to be done
 * @returns object containing the keys of a round formatted
 */
export const formatRoundsData = (
  newObject: Partial<PlayerStats>,
  round: 1 | 2 | 3 | 4 | 5,
) => {
  const normal = newObject[`round${round}TimeNormal`] || 0
  const hard = newObject[`round${round}TimeHard`] || 0
  const impossible = newObject[`round${round}TimeImpossible`] || 0

  return {
    normal,
    hard,
    impossible,
    best: calculateBestTimeByDifficulty({ normal, hard, impossible }),
  }
}
