import { FromattedApiPlayerStats } from '@/interfaces/player'
import { calculateBestTimeByDifficulty } from '../calculateBestTimeByDifficulty'

/**
 * Formats the keys of the round times and add a best time element
 *
 * @param newObject raw player stats data
 * @param round round for which the formatting needs to be done
 * @returns object containing the keys of a round formatted
 */
export const formatRoundsData = (
  newObject: Partial<FromattedApiPlayerStats>,
  round: 'One' | 'Two' | 'Three' | 'Four' | 'Five',
) => {
  const normal = newObject[`Round${round}Normal`] || 0
  const hard = newObject[`Round${round}Hard`] || 0
  const impossible = newObject[`Round${round}Impossible`] || 0

  return {
    normal,
    hard,
    impossible,
    best: calculateBestTimeByDifficulty({ normal, hard, impossible }),
  }
}
