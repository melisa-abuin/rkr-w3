import { tournamentAwards } from '@/constants'
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
  let trueRewards = 0
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
        trueRewards++
      }
    }
  }

  return {
    general: [trueRewards, totalRewards],
    tournament: [tournamentRewards[0], tournamentRewards[1]],
  }
}

/**
 * Legacy version of challenge completion calculator used for player stats
 * uploaded before version 1.0.4.
 *
 * This function separates tournament and general challenges using a fixed
 * list of tournament award names. Only awards with a value other than -1
 * are counted, where `1` represents completion.
 *
 * @param data - An array-like structure of challenge key-value pairs,
 *               where each value represents completion (1 or 0) or is -1 (unavailable).
 * @returns An object with two tuples:
 *          - `general`: [number of completed general challenges, total general challenges]
 *          - `tournament`: [number of completed tournament challenges, total tournament challenges]
 */
export const calculateCompletedChallengesLegacy = (data: []): Challenges => {
  const awardValues = Object.entries(data).filter(([, value]) => value !== -1)
  const generalValues = awardValues.filter(
    ([key]) => !tournamentAwards.includes(key),
  )
  const tournamentValues = awardValues.filter(([key]) =>
    tournamentAwards.includes(key),
  )

  return {
    general: [
      generalValues.filter(([, value]) => value).length,
      generalValues.length,
    ],
    tournament: [
      tournamentValues.filter(([, value]) => value).length,
      tournamentValues.length,
    ],
  }
}
