import { tournamentAwards } from '@/constants'
import { Challenges } from '@/interfaces/player'

type RewardsData = Record<string, Record<string, number>>

/**
 * Calculates the awards a players has earned and return an object with two topuples
 * cotaining the awards won and the total awards for tournamnts and standard games
 *
 * @param data player rewards
 * @returns formatted player rewards
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
 * Calculates the awards a players has earned and return an object with two topuples
 * cotaining the awards won and the total awards for tournamnts and standard games
 * This method is valid for stats uploaded before 1.0.4 version
 *
 * @param data player rewards
 * @returns formatted player rewards
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
