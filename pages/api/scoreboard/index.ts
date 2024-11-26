import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import {
  ApiPlayerStats,
  FromattedApiPlayerStats,
  PlayerStats,
} from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { mapKeysToSnakeCase } from '@/utils/mapKeysToSnakeCase'
import { formatRoundsData } from '@/utils/formatRoundsData'
import { calculateTotals } from '@/utils/calculateTotals'
import { getNumericCompleteChallenges } from '@/utils/getNumericCompleteChallenges'
import { findTopFive } from '@/utils/findTopFive'
import { mockApiData } from '@/constants'

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

    const data =
      process.env.NODE_ENV === 'development'
        ? mockApiData
        : await response.json()

    // if the data volume increases here we will need to implement a cache/invalidation method
    const formattedData = data.map((elem: ApiPlayerStats) => {
      const newObject: Partial<FromattedApiPlayerStats> = {}
      const playerStats: Partial<PlayerStats> = {}

      Object.entries(elem).forEach(([key, value]) => {
        const camelCaseKey = mapKeysToSnakeCase(key)
        newObject[camelCaseKey as keyof FromattedApiPlayerStats] = value

        if (
          camelCaseKey === 'saves' ||
          camelCaseKey === 'deaths' ||
          camelCaseKey === 'completedChallenges' ||
          camelCaseKey === 'highestSaveStreak' ||
          camelCaseKey === 'highestWinStreak'
        ) {
          playerStats[camelCaseKey as keyof PlayerStats] = value
        }
      })

      playerStats['battleTag'] = {
        name: newObject.battleTag?.split('#')[0] || '',
        tag: newObject.battleTag || '',
      }

      playerStats['saveDeathRatio'] = calculateSaveDeathRatio(
        newObject.saves || 0,
        newObject.deaths || 0,
      )

      playerStats['gamesPlayed'] = calculateTotals(
        newObject.normalGames,
        newObject.hardGames,
        newObject.impossibleGames,
      )

      playerStats['wins'] = calculateTotals(
        newObject.normalWins,
        newObject.hardWins,
        newObject.impossibleWins,
      )

      const rounds = [1, 2, 3, 4, 5] as const

      rounds.forEach((round) => {
        playerStats[`r${round}`] = formatRoundsData(newObject, round)
      })

      return playerStats
    })

    const stats = {
      scoreboard: [
        ...formattedData
          .sort((a: PlayerStats, b: PlayerStats) => {
            return (
              getNumericCompleteChallenges(b.completedChallenges)[0] -
              getNumericCompleteChallenges(a.completedChallenges)[0]
            )
          })
          .slice(0, 5),
      ],
      leaderboard: {
        stats: [
          {
            category: 'Highest Win Streak',
            data: findTopFive(formattedData, 'highestWinStreak'),
          },
          {
            category: 'Most Saves',
            data: findTopFive(formattedData, 'saves'),
          },
          {
            category: 'Most Games Played',
            data: findTopFive(formattedData, 'gamesPlayed'),
          },
          {
            category: 'Most Wins',
            data: findTopFive(formattedData, 'wins'),
          },
          {
            category: 'Save/Death Ratio',
            data: findTopFive(formattedData, 'saveDeathRatio'),
          },
        ],
        times: [
          {
            category: 'Best R1 Times',
            data: findTopFive(formattedData, 'r1'),
          },
          {
            category: 'Best R2 Times',
            data: findTopFive(formattedData, 'r2'),
          },
          {
            category: 'Best R3 Times',
            data: findTopFive(formattedData, 'r3'),
          },
          {
            category: 'Best R4 Times',
            data: findTopFive(formattedData, 'r4'),
          },
          {
            category: 'Best R5 Times',
            data: findTopFive(formattedData, 'r5'),
          },
        ],
      },
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
