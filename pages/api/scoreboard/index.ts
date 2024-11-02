import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import { PlayerStats } from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateBestTimeByDifficulty } from '@/utils/calculateBestTimeByDifficulty'
import { mockApiData } from '@/constants'

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

const findTopFive = (array: Array<PlayerStats>, key: keyof PlayerStats) => {
  const temp = [...array]
  const returnable = array.slice(0, 5)
  temp.splice(0, 5)

  console.log('xd')

  console.log(returnable.length)
  temp.forEach((elem) => {
    returnable.sort((a, b) => (a[key] > b[key] ? 0 : 1))

    let shouldAppendItem = false
    returnable.forEach((r) => {
      if (elem[key] > r[key]) {
        shouldAppendItem = true
      }
    })
    if (shouldAppendItem) {
      returnable.pop()
      returnable.push(elem)
    }
  })

  return returnable.sort((a, b) => b[key] - a[key])
}

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
    //const data = await response.json()
    const data = mockApiData

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

    const stats = {
      scoreboard: [...formattedData.slice(0, 5)],
      leaderboard: [
        {
          category: 'Highest Win Streak NUESTRO',
          data: findTopFive(formattedData, 'highest_win_streak').map(
            (elem: PlayerStats) => ({
              player: elem.battletag,
              data: elem.highest_win_streak,
            }),
          ),
        },
        {
          category: 'Highest Win Streak',
          data: formattedData
            .sort((a: PlayerStats, b: PlayerStats) => {
              return b.highest_win_streak - a.highest_win_streak
            })
            .map((elem: PlayerStats) => ({
              player: elem.battletag,
              data: elem.highest_win_streak,
            }))
            .slice(0, 5),
        },
        {
          category: 'Most Saves',
          data: formattedData
            .sort((a: PlayerStats, b: PlayerStats) => {
              return b.highest_win_streak - a.highest_win_streak
            })
            .map((elem: PlayerStats) => ({
              player: elem.battletag,
              data: elem.saves,
            }))
            .slice(0, 5),
        },
        {
          category: 'Most Games Played',
          data: formattedData
            .sort((a: PlayerStats, b: PlayerStats) => {
              return b.games_played.total - a.games_played.total
            })
            .map((elem: PlayerStats) => ({
              player: elem.battletag,
              data: elem.games_played.total,
            }))
            .slice(0, 5),
        },
        {
          category: 'Most Wins',
          data: formattedData
            .sort((a: PlayerStats, b: PlayerStats) => {
              return b.wins.total - a.wins.total
            })
            .map((elem: PlayerStats) => ({
              player: elem.battletag,
              data: elem.wins.total,
            }))
            .slice(0, 5),
        },
        {
          category: 'Save/Death Ratio',
          data: formattedData
            .sort((a: PlayerStats, b: PlayerStats) => {
              return b.save_death_ratio - a.save_death_ratio
            })
            .map((elem: PlayerStats) => ({
              player: elem.battletag,
              data: elem.save_death_ratio,
            }))
            .slice(0, 5),
        },
      ],
    }

    res
      .status(200)
      .setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=86400',
      )
      .json(stats)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
