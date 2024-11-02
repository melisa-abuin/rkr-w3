import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateBestTimeByDifficulty } from '@/utils/calculateBestTimeByDifficulty'

// TODO: create utils for these functions
const mapKeysToSnakeCase = (key: string): string =>
  key.toLowerCase().replace(/ : | /g, (match) => (match === ': ' ? ' ' : '_'))

const calculateTotals = (
  normal: number = 0,
  hard: number = 0,
  impossible: number = 0,
) => ({
  normal,
  hard,
  impossible,
  total: normal + hard + impossible,
})

const formatRounds = (
  newObject: Partial<PlayerStats>,
  round: 1 | 2 | 3 | 4 | 5,
) => {
  const normal = newObject[`round_${round}_time_normal`] || 0
  const hard = newObject[`round_${round}_time_hard`] || 0
  const impossible = newObject[`round_${round}_time_impossible`] || 0

  return {
    normal,
    hard,
    impossible,
    best: calculateBestTimeByDifficulty({ normal, hard, impossible }),
  }
}

const getCompletedChallenges = (challengesString?: string) =>
  challengesString ? Number(challengesString.split('/')[0]) : 0

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiKey = process.env.API_KEY

  try {
    if (!apiKey) {
      throw new Error()
    }

    const response = await fetch(apiKey, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    // if the data volume increases here we will need to implement a cache/invalidation method
    const formattedData = data
      .map((elem: PlayerStats) => {
        const newObject: Partial<PlayerStats> = {}

        Object.entries(elem).forEach(([key, value]) => {
          newObject[mapKeysToSnakeCase(key) as keyof PlayerStats] = value
        })

        newObject['save_death_ratio'] = calculateSaveDeathRatio(
          newObject.saves || 0,
          newObject.deaths || 0,
        )

        newObject['games_played'] = calculateTotals(
          newObject.normal_games,
          newObject.hard_games,
          newObject.impossible_games,
        )

        newObject['wins'] = calculateTotals(
          newObject.normal_wins,
          newObject.hard_wins,
          newObject.impossible_wins,
        )

        const rounds = [1, 2, 3, 4, 5] as const

        rounds.forEach((round) => {
          newObject[`r${round}`] = formatRounds(newObject, round)
        })

        return newObject
      })
      .sort((a: PlayerStats, b: PlayerStats) => {
        return (
          getCompletedChallenges(b.completed_challenges) -
          getCompletedChallenges(a.completed_challenges)
        )
      })
      .slice(0, 5)

    res
      .status(200)
      .setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=86400',
      )
      .json(formattedData)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
