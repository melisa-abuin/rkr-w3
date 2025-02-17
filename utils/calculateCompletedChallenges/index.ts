import { Challenges } from '@/interfaces/player'

type RewardsData = Record<string, Record<string, number>>

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
