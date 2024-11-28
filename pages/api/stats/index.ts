import { calculateSaveDeathRatio } from '@/utils/calculateSaveDeathRatio'
import {
  ApiPlayerStats,
  FromattedApiPlayerStats,
  PlayerStats,
} from '@/interfaces/player'
import { NextApiRequest, NextApiResponse } from 'next'
import { mapKeysToCamelCase } from '@/utils/mapKeysToCamelCase'
import { calculateTotals } from '@/utils/calculateTotals'
import { mockApiData } from '@/constants'

const keysToMap: (keyof PlayerStats)[] = [
  'saves',
  'deaths',
  'completedChallenges',
  'highestSaveStreak',
  'highestWinStreak',
]

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
        const camelCaseKey = mapKeysToCamelCase(key)
        newObject[camelCaseKey as keyof FromattedApiPlayerStats] = value

        if (keysToMap.includes(camelCaseKey as keyof PlayerStats)) {
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

      return playerStats
    })

    res.status(200).json(formattedData)
  } catch (error) {
    console.error('Error fetching scoreboard data:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
