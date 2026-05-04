import { Challenges } from '@/interfaces/player'

type RewardsData = Record<string, Record<string, number>>

/**
 * Calculates the number of completed and available challenges (awards) for a player.
 *
 * This function processes challenge data grouped by category, including tournament-specific
 * data and general (non-tournament) challenges. Each challenge is either:
 * - `1`: completed
 * - `0`: not completed
 * - `-1`: hidden or not available (ignored in counts)
 *
 * Tournament challenges are processed separately due to unique handling rules.
 *
 * @param data - A nested object where each key is a challenge category and
 *               each sub-key represents a specific award with its completion value.
 * @returns An object with two tuples:
 *          - `general`: [number of completed general challenges, total general challenges]
 *          - `tournament`: [number of completed tournament challenges, total tournament challenges]
 */
export const calculateCompletedChallenges = (data: RewardsData): Challenges => {
  let completedRewards = 0
  let totalRewards = 0
  let tournamentRewards = [0, 0]

  for (const category in data) {
    if (category === 'Tournament') {
      const tournamentData = Object.values(data[category]).filter(
        (award) => award !== -1,
      )
      tournamentRewards = [
        tournamentData.filter((award) => award).length,
        tournamentData.length,
      ]
      continue
    }

    for (const reward in data[category]) {
      if (data[category][reward] !== -1) {
        totalRewards++
      }
      if (data[category][reward] === 1) {
        completedRewards++
      }
    }
  }

  return {
    general: [completedRewards, totalRewards],
    tournament: [tournamentRewards[0], tournamentRewards[1]],
  }
}
